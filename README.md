# Based on Astro Starter Kit

## How to clone this repository

```bash
git clone --recurse-submodules https://github.com/LetzPwn/letzpwn-astro.git
```


## 🚀 Project Structure

- `src/` contains Astro components, pages, and styles.
- `src/pages/` contains the top-level pages of the site.
- `src/components/` contains shared components.
- `src/content/` contains submodule of markdown files.

Any static assets, like images, can be placed in the `public/` directory.

## Adding a new post

Add this to the mdx file:

```md
---
slug: "my-first-news-post"
title: "My First News Post"
date: "2024-10-01"
author: "John Doe"
coverImagePath: "/assets/logo.png"
tags: ["update", "announcement"]
---

```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
