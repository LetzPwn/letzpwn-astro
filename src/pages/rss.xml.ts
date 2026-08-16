import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getAllPosts } from '../lib/posts'

export const GET: APIRoute = async (context) => {
  const posts = await getAllPosts()

  return rss({
    title: 'LetzPwn',
    description:
      'News and CTF writeups from the Luxembourgish cybersecurity community.',
    site: context.site ?? 'https://letzpwn.lu',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.excerpt ?? '',
      author: post.author,
      categories: post.tags.map((tag) => tag.name),
      link: post.url
    }))
  })
}
