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

