import type { ImageMetadata } from "astro"
import { getImage } from "astro:assets"
import { getCollection } from "astro:content"
import type { CardImage, ContentItem, SectionId } from "@/lib/search"

/** Drafts are visible in `npm run dev` but excluded from production builds. */
const isVisible = (entry: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !entry.data.draft

export async function getProjects() {
  const entries = await getCollection("projects", isVisible)
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getGuides() {
  const entries = await getCollection("guides", isVisible)
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/* ---------- Content items: one shape for cards, lists and search ---------- */

/** Resizes a cover once at build time so React cards can use plain <img> */
async function toCardImage(
  src?: ImageMetadata
): Promise<CardImage | undefined> {
  if (!src) return undefined
  const image = await getImage({ src, widths: [400, 800] })
  return {
    src: image.src,
    srcSet: image.srcSet.attribute,
    width: src.width,
    height: src.height,
  }
}

/** Rough Markdown/MDX → plain text, good enough for keyword matching */
const toPlainText = (body = "") =>
  body
    .replace(/^(import|export)\s.*$/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~[\]()!|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()

/**
 * How each section becomes ContentItems. To make a new collection
 * searchable, add its SectionId in lib/search.ts and a builder here.
 */
const itemBuilders: Record<SectionId, () => Promise<ContentItem[]>> = {
  projects: async () =>
    Promise.all(
      (await getProjects()).map(async (entry) => ({
        key: `projects/${entry.id}`,
        section: "projects" as const,
        href: `/projects/${entry.id}`,
        title: entry.data.title,
        description: entry.data.description,
        date: entry.data.date.valueOf(),
        meta: String(entry.data.date.getFullYear()),
        tags: entry.data.tags,
        image: await toCardImage(entry.data.cover),
        featured: entry.data.featured,
        text: toPlainText(entry.body),
      }))
    ),

  guides: async () =>
    Promise.all(
      (await getGuides()).map(async (entry) => ({
        key: `guides/${entry.id}`,
        section: "guides" as const,
        href: `/guides/${entry.id}`,
        title: entry.data.title,
        description: entry.data.description,
        date: entry.data.date.valueOf(),
        meta: formatDate(entry.data.date),
        tags: entry.data.tags,
        image: await toCardImage(entry.data.cover),
        text: toPlainText(entry.body),
      }))
    ),
}

/** Items for the given sections (all by default), each in its usual order */
export async function getItems(
  sections = Object.keys(itemBuilders) as SectionId[]
): Promise<ContentItem[]> {
  const lists = await Promise.all(sections.map((id) => itemBuilders[id]()))
  return lists.flat()
}
