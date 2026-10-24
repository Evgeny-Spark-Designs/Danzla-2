(function () {
  var script = document.currentScript;

  function initCookieBanner() {
    if (!document.body || document.getElementById('dz-cookie-banner')) return;

    var bannerStyle = document.createElement('style');
    bannerStyle.id = 'dz-cookie-style';
    bannerStyle.textContent = '.dz-cookie{position:fixed;right:-54px;bottom:12px;z-index:9999;width:min(94vw,570px);aspect-ratio:2.56/1;perspective:1100px;transform-origin:72% 55%;will-change:transform,opacity}.dz-cookie[hidden]{display:none}.dz-cookie__image{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none;user-select:none}.dz-cookie__close,.dz-cookie__accept,.dz-cookie__settings{position:absolute;z-index:1;margin:0;padding:0;border:0;background:transparent;color:transparent;cursor:pointer;touch-action:manipulation}.dz-cookie__close{top:22%;left:65%;width:10%;height:15%;font-size:0}.dz-cookie__accept{left:8%;top:60%;width:25%;height:20%;border-radius:999px}.dz-cookie__settings{left:32%;top:61%;width:20%;height:20%}.dz-cookie__close:focus-visible,.dz-cookie__accept:focus-visible,.dz-cookie__settings:focus-visible{outline:2px solid #4d2028;outline-offset:3px}.dz-cookie.is-leaving{pointer-events:none;animation:dz-cookie-release 1.05s cubic-bezier(.2,.72,.15,1) forwards}@keyframes dz-cookie-release{18%{transform:rotate(-7deg) translate3d(-5px,-3px,0)}58%{transform:rotate(-24deg) rotateY(-42deg) translate3d(16vw,-24vh,0)}100%{opacity:0;transform:translate3d(76vw,-125vh,0) rotate(-38deg) rotateY(-88deg)}}@media(prefers-reduced-motion:reduce){.dz-cookie.is-leaving{animation:none;opacity:0}}@media(max-width:600px){.dz-cookie{right:-28px;bottom:6px;width:min(99vw,500px)}}';
    document.head.appendChild(bannerStyle);

    var banner = document.createElement('div');
    banner.className = 'dz-cookie';
    banner.id = 'dz-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Использование cookie');
    banner.innerHTML = '<img class="dz-cookie__image" src="' + new URL('../../img/cookie-tag-v2.png', script.src).href + '" alt="Мы используем cookie, чтобы сайт работал для вас точнее."><button class="dz-cookie__close" type="button" aria-label="Закрыть"></button><button class="dz-cookie__accept" type="button" aria-label="Принять cookie"></button><button class="dz-cookie__settings" type="button" aria-label="Настройки cookie"></button>';
    document.body.appendChild(banner);

    // New key deliberately shows the restored image banner once to visitors who
    // had dismissed its earlier iteration.
    var consentKey = 'dz_cookie_accepted_v3';
    if (localStorage.getItem(consentKey) === '1') {
      banner.setAttribute('hidden', '');
      return;
    }
    function hide() { banner.setAttribute('hidden', ''); }
    function dismiss(options) {
      if (options.remember) localStorage.setItem(consentKey, '1');
      banner.classList.add('is-leaving');
      var finish = function () { hide(); if (options.href) location.href = options.href; };
      banner.addEventListener('animationend', finish, { once: true });
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(finish, 0);
    }
    banner.querySelector('.dz-cookie__close').addEventListener('click', function () { dismiss({}); });
    banner.querySelector('.dz-cookie__settings').addEventListener('click', function () { dismiss({ href: new URL('../../legal/index.html#cookies', script.src).href }); });
    banner.querySelector('.dz-cookie__accept').addEventListener('click', function () { dismiss({ remember: true }); });
  }

  if (document.body) initCookieBanner();
  else document.addEventListener('DOMContentLoaded', initCookieBanner, { once: true });
  var siteRoot = new URL('../../', script.src);
  var paths = {
    home: new URL('index.html', siteRoot).href,
    catalog: new URL('collections/bestsellers/index.html', siteRoot).href,
    handbags: new URL('collections/handbags/index.html', siteRoot).href,
    mens: new URL('collections/mens-bags/index.html', siteRoot).href,
    wallets: new URL('collections/wallets/index.html', siteRoot).href,
    favorites: new URL('favorites/index.html', siteRoot).href,
    checkout: new URL('checkout/index.html', siteRoot).href,
    legal: new URL('legal/index.html', siteRoot).href
  };

  var colorDictionary = {
    Espresso: [
      ['espresso', 520], ['эспрессо', 520], ['эспресо', 480],
      ['темно коричнев', 390], ['темнокоричнев', 390], ['dark brown', 390], ['кофейн', 370], ['кофе', 350], ['коричнев', 280], ['brown', 280]
    ],
    Chocolate: [
      ['chocolate', 520], ['шоколад', 500], ['коричнев', 310], ['brown', 310], ['кофейн', 300]
    ],
    Taupe: [
      ['taupe', 520], ['тауп', 500], ['серо бежев', 400], ['серобежев', 400], ['grey beige', 400], ['gray beige', 400], ['бежев', 320], ['beige', 320], ['сер', 180], ['grey', 180], ['gray', 180]
    ],
    Black: [
      ['black', 520], ['черн', 500]
    ],
    Olive: [
      ['olive', 520], ['оливков', 500], ['хаки', 430], ['khaki', 430], ['зелен', 300], ['green', 300]
    ],
    Burgundy: [
      ['burgundy', 520], ['бургунди', 500], ['бордов', 500], ['винн', 420], ['wine', 420], ['темно красн', 360], ['dark red', 360], ['красн', 250], ['red', 250]
    ],
    Ivory: [
      ['ivory', 520], ['айвори', 500], ['слоновая кость', 480], ['молочн', 440], ['бел', 290], ['white', 290]
    ],
    Camel: [
      ['camel', 520], ['кэмел', 500], ['карамельн', 450], ['caramel', 450], ['светло коричнев', 400], ['светлокоричнев', 400], ['light brown', 400], ['рыж', 340], ['коричнев', 220], ['brown', 220], ['бежев', 210], ['beige', 210]
    ],
    Plum: [
      ['plum', 520], ['сливов', 500], ['фиолетов', 360], ['purple', 360]
    ],
    Navy: [
      ['navy', 520], ['нави', 500], ['темно син', 440], ['темносин', 440], ['dark blue', 440], ['син', 320], ['blue', 320]
    ]
  };

  var productRows = [
    { name: 'A4', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/a4/index.html', colors: ['Espresso', 'Taupe', 'Black', 'Olive', 'Burgundy'] },
    { name: 'Lova', aliases: 'oval овал', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/oval/index.html', colors: ['Chocolate', 'Taupe', 'Black', 'Olive', 'Burgundy', 'Plum', 'Ivory', 'Camel'] },
    { name: 'Halo', aliases: 'rondo круглая круг', category: 'bag', gender: 'women', material: 'экозамша замша натуральное дерево', path: 'products/rondo/index.html', colors: ['Chocolate', 'Taupe', 'Black', 'Olive', 'Burgundy'] },
    { name: 'Asya', aliases: 'vela ассиметрия асимметрия', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/vela/index.html', colors: ['Chocolate', 'Taupe', 'Black', 'Olive', 'Burgundy', 'Ivory'] },
    { name: 'Muna', aliases: 'half moon полумесяц', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/half-moon/index.html', colors: ['Chocolate', 'Taupe', 'Black', 'Olive', 'Burgundy', 'Ivory'] },
    { name: 'Vita', aliases: 'triangle треугольник trio', category: 'bag', gender: 'women', material: 'экозамша замша натуральное дерево', path: 'products/triangle/index.html', colors: ['Black', 'Olive', 'Burgundy'] },
    { name: 'Twist', aliases: 'weave плетенка плетёная', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/weave/index.html', colors: ['Chocolate', 'Black', 'Olive', 'Ivory'] },

    { name: 'Cyme Mini', qualifier: 'Кожа', category: 'bag', gender: 'men', material: 'натуральная кожа кожаный', path: 'products/mens/index.html?model=cyme-mini-leather', colors: ['Black'] },
    { name: 'Cyme Mini', qualifier: 'Нейлон', category: 'bag', gender: 'men', material: 'нейлон нейлоновый', path: 'products/mens/index.html?model=cyme-mini-nylon', colors: ['Black'] },
    { name: 'Cyme', qualifier: 'Кожа', category: 'bag', gender: 'men', material: 'натуральная кожа кожаный', path: 'products/mens/index.html?model=cyme-leather', colors: ['Black'] },
    { name: 'Numéro Neuf Mini', qualifier: 'Нейлон', category: 'bag', gender: 'men', material: 'нейлон нейлоновый', path: 'products/mens/index.html?model=numero-neuf-mini-nylon', colors: ['Black'] },

    { name: 'Aero', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/aero/index.html', colors: ['Black'] },
    { name: 'Atlas', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/atlas/index.html', colors: ['Black', 'Chocolate'] },
    { name: 'Milano', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/milano/index.html', colors: ['Chocolate', 'Black'] },
    { name: 'Monaco', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/monaco/index.html', colors: ['Black', 'Chocolate'] },
    { name: 'Mosaic', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/mosaic/index.html', colors: ['Black'] },
    { name: 'Passport', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/passport/index.html', colors: ['Chocolate', 'Black', 'Navy'] },
    { name: 'Porter', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/porter/index.html', colors: ['Black'] },
    { name: 'Siena', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/siena/index.html', colors: ['Black', 'Chocolate', 'Navy'] },
    { name: 'Tressé', category: 'wallet', material: 'натуральная кожа кожаный', path: 'products/tresse/index.html', colors: ['Black'] }
  ];

  var products = productRows.map(function (product, index) {
    var categoryWords = product.category === 'bag' ? 'сумка сумки' : 'кошелек кошельки портмоне';
    var genderWords = product.gender === 'women' ? 'женская женские' : product.gender === 'men' ? 'мужская мужские' : '';
    product.index = index;
    product.normalizedName = normalizeText(product.name);
    product.searchText = normalizeText([product.name, product.aliases || '', product.qualifier || '', categoryWords, genderWords, product.material].join(' '));
    return product;
  });

  function normalizeText(value) {
    return String(value || '')
      .toLocaleLowerCase('ru')
      .replace(/ё/g, 'е')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zа-я0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  var womensModelNames = {
    a4: 'A4',
    oval: 'Side',
    rondo: 'Halo',
    vela: 'Asya',
    'half-moon': 'Muna',
    triangle: 'Vita',
    weave: 'Twist'
  };

  var womensColorNames = {
    Black: 'Noir',
    Chocolate: 'espresso',
    Espresso: 'espresso',
    Taupe: 'Ash',
    Olive: 'Khaki',
    Burgundy: 'burgundy',
    Ivory: 'Ivory'
  };

  function displayColorName(color) {
    return womensColorNames[color] || color;
  }

  function productSlugFromUrl(value) {
    var match = String(value || '').match(/products\/([^/?#]+)\/index\.html/i);
    return match ? match[1].toLowerCase() : '';
  }

  function replaceTextValue(element, from, to) {
    if (!element || !from || !to) return;
    Array.prototype.forEach.call(element.childNodes, function (node) {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.indexOf(from) !== -1) {
        node.nodeValue = node.nodeValue.split(from).join(to);
      }
    });
  }

  function applyWomensProductPresentation() {
    var currentSlug = productSlugFromUrl(location.pathname);
    var currentName = womensModelNames[currentSlug];

    document.querySelectorAll('.component-product-card__link').forEach(function (link) {
      var slug = productSlugFromUrl(link.getAttribute('href'));
      var modelName = womensModelNames[slug];
      if (!modelName) return;

      var card = link.closest('.component-product-card');
      link.setAttribute('aria-label', 'Danzla ' + modelName);
      if (!card) return;
      var title = card.querySelector('.component-product-card__footer__details__label--title');
      if (title) title.textContent = 'Danzla ' + modelName;
      var edition = card.querySelector('.component-product-card__footer__details__label--edition');
      if (edition) edition.textContent = edition.textContent.replace(/Edition\s+(.+)/, function (_, color) {
        return 'Edition ' + displayColorName(color.trim());
      });
      card.querySelectorAll('img[alt]').forEach(function (image) {
        image.alt = image.alt.replace(/Danzla (A4|Oval|Rondo|Vela|Half Moon|Triangle|Weave)/g, 'Danzla ' + modelName);
      });
    });

    if (!currentName) return;
    var title = document.getElementById('product-title');
    if (title) title.textContent = currentName;
    document.querySelectorAll('.breadcrumbs').forEach(function (breadcrumb) {
      Object.keys(womensModelNames).forEach(function (slug) {
        var oldName = { a4: 'A4', oval: 'Oval', rondo: 'Rondo', vela: 'Vela', 'half-moon': 'Half Moon', triangle: 'Triangle', weave: 'Weave' }[slug];
        replaceTextValue(breadcrumb, oldName, womensModelNames[slug]);
      });
    });
    var oldName = { a4: 'A4', oval: 'Oval', rondo: 'Rondo', vela: 'Vela', 'half-moon': 'Half Moon', triangle: 'Triangle', weave: 'Weave' }[currentSlug];
    if (oldName) document.title = document.title.replace('Danzla ' + oldName, 'Danzla ' + currentName);
    var currentColor = document.getElementById('product-color');
    if (currentColor) currentColor.textContent = displayColorName(currentColor.textContent.trim());
    var currentEdition = document.getElementById('product-edition');
    if (currentEdition) currentEdition.textContent = currentEdition.textContent.replace(/Edition\s+(.+)/, function (_, color) {
      return 'Edition ' + displayColorName(color.trim());
    });
    document.querySelectorAll('.swatch[aria-label]').forEach(function (swatch) {
      var color = swatch.dataset.color;
      if (color) swatch.setAttribute('aria-label', 'Цвет ' + displayColorName(color));
    });
  }

  function injectStyles() {
    if (document.getElementById('dz-site-navigation-styles')) return;
    var style = document.createElement('style');
    style.id = 'dz-site-navigation-styles';
    style.textContent = '\
      .dz-nav-count,[data-favorites-count],[data-cart-count],.header-menu-wishlist__count,.header-menu-cart__count{display:none!important}\
      .dz-search[hidden],.dz-nav-drawer[hidden]{display:none!important}\
      .dz-search{position:fixed;top:var(--dz-search-top,52px);right:0;left:0;z-index:10000;color:#1e1e1e}\
      .dz-search__panel{box-sizing:border-box;width:100%;padding:0 clamp(16px,3vw,44px);border-top:1px solid rgba(255,255,255,.22);border-bottom:1px solid rgba(30,30,30,.1);background:var(--dz-search-bg,transparent);-webkit-backdrop-filter:var(--dz-search-blur,none);backdrop-filter:var(--dz-search-blur,none)}\
      .dz-search__line{display:grid;grid-template-columns:16px minmax(0,1fr) 30px;align-items:center;gap:12px;max-width:1440px;height:42px;margin:0 auto}\
      .dz-search__icon{width:18px;height:18px;color:currentColor}\
      .dz-search__input{box-sizing:border-box;width:100%;height:100%;padding:0;border:0;border-radius:0;background:transparent;color:inherit;font:400 13px/1 Manrope,Arial,sans-serif;letter-spacing:.04em;outline:none}\
      .dz-search__input::placeholder{color:rgba(30,30,30,.55)}\
      .dz-search__close{display:grid;place-items:center;width:30px;height:30px;padding:0;border:0;background:transparent;color:inherit;font:300 21px/1 Arial,sans-serif;cursor:pointer}\
      .dz-search__results{display:grid;max-width:1440px;max-height:200px;margin:0 auto;overflow-x:hidden;overflow-y:auto;border-top:1px solid rgba(30,30,30,.11);direction:rtl;scrollbar-width:thin;scrollbar-color:rgba(30,30,30,.34) transparent}\
      .dz-search__results:empty{display:none}\
      .dz-search__results::-webkit-scrollbar{width:4px}\
      .dz-search__results::-webkit-scrollbar-track{background:transparent}\
      .dz-search__results::-webkit-scrollbar-thumb{border-radius:4px;background:rgba(30,30,30,.34)}\
      .dz-search__results::-webkit-scrollbar-button{display:none;width:0;height:0}\
      .dz-search__result{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;height:50px;min-height:50px;padding-left:12px;border-bottom:1px solid rgba(30,30,30,.1);color:inherit;font:500 11px/1.3 Manrope,Arial,sans-serif;text-decoration:none;text-transform:uppercase;letter-spacing:.06em;direction:ltr}\
      .dz-search__result-copy{display:grid;gap:3px;min-width:0}\
      .dz-search__result-copy>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\
      .dz-search__result-copy>small{overflow:hidden;color:rgba(30,30,30,.6);font:400 9px/1.2 Manrope,Arial,sans-serif;letter-spacing:.04em;text-overflow:ellipsis;text-transform:none;white-space:nowrap}\
      .dz-search__result:after{content:"→";font-size:16px}\
      .dz-search__empty{margin:30px 0;color:#77706b;font:400 13px/1.6 Manrope,Arial,sans-serif}\
      body.dz-overlay-open{overflow:hidden}\
      .dz-nav-drawer{position:fixed;inset:0;z-index:10001;box-sizing:border-box;padding:0 16px max(20px,env(safe-area-inset-bottom));background:#f7f4ef;color:#1e1e1e;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain}\
      .dz-nav-drawer__head{display:grid;grid-template-columns:38px 1fr 38px;align-items:center;height:64px;border-bottom:1px solid rgba(30,30,30,.1)}\
      .dz-nav-drawer__close{display:grid;place-items:center;width:38px;height:38px;padding:0;border:0;background:transparent;color:inherit;font:300 24px/1 Arial,sans-serif}\
      .dz-nav-drawer__logo{justify-self:center;width:116px;line-height:0}.dz-nav-drawer__logo img{display:block;width:100%;height:auto}\
      .dz-nav-drawer__search{display:grid;grid-template-columns:18px 1fr;align-items:center;gap:18px;width:100%;min-height:72px;padding:0 14px;border:0;border-bottom:1px solid rgba(30,30,30,.13);background:transparent;color:#6f6964;text-align:left;font:400 10px/1 Manrope,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}\
      .dz-nav-drawer__search span{position:relative;width:15px;height:15px;border:.7px solid #1e1e1e;border-radius:50%}.dz-nav-drawer__search span:after{position:absolute;right:-5px;bottom:-3px;width:6px;border-top:.7px solid #1e1e1e;content:"";transform:rotate(45deg);transform-origin:left center}\
      .dz-nav-drawer__featured{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:24px 0 22px}\
      .dz-nav-drawer__featured a{position:relative;display:block;aspect-ratio:.76;overflow:hidden;background:#d8d1ca;color:#fff;text-decoration:none}.dz-nav-drawer__featured img{width:100%;height:100%;object-fit:cover}.dz-nav-drawer__featured a:first-child img{object-position:27% center}.dz-nav-drawer__featured a:last-child img{object-position:69% center}.dz-nav-drawer__featured span{position:absolute;right:12px;bottom:12px;left:12px;color:#fff;font:400 clamp(18px,5.7vw,26px)/1 Prata,Georgia,serif;text-shadow:0 1px 8px rgba(0,0,0,.25)}\
      .dz-nav-drawer__links{display:grid}\
      .dz-nav-drawer__links a{display:flex;align-items:center;justify-content:space-between;min-height:48px;border-bottom:1px solid rgba(30,30,30,.13);color:inherit;font:400 24px/1.1 Prata,Georgia,serif;text-decoration:none}\
      .dz-nav-drawer__links a:after{content:"";width:9px;height:7px;flex:0 0 auto;background:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 9 7%22 fill=%22none%22%3E%3Cpath d=%22M0 3.5h8.36M5.14.23 8.36 3.5 5.14 6.77%22 stroke=%22%231e1e1e%22 stroke-width=%22.5%22/%3E%3C/svg%3E") center/contain no-repeat}\
      .dz-nav-drawer__services{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;margin-top:40px}.dz-nav-drawer__services a{color:inherit;font:500 10px/1.3 Manrope,Arial,sans-serif;letter-spacing:.08em;text-decoration:none;text-transform:uppercase}.dz-nav-drawer__services a:nth-child(even){justify-self:end;text-align:right}\
      @media(max-width:767px){.dz-search__panel{padding:0 15px}.dz-search__line{height:44px;grid-template-columns:15px minmax(0,1fr) 28px;gap:10px}.dz-search__icon{width:15px;height:15px}.dz-search__input{font-size:11px}.dz-search__close{width:28px;height:28px;font-size:20px}.dz-search__results{max-height:176px}.dz-search__result{height:44px;min-height:44px;font-size:10px}}\
    ';
    document.head.appendChild(style);
  }

  function labelOf(element) {
    return normalizeText(((element.getAttribute('aria-label') || '') + ' ' + (element.textContent || '')).replace(/\s+/g, ' ').trim());
  }

  function kindOf(element) {
    var label = labelOf(element);
    if (element.matches('[data-ref="search-trigger"]') || /(^|\s)(поиск|search)(\s|$)/i.test(label)) return 'search';
    if (element.matches('[data-wishlist-header]') || /избранн|favorite/i.test(label)) return 'favorites';
    if (element.matches('[data-cart]') || /корзин|cart/i.test(label)) return 'checkout';
    return '';
  }

  function includesAny(query, terms) {
    return terms.some(function (term) { return query.includes(term); });
  }

  function readIntent(query) {
    var colors = [];
    Object.keys(colorDictionary).forEach(function (color) {
      var weight = 0;
      colorDictionary[color].forEach(function (entry) {
        if (query.includes(entry[0])) weight = Math.max(weight, entry[1]);
      });
      if (weight) colors.push({ name: color, weight: weight });
    });
    colors.sort(function (a, b) { return b.weight - a.weight; });

    var category = '';
    if (includesAny(query, ['кошел', 'портмоне', 'обложка для паспорта'])) category = 'wallet';
    else if (includesAny(query, ['сумк', 'bag'])) category = 'bag';

    var gender = '';
    if (includesAny(query, ['мужск', 'мужчин', 'men'])) gender = 'men';
    else if (includesAny(query, ['женск', 'женщин', 'women'])) gender = 'women';

    var material = '';
    if (includesAny(query, ['нейлон', 'nylon'])) material = 'nylon';
    else if (includesAny(query, ['экозамш', 'замш', 'suede'])) material = 'suede';
    else if (includesAny(query, ['кож', 'leather'])) material = 'leather';

    return { colors: colors, category: category, gender: gender, material: material };
  }

  function productHasMaterial(product, material) {
    if (!material) return true;
    if (material === 'nylon') return product.material.includes('нейлон');
    if (material === 'suede') return product.material.includes('замша');
    return product.material.includes('кожа');
  }

  function productUrl(product, color) {
    var url = new URL(product.path, siteRoot);
    if (color) url.searchParams.set('color', color);
    return url.href;
  }

  function resultLabel(product, color) {
    var type = product.category === 'wallet' ? 'Кошелёк' : product.gender === 'men' ? 'Мужская сумка' : 'Женская сумка';
    return ['Edition ' + displayColorName(color), product.qualifier || type].join(' · ');
  }

  function searchProducts(query) {
    var intent = readIntent(query);
    var hasStructuredIntent = Boolean(intent.colors.length || intent.category || intent.gender || intent.material);

    return products.map(function (product) {
      var score = 0;
      var nameMatch = false;
      if (query === product.normalizedName) {
        score += 1000;
        nameMatch = true;
      } else if (query.includes(product.normalizedName)) {
        score += 850;
        nameMatch = true;
      } else if (product.normalizedName.includes(query)) {
        score += 700;
        nameMatch = true;
      }

      if (intent.category) {
        if (product.category !== intent.category) return null;
        score += 130;
      }
      if (intent.gender) {
        if (product.category === 'bag' && product.gender !== intent.gender) return null;
        if (product.category === 'bag') score += 110;
      }
      if (intent.material) {
        if (!productHasMaterial(product, intent.material)) return null;
        score += 100;
      }

      var color = product.colors[0];
      if (intent.colors.length) {
        var colorMatch = intent.colors.find(function (candidate) { return product.colors.includes(candidate.name); });
        if (!colorMatch) return null;
        color = colorMatch.name;
        score += colorMatch.weight;
      }

      if (!nameMatch && !hasStructuredIntent) {
        if (!product.searchText.includes(query)) return null;
        score += 200;
      }
      return { product: product, color: color, score: score };
    }).filter(Boolean).sort(function (a, b) {
      return b.score - a.score || a.product.index - b.product.index;
    });
  }

  function renderResults(query) {
    var results = document.querySelector('.dz-search__results');
    var needle = normalizeText(query.trim());
    if (!needle) {
      results.innerHTML = '';
      return;
    }
    var matches = searchProducts(needle);
    results.innerHTML = matches.length ? matches.map(function (match) {
      var product = match.product;
      return '<a class="dz-search__result" href="' + productUrl(product, match.color) + '"><span class="dz-search__result-copy"><span>' + product.name + '</span><small>' + resultLabel(product, match.color) + '</small></span></a>';
    }).join('') : '<p class="dz-search__empty">Ничего не найдено</p>';
  }

  function ensureSearch() {
    var search = document.querySelector('.dz-search');
    if (search) return search;
    search = document.createElement('section');
    search.className = 'dz-search';
    search.hidden = true;
    search.setAttribute('role', 'dialog');
    search.setAttribute('aria-modal', 'true');
    search.setAttribute('aria-label', 'Поиск по каталогу');
    search.innerHTML = '<div class="dz-search__panel"><div class="dz-search__line"><svg class="dz-search__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="10.7" cy="10.7" r="6.7" stroke="currentColor" stroke-width="1.25"/><path d="m15.7 15.7 4.3 4.3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg><input class="dz-search__input" type="search" placeholder="Поиск по каталогу" aria-label="Поиск по каталогу"><button class="dz-search__close" type="button" aria-label="Закрыть поиск">×</button></div><div class="dz-search__results"></div></div>';
    document.body.appendChild(search);
    var input = search.querySelector('.dz-search__input');
    input.addEventListener('input', function () { renderResults(input.value); });
    search.querySelector('.dz-search__close').addEventListener('click', closeSearch);
    search.addEventListener('click', function (event) { if (event.target === search) closeSearch(); });
    renderResults('');
    return search;
  }

  function positionSearch(search) {
    var top = 0;
    var surface = null;
    document.querySelectorAll('[data-ref="site-header"],.site-header,.dz-catalog-header-wrap').forEach(function (header) {
      var rect = header.getBoundingClientRect();
      if (rect.height > 0 && rect.bottom > 0 && rect.top < 160 && rect.bottom >= top) {
        top = rect.bottom;
        surface = header;
      }
    });
    search.style.setProperty('--dz-search-top', Math.max(0, Math.round(top)) + 'px');
    if (surface) {
      var mobileSurface = surface.querySelector('.header__mobile-bar');
      if (mobileSurface && mobileSurface.getBoundingClientRect().height > 0) surface = mobileSurface;
      var surfaceStyle = window.getComputedStyle(surface);
      var blur = surfaceStyle.backdropFilter || surfaceStyle.webkitBackdropFilter || 'none';
      search.style.setProperty('--dz-search-bg', surfaceStyle.backgroundColor);
      search.style.setProperty('--dz-search-blur', blur);
    }
  }

  function openSearch(event) {
    if (event) { event.preventDefault(); event.stopImmediatePropagation(); }
    var search = ensureSearch();
    document.dispatchEvent(new CustomEvent('danzla:search-open'));
    positionSearch(search);
    search.hidden = false;
    window.requestAnimationFrame(function () { search.querySelector('.dz-search__input').focus(); });
  }

  function closeSearch() {
    var search = document.querySelector('.dz-search');
    if (search) search.hidden = true;
  }

  function ensureDrawer() {
    var drawer = document.querySelector('.dz-nav-drawer');
    if (drawer) return drawer;
    drawer = document.createElement('nav');
    drawer.className = 'dz-nav-drawer';
    drawer.hidden = true;
    drawer.setAttribute('aria-label', 'Навигация по каталогу');
    var womenImage = new URL('assets-materials/bestsellers-editorial/04-chocolate-group.png', siteRoot).href;
    var menImage = new URL('assets-materials/bestsellers-editorial/10-men-landscape.png', siteRoot).href;
    var logoImage = new URL('img/danzla-logo.webp', siteRoot).href;
    drawer.innerHTML = '<div class="dz-nav-drawer__head"><button class="dz-nav-drawer__close" type="button" aria-label="Закрыть меню">×</button><a class="dz-nav-drawer__logo" href="' + paths.home + '"><img src="' + logoImage + '" alt="DanZla"></a><span></span></div>' +
      '<button class="dz-nav-drawer__search" type="button"><span aria-hidden="true"></span>Поиск по каталогу</button>' +
      '<div class="dz-nav-drawer__featured"><a href="' + paths.handbags + '"><img src="' + womenImage + '" alt=""><span>Сумки</span></a><a href="' + paths.mens + '"><img src="' + menImage + '" alt=""><span>Мужская линия</span></a></div>' +
      '<div class="dz-nav-drawer__links"><a href="' + paths.catalog + '">Весь каталог</a><a href="' + paths.wallets + '">Кошельки</a></div>' +
      '<div class="dz-nav-drawer__services"><a href="' + paths.favorites + '">Избранное</a><a href="' + paths.checkout + '">Корзина</a><a href="' + paths.home + '#brand">О бренде</a><a href="' + paths.home + '#contacts">Контакты</a></div>';
    document.body.appendChild(drawer);
    drawer.querySelector('.dz-nav-drawer__close').addEventListener('click', closeDrawer);
    drawer.querySelector('.dz-nav-drawer__search').addEventListener('click', function (event) {
      closeDrawer();
      openSearch(event);
    });
    return drawer;
  }

  function openDrawer(event) {
    event.preventDefault();
    closeSearch();
    var drawer = ensureDrawer();
    drawer.hidden = false;
    document.body.classList.add('dz-overlay-open');
  }

  function closeDrawer() {
    var drawer = document.querySelector('.dz-nav-drawer');
    if (drawer) drawer.hidden = true;
    if (!document.querySelector('.dz-search:not([hidden])')) document.body.classList.remove('dz-overlay-open');
  }

  function normalizeCatalogLinks() {
    document.querySelectorAll('.dz-catalog-header__left a').forEach(function (link) {
      var label = labelOf(link);
      if (/^весь каталог$/.test(label)) link.href = paths.catalog;
      else if (/^сумки$/.test(label)) link.href = paths.handbags;
      else if (/мужские сумки/.test(label)) link.href = paths.mens;
      else if (/^кошельки$/.test(label)) link.href = paths.wallets;
      else if (/^меню(?:\s*\+)?$/.test(label)) {
        link.href = '#menu';
        link.addEventListener('click', openDrawer);
      }
    });
  }

  function normalizeHeader() {
    document.querySelectorAll('.site-header__logo,.header__logo,.header__mobile-logo,.dz-catalog-header__logo').forEach(function (link) { link.href = paths.home; });
    normalizeCatalogLinks();
    document.querySelectorAll('a').forEach(function (link) {
      if (labelOf(link) === 'сумки') link.href = paths.handbags;
    });
    var selectors = '.dz-header-right > a,.dz-header-right > button,.dz-catalog-header__right > a,.dz-catalog-header__right > button,.site-header__right > a,.site-header__right > button,.header__tools > a,.header__tools > button,.header__mobile-search button,.dz-mobile-nav__services > a';
    document.querySelectorAll(selectors).forEach(function (element) {
      var kind = kindOf(element);
      if (!kind) return;
      element.dataset.navAction = kind;
      if (kind === 'search') {
        if (element.tagName === 'A') element.href = '#search';
        element.setAttribute('aria-label', 'Поиск');
        element.addEventListener('click', openSearch, true);
        return;
      }
      var href = paths[kind];
      if (element.tagName === 'A') element.href = href;
      else element.addEventListener('click', function (event) { event.preventDefault(); location.href = href; }, true);
      element.querySelectorAll('[data-favorites-count],[data-cart-count],.dz-nav-count').forEach(function (node) { node.remove(); });
    });
  }

  function prepareFooterConsent() {
    document.querySelectorAll('.footer__form').forEach(function (form) {
      var emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        var syncEmailState = function () { form.classList.toggle('footer__has-email', Boolean(emailInput.value)); };
        emailInput.addEventListener('input', syncEmailState);
        emailInput.addEventListener('change', syncEmailState);
        syncEmailState();
      }
      if (form.querySelector('[name="marketingConsent"]')) return;
      var consents = document.createElement('div');
      consents.className = 'footer__consents';
      consents.innerHTML = '<label class="footer__consent"><input type="checkbox" name="newsletterDataConsent" required><span>Даю <a href="' + paths.legal + '#newsletter-data-consent">согласие на обработку e-mail</a> для оформления подписки</span></label>' +
        '<label class="footer__consent"><input type="checkbox" name="marketingConsent" required><span>Согласен получать <a href="' + paths.legal + '#marketing">рекламные и информационные сообщения DanZla</a></span></label>';
      form.appendChild(consents);
      form.addEventListener('submit', function (event) {
        var checkbox = form.querySelector('[name="newsletterDataConsent"]:not(:checked),[name="marketingConsent"]:not(:checked)');
        if (!checkbox) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        checkbox.reportValidity();
      }, true);
    });

    if (!document.getElementById('dz-footer-consent-styles')) {
      var style = document.createElement('style');
      style.id = 'dz-footer-consent-styles';
      style.textContent = '.footer__label .input__label{transition:opacity .16s ease}.footer__label:focus-within .input__label,.footer__form.footer__has-email .footer__label .input__label{opacity:0;visibility:hidden}.footer__consents{display:grid;gap:8px;width:min(100%,360px);margin-top:9px}.footer__consent{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:start;color:rgba(255,255,255,.82);font:400 9px/1.45 var(--danzla-sans,Arial,sans-serif);text-transform:none}.footer__consent input{width:14px;height:14px;margin:0;accent-color:#fff}.footer__consent a{color:inherit;text-decoration:underline;text-underline-offset:2px}@media(max-width:767px){.footer__consents{max-width:285px}.footer__consent{font-size:8px}.footer__consent input{width:13px;height:13px}}';
      document.head.appendChild(style);
    }
  }

  function applyTypographyScale() {
    document.querySelectorAll('.footer__title').forEach(function (title) { title.remove(); });
    if (document.getElementById('dz-typography-scale')) return;
    var style = document.createElement('style');
    style.id = 'dz-typography-scale';
    style.textContent =
      '.header__nav__panel .ts-primary-item,.dz-header-right a,.dz-catalog-header a,.site-header nav a{font-size:13px!important}' +
      '.footer__nav a{font-size:15px!important;line-height:1.25!important}' +
      '.footer__bottom a,.footer__bottom button,.footer__bottom p{font-size:15px!important;line-height:1.25!important}' +
      '.footer__label .input__label,.footer__submit{font-size:19px!important;line-height:1.2!important}' +
      '.footer__label input{font-size:16px!important}' +
      '.footer__label .input__error{font-size:12px!important;line-height:1.35!important}' +
      '.footer__consent{font-size:13.5px!important;line-height:1.45!important}.footer__consent input{width:18px!important;height:18px!important}' +
      '.footer{background:#f2ece0!important;color:#291c17!important;-webkit-mask-image:none!important;mask-image:none!important;padding:32px 0 24px!important}.footer:before,.footer__bg{display:none!important}.footer__top{gap:20px!important;margin-bottom:28px!important}.footer__mid{margin-bottom:24px!important}.footer__logo{margin-bottom:22px!important;position:relative;top:clamp(36px,4vw,64px)}.footer__nav a,.footer__bottom a,.footer__bottom button,.footer__bottom p,.footer__label,.footer__label .input__label,.footer__label input,.footer__submit,.footer__label .input__error,.footer__consent{color:#291c17!important}.footer__label input{border-bottom-color:rgba(41,28,23,.38)!important}.footer__consent input{accent-color:#56382d!important}.footer__img{width:min(240px,17vw)!important;bottom:-28px!important}' +
      '@media(min-width:768px){.footer__mid{grid-template-columns:minmax(0,1fr) minmax(280px,34vw)!important}}' +
      '@media(max-width:767px){.header__nav__panel .ts-primary-item,.dz-header-right a,.dz-catalog-header a,.site-header nav a{font-size:13px!important}.footer__nav a{font-size:15px!important}.footer__bottom a,.footer__bottom button,.footer__bottom p{font-size:14px!important}.footer__label .input__label,.footer__submit{font-size:18px!important}.footer__label input{font-size:15px!important}.footer__consent{font-size:12px!important}.footer__consent input{width:16px!important;height:16px!important}}';
    document.head.appendChild(style);
  }

  function applyWomensCatalogNames() {
    if (!/\/collections\/(?:handbags|bestsellers)\//.test(location.pathname)) return;
    var colors = { Black: 'Noir', Chocolate: 'espresso', Espresso: 'espresso', Taupe: 'Ash', Burgundy: 'burgundy', Olive: 'Khaki', Ivory: 'Ivory' };
    var technicalColors = { Black: 'черный', Chocolate: 'коричневый', Espresso: 'коричневый', Taupe: 'серый', Burgundy: 'бордо', Olive: 'хаки', Ivory: 'белый', Plum: 'сливовый', Camel: 'кэмел' };
    var lunaImages = new Set(['08.png', '09.png', '27.png', '43.png', '44.png', '45.png']);
    var sideImages = new Set(['04.png', '05.png', '14.png', '25.png', '39.png', '40.png', '48.png']);
    document.querySelectorAll('component-product-card').forEach(function (card) {
      var link = card.querySelector('.component-product-card__link');
      if (!link) return;
      var image = card.querySelector('.component-product-card__media-container__packshot--default img');
      var imageName = image ? (image.getAttribute('src') || '').split('/').pop() : '';
      var match = link.getAttribute('href').match(/products\/([^/]+)\/index\.html\?color=([^&]+)/);
      if (!match) return;
      var slug = match[1];
      var color = decodeURIComponent(match[2]);
      var name = { a4: 'A4', vela: 'Asya', rondo: 'Halo', triangle: 'Vita', weave: 'Twist' }[slug];
      var technicalName = { a4: 'a4', vela: 'ассиметрия', rondo: 'круглая', triangle: 'треугольник', weave: 'плетенка' }[slug];
      if (slug === 'oval') {
        name = sideImages.has(imageName) ? 'Side' : 'Lova';
        technicalName = name === 'Side' ? 'боковая' : 'овал';
        if (name === 'Lova') link.setAttribute('href', '../../products/lova/index.html?color=' + encodeURIComponent(color) + '&image=' + encodeURIComponent(imageName));
      }
      if (slug === 'half-moon') {
        name = lunaImages.has(imageName) ? 'Luna' : 'Muna';
        technicalName = name === 'Luna' ? 'луна' : 'полумесяц';
        if (name === 'Luna') link.setAttribute('href', '../../products/luna/index.html?color=' + encodeURIComponent(color) + '&image=' + encodeURIComponent(imageName));
      }
      if (!name) return;
      link.setAttribute('aria-label', 'Danzla ' + name);
      var title = card.querySelector('.component-product-card__footer__details__label--title');
      var edition = card.querySelector('.component-product-card__footer__details__label--edition');
      if (title) title.textContent = 'Danzla ' + name;
      if (edition) edition.textContent = 'Edition ' + (colors[color] || color);
      if (image) image.alt = 'Danzla ' + name + ', ' + (colors[color] || color);
      var hovered = card.querySelector('.component-product-card__media-container__packshot--hovered img');
      if (hovered) hovered.alt = 'Danzla ' + name + ', ' + (colors[color] || color);
      card.dataset.dzTechnicalModel = technicalName || slug;
      card.dataset.dzTechnicalColor = technicalColors[color] || color;
      card.dataset.dzDisplayModel = name;
      card.dataset.dzDisplayColor = colors[color] || color;
    });
  }

  function applyWomensCollectionMenuNames() {
    var names = {
      'danzla-01.png': 'A4',
      'danzla-02.png': 'Luna',
      'danzla-03.png': 'Asya',
      'danzla-04.png': 'Lova',
      'danzla-05.png': 'Vita',
      'danzla-06.png': 'Side',
      'danzla-07.png': 'Muna',
      'danzla-08.png': 'Twist',
      'danzla-09.png': 'Halo'
    };
    if (/\/collections\/(?:handbags|bestsellers)\//.test(location.pathname)) document.querySelectorAll('.collection-menu__list--link').forEach(function (link) {
      var image = link.querySelector('img');
      if (!image) return;
      var name = names[(image.getAttribute('src') || '').split('/').pop()];
      if (!name) return;
      image.alt = 'DanZla ' + name;
      var label = link.querySelector('span');
      if (label) label.textContent = name;
      var slide = link.closest('.component-carousel__slide');
      if (slide) slide.setAttribute('aria-label', 'DanZla ' + name);
    });
    var oldNames = { Boky: 'A4', Cyme: 'Luna', 'Numéro Neuf': 'Asya', Mokki: 'Lova', 'Numéro Dix': 'Vita', 'Numéro Un': 'Side', Shuldo: 'Muna', Tonca: 'Twist', 'Béri': 'Halo' };
    document.querySelectorAll('.header__menu-panel__link[data-sm-category="true"], [data-menu-collection="true"] .ts-font-primary').forEach(function (element) {
      var oldName = element.textContent.trim();
      if (oldNames[oldName]) element.textContent = oldNames[oldName];
      if (oldName === 'Nodde' || oldName === 'Neyu') {
        var item = element.closest('li');
        if (item) item.remove();
      }
    });
  }

  function prepareProductLegalDetails() {
    if (!/^\/products\//.test(location.pathname)) return;
    var details = document.querySelector('.product-info .details');
    if (!details || details.querySelector('[data-seller-warranty]')) return;
    var block = document.createElement('details');
    block.dataset.sellerWarranty = '';
    block.innerHTML = '<summary>Продавец и гарантия</summary><div class="details__body"><ul>' +
      '<li>Продавец: ИП Новиков Роман Анатольевич</li>' +
      '<li>ИНН 760504500962 · ОГРНИП 323762700033782</li>' +
      '<li>Гарантийный срок: 12 месяцев</li>' +
      '<li>Продажа и доставка: территория Российской Федерации</li>' +
      '</ul><p><a href="' + paths.legal + '#requisites">Реквизиты, условия продажи и возврата</a></p></div>';
    details.appendChild(block);
  }

  function loadBagCategorySelector() {
    if (window.__dzBagsMenuInitialized || document.getElementById('dz-bags-menu-script')) return;
    var categoryScript = document.createElement('script');
    categoryScript.id = 'dz-bags-menu-script';
    categoryScript.defer = true;
    categoryScript.src = new URL('assets-materials/dz-bags-menu.js?v=7', siteRoot).href;
    document.head.appendChild(categoryScript);
  }

  function init() {
    var searchFrame = 0;
    var searchFollowUntil = 0;
    function followSearch() {
      var search = document.querySelector('.dz-search:not([hidden])');
      if (search) positionSearch(search);
      if (search && performance.now() < searchFollowUntil) searchFrame = window.requestAnimationFrame(followSearch);
      else searchFrame = 0;
    }
    injectStyles();
    normalizeHeader();
    loadBagCategorySelector();
    prepareFooterConsent();
    applyTypographyScale();
    prepareProductLegalDetails();
    applyWomensProductPresentation();
    applyWomensCatalogNames();
    applyWomensCollectionMenuNames();
    document.addEventListener('danzla:category-menu-open', closeSearch);
    window.addEventListener('resize', function () {
      var search = document.querySelector('.dz-search:not([hidden])');
      if (search) positionSearch(search);
    });
    window.addEventListener('scroll', function () {
      var search = document.querySelector('.dz-search:not([hidden])');
      if (!search) return;
      searchFollowUntil = performance.now() + 500;
      if (!searchFrame) searchFrame = window.requestAnimationFrame(followSearch);
    }, { passive: true });
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      closeSearch();
      closeDrawer();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
  window.addEventListener('load', applyWomensProductPresentation, { once: true });
})();
