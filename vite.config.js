import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Compiles the section's source (frontend/) into the theme's assets/ folder
// with fixed filenames, so Liquid's `asset_url` filter keeps resolving them.
// Vite is dev-only tooling here — the shipped JS/CSS stays dependency-free.
export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'assets',
    // Critical: never wipe assets/ — it holds the rest of the theme's assets.
    emptyOutDir: false,
    minify: mode === 'production',
    sourcemap: mode !== 'production',
    rollupOptions: {
      // One entry per section. Add more here as the theme grows.
      input: {
        'product-highlight': resolve('frontend/entrypoints/product-highlight.js'),
      },
      output: {
        // Predictable, un-hashed names so the Liquid references stay stable.
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
}));
