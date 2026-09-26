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
    .dz-bags-menu { position: fixed; z-index: 10000; width: min(292px, calc(100vw - 32px)); padding: 18px; background: #fff; color: #1a1a1a; border: 1px solid rgba(0,0,0,.12); box-shadow: 0 14px 36px rgba(0,0,0,.16); }
    .dz-bags-menu__title { margin: 0 0 14px; font: 600 11px/1.2 Arial, sans-serif; letter-spacing: .11em; }
    .dz-bags-menu__link { display: block; padding: 13px 0; color: inherit; border-top: 1px solid rgba(0,0,0,.12); font: 500 14px/1.2 Arial, sans-serif; letter-spacing: .02em; text-decoration: none; }
    .dz-bags-menu__link:hover, .dz-bags-menu__link:focus-visible { text-decoration: underline; text-underline-offset: 4px; }
    @media (max-width: 700px) { .dz-bags-menu { top: 74px !important; left: 16px !important; right: 16px; width: auto; } }
  `;
  document.head.append(style);

  const menu = document.createElement('div');
  menu.className = 'dz-bags-menu';
  menu.hidden = true;
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'Выбор категории сумок');
  menu.innerHTML = `
    <p class="dz-bags-menu__title">СУМКИ</p>
    <a class="dz-bags-menu__link" href="${links.women}">Женские сумки</a>
    <a class="dz-bags-menu__link" href="${links.men}">Мужские сумки</a>`;
  document.body.append(menu);

  let activeTrigger = null;
  const close = () => {
    menu.hidden = true;
    activeTrigger?.setAttribute('aria-expanded', 'false');
    activeTrigger = null;
  };
  const open = (trigger) => {
    activeTrigger = trigger;
    const rect = trigger.getBoundingClientRect();
    menu.style.top = `${Math.min(rect.bottom + 10, window.innerHeight - 160)}px`;
    menu.style.left = `${Math.min(Math.max(16, rect.left), window.innerWidth - 308)}px`;
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  };

  const isBagsTrigger = (element) => {
    const label = element.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    return label === 'сумки' || label === 'bags';
  };

  document.querySelectorAll('a, button, [data-ref="menu-trigger"]').forEach((trigger) => {
    if (!isBagsTrigger(trigger)) return;
    const panelId = trigger.getAttribute('aria-controls');
    if (panelId) document.getElementById(panelId)?.classList.add('dz-bags-original-panel');
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      menu.hidden || activeTrigger !== trigger ? open(trigger) : close();
    }, true);
  });

  document.addEventListener('click', (event) => {
    if (!menu.hidden && !menu.contains(event.target) && event.target !== activeTrigger) close();
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
})();
