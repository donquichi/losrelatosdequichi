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
    const archiveResponse = await fetch(origin + '/episodios/', {headers, redirect:'manual'});
    if (archiveResponse.status !== 200) throw new Error(`Episode archive returned ${archiveResponse.status}`);
    const archiveHtml = await archiveResponse.text();
    const archiveCards = [...archiveHtml.matchAll(/<article\b[^>]*class="[^"]*quichi-episode-card[^"]*"[\s\S]*?<\/article>/g)];
    const newest = archiveCards.slice(0,5).map(match => [...episodeLinks(match[0])][0]);
    if (newest.length !== 5 || JSON.stringify([...groups[1]]) !== JSON.stringify(newest)) {
        throw new Error('Latest episodes must match the newest five episodes in the public archive, in order');
    }
    const expected = [3, 5, 5];
    const seen = new Set();
    groups.forEach((group, index) => {
        if (group.size !== expected[index]) throw new Error(`Wrong episode count in section ${index + 1}: ${group.size}`);
        for (const url of group) {
            if (seen.has(url) && index !== 1) throw new Error(`Unexpected repeated episode: ${url}`);
            seen.add(url);
        }
    });
    if (JSON.stringify([...groups[0]]) !== JSON.stringify(newest.slice(0,3))) throw new Error('Carousel must show the newest three episodes');
    if (html.includes('class="quichi-feature-block"')) throw new Error('Duplicate featured block remains');
    if (html.indexOf('class="quichi-latest-block"') > html.indexOf('id="categorias"')) throw new Error('Recent episodes do not precede categories');
    if (!html.includes('/tag/scp-foundation/')) throw new Error('SCP category is missing');
    if (!html.includes('id="quichi-explore-title"')) throw new Error('Homepage exploration section is missing');
    console.log(JSON.stringify({heroEpisodes:groups[0].size,recentEpisodes:groups[1].size,recommendedEpisodes:groups[2].size,distinctEpisodes:seen.size,recentEpisodesBeforeCategories:true,result:'passed'}));
}

main().catch(error => {console.error(error.message); process.exitCode = 1;});
