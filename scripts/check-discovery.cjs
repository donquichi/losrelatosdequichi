// Run against an isolated candidate Ghost instance before releasing discovery changes.
const origin=process.env.ORIGIN||'http://127.0.0.1:2368';
const headers={Host:'losrelatosdequichi.com','X-Forwarded-Proto':'https'};
async function html(path){const r=await fetch(origin+path,{headers,signal:AbortSignal.timeout(15000)});if(r.status!==200)throw new Error(`${path}: ${r.status}`);return r.text();}
(async()=>{
    const archive=await html('/episodios/');
    if(!/class="quichi-archive-search" href="#\/search" data-ghost-search/.test(archive))throw new Error('Native archive search control missing');
    const categories=archive.match(/<nav class="quichi-category-shortcuts"[\s\S]*?<\/nav>/)?.[0];
    if(!categories||!categories.includes('aria-current="page">Todos los episodios'))throw new Error('All-episode selection missing');
    const links=[...categories.matchAll(/<a href="([^\"]*\/tag\/[^\"]+)"[^>]*>/g)].map(m=>m[1]);
    if(!links.length||new Set(links).size!==links.length)throw new Error('Category shortcuts empty or duplicated');
    const scp=await html('/tag/scp-foundation/');
    const scpNav=scp.match(/<nav class="quichi-category-shortcuts"[\s\S]*?<\/nav>/)?.[0]||'';
    if(!/href="[^\"]*\/tag\/scp-foundation\/" aria-current="page"/.test(scpNav))throw new Error('Current category not marked');
    if((scpNav.match(/aria-current="page"/g)||[]).length!==1)throw new Error('Multiple current category selections');
    for(const label of ['Buscar en el sitio','Política de privacidad','Términos del servicio'])if(!archive.includes(label))throw new Error(`Missing Spanish label: ${label}`);
    if(archive.includes('class="quichi-support"'))throw new Error('Support section visible without configured donation URL');
    const home=await html('/');if(!home.includes('Categorías')||!home.includes('Ver más'))throw new Error('Homepage labels not translated');
    console.log(JSON.stringify({categoryShortcuts:links.length,currentCategory:'scp-foundation',nativeSearchControl:true,unconfiguredDonationHidden:true,result:'passed'}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
