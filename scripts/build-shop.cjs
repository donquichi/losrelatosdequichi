// Build a home image preview and a same-site shop from one reviewed product list.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),theme=path.join(root,'theme/V64');
const data=JSON.parse(fs.readFileSync(path.join(root,'ghost/recommendations.json'),'utf8'));
if(data.version!==1||!Array.isArray(data.items)||data.items.length>12)throw Error('Invalid recommendation list');
const escape=(value,max)=>{if(typeof value!=='string'||!value.trim()||value.length>max||/[\u0000-\u001f{}]/.test(value))throw Error('Invalid product text');return value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));};
const ids=new Set(),links=new Set();let missing=0;
const items=data.items.map(item=>{
 if(!/^[a-z0-9-]{1,60}$/.test(item.id)||ids.has(item.id)||typeof item.enabled!=='boolean')throw Error('Invalid or duplicate product ID');ids.add(item.id);
 const u=new URL(item.url);if(u.protocol!=='https:'||u.username||u.password||u.port||u.hash||!['link.amazon','amzn.to','amazon.com','www.amazon.com'].includes(u.hostname))throw Error('Use an original HTTPS Amazon affiliate link');
 if(['amazon.com','www.amazon.com'].includes(u.hostname)&&u.searchParams.get('tag')!=='relatosquichi-20')throw Error('Unexpected tracking ID');
 if(links.has(item.url))throw Error('Duplicate product link');links.add(item.url);
 let image='';
 if(item.image){
  if(!['owner','licensed'].includes(item.image.rights)||!/^products\/[a-zA-Z0-9_-]+\.(webp|png|jpe?g)$/.test(item.image.asset))throw Error('Use a permitted local product photo; Amazon API integration is not configured yet');
  const file=path.join(theme,'assets',item.image.asset),folder=path.join(theme,'assets/products')+path.sep;
  if(!fs.realpathSync(file).startsWith(folder))throw Error('Product image is outside the product-assets folder');
  image=`<img src="{{asset "${item.image.asset}"}}" alt="${escape(item.image.alt,180)}" width="600" height="600" loading="lazy" decoding="async">`;
 }else if(item.enabled)missing++;
 return {...item,title:escape(item.title,100),description:escape(item.description,240),href:escape(item.url,2048),image};
}).filter(item=>item.enabled);
if(process.argv.includes('--release')&&missing)throw Error(`${missing} active product(s) need permitted photos before this design can be published`);
const previewImage=item=>item.image||'<span class="quichi-shop-image-pending">Imagen del producto pendiente</span>';
const warning='{{! Generated from ghost/recommendations.json by scripts/build-shop.cjs. }}\n';
const notice='<p class="quichi-affiliate-disclosure">Enlaces de afiliado: puedo recibir una comisión si compras a través de estos enlaces.</p>\n<p class="quichi-amazon-disclosure" lang="en">As an Amazon Associate I earn from qualifying purchases.</p>';
const preview=items.length?`<section id="quichi-recomendaciones" class="quichi-shop-preview" aria-labelledby="quichi-shop-preview-title">
    <h3 id="quichi-shop-preview-title"><a href="{{@site.url}}/tienda/" target="_blank" rel="noopener">Tienda de Quichi <span aria-hidden="true">↗</span><span class="quichi-newtab"> (abre una nueva pestaña)</span></a></h3>
    <div class="quichi-shop-preview-images">
${items.slice(0,4).map(item=>`        <a class="quichi-shop-preview-image" href="{{@site.url}}/tienda/" target="_blank" rel="noopener" aria-label="Ver ${item.title} en Tienda de Quichi (nueva pestaña)">${previewImage(item)}</a>`).join('\n')}
    </div>
    <p class="quichi-shop-preview-note">Selección con enlaces de afiliado.</p>
</section>\n`:'';
const products=notice+'\n<div class="quichi-shop-grid">\n'+items.map(item=>`    <article class="quichi-shop-product" data-recommendation="${item.id}">
        <a href="${item.href}" target="_blank" rel="sponsored noopener" class="quichi-shop-product-link">
            <div class="quichi-shop-product-image">${previewImage(item)}</div>
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <span class="quichi-shop-action">Ver en Amazon <span aria-hidden="true">↗</span><span class="quichi-newtab"> (abre una nueva pestaña)</span></span>
        </a>
    </article>`).join('\n')+'\n</div>\n';
const outputs={
 'partials/components/amazon-recommendations.hbs':warning+preview,
 'partials/components/recommendations-link.hbs':items.length?'<li><a href="{{@site.url}}/tienda/" target="_blank" rel="noopener">Tienda de Quichi<span class="quichi-newtab"> (abre una nueva pestaña)</span></a></li>\n':'',
 'partials/components/shop-products.hbs':warning+products,
 'assets/data/shop-status.json':JSON.stringify({activeProducts:items.length,missingImages:missing,ready:missing===0},null,2)+'\n'
};
for(const [name,text] of Object.entries(outputs)){
 const file=path.join(theme,name);
 if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n')!==text)throw Error('Run node scripts/build-shop.cjs to refresh the shop templates');}
 else {fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text);}
}
console.log(JSON.stringify({activeProducts:items.length,missingImages:missing,releaseReady:missing===0,result:'passed'}));
