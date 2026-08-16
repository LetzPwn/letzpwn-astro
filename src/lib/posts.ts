import { getCollection, type CollectionEntry } from 'astro:content'
import { resolveCover } from './images'
import { slugify } from './slugify'

export type PostCollection = 'news' | 'writeups'

/** Cards per page on the news and writeups listings. */
export const POSTS_PER_PAGE = 9

export interface Tag {
  /** As written in the frontmatter, e.g. "Post Mortem" */
  name: string
  /** URL-safe form, e.g. "post-mortem" */
  slug: string
  url: string
}

export interface Post {
  collection: PostCollection
  id: string
  url: string
  title: string
  date: Date
  author?: string
  excerpt?: string
  tags: Tag[]
  cover: ImageMetadata
  entry: CollectionEntry<PostCollection>
}

/** Human readable label used in banners, breadcrumb-ish subtitles and nav. */
export const COLLECTION_LABELS: Record<PostCollection, string> = {
  news: 'News',
  writeups: 'Writeups'
}

export function toTag(name: string): Tag {
  const slug = slugify(name)
  return { name, slug, url: `/tags/${slug}` }
}

function toPost(entry: CollectionEntry<PostCollection>): Post {
  const collection = entry.collection as PostCollection

  return {
    collection,
    id: entry.id,
    url: `/${collection}/${entry.id}`,
    title: entry.data.title,
    // The content layer persists entries to .astro/data-store.json, and a warm
    // store hands the date back as an ISO string rather than a Date. Coerce
    // here so nothing downstream has to care which one it got.
    date: new Date(entry.data.date),
    author: entry.data.author,
    excerpt: entry.data.excerpt,
    tags: entry.data.tags.map(toTag),
    cover: resolveCover(collection, entry.data.coverImagePath),
    entry
  }
}

const byNewestFirst = (a: Post, b: Post) => b.date.getTime() - a.date.getTime()

/** All entries of one collection, newest first. */
export async function getPosts(collection: PostCollection): Promise<Post[]> {
  const entries = await getCollection(collection)
  return entries.map(toPost).sort(byNewestFirst)
}

/** News and writeups combined, newest first. */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await Promise.all([getPosts('news'), getPosts('writeups')])
  return posts.flat().sort(byNewestFirst)
}

export interface TagWithPosts extends Tag {
  posts: Post[]
}

/**
 * Every tag used across both collections, keyed by slug so that tags which
 * differ only in punctuation or casing end up on the same page.
 */
export async function getTagsWithPosts(): Promise<TagWithPosts[]> {
  const posts = await getAllPosts()
  const tags = new Map<string, TagWithPosts>()

  for (const post of posts) {
    for (const tag of post.tags) {
      const existing = tags.get(tag.slug)
      if (existing) {
        existing.posts.push(post)
      } else {
        tags.set(tag.slug, { ...tag, posts: [post] })
      }
    }
  }

  return Array.from(tags.values()).sort((a, b) => a.name.localeCompare(b.name))
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'
})

/** Single date format for the whole site: "20 February 2020". */
export function formatDate(date: Date): string {
  return DATE_FORMAT.format(date)
}

/** Machine readable date for <time datetime="…">. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}
