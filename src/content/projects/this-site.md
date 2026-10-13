---
title: Personal site
description: The site you're looking at — an Astro + React portfolio with guides, styled with plain CSS.
date: 2026-07-11
tags: [astro, react, css]
cover: ./covers/this-site.webp
featured: true
---

This is a placeholder project entry. Replace it with a real write-up:

## What it is

A short summary of the project and the problem it solves.

## How it's built

- **Astro** for static pages and content collections
- **React + Base UI** for the few interactive pieces
- **CSS Modules** and design tokens for styling

## Running it locally

### Requirements

- Node.js 22.12 or newer

### Start the dev server

```bash
npm install
npm run dev
```

The site is served at `http://localhost:4321`.

## Adding content

### Where files go

All content lives in `src/content/`, one folder per collection:

| Folder      | URL           | Purpose                          |
| ----------- | ------------- | -------------------------------- |
| `projects/` | `/projects/…` | Portfolio entries                |
| `guides/`   | `/guides/…`   | Tutorials and how-tos for others |

Create a `.md` or `.mdx` file and fill in the frontmatter. The schema in
`src/content.config.ts` tells you which fields are required — the build fails
with a clear error if something is missing.

### Drafts

Set `draft: true` to hide an entry from the site.

## What I learned

Notes, trade-offs, things you'd do differently.
