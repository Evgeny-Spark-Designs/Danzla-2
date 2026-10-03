(function(){
  const KEYS={favorites:'danzla:favorites',cart:'danzla:cart'};
  const read=(key)=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}};
  const write=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  const id=(p)=>`${p.slug}:${p.color}`.toLowerCase();
  const api={
    favorites:()=>read(KEYS.favorites),cart:()=>read(KEYS.cart),
    isFavorite:(p)=>read(KEYS.favorites).some(x=>x.id===id(p)),
    toggleFavorite(p){let rows=read(KEYS.favorites),key=id(p);const exists=rows.some(x=>x.id===key);rows=exists?rows.filter(x=>x.id!==key):[...rows,{...p,id:key,addedAt:Date.now()}];write(KEYS.favorites,rows);this.refresh();return !exists},
    addCart(p){let rows=read(KEYS.cart),key=id(p),row=rows.find(x=>x.id===key);if(row)row.qty+=1;else rows.push({...p,id:key,qty:1});write(KEYS.cart,rows);this.refresh();return rows},
    removeCart(key){write(KEYS.cart,read(KEYS.cart).filter(x=>x.id!==key));this.refresh()},
    refresh(){const fav=read(KEYS.favorites).length;const cart=read(KEYS.cart).reduce((n,x)=>n+(x.qty||1),0);document.querySelectorAll('[data-favorites-count]').forEach(x=>x.textContent=fav);document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=cart);document.dispatchEvent(new CustomEvent('danzla:store-updated',{detail:{fav,cart}}))},
    toast(message){let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.append(el)}el.textContent=message;el.classList.add('is-visible');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('is-visible'),1800)}
  };
  window.DanzlaStore=api;document.addEventListener('DOMContentLoaded',()=>api.refresh());
})();
