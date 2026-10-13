import { useSyncExternalStore } from "react"
import { Toggle } from "@base-ui/react/toggle"
import { Moon, Sun } from "lucide-react"

import styles from "./ThemeToggle.module.css"

type Theme = "light" | "dark"

/*
 * The theme lives on <html data-theme="…">. An inline script in BaseLayout
 * sets it before first paint; this component reads it as an external store
 * so React stays in sync if anything else changes it.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  })
  return () => observer.disconnect()
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light"

const getServerTheme = (): Theme => "light"

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem("theme", theme)
  } catch {
    // Storage unavailable (private mode etc.) — theme still applies for this page
  }
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)
  const isDark = theme === "dark"

  return (
    <Toggle
      className={styles.toggle}
      pressed={isDark}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      // A fixed label: Base UI's aria-pressed already says whether it's on
      aria-label="Dark theme"
    >
      {/*
       * Both icons are always rendered and CSS picks one from data-theme.
       * The static HTML can't know the visitor's theme (getServerTheme), but
       * the inline script in BaseLayout sets data-theme before first paint,
       * so the right icon shows immediately instead of after hydration.
       */}
      <Moon className={styles.moon} aria-hidden />
      <Sun className={styles.sun} aria-hidden />
    </Toggle>
  )
}
