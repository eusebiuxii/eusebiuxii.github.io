// @ts-check

import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  // Production URL (used for canonical URLs / sitemap)
  site: "https://eusebiuxii.com",
  integrations: [react(), mdx()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
})
