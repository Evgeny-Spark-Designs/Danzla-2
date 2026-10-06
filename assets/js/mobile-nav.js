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
    nav.innerHTML = '<p class="dz-mobile-nav__eyebrow">Коллекции DanZla</p>' +
      '<div class="dz-mobile-nav__main">' +
        '<a href="collections/bestsellers/index.html">Весь каталог</a>' +
        '<a href="collections/handbags/index.html">Сумки</a>' +
        '<a href="collections/mens-bags/index.html">Мужская линия</a>' +
        '<a href="collections/wallets/index.html">Кошельки</a>' +
      '</div>' +
      '<div class="dz-mobile-nav__services">' +
        '<a href="favorites/index.html">Избранное</a>' +
        '<a href="checkout/index.html">Корзина</a>' +
        '<a href="#brand">О бренде</a>' +
        '<a href="#contacts">Контакты</a>' +
      '</div>';
    bar.insertAdjacentElement('afterend', nav);
    burger.setAttribute('aria-controls', nav.id);

    function setOpen(open) {
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
