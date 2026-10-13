# Personal site

Portfolio and guides. Built with **Astro**, **React**
(for interactive islands only), **Base UI** headless components, and plain
**CSS Modules** — no Tailwind.

## Commands

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Dev server at `localhost:4321`  |
| `npm run build`     | Production build into `dist/`   |
| `npm run preview`   | Serve the production build      |
| `npm run typecheck` | Type-check `.astro`/`.ts` files |
| `npm run lint`      | ESLint                          |
| `npm run format`    | Prettier                        |

## Structure

```
src/
  content/             Markdown/MDX content, one folder per collection
    projects/          → /projects/<file-name>
    guides/            → /guides/<file-name>
  content.config.ts    Frontmatter schemas for each collection
  site.config.ts       Site name, navigation, social links
  components/          One folder per component: Card/Card.tsx + Card.module.css
  layouts/             BaseLayout (shell), EntryLayout (project/guide page)
  lib/                 content.ts (queries, drafts, search items), search.ts
                       (client-side search/sort/filter), utils.ts (cn)
  pages/               Routes (search.astro → /search across all sections)
  styles/
    tokens.css         Colours, spacing, type scale — light and dark
    reset.css          Minimal CSS reset
    global.css         Base element styles + .container
```

## Styling conventions

- **Tokens first.** Use the variables from `styles/tokens.css`
  (`var(--space-4)`, `var(--color-text-muted)`…) rather than raw values.
- **One CSS Module per component**, named after it, with camelCase class names:
  `import styles from "./Card.module.css"` → `class={styles.card}`.
  Classes are scoped automatically, so short names like `.title` are fine.
- Combine classes with `cn()` from `@/lib/utils`:
  `class={cn(styles.link, isActive && styles.active)}`.
- **Dark mode** is `data-theme="dark"` on `<html>`; only `tokens.css` should
  need to care about it.
- **Interactive pieces** are React components using Base UI primitives
  (`@base-ui/react/*`). Base UI ships no styles — style it via `className`
  and its `data-*` state attributes (e.g. `[data-pressed]`).

## Adding content

Create a `.md` or `.mdx` file in the right `src/content/` folder. Required
frontmatter is defined in `src/content.config.ts`; the build fails with a clear
message if something is missing. `draft: true` hides an entry in production
builds (drafts still show in `npm run dev`).

### Card thumbnails

Projects and guides can have an optional `cover` image, shown at the top of
their card. Put the image next to the content (e.g. in a `covers/` folder) and
reference it relative to the Markdown file:

```yaml
cover: ./covers/my-project.png
```

Astro validates the path at build time and generates resized WebP versions,
so a large screenshot is fine. Covers are cropped to 16:9.

## Project and guide pages

Every `##` and `###` heading in a project or guide becomes an entry in the
"On this page" sidebar, which highlights the section being read and jumps to
it on click. Pages with fewer than two headings get no sidebar. On narrow
screens it turns into a collapsible box above the content.

Every code block in a project or guide gets a copy button in its top-right
corner (`components/CodeCopy`), added by a small script so pages without
JavaScript don't show a button that does nothing.

## Search, sorting and filters

`/projects`, `/guides` and `/search` all use the `ContentBrowser` React island:
a search box, a sort dropdown (newest first by default) and section/tag
filters. The state lives in the URL (`/search?q=astro&tags=css`), so results
can be linked to.

On `/projects` and `/guides` it's rendered with `collapsible`: the tools stay
hidden behind a search button beside the page title (the `PageHeader` passed
as children) and open automatically for links that carry a query. Drop the
`collapsible` prop to always show them, or swap the island back for a plain
`CardGrid` of `Card`s to remove them entirely.

Every entry is turned into a `ContentItem` by `getItems()` in
`src/lib/content.ts`. To make a new collection searchable, add its id to
`SectionId`/`sectionLabels` in `src/lib/search.ts` and a builder to
`itemBuilders` in `content.ts` — it then shows up on `/search` with its own
filter.
