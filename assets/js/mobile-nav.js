(function () {
  function init() {
    if (!window.matchMedia('(max-width: 1023px)').matches) return;
    var bar = document.querySelector('.header__mobile-bar');
    var burger = document.querySelector('[data-ref="burger-toggle"]');
    if (!bar || !burger || document.querySelector('.dz-mobile-nav')) return;

    var nav = document.createElement('nav');
    nav.className = 'dz-mobile-nav';
    nav.id = 'dz-mobile-nav';
    nav.setAttribute('aria-label', 'Мобильная навигация');
    nav.setAttribute('aria-hidden', 'true');
    nav.innerHTML = '<button class="dz-mobile-nav__search" type="button"><span aria-hidden="true"></span><b>Поиск по каталогу</b></button>' +
      '<div class="dz-mobile-nav__featured" aria-label="Основные категории">' +
        '<a href="collections/handbags/index.html"><img src="assets-materials/bestsellers-editorial/04-chocolate-group.png" alt="" loading="eager"><span>Сумки</span></a>' +
        '<a href="collections/mens-bags/index.html"><img src="assets-materials/bestsellers-editorial/10-men-landscape.png" alt="" loading="eager"><span>Мужская линия</span></a>' +
      '</div>' +
      '<div class="dz-mobile-nav__main">' +
        '<a href="collections/bestsellers/index.html">Весь каталог</a>' +
        '<a href="collections/wallets/index.html">Кошельки</a>' +
      '</div>' +
      '<div class="dz-mobile-nav__services">' +
        '<a href="favorites/index.html">Избранное</a>' +
        '<a href="checkout/index.html">Корзина</a>' +
        '<a href="#brand">О бренде</a>' +
        '<a href="#contacts">Контакты</a>' +
      '</div>';
    // The theme animates and occasionally clips the header while scrolling.
    // Keeping the full-screen drawer directly under body makes its geometry
    // independent from the header state (especially in mobile Safari).
    document.body.appendChild(nav);
    burger.setAttribute('aria-controls', nav.id);

    function setOpen(open) {
      if (open) {
        var activeSearch = document.querySelector('.dz-search:not([hidden])');
        if (activeSearch) activeSearch.hidden = true;
      }
      nav.classList.toggle('is-open', open);
      nav.setAttribute('aria-hidden', String(!open));
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      document.body.classList.toggle('dz-mobile-menu-open', open);
    }

    burger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setOpen(!nav.classList.contains('is-open'));
    }, true);
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
    nav.querySelector('.dz-mobile-nav__search').addEventListener('click', function () {
      setOpen(false);
      var search = document.querySelector('[data-nav-action="search"], .header__mobile-search button, .header__mobile-search a');
      if (search) window.setTimeout(function () { search.click(); }, 0);
    });
    document.addEventListener('danzla:search-open', function () { setOpen(false); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        burger.focus();
      }
    });
    window.setTimeout(function () {
      if (!nav.classList.contains('is-open')) burger.setAttribute('aria-label', 'Открыть меню');
    }, 0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
