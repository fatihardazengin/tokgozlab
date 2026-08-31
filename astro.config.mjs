// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: /** @type {any} */ ([tailwindcss()]),
    build: {
      assetsInlineLimit: 10240,
    }
  },

  integrations: [react()]
});
