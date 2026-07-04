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
| `frontend/styles/product-highlight.scss` | Source styles (SCSS). |
| `assets/product-highlight.{js,css}` | Built by Vite from `frontend/` — not committed. |

## Two data sources

The section can be driven either way, chosen by the **"Use this page's
highlights set"** toggle:

- **Blocks (default).** The merchant hand-picks up to 4 products in the editor.
- **Dynamic (metafield).** A metafield on the product or collection supplies the
  products, so each page can show its own highlights without the merchant
  building a separate template for every variation. It's built so the merchant
  can create reusable product sets and assign them to products or collections —
  handy for swapping in different promotional groups for marketing pushes.

## Decisions & trade-offs

- **Blocks vs. `product_list`.** Blocks have been used so the client can drag and re-order products
- **Price formatting.** Formatted with the `money` filter at render time so it
  always matches store settings.
- **Two data sources.** We've given the ability for merchants to use the "blocks" section for simple pages, but for collection / product pages they can turn on a true/false flag to show dynamic data. Typically I'd do a step-by-step guide when handing this over to the merchant too.

## Future Improvements
- **Carousel.** The thumbnails would be useful in a carousel, I'd expand this by allowing a carousel to be toggled on, and how many slides they want to show, arrows, dots for pagination, etc.
- **Variant Selector.** Add the ability to select variants and show the different product imagery associated with that variant
- **Improved design.** Design is pretty simplistic as it is at the moment, I'd expand this with a designers input
- **Quick add to cart.** The ability to quickly add these products to the cart
- **Increase the product cap.** Once carousel is added, we could increase the product cap
- **Different layout options.** Give the merchant some different layout options so they can be used in multiple places with different layouts
- **And more.** Possibilities are endless, but this is where a conversation would be had with the merchant that is adding these sections, and discussing with them what they need out of the specific section.

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

