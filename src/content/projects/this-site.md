---
title: Personal site
description: The site you're looking at. A portfolio and guides hub built with Astro and React, hosted on GitHub Pages.
date: 2026-10-13
tags: [astro, react, typescript, css]
cover: ./covers/this-site.webp
featured: true
aiAssisted: true
---

## Idea & introduction

I've had a portfolio on GitHub Pages since 2022. The first versions were plain
HTML and CSS, and every new project meant copying and editing pages by hand.
By 2026 it was out of date and awkward to add to.

This version replaces it. It's a hub for the projects I've built and for
tech guides I write for anyone who finds them useful, like my Fedora setup
guide. Each project or guide is a Markdown file, so adding one is a matter of
writing it up and pushing it.

## Technologies used

- Astro for static pages and content collections, with each entry's
  frontmatter checked at build time
- React and Base UI for the few interactive parts, such as search, sorting
  and the theme toggle
- TypeScript throughout
- Plain CSS Modules with shared design tokens for colours, spacing and type
- GitHub Actions to build and deploy to GitHub Pages on every push to `main`

## Notable features

- **Projects and guides** written in Markdown, with cover images optimised
  at build time
- **Search, filters and sorting** across everything on the site
- **Light and dark themes**
- **An "On this page" contents sidebar** on long pages that follows the
  section you're reading
- **Copy buttons** on code blocks, handy for the guides
- **An AI-assisted label** on projects that were built with AI help, set with
  one line of frontmatter
