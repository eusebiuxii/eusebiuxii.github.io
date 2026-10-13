import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

/**
 * Content collections. Each folder in src/content/ holds Markdown/MDX files
 * whose frontmatter is validated against the schema below at build time.
 * The file path (minus extension) becomes the entry id / URL slug.
 */

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      // Optional thumbnail shown on cards, path relative to the .md file
      cover: image().optional(),
      repo: z.url().optional(),
      demo: z.url().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
})

const guides = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guides" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      // Optional thumbnail shown on cards, path relative to the .md file
      cover: image().optional(),
      difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { projects, guides }
