// Public verification checks only. This cannot establish Google approval or ad fill.
const origin = process.env.ORIGIN || 'http://127.0.0.1:2368';
const site = 'https://losrelatosdequichi.com';
const headers = {Host:new URL(site).host,'X-Forwarded-Proto':'https'};
const publisher = 'ca-pub-8633694225257899';
async function request(path) {
    const response = await fetch(origin + path, {headers,redirect:'manual',signal:AbortSignal.timeout(15000)});
    if (response.status !== 200) throw new Error(`${path} returned ${response.status}`);
    return response;
}
async function main() {
    const response = await request('/ads.txt');
    if (!response.headers.get('content-type')?.includes('text/plain')) throw new Error('ads.txt is not plain text');
    const lines = (await response.text()).trim().split(/\r?\n/).map(s=>s.trim()).filter(s=>s&&!s.startsWith('#'));
    const expected = 'google.com, pub-8633694225257899, DIRECT, f08c47fec0942fa0';
    if (lines.filter(s=>s===expected).length!==1 || lines.some(s=>s.includes('<'))) throw new Error('Wrong ads.txt seller record');
    const archiveHtml = await (await request('/episodios/')).text();
    const card = archiveHtml.match(/<article\b[^>]*class="[^"]*quichi-episode-card[^"]*"[\s\S]*?<\/article>/)?.[0] || '';
    const episodeHref = card.match(/href="([^"]+)"/)?.[1];
    if (!episodeHref) throw new Error('No published episode found for the head-code check');
    const episodeUrl = new URL(episodeHref,site);
    if (episodeUrl.origin!==new URL(site).origin) throw new Error('Episode URL does not belong to this website');
    for (const path of ['/','/episodios/',episodeUrl.pathname]) {
        const html = await (await request(path)).text();
        const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
        const scripts = html.match(/<script\b[^>]*src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^\"]*"[^>]*>/g) || [];
        if (scripts.length!==1 || !head.includes(scripts[0]) || !scripts[0].includes('client='+publisher) || !/\basync\b/.test(scripts[0]) || !scripts[0].includes('crossorigin="anonymous"')) throw new Error(`Missing, duplicate or incorrect AdSense head code: ${path}`);
        console.log(JSON.stringify({path,publisher,headScriptCount:scripts.length,result:'passed'}));
    }
    console.log(JSON.stringify({adsTxt:'authorized seller record publicly served',googleApproval:'not established by this check',result:'passed'}));
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
