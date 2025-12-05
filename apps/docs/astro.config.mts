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
      ],
    }),
  ],
});
