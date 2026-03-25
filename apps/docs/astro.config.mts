import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  site: 'https://ui.rhinolabs.agency',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    ssr: {
      noExternal: ['@rhinolabs/ui', '@rhinolabs/react-hooks'],
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
});
