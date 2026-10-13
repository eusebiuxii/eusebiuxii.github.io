import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { Collapsible } from "@base-ui/react/collapsible"
import { Input } from "@base-ui/react/input"
import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup } from "@base-ui/react/toggle-group"
import { Search, X } from "lucide-react"

import Card from "@/components/Card/Card"
import gridStyles from "@/components/CardGrid/CardGrid.module.css"
import {
  collectTags,
  defaultQuery,
  matchItems,
  queryFromParams,
  queryToParams,
  runQuery,
  sectionLabels,
  type ContentItem,
  type Query,
  type SectionId,
  type SortOrder,
} from "@/lib/search"
import SortSelect from "./SortSelect"
import styles from "./ContentBrowser.module.css"

interface Props {
  items: ContentItem[]
  /** e.g. "Search projects…" */
  placeholder?: string
  /** Focus the search box on load (the dedicated search page) */
  autoFocus?: boolean
  /**
   * Hide the tools behind a search button next to the page header (passed
   * as children). They open by themselves when the URL already has a query.
   */
  collapsible?: boolean
  children?: ReactNode
}

/*
 * The query lives in the URL (?q=…&sort=…&section=…&tags=…) so results can
 * be shared or reloaded. React reads it as an external store, the same way
 * ThemeToggle reads data-theme.
 */
const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  window.addEventListener("popstate", onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener("popstate", onChange)
  }
}

const getSearch = () => window.location.search
// The static HTML is rendered with no query: every item, default order
const getServerSearch = () => ""

function setSearch(params: URLSearchParams) {
  const search = params.toString()
  const url = `${window.location.pathname}${search ? `?${search}` : ""}`
  window.history.replaceState(null, "", url)
  listeners.forEach((listener) => listener())
}

/** Search box, sort order and section/tag filters over a list of cards */
export default function ContentBrowser({
  items,
  placeholder = "Search…",
  autoFocus = false,
  collapsible = false,
  children,
}: Props) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch)
  const query = useMemo(
    () => queryFromParams(new URLSearchParams(search)),
    [search]
  )

  const update = (patch: Partial<Query>) =>
    setSearch(queryToParams({ ...query, ...patch }))

  const hasText = query.q.trim() !== ""
  // "Best match" only makes sense while there's something to match
  const sort: SortOrder =
    query.sort === "relevance" && !hasText ? "newest" : query.sort
  const sortOptions: SortOrder[] = hasText
    ? ["relevance", "newest", "oldest", "title"]
    : ["newest", "oldest", "title"]

  const sections = useMemo(
    () => [...new Set(items.map((item) => item.section))],
    [items]
  )

  // Per-section match counts for the current text query
  const sectionCounts = useMemo(() => {
    const counts = new Map<SectionId, number>()
    for (const { item } of matchItems(items, { ...query, sections: [] })) {
      counts.set(item.section, (counts.get(item.section) ?? 0) + 1)
    }
    return counts
  }, [items, query])

  // Tags available in the chosen sections, plus any still selected
  const tags = useMemo(() => {
    const inSections = items.filter(
      (item) =>
        query.sections.length === 0 || query.sections.includes(item.section)
    )
    const available = collectTags(inSections)
    return [...available, ...query.tags.filter((t) => !available.includes(t))]
  }, [items, query.sections, query.tags])

  const results = useMemo(
    () => runQuery(items, { ...query, sort }),
    [items, query, sort]
  )

  const isFiltered =
    hasText || query.sections.length > 0 || query.tags.length > 0
  const clear = () =>
    setSearch(queryToParams({ ...defaultQuery, sort: query.sort }))

  // Collapsed by default; opens itself for shared links with a query.
  // null = the visitor hasn't toggled it yet
  const [userOpen, setUserOpen] = useState<boolean | null>(null)
  const isOpen = !collapsible || (userOpen ?? search !== "")
  const inputRef = useRef<HTMLInputElement>(null)

  // Opening the panel by hand puts the cursor straight in the search box
  useEffect(() => {
    if (userOpen) inputRef.current?.focus()
  }, [userOpen])

  const tools = (
    <div className={styles.tools}>
      <div className={styles.toolbar}>
        <form
          role="search"
          className={styles.searchField}
          onSubmit={(event) => event.preventDefault()}
        >
          <Search className={styles.searchIcon} aria-hidden />
          <Input
            ref={inputRef}
            type="search"
            name="q"
            className={styles.input}
            placeholder={placeholder}
            aria-label={placeholder.replace(/…$/, "")}
            value={query.q}
            onValueChange={(q) => update({ q })}
            autoFocus={autoFocus}
          />
        </form>
        <SortSelect
          value={sort}
          options={sortOptions}
          onChange={(next) => update({ sort: next })}
        />
      </div>

      {(sections.length > 1 || tags.length > 0) && (
        <div className={styles.filters}>
          {sections.length > 1 && (
            <div className={styles.filterRow}>
              <span className={styles.filterLabel} id="filter-sections">
                Show
              </span>
              <ToggleGroup
                multiple
                className={styles.chips}
                aria-labelledby="filter-sections"
                value={query.sections}
                onValueChange={(value) =>
                  update({ sections: value as SectionId[] })
                }
              >
                {sections.map((section) => (
                  <Toggle key={section} value={section} className={styles.chip}>
                    {sectionLabels[section]}
                    <span className={styles.chipCount}>
                      {sectionCounts.get(section) ?? 0}
                    </span>
                  </Toggle>
                ))}
              </ToggleGroup>
            </div>
          )}

          {tags.length > 0 && (
            <div className={styles.filterRow}>
              <span className={styles.filterLabel} id="filter-tags">
                Tags
              </span>
              <ToggleGroup
                multiple
                className={styles.chips}
                aria-labelledby="filter-tags"
                value={query.tags}
                onValueChange={(value) => update({ tags: value })}
              >
                {tags.map((tag) => (
                  <Toggle key={tag} value={tag} className={styles.chip}>
                    {tag}
                  </Toggle>
                ))}
              </ToggleGroup>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const list = (
    <>
      {(isOpen || isFiltered) && (
        <div className={styles.summary}>
          <p aria-live="polite">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          {isFiltered && (
            <button type="button" className={styles.clear} onClick={clear}>
              Clear filters
            </button>
          )}
        </div>
      )}

      {results.length > 0 ? (
        <div className={gridStyles.grid}>
          {results.map((item) => (
            <Card
              key={item.key}
              href={item.href}
              title={item.title}
              description={item.description}
              meta={item.meta}
              tags={item.tags}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Nothing matches that.</p>
          <button type="button" className={styles.clear} onClick={clear}>
            Clear filters
          </button>
        </div>
      )}
    </>
  )

  if (!collapsible) {
    return (
      <div className={styles.browser}>
        {children}
        {tools}
        {list}
      </div>
    )
  }

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setUserOpen}>
      <div className={styles.header}>
        {children}
        <Collapsible.Trigger
          className={styles.toolsToggle}
          aria-label={isOpen ? "Hide search and filters" : "Search and filter"}
        >
          {isOpen ? <X aria-hidden /> : <Search aria-hidden />}
          {!isOpen && isFiltered && <span className={styles.activeDot} />}
        </Collapsible.Trigger>
      </div>
      <div className={styles.browser}>
        <Collapsible.Panel className={styles.panel}>{tools}</Collapsible.Panel>
        {list}
      </div>
    </Collapsible.Root>
  )
}
