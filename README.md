# DanZla — starting reference clone

This repository contains a full technical clone of the **homepage** of
[eng.polene-paris.com](https://eng.polene-paris.com/) (Polène, a Parisian
leather bags/accessories brand), pulled on **2026-09-25**.

It was made as a working static prototype / structural and visual reference
for an alternative design concept for **DanZla** (bags/accessories brand).
The clone includes the page's HTML, CSS, JavaScript, fonts and images with
all references rewritten to local relative paths, so it can be opened
directly or served with any static file server, e.g.:

```
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## What's here

- `index.html` — the cloned homepage markup.
- `cdn/` — first-party assets originally served from
  `eng.polene-paris.com/cdn/...` (theme CSS/JS, product & marketing images,
  webfonts).
- `cdn-shopify-com/` — assets originally served from the separate
  `cdn.shopify.com` host (Shopify platform scripts).

Interactive/backend-dependent features (cart, checkout, live search, account
login, newsletter signup, analytics) will **not** work — this is a visual and
structural clone only, not a functional storefront clone.

## Important — before any public use

All content, branding, product photography and copy in this clone belong to
**Polène** and must be fully replaced with DanZla's own before anything in
this repository is used publicly. This clone exists purely as an internal
starting point to speed up building DanZla's alternative homepage design.
