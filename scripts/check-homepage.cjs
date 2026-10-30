// Verify that homepage discovery sections do not repeat the featured episodes.
const origin = process.env.ORIGIN || 'http://127.0.0.1:2368';
const site = 'https://losrelatosdequichi.com';
const headers = {Host: new URL(site).host, 'X-Forwarded-Proto': 'https'};

function episodeLinks(fragment) {
    return new Set([...fragment.matchAll(/href="([^\"]+)"/g)].map(match => new URL(match[1], site).pathname));
}

async function main() {
    const response = await fetch(origin + '/', {headers, redirect: 'manual'});
    if (response.status !== 200) throw new Error(`Homepage returned ${response.status}`);
    const html = await response.text();
    const hero = (html.match(/<section class="quichi-featured gh-outer">[\s\S]*?<\/section>/) || [])[0] || '';
    const latest = (html.match(/<section class="quichi-latest-block">[\s\S]*?<\/section>/) || [])[0] || '';
    const recommendations = (html.match(/<div class="quichi-popular-list">[\s\S]*?<\/div>/) || [])[0] || '';
    const groups = [hero, latest, recommendations].map(episodeLinks);
    const expected = [3, 5, 5];
    const seen = new Set();
    groups.forEach((group, index) => {
        if (group.size !== expected[index]) throw new Error(`Wrong episode count in section ${index + 1}: ${group.size}`);
        for (const url of group) {
            if (seen.has(url)) throw new Error(`Episode repeated across homepage sections: ${url}`);
            seen.add(url);
        }
    });
    if (html.includes('class="quichi-feature-block"')) throw new Error('Duplicate featured block remains');
    if (html.indexOf('class="quichi-latest-block"') > html.indexOf('id="categorias"')) throw new Error('Recent episodes do not precede categories');
    if (!html.includes('/tag/scp-foundation/')) throw new Error('SCP category is missing');
    console.log(JSON.stringify({heroEpisodes:groups[0].size,recentEpisodes:groups[1].size,recommendedEpisodes:groups[2].size,distinctEpisodes:seen.size,recentEpisodesBeforeCategories:true,result:'passed'}));
}

main().catch(error => {console.error(error.message); process.exitCode = 1;});
