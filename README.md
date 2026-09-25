# DanZla — starting reference clone

This repository contains a full technical clone of three pages of
[eng.polene-paris.com](https://eng.polene-paris.com/) (Polène, a Parisian
leather bags/accessories brand): the **homepage**, the **bestsellers
collection** and the **handbags collection**, pulled on **2026-09-25**.

It was made as a working static prototype / structural and visual reference
for an alternative design concept for **DanZla** (bags/accessories brand).
Each page's HTML, CSS, JavaScript, fonts and images have been cloned with
references rewritten to local relative paths, so the set can be opened
directly or served with any static file server, e.g.:

```
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## What's here

- `index.html` — the cloned homepage markup.
- `collections/bestsellers/index.html` — the cloned "Bestsellers" collection
  page, mirroring the live site's `/collections/bestsellers` URL structure.
- `collections/handbags/index.html` — the cloned "Handbags" collection page,
  mirroring the live site's `/collections/handbags` URL structure.
- `cdn/` — first-party assets originally served from
  `eng.polene-paris.com/cdn/...` (theme CSS/JS, product & marketing images,
  webfonts). Shared across all three pages; the two collection pages added
  159 new product/collection images plus two new theme scripts
  (`include-collection.js`, `mtiFontTrackingCode.js`) that the homepage
  didn't need, and reused everything else (CSS, JS, fonts, mega-menu images)
  already fetched for the homepage.
- `cdn-shopify-com/` — assets originally served from the separate
  `cdn.shopify.com` host (Shopify platform scripts). Fully reused from the
  homepage clone — the collection pages needed no new files here.

### Local navigation between the three pages

The header/logo links and the "Bestsellers" / "Handbags" mega-menu links on
all three pages have been rewired to point at each other locally, so you can
click all the way through home → Bestsellers → Handbags → home (and directly
between Bestsellers and Handbags) without leaving the local file set:

- `index.html`'s "Bestsellers" and "Handbags" menu links point to
  `collections/bestsellers/index.html` and `collections/handbags/index.html`.
- Each collection page's logo/"back to home" links point to `../../index.html`.
- Each collection page's menu link to the *other* collection page points to
  `../bestsellers/index.html` / `../handbags/index.html`.

All other links on all three pages (other collections, product pages,
account, cart, search, analytics/tracking scripts, social-share `og:image`
meta tags, etc.) are left pointing at the live `eng.polene-paris.com` site
unchanged — they were not cloned.

Interactive/backend-dependent features (cart, checkout, live search, account
login, newsletter signup, analytics) will **not** work — this is a visual and
structural clone only, not a functional storefront clone.

## Rebrand progress on the homepage (`index.html`)

The homepage has started diverging from the raw Polène clone toward the
DanZla design:

- **Logo** — the three Polène SVG logo instances (header, mobile menu,
  country selector) were replaced with the real DanZla brand book logo
  file (`img/danzla-logo.webp`, transparent background).
- **Brand font** — `Thunder` (the brand book's display typeface, files in
  `fonts/`) is loaded via `@font-face` and applied to headings (`h1`–`h3`).
- **Navigation** — top nav translated to Russian (Бестселлеры, Сумки,
  Клатчи, Кошельки); "Savoir-Faire" was removed entirely; all right-side
  utility icons/buttons (search, account, wishlist, cart, country selector,
  stores) were removed from the visible header, leaving the logo centered.
- **Cookie banner** — Polène's third-party GDPR cookie-consent app script
  was removed and replaced with a custom static banner (Russian copy)
  styled as a leather luggage tag, matching the brand book's cookie-consent
  mockup. It stores acceptance in `localStorage`.
- **Live chat widget** — the Zendesk chat-launcher script was removed.
- **"Materials" hover-video block** — the homepage's two-photo product
  mosaic (Numero Dix / Béri) was replaced with the two-video hover block
  ported from the first design version's "05. МАТЕРИАЛЫ" section
  (`danzla-site-preview`), stripped of its static captions/titles/counts.
  Mechanic preserved 1:1: hovering a panel plays its muted looping video
  and pauses the other; a "Смотреть коллекцию" label follows the cursor
  (desktop/≥1024px only, matching the original). Video/poster/mask/paper-
  texture assets live in `assets-materials/`. The plain-text 3-tile
  `promoted-collections` section (Handbags / Jewellery / Small Leather
  Goods) further up the page was left as originally cloned.

Other third-party embeds tied to Polène's own live Shopify account
(Instagram feed, country redirect, Klarna) were left untouched — out of
scope for this pass.

## Important — before any public use

All content, branding, product photography and copy in this clone belong to
**Polène** and must be fully replaced with DanZla's own before anything in
this repository is used publicly. This clone exists purely as an internal
starting point to speed up building DanZla's alternative homepage design.
