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

    function rgba(value) {
      var match = String(value || '').match(/rgba?\(([^)]+)\)/i);
      if (!match) return null;
      var parts = match[1].split(',').map(Number);
      return { r: parts[0] || 0, g: parts[1] || 0, b: parts[2] || 0, a: parts.length > 3 ? parts[3] : 1 };
    }

    function composite(foreground, background) {
      var alpha = foreground.a + background.a * (1 - foreground.a);
      if (!alpha) return { r: 255, g: 255, b: 255, a: 1 };
      return {
        r: (foreground.r * foreground.a + background.r * background.a * (1 - foreground.a)) / alpha,
        g: (foreground.g * foreground.a + background.g * background.a * (1 - foreground.a)) / alpha,
        b: (foreground.b * foreground.a + background.b * background.a * (1 - foreground.a)) / alpha,
        a: alpha
      };
    }

    function effectiveBackground(element) {
      var layers = [];
      for (var current = element; current; current = current.parentElement) {
        var color = rgba(window.getComputedStyle(current).backgroundColor);
        if (color && color.a) layers.push(color);
        if (color && color.a >= .99) break;
      }
      return layers.reverse().reduce(function (background, layer) {
        return composite(layer, background);
      }, { r: 255, g: 255, b: 255, a: 1 });
    }

    var sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = sampleCanvas.height = 1;
    var sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });

    function mediaColor(media, x, y) {
      if (!sampleContext) return null;
      var rect = media.getBoundingClientRect();
      var sourceWidth = media.videoWidth || media.naturalWidth;
      var sourceHeight = media.videoHeight || media.naturalHeight;
      if (!sourceWidth || !sourceHeight || !rect.width || !rect.height) return null;
      var fit = window.getComputedStyle(media).objectFit || 'fill';
      var scaleX = rect.width / sourceWidth;
      var scaleY = rect.height / sourceHeight;
      var scale = fit === 'cover' ? Math.max(scaleX, scaleY) : fit === 'contain' ? Math.min(scaleX, scaleY) : 0;
      var drawnWidth = scale ? sourceWidth * scale : rect.width;
      var drawnHeight = scale ? sourceHeight * scale : rect.height;
      var localX = x - rect.left - (rect.width - drawnWidth) / 2;
      var localY = y - rect.top - (rect.height - drawnHeight) / 2;
      var sourceX = scale ? localX / scale : localX * sourceWidth / rect.width;
      var sourceY = scale ? localY / scale : localY * sourceHeight / rect.height;
      if (sourceX < 0 || sourceY < 0 || sourceX >= sourceWidth || sourceY >= sourceHeight) return null;
      try {
        sampleContext.clearRect(0, 0, 1, 1);
        sampleContext.drawImage(media, sourceX, sourceY, 1, 1, 0, 0, 1, 1);
        var pixel = sampleContext.getImageData(0, 0, 1, 1).data;
        return { r: pixel[0], g: pixel[1], b: pixel[2], a: pixel[3] / 255 };
      } catch (error) {
        return null;
      }
    }

    function colorBehind(element) {
      var rect = element.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var previousVisibility = bar.style.visibility;
      bar.style.visibility = 'hidden';
      var target = document.elementFromPoint(x, y);
      bar.style.visibility = previousVisibility;
      if (!target) return { r: 255, g: 255, b: 255, a: 1 };
      if (target.tagName === 'IMG' || target.tagName === 'VIDEO') return mediaColor(target, x, y) || effectiveBackground(target);
      var nestedMedia = target.querySelector && target.querySelector('img,video');
      if (nestedMedia) {
        var mediaRect = nestedMedia.getBoundingClientRect();
        if (mediaRect.left <= x && mediaRect.right >= x && mediaRect.top <= y && mediaRect.bottom >= y) {
          return mediaColor(nestedMedia, x, y) || effectiveBackground(target);
        }
      }
      return effectiveBackground(target);
    }

    function setAdaptiveTone(element) {
      var color = colorBehind(element);
      var glass = rgba(window.getComputedStyle(bar).backgroundColor);
      if (glass && glass.a) color = composite(glass, color);
      var luminance = (.2126 * color.r + .7152 * color.g + .0722 * color.b) / 255;
      element.classList.toggle('is-on-dark', luminance < .48);
    }

    function syncPurchaseContrast() {
      setAdaptiveTone(barBuy);
      setAdaptiveTone(barWish);
    }

    var contrastFrame = 0;
    function schedulePurchaseContrast() {
      if (contrastFrame) return;
      contrastFrame = window.requestAnimationFrame(function () {
        contrastFrame = 0;
        syncPurchaseContrast();
      });
    }

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
    syncPurchaseContrast();

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
      schedulePurchaseContrast();
    }
    updateBar();
    window.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', function () { updateBar(); syncPurchaseContrast(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
