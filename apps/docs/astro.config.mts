import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    starlight({
      title: 'UI Toolkit',
      logo: {
        src: './public/logo.png',
        alt: 'Rhinolabs UI Toolkit',
      },
      favicon: '/favicon.ico',
      components: {
        ThemeSelect: './src/components/theme-select.astro',
        Footer: './src/components/footer.astro',
      },
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
      },
      social: {
        github: 'https://github.com/rhinolabs/ui-toolkit',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Introduction', slug: 'introduction' },
        { label: 'Getting Started', slug: 'getting-started' },
        {
          label: 'Components',
          autogenerate: { directory: 'ui' },
        },
        {
          label: 'Hooks',
          autogenerate: { directory: 'hooks' },
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#10b981',
          },
        },
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://cloud.umami.is/script.js',
            'data-website-id': '8b7e8cab-0f61-4e2b-84d0-265791684ede',
          },
        },
      ],
    }),
  ],
});
