import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import styles from "./MobileMenu.module.css"

interface NavItem {
  label: string
  href: string
}

interface Props {
  items: readonly NavItem[]
  contact: NavItem
  currentPath: string
}

const isActive = (path: string, href: string) =>
  path === href || path.startsWith(`${href}/`)

/** Burger button + dropdown drawer, only shown below the desktop breakpoint */
export default function MobileMenu({ items, contact, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  // Close on Escape while open
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <span className={styles.burgerIcon} aria-hidden>
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </span>
      </button>

      <nav
        id="mobile-menu"
        className={cn(styles.drawer, isOpen && styles.drawerOpen)}
        aria-label="Main"
        inert={!isOpen}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              styles.link,
              isActive(currentPath, item.href) && styles.active
            )}
            aria-current={isActive(currentPath, item.href) ? "page" : undefined}
            onClick={close}
          >
            {item.label}
          </a>
        ))}
        <a href={contact.href} className={styles.contactButton} onClick={close}>
          {contact.label}
        </a>
      </nav>
    </>
  )
}
