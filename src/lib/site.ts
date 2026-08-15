/** Single source of truth for navigation, social links and contact details. */

export const SITE_NAME = 'LetzPwn'
export const SITE_TAGLINE = 'The first Luxembourgish CTF Team'
export const CONTACT_EMAIL = 'info@letzpwn.lu'

export interface NavItem {
  name: string
  path: string
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'News', path: '/news' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Writeups', path: '/writeups' },
  { name: 'Contact', path: '/contact' }
]

/**
 * The desktop header puts the logo in the middle, so the navigation is split
 * into two lists around it. Splitting by half keeps it balanced when items are
 * added or removed.
 */
export const NAV_SPLIT = Math.ceil(NAV_ITEMS.length / 2)

export const FOOTER_LINKS: NavItem[] = [
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' },
  { name: 'Writeups', path: '/writeups' },
  { name: 'Tags', path: '/tags' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Contact', path: '/contact' },
  { name: 'Privacy Policy', path: '/privacy_policy' }
]

export interface SocialLink {
  name: string
  url: string
  /** Font Awesome classes for the icon. */
  icon: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/LetzPwnAsbl',
    icon: 'fab fa-twitter'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/letzpwnasbl',
    icon: 'fab fa-instagram'
  },
  {
    name: 'Discord',
    url: 'https://discord.letzpwn.lu',
    icon: 'fab fa-discord'
  }
]

/**
 * True when `path` is the current page or one of its sub-pages, so that
 * "News" stays highlighted while reading /news/some-post.
 */
export function isActive(currentPath: string, path: string): boolean {
  const current = currentPath.replace(/\/+$/, '') || '/'
  if (path === '/') return current === '/'
  return current === path || current.startsWith(`${path}/`)
}
