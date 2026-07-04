# Product Highlight — Shopify theme section

A standalone section that lets a merchant pick **up to 4 products** in the theme
customiser and shows them as a selector row plus one large "featured" panel.
Selecting a product updates the featured panel (title, price, image) **without a
page reload or network request due to it being in a web component**. 

## Files

| File | Role |
| --- | --- |
| `sections/product-highlight.liquid` | Markup + schema. |
| `frontend/entrypoints/product-highlight.js` | Source of the `<product-highlight>` web component. |
| `frontend/styles/product-highlight.css` | Source styles. |
| `assets/product-highlight.{js,css}` | Built by Vite from `frontend/` — not committed. |

## Decisions & trade-offs

- **Blocks vs. `product_list`.** Blocks have been used so the client can drag and re-order products
- **Price formatting.** Formatted with the `money` filter at render time so it
  always matches store settings.

## Development

Requires Node 18+ and the [Shopify CLI](https://shopify.dev/docs/api/shopify-cli).

```bash
npm install
npm run dev      # Vite compiles frontend/ into assets/ and watches for changes
npm run shopify  # runs `shopify theme dev` for a live local preview
# (run the two above in separate terminals, or `npm run start` for both at once)
```

| Script | Does |
| --- | --- |
| `npm run dev` | Watch + rebuild assets while developing. |
| `npm run build` | Minified production build of the assets. |
| `npm run shopify` | Boot the store locally (`shopify theme dev`). |
| `npm run shopify-sync` | Same, plus sync theme-editor changes back down (`--theme-editor-sync`). |
| `npm run start` | Run `dev` + `shopify` together. |

Vite is dev-only tooling; the shipped JS/CSS stays dependency-free. Run
`npm run build` before pushing the theme so `assets/` is up to date.

