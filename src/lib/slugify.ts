/**
 * Turns a human readable tag ("Post Mortem", "Hack.lu 2022 CTF") into a URL
 * segment ("post-mortem", "hack-lu-2022-ctf").
 *
 * Every place that links to a tag must go through this helper, otherwise the
 * link and the generated page disagree.
 */
export function slugify(text: string): string {
  return text
    .normalize('NFKD') // split accented characters into letter + diacritic
    .replace(/[\u0300-\u036f]/g, '') // drop the diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // everything else becomes a separator
    .replace(/^-+|-+$/g, '') // trim leading/trailing separators
}
