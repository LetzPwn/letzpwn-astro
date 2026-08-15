import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// The entry id doubles as the public URL segment, so it is derived from the
// file name verbatim (no slugification) to keep existing post URLs stable.
const entryId = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '')

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  author: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  // Path of the cover image, relative to the collection directory
  // (e.g. "img/team_photo.jpg"). Resolved by src/lib/images.ts.
  coverImagePath: z.string().optional()
})

const news = defineCollection({
  loader: glob({
    pattern: '*.{md,mdx}',
    base: './src/content/news',
    generateId: entryId
  }),
  schema: postSchema
})

const writeups = defineCollection({
  loader: glob({
    pattern: '*.{md,mdx}',
    base: './src/content/writeups',
    generateId: entryId
  }),
  schema: postSchema
})

export const collections = { news, writeups }
