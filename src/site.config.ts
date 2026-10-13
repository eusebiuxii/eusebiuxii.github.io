/**
 * Site-wide settings: name, navigation and social links.
 * Edit this file rather than hunting through components.
 */
export const site = {
  name: "Eusebiu Moldovan",
  title: "Eusebiu Moldovan — Software Dev Portfolio",
  description:
    "Here is my personal portfolio. A hub i fill with projects I've built and tech related guides for anyone who finds them useful.",
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Guides", href: "/guides" },
    { label: "About", href: "/about" },
  ],
  // Highlighted call-to-action at the end of the nav (points at the footer)
  contact: { label: "Contact", href: "#contact" },
  // Stored in two parts and joined by a script in the browser, so the full
  // address never appears in the HTML for spam bots to scrape (see Footer)
  email: { user: "eusebiuxii", domain: "proton.me" },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/eusebiuxii" },
    { label: "Instagram", href: "https://www.instagram.com/eusebiuxii/" },
    { label: "GitHub", href: "https://github.com/eusebiuxii" },
  ],
} as const
