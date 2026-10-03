(function(){
  const product=window.HANDBAG_PRODUCT;if(!product)return;
  const params=new URLSearchParams(location.search);const requested=(params.get('color')||product.defaultColor).toLowerCase();
  let color=Object.keys(product.variants).find(x=>x.toLowerCase()===requested)||product.defaultColor;
  const $=(s)=>document.querySelector(s),$$=(s)=>[...document.querySelectorAll(s)];
  function current(){return product.variants[color]}
  function item(){const v=current();return{slug:product.slug,name:product.name,color,price:product.price,image:v.images[0].replace(/^\.\.\/\.\.\//,'../'),url:`../products/${product.slug}/index.html?color=${encodeURIComponent(color)}`}}
  function render(){
    const v=current();document.title=`${product.name} — ${color}`;$('#product-color').textContent=color;$('#product-edition').textContent=`Edition ${color}`;$('#product-sku').textContent=`Артикул DZ-${product.slug.replace(/-/g,'').toUpperCase()}-${color.slice(0,3).toUpperCase()}`;
    $$('.gallery img').forEach((img,i)=>{img.src=v.images[i];img.alt=`${product.name}, ${color}: ${product.labels[i]}`});
    $$('.swatch').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color===color)));
    const url=new URL(location.href);url.searchParams.set('color',color);history.replaceState(null,'',url);
    const wish=$('[data-wishlist]');const active=DanzlaStore.isFavorite(item());wish.setAttribute('aria-pressed',String(active));wish.textContent=active?'♥':'♡';
  }
  $$('.swatch').forEach(b=>b.addEventListener('click',()=>{color=b.dataset.color;render()}));
  $('[data-wishlist]').addEventListener('click',()=>{const active=DanzlaStore.toggleFavorite(item());render();DanzlaStore.toast(active?'Добавлено в избранное':'Удалено из избранного')});
  $('[data-buy]').addEventListener('click',e=>{DanzlaStore.addCart(item());e.currentTarget.textContent='Добавлено';e.currentTarget.classList.add('is-added');DanzlaStore.toast('Товар добавлен в корзину');setTimeout(()=>{e.currentTarget.textContent='Добавить в корзину';e.currentTarget.classList.remove('is-added')},1600)});
  render();
})();
