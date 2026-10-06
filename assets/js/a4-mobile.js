(function () {
  var relatedProducts = [
    { slug: 'a4', name: 'A4', color: 'Espresso', price: '6 900 ₽', image: '../../assets-materials/products/a4/a4-espresso-front.png' },
    { slug: 'oval', name: 'Oval', color: 'Chocolate', price: '5 900 ₽', image: '../../assets-materials/products/oval/oval-chocolate-product.png' },
    { slug: 'vela', name: 'Vela', color: 'Taupe', price: '5 800 ₽', image: '../../assets-materials/products/vela/vela-taupe-product.png' },
    { slug: 'rondo', name: 'Rondo', color: 'Chocolate', price: '6 000 ₽', image: '../../assets-materials/products/rondo/rondo-chocolate-product.png' },
    { slug: 'half-moon', name: 'Half Moon', color: 'Chocolate', price: '5 600 ₽', image: '../../assets-materials/womens-catalog/18.png' },
    { slug: 'triangle', name: 'Triangle', color: 'Black', price: '6 200 ₽', image: '../../assets-materials/womens-catalog/32.png' },
    { slug: 'weave', name: 'Weave', color: 'Chocolate', price: '5 400 ₽', image: '../../assets-materials/womens-catalog/16.png' }
  ];

  function productSlug() {
    var match = location.pathname.match(/\/products\/([^/]+)\//);
    return match ? match[1] : '';
  }

  function ensureMobileBreadcrumb() {
    var crop = document.querySelector('.product-crop');
    if (!crop) return;
    document.querySelectorAll('.product-crop__index').forEach(function (index) { index.remove(); });
    if (crop.querySelector('.breadcrumbs--mobile')) return;
    var breadcrumb = document.createElement('p');
    breadcrumb.className = 'breadcrumbs breadcrumbs--mobile';
    breadcrumb.innerHTML = '<a href="../../collections/bestsellers/index.html">Весь каталог</a>&nbsp;/&nbsp;<a href="../../collections/handbags/index.html">Сумки</a>';
    crop.insertBefore(breadcrumb, crop.firstChild);
  }

  function ensureRelatedProducts(footer) {
    if (document.querySelector('.related-products')) return;
    var current = productSlug();
    var products = relatedProducts.filter(function (product) { return product.slug !== current; }).slice(0, 3);
    var section = document.createElement('section');
    section.className = 'related-products';
    section.setAttribute('aria-labelledby', 'related-title');
    section.innerHTML = '<p class="related-products__eyebrow">Продолжить знакомство</p>' +
      '<h2 id="related-title">Вам также может понравиться</h2>' +
      '<div class="related-products__track">' + products.map(function (product) {
        return '<a class="related-card" href="../' + product.slug + '/index.html?color=' + encodeURIComponent(product.color) + '">' +
          '<span class="related-card__image"><img src="' + product.image + '" alt="Danzla ' + product.name + ' ' + product.color + '" loading="lazy"></span>' +
          '<span class="related-card__body"><strong>' + product.name + '</strong><span>Edition ' + product.color + '</span><b>' + product.price + '</b></span></a>';
      }).join('') + '</div>';
    footer.parentNode.insertBefore(section, footer);
  }

  function init() {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    ensureMobileBreadcrumb();
    var info = document.querySelector('.product-info');
    var story = document.querySelector('.story');
    var originalBuy = document.querySelector('[data-buy]');
    var originalWish = document.querySelector('[data-wishlist]');
    var footer = document.querySelector('.footer');
    if (!info || !story || !originalBuy || !originalWish || !footer) return;
    ensureRelatedProducts(footer);

    var price = document.querySelector('.price');
    var priceText = price ? price.textContent.trim() : '';

    var bar = document.createElement('div');
    bar.className = 'mobile-purchase-bar';
    bar.setAttribute('aria-label', 'Быстрая покупка');
    bar.innerHTML = '<button class="mobile-purchase-bar__buy" type="button">Добавить в корзину <span>' + priceText + '</span></button>' +
      '<button class="mobile-purchase-bar__wish" type="button" aria-label="Добавить в избранное" aria-pressed="false">♡</button>';
    document.body.appendChild(bar);

    var barBuy = bar.querySelector('.mobile-purchase-bar__buy');
    var barWish = bar.querySelector('.mobile-purchase-bar__wish');

    function syncWish() {
      var active = originalWish.getAttribute('aria-pressed') === 'true';
      barWish.setAttribute('aria-pressed', String(active));
      barWish.setAttribute('aria-label', active ? 'Удалить из избранного' : 'Добавить в избранное');
      barWish.textContent = active ? '♥' : '♡';
    }

    barBuy.addEventListener('click', function () {
      originalBuy.click();
      barBuy.firstChild.nodeValue = 'Добавлено ';
      window.setTimeout(function () { barBuy.firstChild.nodeValue = 'Добавить в корзину '; }, 1600);
    });
    barWish.addEventListener('click', function () {
      originalWish.click();
      window.setTimeout(syncWish, 0);
    });
    document.addEventListener('danzla:store-updated', syncWish);
    syncWish();

    var details = Array.from(document.querySelectorAll('.details details'));
    details.forEach(function (current) {
      current.addEventListener('toggle', function () {
        if (!current.open) return;
        details.forEach(function (other) { if (other !== current) other.open = false; });
      });
    });

    function updateBar() {
      var viewportBottom = window.scrollY + window.innerHeight;
      var start = info.offsetTop + Math.min(280, info.offsetHeight * .35);
      var stop = footer.offsetTop - 80;
      bar.classList.toggle('is-visible', viewportBottom >= start && viewportBottom < stop);
    }
    updateBar();
    window.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
