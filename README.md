# letzpwn.lu

The [letzpwn.lu](https://letzpwn.lu) website, built with [Astro](https://astro.build).

## Cloning

The posts live in a separate repository that is included here as a git
submodule (`src/content`), so clone recursively:

```bash
git clone --recurse-submodules https://github.com/LetzPwn/letzpwn-astro.git
```

If you already cloned without `--recurse-submodules`:

```bash
git submodule update --init --recursive
```

The build fails with a clear error when `src/content` is empty, because the
`news` and `writeups` content collections have nothing to load.

## Project structure

- `src/pages/` – one file per route.
- `src/layouts/` – `Layout.astro` (page shell, `<head>`, banner) and
  `PostLayout.astro` (news/writeup articles).
- `src/components/` – shared components.
- `src/lib/` – content helpers (`posts.ts`), image resolution (`images.ts`),
  navigation and social links (`site.ts`), tag slugs (`slugify.ts`).
- `src/styles/site.css` – site-wide CSS on top of the vendored template.
- `src/assets/` – images processed and optimised by Astro.
- `src/content/` – submodule with the posts (do not edit here, edit in the
  content repository).
- `public/` – files copied verbatim (vendored template CSS, icon fonts,
  favicons).

## Adding a post

Add an `.mdx` file to `news/` or `writeups/` in the
[content repository](https://github.com/LetzPwn/letzpwn.lu-content). The file
name becomes the URL (`news/my-post.mdx` → `/news/my-post`).

```md
---
title: 'My First News Post' # required
date: '2024-10-01' # required, YYYY-MM-DD
author: 'John Doe' # optional
excerpt: 'One or two sentences shown on the card.' # optional
tags: ['update', 'announcement'] # optional
coverImagePath: 'img/my-post.png' # optional, relative to news/ or writeups/
---
```

The frontmatter is validated at build time (`src/content.config.ts`), so a
missing title or a malformed date fails the build instead of rendering an
"Unknown Date" card. Tags are turned into URLs with `slugify()`, so
`"Post Mortem"` and `"post mortem"` end up on the same `/tags/post-mortem`
page.

## Commands

| Command           | Action                                            |
| :---------------- | :------------------------------------------------ |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Start the dev server at `localhost:4321`          |
| `npm run build`   | Build the production site to `./dist/`            |
| `npm run preview` | Preview the built site locally                    |
| `npm run check`   | Type-check (`astro check`), lint and check format |
| `npm run format`  | Format everything with Prettier                   |

`npm run check` is what CI runs before building; a Husky pre-commit hook
formats staged files with Prettier.

## Deployment

Pushing to `master` builds the site and deploys it to GitHub Pages
(`.github/workflows/astro.yml`). The workflow needs the
`SUBMODULE_CONTENT_PULL_KEY` secret to check out the content submodule.
