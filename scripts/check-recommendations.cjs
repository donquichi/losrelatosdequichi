const origin=process.env.ORIGIN||'http://127.0.0.1:2368',site='https://losrelatosdequichi.com';
const headers={Host:new URL(site).host,'X-Forwarded-Proto':'https'};
async function request(path){const r=await fetch(origin+path,{headers,redirect:'manual',signal:AbortSignal.timeout(15000)});if(r.status!==200)throw Error(`${path} returned ${r.status}`);return r;}
async function main(){
 const draft=process.env.ALLOW_PENDING_PRODUCT_IMAGES==='1';
 const status=await(await request('/assets/data/shop-status.json')).json();
 if(!status.ready&&!draft)throw Error('Shop is not ready: permitted product photos are missing');
 const home=await(await request('/')).text(),shop=await(await request('/tienda/')).text();
 const preview=home.match(/<section id="quichi-recomendaciones"[\s\S]*?<\/section>/)?.[0]||'';
 if(!preview.includes('/tienda/')||!preview.includes('Tienda de Quichi')||!preview.includes('target="_blank"')||!preview.includes('rel="noopener"'))throw Error('Home shop preview or new-tab heading is missing');
 if(/quichi-shop-product|quichi-recommendation-item|href="https:\/\/link\.amazon\//.test(preview))throw Error('Home preview should lead to the shop rather than contain full affiliate cards');
 if(!shop.includes('<h1>Tienda de Quichi</h1>')||!shop.includes('<title>Tienda de Quichi |'))throw Error('Shop title is missing');
 if(!shop.includes('As an Amazon Associate I earn from qualifying purchases.')||shop.indexOf('Enlaces de afiliado')>shop.indexOf('class="quichi-shop-grid"'))throw Error('Shop disclosures are missing');
 const cards=[...shop.matchAll(/<article class="quichi-shop-product"[\s\S]*?<\/article>/g)];
 if(cards.length!==status.activeProducts)throw Error('Wrong shop product count');
 const links=[];
 for(const [card] of cards){
  const a=card.match(/<a\b[^>]*href="([^"]+)"[^>]*>/);if(!a||!a[0].includes('sponsored noopener')||!a[0].includes('target="_blank"'))throw Error('Missing affiliate link attributes');
  links.push(a[1].replace(/&amp;/g,'&'));
  if(!draft&&(!/<img\b[^>]*alt="[^"]+"/.test(card)||card.includes('Imagen del producto pendiente')))throw Error('A product photo is missing');
 }
 if(new Set(links).size!==links.length)throw Error('Duplicate product links');
 if(process.env.EXPECTED_AFFILIATE_URL&&!links.includes(process.env.EXPECTED_AFFILIATE_URL))throw Error('Original affiliate link is missing');
 if(!draft&&preview.includes('Imagen del producto pendiente'))throw Error('Home preview photo is missing');
 const archive=await(await request('/episodios/')).text();
 const card=archive.match(/<article\b[^>]*class="[^"]*quichi-episode-card[^"]*"[\s\S]*?<\/article>/)?.[0];
 if(!card)throw Error('No episode available for exclusion check');
 const episode=new URL(card.match(/href="([^"]+)"/)[1],site).pathname;
 const episodeHtml=await(await request(episode)).text();
 if(episodeHtml.includes('id="quichi-recomendaciones"')||episodeHtml.includes('class="quichi-shop-product"'))throw Error('Product cards still appear on episodes');
 console.log(JSON.stringify({products:cards.length,homeImagePreview:true,shopNewTab:true,episodeCardsRemoved:true,missingImages:status.missingImages,draft,result:'passed'}));
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
