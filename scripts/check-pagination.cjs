// Follow the actual archive links at the Ghost origin and check for lost/duplicate cards.
const origin = process.env.ORIGIN || 'http://127.0.0.1:2368';
const site = 'https://losrelatosdequichi.com';
const headers = {Host: new URL(site).host, 'X-Forwarded-Proto': 'https'};

async function page(path) {
    const response = await fetch(origin + path, {headers, redirect: 'manual'});
    if (response.status !== 200) throw new Error(`${path}: HTTP ${response.status}`);
    return response.text();
}

async function main() {
    const roots = new Set(['/episodios/']);
    for (const sitemap of ['tags', 'authors']) {
        const xml = await page(`/sitemap-${sitemap}.xml`);
        for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) roots.add(new URL(match[1]).pathname);
    }
    const home = await page('/');
    for (const match of home.matchAll(/href="([^\"]*\/tag\/[^\"/]+\/)"/g)) roots.add(new URL(match[1], site).pathname);

    for (const root of roots) {
        const visited = new Set();
        const episodes = new Set();
        const counts = [];
        let path = root;
        let previousPath = null;
        while (path) {
            if (visited.has(path) || visited.size >= 100) throw new Error(`Pagination loop: ${root}`);
            visited.add(path);
            const html = await page(path);
            const nav = (html.match(/<nav class="quichi-pagination"[\s\S]*?<\/nav>/) || [])[0] || '';
            const cards = [...html.matchAll(/class="gh-list-item-inner quichi-episode-card-inner" href="([^\"]+)"/g)].map(m => new URL(m[1], site).pathname);
            if (!cards.length) throw new Error(`Empty archive page: ${path}`);
            for (const card of cards) {
                if (episodes.has(card)) throw new Error(`Duplicate episode across pages: ${card}`);
                episodes.add(card);
            }
            counts.push(cards.length);
            const next = (nav.match(/href="([^\"]+)" rel="next"/) || [])[1];
            const prev = (nav.match(/href="([^\"]+)" rel="prev"/) || [])[1];
            const headNext = /<link rel="next"/.test(html);
            if (headNext !== Boolean(next)) throw new Error(`Missing or unexpected next link: ${path}`);
            if (previousPath && (!prev || new URL(prev, site).pathname !== previousPath)) throw new Error(`Wrong previous link: ${path}`);
            if (!previousPath && prev) throw new Error(`Previous link on first page: ${path}`);
            if (nav) {
                const status = nav.match(/Página (\d+) de (\d+)/);
                if (!status || Number(status[1]) !== visited.size || Number(status[2]) < visited.size) throw new Error(`Wrong page counter: ${path}`);
                if (!next && Number(status[2]) !== visited.size) throw new Error(`Stopped before last page: ${path}`);
            }
            previousPath = path;
            path = next ? new URL(next, site).pathname : null;
        }
        console.log(JSON.stringify({archive:root,pages:visited.size,episodes:episodes.size,cardsPerPage:counts,result:'passed'}));
    }
}

main().catch(error => {console.error(error.message); process.exitCode = 1;});
