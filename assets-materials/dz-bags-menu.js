(() => {
  const script = document.currentScript;
  const siteRoot = new URL('../', script.src);
  const links = {
    women: new URL('collections/handbags/index.html', siteRoot).href,
    men: new URL('collections/mens-bags/index.html', siteRoot).href,
    womenWallets: new URL('collections/small-leather-goods/', siteRoot).href,
    menWallets: new URL('collections/wallets/', siteRoot).href,
  };

  const style = document.createElement('style');
  style.textContent = `
    .dz-category-original-panel { display: none !important; }
    .dz-category-menu[hidden] { display: none !important; }
    .dz-category-menu { position: absolute; z-index: 10000; top: 100%; left: 0; box-sizing: border-box; width: 100%; padding: 0 max(22px, calc((100vw - 1440px) / 2 + 22px)); background: inherit; backdrop-filter: inherit; color: inherit; border-bottom: 1px solid color-mix(in srgb, currentColor 20%, transparent); }
    .dz-category-menu__link { display: block; padding: 15px 0; color: inherit; border-top: 1px solid color-mix(in srgb, currentColor 20%, transparent); font: 500 14px/1.2 Arial, sans-serif; letter-spacing: .02em; text-align: left; text-decoration: none; }
    .dz-category-menu__link:hover, .dz-category-menu__link:focus-visible { text-decoration: underline; text-underline-offset: 4px; }
    @media (max-width: 700px) { .dz-category-menu { padding: 0 16px; } }
  `;
  document.head.append(style);

  const menuHost = document.querySelector('header') || document.body;
  const createMenu = (label, entries) => {
    const menu = document.createElement('div');
    menu.className = 'dz-category-menu';
    menu.hidden = true;
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-label', label);
    menu.innerHTML = entries.map(([text, href]) => `<a class="dz-category-menu__link" href="${href}">${text}</a>`).join('');
    menuHost.append(menu);
    return menu;
  };
  const menus = {
    bags: createMenu('Выбор категории сумок', [['Женские сумки', links.women], ['Мужские сумки', links.men]]),
    wallets: createMenu('Выбор категории кошельков', [['Женские кошельки', links.womenWallets], ['Мужские кошельки', links.menWallets]]),
  };

  let activeTrigger = null;
  const close = () => {
    Object.values(menus).forEach((menu) => { menu.hidden = true; });
    activeTrigger?.setAttribute('aria-expanded', 'false');
    activeTrigger = null;
  };
  const open = (trigger, menu) => {
    close();
    activeTrigger = trigger;
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  };

  const menuKeyForTrigger = (element) => {
    const label = element.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    if (label === 'сумки' || label === 'bags') return 'bags';
    if (label === 'кошельки' || label === 'wallets') return 'wallets';
    return null;
  };

  document.querySelectorAll('a, button, [data-ref="menu-trigger"]').forEach((trigger) => {
    const menuKey = menuKeyForTrigger(trigger);
    if (!menuKey) return;
    trigger.dataset.dzCategoryTrigger = menuKey;
    const panelId = trigger.getAttribute('aria-controls');
    if (panelId) document.getElementById(panelId)?.classList.add('dz-category-original-panel');
    trigger.removeAttribute('href');
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest?.('[data-dz-category-trigger]');
    if (trigger) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const menu = menus[trigger.dataset.dzCategoryTrigger];
      menu.hidden || activeTrigger !== trigger ? open(trigger, menu) : close();
      return;
    }
    if (![...Object.values(menus)].some((menu) => menu.contains(event.target))) close();
  }, true);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    const trigger = event.target.closest?.('[data-dz-category-trigger]');
    if (trigger && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      const menu = menus[trigger.dataset.dzCategoryTrigger];
      menu.hidden || activeTrigger !== trigger ? open(trigger, menu) : close();
    }
  }, true);
})();
