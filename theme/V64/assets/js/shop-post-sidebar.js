(function(){
'use strict';
const section=document.querySelector('.quichi-post-shop');if(!section)return;
const grid=section.querySelector('.quichi-post-shop-grid');
const candidates=[...section.querySelectorAll('.quichi-post-shop-record')].map(record=>{
  try{
    const image=new URL(record.dataset.image,'https://losrelatosdequichi.com');
    const links=[...record.querySelectorAll('.quichi-post-shop-source a[href]')];
    const product=links.map(a=>{try{return new URL(a.href);}catch{return null;}}).find(u=>u&&u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&['amazon.com','www.amazon.com'].includes(u.hostname)&&u.searchParams.get('tag')==='relatosquichi-20');
    if(image.protocol!=='https:'||image.username||image.password||image.port||!['losrelatosdequichi.com','www.losrelatosdequichi.com'].includes(image.hostname)||!image.pathname.startsWith('/content/images/')||!product||!record.dataset.title)return null;
    return {title:record.dataset.title,image:image.href,url:product.href};
  }catch{return null;}
}).filter(Boolean);
for(let i=candidates.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[candidates[i],candidates[j]]=[candidates[j],candidates[i]];}
for(const product of candidates.slice(0,5)){
  const a=document.createElement('a');a.className='quichi-post-shop-item';a.href=product.url;a.target='_blank';a.rel='sponsored noopener noreferrer';a.setAttribute('aria-label','Ver '+product.title+' en Amazon (abre una nueva pestaña)');
  const img=document.createElement('img');img.src=product.image;img.alt=product.title;img.loading='lazy';img.decoding='async';a.append(img);grid.append(a);
}
const previous=section.querySelector('.quichi-post-shop-prev'),next=section.querySelector('.quichi-post-shop-next');
if(previous&&next){
  const update=()=>{previous.disabled=grid.scrollLeft<=1;next.disabled=grid.scrollLeft+grid.clientWidth>=grid.scrollWidth-1;};
  const move=direction=>{const first=grid.querySelector('.quichi-post-shop-item');const distance=first?first.getBoundingClientRect().width+12:grid.clientWidth;grid.scrollBy({left:direction*distance,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
  previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));grid.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);requestAnimationFrame(update);
}
})();
