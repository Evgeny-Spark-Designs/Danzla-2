(() => {
  const script = document.currentScript;
  const siteRoot = new URL('../', script.src);
  const links = {
    women: new URL('collections/handbags/index.html', siteRoot).href,
    men: new URL('collections/mens-bags/index.html', siteRoot).href,
  };

  const style = document.createElement('style');
  style.textContent = `
    .dz-bags-original-panel { display: none !important; }
    .dz-bags-menu[hidden] { display: none !important; }
    .dz-bags-menu { position: absolute; z-index: 10000; top: 100%; left: 0; box-sizing: border-box; width: 100%; padding: 0 max(22px, calc((100vw - 1440px) / 2 + 22px)); background: inherit; backdrop-filter: inherit; color: inherit; border-bottom: 1px solid color-mix(in srgb, currentColor 20%, transparent); }
    .dz-bags-menu__link { display: block; padding: 15px 0; color: inherit; border-top: 1px solid color-mix(in srgb, currentColor 20%, transparent); font: 500 14px/1.2 Arial, sans-serif; letter-spacing: .02em; text-align: left; text-decoration: none; }
    .dz-bags-menu__link:hover, .dz-bags-menu__link:focus-visible { text-decoration: underline; text-underline-offset: 4px; }
    @media (max-width: 700px) { .dz-bags-menu { padding: 0 16px; } }
  `;
  document.head.append(style);

  const menu = document.createElement('div');
  menu.className = 'dz-bags-menu';
  menu.hidden = true;
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'Выбор категории сумок');
  menu.innerHTML = `
    <a class="dz-bags-menu__link" href="${links.women}">Женские сумки</a>
    <a class="dz-bags-menu__link" href="${links.men}">Мужские сумки</a>`;
  const menuHost = document.querySelector('header') || document.body;
  menuHost.append(menu);

  let activeTrigger = null;
  const close = () => {
    menu.hidden = true;
    activeTrigger?.setAttribute('aria-expanded', 'false');
    activeTrigger = null;
  };
  const open = (trigger) => {
    activeTrigger = trigger;
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  };

  const isBagsTrigger = (element) => {
    const label = element.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    return label === 'сумки' || label === 'bags';
  };

  document.querySelectorAll('a, button, [data-ref="menu-trigger"]').forEach((trigger) => {
    if (!isBagsTrigger(trigger)) return;
    trigger.dataset.dzBagsTrigger = 'true';
    const panelId = trigger.getAttribute('aria-controls');
    if (panelId) document.getElementById(panelId)?.classList.add('dz-bags-original-panel');
    trigger.removeAttribute('href');
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest?.('[data-dz-bags-trigger="true"]');
    if (trigger) {
      event.preventDefault();
      event.stopImmediatePropagation();
      menu.hidden || activeTrigger !== trigger ? open(trigger) : close();
      return;
    }
    if (!menu.hidden && !menu.contains(event.target)) close();
  }, true);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    const trigger = event.target.closest?.('[data-dz-bags-trigger="true"]');
    if (trigger && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      menu.hidden || activeTrigger !== trigger ? open(trigger) : close();
    }
  }, true);
})();
