import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'UI Toolkit',
      logo: {
        src: './public/logo.png',
        alt: 'Rhinolabs UI Toolkit',
      },
      favicon: '/favicon.ico',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
      },
      social: {
        github: 'https://github.com/rhinolabs/ui-toolkit',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' },
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
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
          content: `
            // Force dark theme
            document.documentElement.dataset.theme = 'dark';
            localStorage.setItem('starlight-theme', 'dark');
          `,
        },
      ],
    }),
  ],
});
