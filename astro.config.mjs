import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const owner = 'MandlerJ';
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserSite = repository.toLowerCase() === `${owner}.github.io`.toLowerCase();
const base = process.env.GITHUB_ACTIONS === 'true' && repository && !isUserSite
  ? `/${repository}`
  : '/';

export default defineConfig({
  site: process.env.SITE_URL ?? `https://${owner.toLowerCase()}.github.io`,
  base,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
