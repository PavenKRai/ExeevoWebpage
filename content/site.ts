export type NavLink = { label: string; href: string };

export const site = {
  name: "Exeevo",
  tagline: "A unified, AI-powered life sciences CRM built natively on Microsoft.",
  demoHref: "/services#demo",
  videoUrl: "[VIDEO URL]",
  /** Primary navigation (new design): plain links, no dropdowns. Industries is not in the bar (Partnerships replaced it); the footer links go to the filtered Platform page. Solutions by role is no longer linked from the nav or footer; the page stays live. */
  nav: [
    { label: "Platform", href: "/platform" },
    { label: "Ask-Nova", href: "/ask-nova" },
    { label: "Services", href: "/services" },
    { label: "Why Exeevo", href: "/why-exeevo" },
    { label: "Microsoft", href: "/microsoft" },
    { label: "About", href: "/about" },
    { label: "Partnerships", href: "/partners" },
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
          { label: "Built on Microsoft", href: "/microsoft" },
          { label: "Professional Services", href: "/services" },
        ],
      },
      {
        title: "Industries",
        links: [
          { label: "Pharma", href: "/platform?industry=pharma" },
          { label: "MedTech", href: "/platform?industry=medtech" },
          { label: "Consumer Health", href: "/platform?industry=consumer-health" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Partnerships", href: "/partners" },
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
  /** Mobile sheet groups (Platform's modules come from content/modules.ts). */
  mobile: {
    more: [
      { label: "Ask-Nova", href: "/ask-nova" },
      { label: "Why Exeevo", href: "/why-exeevo" },
      { label: "Services", href: "/services" },
      { label: "Resources", href: "/resources" },
    ],
  },
} as const;
