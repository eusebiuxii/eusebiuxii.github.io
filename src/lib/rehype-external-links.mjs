/**
 * Rehype plugin: Markdown/MDX links to other sites open in a new tab.
 * Adds target="_blank" and rel="noopener noreferrer" to every link whose
 * href is http(s) on a different host. Links within the site, #anchors and
 * mailto: are left alone.
 *
 * @param {{ siteHost?: string }} options
 */
export default function rehypeExternalLinks({ siteHost } = {}) {
  const isExternal = (href) => {
    if (typeof href !== "string" || !/^https?:\/\//i.test(href)) return false
    try {
      return new URL(href).host !== siteHost
    } catch {
      return false
    }
  }

  const visit = (node) => {
    if (node.type === "element" && node.tagName === "a") {
      const props = (node.properties ??= {})
      if (isExternal(props.href)) {
        props.target = "_blank"
        props.rel = ["noopener", "noreferrer"]
      }
    }
    node.children?.forEach(visit)
  }

  return (tree) => visit(tree)
}
