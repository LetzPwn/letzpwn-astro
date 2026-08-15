import fallbackCover from '../assets/logo.png'

// Cover images live next to the posts inside the content submodule, so they are
// picked up here and handed to <Image /> as ImageMetadata (which lets Astro
// optimise and hash them).
const covers = import.meta.glob<ImageMetadata>(
  '/src/content/**/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true, import: 'default' }
)

/**
 * Resolves a frontmatter `coverImagePath` (relative to the collection folder)
 * to an imported image. Falls back to the LetzPwn logo when the field is
 * missing, empty, or points at a file that no longer exists, so a content typo
 * can never break a page.
 */
export function resolveCover(
  collection: string,
  coverImagePath?: string
): ImageMetadata {
  if (!coverImagePath) return fallbackCover

  const relative = coverImagePath.replace(/^\.?\//, '')
  return covers[`/src/content/${collection}/${relative}`] ?? fallbackCover
}

export { fallbackCover }
