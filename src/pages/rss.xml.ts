import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'

interface MDXModule {
  frontmatter: {
    title: string
    date: string
    author?: string
    excerpt?: string
  }
}

export const GET: APIRoute = async (context) => {
  const newsModules = import.meta.glob('../content/news/*.mdx', { eager: true })
  const writeupModules = import.meta.glob('../content/writeups/*.mdx', { eager: true })

  const toItems = (modules: Record<string, unknown>, urlPrefix: string) =>
    Object.entries(modules)
      .map(([path, module]) => {
        const mod = module as MDXModule
        const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''
        const date = mod.frontmatter.date
          ? new Date(`${mod.frontmatter.date}T00:00:00Z`)
          : null
        return date && !isNaN(date.getTime())
          ? {
              title: mod.frontmatter.title,
              pubDate: date,
              description: mod.frontmatter.excerpt ?? '',
              author: mod.frontmatter.author,
              link: `${urlPrefix}/${slug}`
            }
          : null
      })
      .filter(Boolean)

  const items = [
    ...toItems(newsModules, '/news'),
    ...toItems(writeupModules, '/writeups')
  ]
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  return rss({
    title: 'LetzPwn',
    description: 'News and CTF writeups from the Luxembourgish cybersecurity community.',
    site: context.site!,
    items
  })
}
