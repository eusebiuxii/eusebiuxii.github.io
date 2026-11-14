/**
 * Site-wide settings: name, navigation and social links.
 * Edit this file rather than hunting through components.
 */
export const site = {
  name: "Eusebiu Moldovan",
  title: "Eusebiu Moldovan — Software Dev Portfolio",
  description:
    "My personal portfolio: a hub for projects I've built and tech guides for anyone who finds them useful.",
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Guides", href: "/guides" },
    { label: "About", href: "/about" },
  ],
  // Highlighted call-to-action at the end of the nav
  contact: { label: "Contact", href: "/contact" },
  // Stored in two parts and joined by a script in the browser, so the full
  // address never appears in the HTML for spam bots to scrape (see Footer)
  email: { user: "eusebiuxii", domain: "proton.me" },
  // Footer links. Ones with a `card` also get a card on the Contact page.
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/eusebiuxii",
      card: {
        handle: "in/eusebiuxii",
        note: "My work history, and the place for professional enquiries.",
      },
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/eusebiuxii/",
      card: {
        handle: "@eusebiuxii",
        note: "Photos and a more personal side of me.",
      },
    },
    {
      label: "GitHub",
      href: "https://github.com/eusebiuxii",
      card: {
        handle: "eusebiuxii",
        note: "Source code for my projects, including my GNOME extensions.",
      },
    },
  ],
  // Contact page details
  // Shown on the Contact page; the coordinates place the pin in maps apps
  location: { name: "Manchester, UK", lat: 53.4808, lng: -2.2426 },
  // Shows an "Open to work" badge on the Contact page when true
  openToWork: false,
} as const
