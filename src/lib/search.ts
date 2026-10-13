/**
 * Searching, filtering and sorting of content items. Runs in the browser
 * (ContentBrowser), so nothing here may import `astro:content`.
 * Items are built server-side by `getItems()` in `content.ts`.
 */

export type SectionId = "projects" | "guides"

export const sectionLabels: Record<SectionId, string> = {
  projects: "Projects",
  guides: "Guides",
}

/** A pre-optimised image (see `getImage` in content.ts) */
export interface CardImage {
  src: string
  srcSet?: string
  width: number
  height: number
}

/** Any searchable entry, whatever collection it came from */
export interface ContentItem {
  /** Unique across sections: `${section}/${entry id}` */
  key: string
  section: SectionId
  href: string
  title: string
  description?: string
  /** Timestamp used for sorting; undated items sort last */
  date?: number
  /** Small text shown above the card title */
  meta?: string
  tags: string[]
  image?: CardImage
  /** Highlighted on the home page (projects only for now) */
  featured?: boolean
  /** Plain-text body, only used for matching */
  text: string
}

export type SortOrder = "newest" | "oldest" | "title" | "relevance"

export const sortLabels: Record<SortOrder, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  title: "Title (A–Z)",
  relevance: "Best match",
}

export interface Query {
  q: string
  sort: SortOrder
  /** Empty means every section */
  sections: SectionId[]
  /** Items matching any of these tags; empty means no tag filter */
  tags: string[]
}

export const defaultQuery: Query = {
  q: "",
  sort: "newest",
  sections: [],
  tags: [],
}

/** Lower-cases and strips accents so "Café" matches "cafe" */
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

const tokenize = (q: string) => normalize(q).split(/\s+/).filter(Boolean)

/**
 * Every word of the query has to appear somewhere in the item.
 * Returns 0 for no match, otherwise a score where title hits count most.
 */
export function scoreItem(item: ContentItem, words: string[]): number {
  if (words.length === 0) return 1

  const title = normalize(item.title)
  const description = normalize(item.description ?? "")
  const tags = item.tags.map(normalize)
  const text = normalize(item.text)

  let score = 0
  for (const word of words) {
    let wordScore = 0
    if (title.includes(word)) wordScore += 10
    if (tags.some((tag) => tag === word)) wordScore += 6
    else if (tags.some((tag) => tag.includes(word))) wordScore += 3
    if (description.includes(word)) wordScore += 3
    if (text.includes(word)) wordScore += 1
    if (wordScore === 0) return 0
    score += wordScore
  }
  return score
}

const byDateDesc = (a: ContentItem, b: ContentItem) =>
  (b.date ?? -Infinity) - (a.date ?? -Infinity) ||
  a.title.localeCompare(b.title)

const byDateAsc = (a: ContentItem, b: ContentItem) =>
  (a.date ?? Infinity) - (b.date ?? Infinity) || a.title.localeCompare(b.title)

const byTitle = (a: ContentItem, b: ContentItem) =>
  a.title.localeCompare(b.title)

/** Applies the text query and section filter (not tags), returning scores */
export function matchItems(items: ContentItem[], query: Query) {
  const words = tokenize(query.q)
  return items
    .filter(
      (item) =>
        query.sections.length === 0 || query.sections.includes(item.section)
    )
    .map((item) => ({ item, score: scoreItem(item, words) }))
    .filter(({ score }) => score > 0)
}

/** Full pipeline: text query, sections, tags, then sort */
export function runQuery(items: ContentItem[], query: Query): ContentItem[] {
  const matches = matchItems(items, query).filter(
    ({ item }) =>
      query.tags.length === 0 ||
      query.tags.some((tag) => item.tags.includes(tag))
  )

  if (query.sort === "relevance" && query.q.trim()) {
    return matches
      .sort((a, b) => b.score - a.score || byDateDesc(a.item, b.item))
      .map(({ item }) => item)
  }

  const compare =
    query.sort === "oldest"
      ? byDateAsc
      : query.sort === "title"
        ? byTitle
        : byDateDesc
  return matches.map(({ item }) => item).sort(compare)
}

/** Tags used by the given items, most common first */
export function collectTags(items: ContentItem[]): string[] {
  const counts = new Map<string, number>()
  for (const item of items) {
    for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}

/* ---------- URL <-> query, so results can be linked to ---------- */

const isSort = (value: string | null): value is SortOrder =>
  value !== null && value in sortLabels

const isSection = (value: string): value is SectionId => value in sectionLabels

const splitList = (value: string | null) =>
  value ? value.split(",").filter(Boolean) : []

export function queryFromParams(params: URLSearchParams): Query {
  const sort = params.get("sort")
  return {
    q: params.get("q") ?? "",
    sort: isSort(sort) ? sort : defaultQuery.sort,
    sections: splitList(params.get("section")).filter(isSection),
    tags: splitList(params.get("tags")),
  }
}

export function queryToParams(query: Query): URLSearchParams {
  const params = new URLSearchParams()
  if (query.q) params.set("q", query.q)
  if (query.sort !== defaultQuery.sort) params.set("sort", query.sort)
  if (query.sections.length) params.set("section", query.sections.join(","))
  if (query.tags.length) params.set("tags", query.tags.join(","))
  return params
}
