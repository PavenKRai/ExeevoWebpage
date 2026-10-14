export type NavLink = { label: string; href: string };

export const site = {
  name: "Exeevo",
  tagline: "A unified, AI-powered life sciences CRM built natively on Microsoft.",
  demoHref: "/services#demo",
  videoUrl: "[VIDEO URL]",
  /** Primary navigation (new design): plain links, no dropdowns. Solutions by role is no longer linked from the nav or footer; the page stays live. */
  nav: [
    { label: "Platform", href: "/platform" },
    { label: "Ask-Nova", href: "/ask-nova" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Why Exeevo", href: "/why-exeevo" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
  ] satisfies NavLink[],
  footer: {
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Overview", href: "/platform" },
          { label: "Ask-Nova Studio & AI", href: "/ask-nova" },
          { label: "Why Exeevo", href: "/why-exeevo" },
          { label: "Professional Services", href: "/services" },
        ],
      },
      {
        title: "Industries",
        links: [
          { label: "Pharma", href: "/industries?industry=pharma" },
          { label: "MedTech", href: "/industries?industry=medtech" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Partners", href: "/partners" },
          { label: "Case Studies", href: "/resources/case-studies" },
          { label: "Trust & Compliance", href: "/why-exeevo#compliance" },
        ],
      },
    ],
    legal: "© 2026 Exeevo. A division of Valsoft.",
    legalLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Site Map", href: "/site-map" },
    ],
  },
  rolesMenu: {
    blurb: "Field Rep, MSL, KAM, Account Mgr",
    items: [
      { label: "Field Rep", slug: "field-rep" },
      { label: "Medical Science Liaison", slug: "msl" },
      { label: "Key Account Manager", slug: "kam" },
      { label: "Consumer & Animal Health Rep", slug: "consumer-animal-health" },
    ],
  },
  /** Mobile sheet groups (Platform's modules come from content/modules.ts). */
  mobile: {
    more: [
      { label: "Ask-Nova", href: "/ask-nova" },
      { label: "Why Exeevo", href: "/why-exeevo" },
      { label: "Services", href: "/services" },
      { label: "Resources", href: "/resources" },
    ],
  },
  industriesMenu: [
    { label: "Pharma", href: "/industries?industry=pharma", blurb: "Commercial, Medical, Marketing, IT" },
    { label: "MedTech", href: "/industries?industry=medtech", blurb: "Device & diagnostics commercial teams" },
  ],
} as const;
