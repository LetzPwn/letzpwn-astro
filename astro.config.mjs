import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://letzpwn.lu',
  trailingSlash: 'never',
  redirects: {
    // Pagination used to live at /writeups/2, which collides with the
    // /writeups/[slug] pattern; keep the published URL working.
    '/writeups/2': '/writeups/page/2'
  },
  integrations: [mdx(), sitemap()]
})
