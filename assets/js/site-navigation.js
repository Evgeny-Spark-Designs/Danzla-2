(function () {
  var script = document.currentScript;
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
    { name: 'Oval', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/oval/index.html', colors: ['Chocolate', 'Taupe', 'Black', 'Olive', 'Burgundy', 'Plum', 'Ivory', 'Camel'] },
    { name: 'Rondo', category: 'bag', gender: 'women', material: 'экозамша замша натуральное дерево', path: 'products/rondo/index.html', colors: ['Chocolate', 'Taupe', 'Black', 'Olive', 'Burgundy'] },
    { name: 'Vela', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/vela/index.html', colors: ['Chocolate', 'Taupe', 'Black', 'Olive', 'Burgundy', 'Ivory'] },
    { name: 'Half Moon', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/half-moon/index.html', colors: ['Chocolate', 'Taupe', 'Black', 'Olive', 'Burgundy', 'Ivory'] },
    { name: 'Triangle', category: 'bag', gender: 'women', material: 'экозамша замша натуральное дерево', path: 'products/triangle/index.html', colors: ['Black', 'Olive', 'Burgundy'] },
    { name: 'Weave', category: 'bag', gender: 'women', material: 'экозамша замша', path: 'products/weave/index.html', colors: ['Chocolate', 'Black', 'Olive', 'Ivory'] },

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
    product.searchText = normalizeText([product.name, product.qualifier || '', categoryWords, genderWords, product.material].join(' '));
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
      .dz-nav-drawer{position:fixed;inset:0;z-index:9999;padding:84px 18px 24px;background:#f7f4ef;color:#1e1e1e;overflow:auto}\
      .dz-nav-drawer__close{position:absolute;top:20px;right:18px;width:42px;height:42px;border:1px solid rgba(30,30,30,.18);border-radius:50%;background:transparent;font-size:22px}\
      .dz-nav-drawer__links{display:grid;border-top:1px solid rgba(30,30,30,.14)}\
      .dz-nav-drawer__links a{display:flex;align-items:center;justify-content:space-between;min-height:58px;border-bottom:1px solid rgba(30,30,30,.14);color:inherit;font:400 24px/1.1 Prata,Georgia,serif;text-decoration:none}\
      .dz-nav-drawer__links a:after{content:"";width:9px;height:7px;flex:0 0 auto;background:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 9 7%22 fill=%22none%22%3E%3Cpath d=%22M0 3.5h8.36M5.14.23 8.36 3.5 5.14 6.77%22 stroke=%22%231e1e1e%22 stroke-width=%22.5%22/%3E%3C/svg%3E") center/contain no-repeat}\
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
    return ['Edition ' + color, product.qualifier || type].join(' · ');
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
    drawer.innerHTML = '<button class="dz-nav-drawer__close" type="button" aria-label="Закрыть меню">×</button><div class="dz-nav-drawer__links"><a href="' + paths.catalog + '">Весь каталог</a><a href="' + paths.handbags + '">Сумки</a><a href="' + paths.mens + '">Мужская линия</a><a href="' + paths.wallets + '">Кошельки</a><a href="' + paths.favorites + '">Избранное</a><a href="' + paths.checkout + '">Корзина</a></div>';
    document.body.appendChild(drawer);
    drawer.querySelector('.dz-nav-drawer__close').addEventListener('click', closeDrawer);
    return drawer;
  }

  function openDrawer(event) {
    event.preventDefault();
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
      else if (/^меню\s*\+$/.test(label)) {
        link.href = '#menu';
        link.addEventListener('click', openDrawer);
      }
    });
  }

  function normalizeHeader() {
    document.querySelectorAll('.site-header__logo,.header__logo,.header__mobile-logo,.dz-catalog-header__logo').forEach(function (link) { link.href = paths.home; });
    normalizeCatalogLinks();
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
      style.textContent = '.footer__consents{display:grid;gap:6px;width:min(100%,360px);margin-top:8px}.footer__consent{display:grid;grid-template-columns:auto 1fr;gap:7px;align-items:start;color:rgba(255,255,255,.78);font:400 8px/1.45 var(--danzla-sans,Arial,sans-serif);text-transform:none}.footer__consent input{width:12px;height:12px;margin:0;accent-color:#fff}.footer__consent a{color:inherit;text-decoration:underline;text-underline-offset:2px}@media(max-width:767px){.footer__consents{max-width:285px}.footer__consent{font-size:7px}}';
      document.head.appendChild(style);
    }
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
    prepareFooterConsent();
    prepareProductLegalDetails();
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
})();
