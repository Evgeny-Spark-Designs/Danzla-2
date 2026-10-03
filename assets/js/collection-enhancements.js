(function () {
  const STYLE_ID = 'danzla-catalog-card-enhancements';
  const HEART_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/></svg>';

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      component-product-card:has(.component-product-card__link[href]) {
        position: relative;
        cursor: pointer;
      }
      component-product-card .component-product-card__link[href] {
        position: absolute !important;
        inset: 0 !important;
        z-index: 2 !important;
        display: block !important;
        width: auto !important;
        height: auto !important;
        border-radius: inherit;
      }
      component-product-card .component-product-card__link[href]:focus-visible {
        outline: 2px solid #1e1e1e;
        outline-offset: -3px;
      }
      .dz-product-card-shell {
        position: relative;
        display: block;
        min-width: 0;
      }
      .dz-product-card-shell > .product-card { height: 100%; }
      .dz-card-favorite {
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 4;
        display: grid;
        place-items: center;
        width: 38px;
        height: 38px;
        margin: 0;
        padding: 0;
        border: 1px solid rgba(30, 30, 30, .14);
        border-radius: 50%;
        background: rgba(255, 252, 247, .92);
        color: #1e1e1e;
        line-height: 0;
        box-shadow: 0 4px 16px rgba(30, 30, 30, .08);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        cursor: pointer;
        transition: transform .18s ease, background-color .18s ease, color .18s ease;
      }
      .dz-card-favorite:hover { transform: scale(1.06); }
      .dz-card-favorite:active { transform: scale(.94); }
      .dz-card-favorite:focus-visible {
        outline: 2px solid #1e1e1e;
        outline-offset: 3px;
      }
      .dz-card-favorite svg {
        display: block;
        width: 18px;
        height: 18px;
        overflow: visible;
        fill: transparent;
        stroke: currentColor;
        stroke-width: 1.65;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: fill .18s ease, transform .18s ease;
      }
      .dz-card-favorite[aria-pressed="true"] {
        background: #5c3d2e;
        color: #fffaf4;
      }
      .dz-card-favorite[aria-pressed="true"] svg {
        fill: currentColor;
        transform: scale(1.04);
      }
      @media (max-width: 767px) {
        .dz-card-favorite { top: 9px; right: 9px; width: 36px; height: 36px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dz-card-favorite, .dz-card-favorite svg { transition: none; }
      }
    `;
    document.head.append(style);
  }

  function productFromCard(card, explicitLink) {
    const link = explicitLink || card.querySelector('.component-product-card__link[href]');
    const rawHref = link?.getAttribute('href');
    if (!rawHref || rawHref === '#') return null;

    let target;
    try { target = new URL(rawHref, window.location.href); } catch { return null; }
    const slugMatch = target.pathname.match(/\/products\/([^/]+)\/index\.html$/i);
    if (!slugMatch) return null;

    const title = card.querySelector('[class*="label--title"], h3, .product-card__title')?.textContent.trim();
    const edition = card.querySelector('[class*="label--edition"], .product-card__edition')?.textContent.trim();
    const color = target.searchParams.get('color') || (edition || '').replace(/^Edition\s+/i, '').trim() || 'Default';
    const price = Number((card.querySelector('[class*="label--price"], .product-card__price')?.textContent || '').replace(/\D/g, ''));
    const imageSrc = card.querySelector('img')?.getAttribute('src') || '';
    let image = imageSrc;
    try { image = new URL(imageSrc, window.location.href).href; } catch {}

    return {
      link,
      slug: target.searchParams.get('model') ? `${slugMatch[1]}-${target.searchParams.get('model')}` : slugMatch[1],
      name: title || link.getAttribute('aria-label') || slugMatch[1],
      color,
      price,
      image,
      url: rawHref
    };
  }

  function mount() {
    if (!window.DanzlaStore) return;
    ensureStyles();

    document.querySelectorAll('component-product-card').forEach((card) => {
      const product = productFromCard(card);
      if (!product || card.querySelector('[data-card-favorite]')) return;

      product.link.removeAttribute('data-tracking-state');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'dz-card-favorite';
      button.dataset.cardFavorite = '';
      button.innerHTML = HEART_ICON;

      const sync = () => {
        const active = DanzlaStore.isFavorite(product);
        button.setAttribute('aria-pressed', String(active));
        button.setAttribute('aria-label', `${active ? 'Удалить' : 'Добавить'} ${product.name}, цвет ${product.color}, ${active ? 'из' : 'в'} избранного`);
      };

      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const active = DanzlaStore.toggleFavorite(product);
        sync();
        DanzlaStore.toast(active ? 'Добавлено в избранное' : 'Удалено из избранного');
      });

      button._syncFavorite = sync;
      sync();
      card.append(button);
    });

    document.querySelectorAll('a.product-card[href]').forEach((link) => {
      if (link.closest('.dz-product-card-shell')) return;
      const product = productFromCard(link, link);
      if (!product) return;

      const shell = document.createElement('div');
      shell.className = 'dz-product-card-shell';
      link.before(shell);
      shell.append(link);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'dz-card-favorite';
      button.dataset.cardFavorite = '';
      button.innerHTML = HEART_ICON;

      const sync = () => {
        const active = DanzlaStore.isFavorite(product);
        button.setAttribute('aria-pressed', String(active));
        button.setAttribute('aria-label', `${active ? 'Удалить' : 'Добавить'} ${product.name}, цвет ${product.color}, ${active ? 'из' : 'в'} избранного`);
      };

      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const active = DanzlaStore.toggleFavorite(product);
        sync();
        DanzlaStore.toast(active ? 'Добавлено в избранное' : 'Удалено из избранного');
      });

      button._syncFavorite = sync;
      sync();
      shell.append(button);
    });

    DanzlaStore.refresh();
  }

  if (document.readyState === 'loading') {
    mount();
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
  document.addEventListener('danzla:store-updated', () => {
    document.querySelectorAll('[data-card-favorite]').forEach((button) => button._syncFavorite?.());
  });
  new MutationObserver(() => {
    if (document.querySelector('component-product-card:not(:has([data-card-favorite])), a.product-card:not(.dz-product-card-shell .product-card)')) mount();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
