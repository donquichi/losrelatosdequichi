const origin=process.env.ORIGIN||'http://127.0.0.1:2368';
const site='https://losrelatosdequichi.com';
const headers={Host:new URL(site).host,'X-Forwarded-Proto':'https'};
async function html(path){const r=await fetch(origin+path,{headers,redirect:'manual',signal:AbortSignal.timeout(15000)});if(r.status!==200)throw Error(`${path} returned ${r.status}`);return r.text();}
async function main(){
    const archive=await html('/episodios/');
    const cards=[...archive.matchAll(/<article\b[^>]*class="[^"]*quichi-episode-card[^"]*"[\s\S]*?<\/article>/g)];
    const episodes=cards.slice(0,2).map(m=>new URL(m[0].match(/href="([^"]+)"/)[1],site).pathname);
    if(episodes.length!==2)throw Error('Need two published episodes for the shared-sidebar check');
    let baseline;
    for(const path of ['/',...episodes]){
        const page=await html(path);
        const widgets=[...page.matchAll(/<section id="quichi-recomendaciones"[\s\S]*?<\/section>/g)];
        if(widgets.length!==1)throw Error(`Expected one recommendation section on ${path}`);
        const widget=widgets[0][0];
        const anchors=[...widget.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)];
        const links=anchors.map(m=>m[1].replace(/&amp;/g,'&'));
        if(!links.length||new Set(links).size!==links.length)throw Error('Empty or duplicate product recommendations');
        if(process.env.EXPECTED_AFFILIATE_URL&&!links.includes(process.env.EXPECTED_AFFILIATE_URL))throw Error('Owner-provided affiliate link is missing');
        for(const anchor of anchors){
            if(!/rel="[^"]*\bsponsored\b/.test(anchor[0])||!anchor[0].includes('noopener')||!anchor[0].includes('target="_blank"'))throw Error('Affiliate link markup is incomplete');
        }
        if(!widget.includes('As an Amazon Associate I earn from qualifying purchases.')||widget.indexOf('Enlaces de afiliado')>widget.indexOf('<a '))throw Error('Missing prominent affiliate disclosures');
        if(/<img\b|\$\d|<iframe\b/.test(widget))throw Error('Unapproved product media, prices or widget detected');
        if(baseline&&JSON.stringify(links)!==JSON.stringify(baseline))throw Error('Recommendation lists differ between homepage and episode');
        baseline=links;
        if(!page.includes('/#quichi-recomendaciones'))throw Error('Navigation shortcut is missing');
        if(!page.includes('/assets/css/recommendations.css'))throw Error('Recommendation stylesheet is missing');
        console.log(JSON.stringify({path,products:links.length,sharedSidebar:true,result:'passed'}));
    }
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
