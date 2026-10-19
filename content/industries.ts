export type IndustrySlug = "pharma" | "medtech";

export const industries = {
  /** Kept for the Solutions by role page; the redesigned Industries page no longer shows it. */
  closing: { line: "Looking at it from a single role instead?", cta: "Solutions by Role", href: "/solutions-by-role" },
  items: {
    pharma: {
      slug: "pharma",
      label: "Pharma",
      h1: "Built for pharma's complexity",
      /** Heading split for the light + bold pairing. */
      heading: { light: "Built for", bold: "pharma's complexity" },
      rulerLabel: "Pharma / by team",
      cardLabel: "Team",
      intro: "Commercial, Medical Affairs, Marketing, and IT teams each get what they need from the same platform, without separate systems or separate vendors.",
      cards: [
        { dot: "var(--ex-blue)", title: "Commercial", link: { label: "Sales CRM", href: "/platform?module=crm-sales" }, body: "Hit call-plan attainment with AI-ranked HCP targets, territories aligned to real potential, and reach-and-frequency visibility by brand." },
        { dot: "var(--ex-magenta)", title: "Medical Affairs", link: { label: "Medical CRM", href: "/platform?module=medical-crm" }, body: "Strengthen KOL relationships, personalize scientific content, and automate regulatory reporting." },
        { dot: "#7A3FC0", title: "Marketing", link: { label: "Marketing Automation", href: "/platform?module=marketing-automation" }, body: "Run fully compliant omnichannel campaigns and measure engagement in real time." },
        { dot: "var(--ex-green)", title: "IT", link: { label: "Compliance", href: "/why-exeevo#compliance" }, body: "Secure, scalable Microsoft-powered infrastructure with FDA 21 CFR Part 11, GDPR, and PIPL compliance built in from day one." },
      ],
    },
    medtech: {
      slug: "medtech",
      label: "MedTech",
      h1: "Commercial complexity beyond the pill",
      heading: { light: "Commercial complexity", bold: "beyond the pill" },
      rulerLabel: "MedTech / by workflow",
      cardLabel: "MedTech",
      intro: "Medical device and diagnostics teams manage capital equipment sales, field service, and clinical education alongside HCP engagement. Exeevo handles both sides on one platform.",
      cards: [
        { dot: "var(--ex-blue)", title: "Capital equipment sales", link: { label: "Sales CRM", href: "/platform?module=crm-sales" }, body: "Track long, multi-stakeholder sales cycles alongside consumables and service contracts." },
        { dot: "var(--ex-magenta)", title: "Field & clinical service", link: { label: "Mobile App", href: "/platform?module=mobile-app" }, body: "Coordinate field service visits, case support, and training alongside commercial engagement." },
        { dot: "#7A3FC0", title: "Contract & tender management", link: { label: "Mobile App", href: "/platform?module=mobile-app" }, body: "Manage bids, tenders, and pricing schemes for institutional and hospital accounts." },
        { dot: "var(--ex-green)", title: "Trade & distribution", link: { label: "Consumer & Animal Health Rep", href: "/solutions-by-role?role=consumer-animal-health" }, body: "Trade account management, shelf/store checks, and inventory visibility for distributed channels." },
      ],
    },
  },
} as const;
