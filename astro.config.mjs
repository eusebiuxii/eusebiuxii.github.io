// @ts-check

import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import rehypeExternalLinks from "./src/lib/rehype-external-links.mjs"

const site = "https://eusebiuxii.com"

// https://astro.build/config
export default defineConfig({
  // Production URL (used for canonical URLs / sitemap)
  site,
  integrations: [react(), mdx()],
  markdown: {
    // External links in Markdown/MDX open in a new tab (MDX inherits this)
    rehypePlugins: [[rehypeExternalLinks, { siteHost: new URL(site).host }]],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
})
