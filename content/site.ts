export type NavLink = { label: string; href: string };

export const site = {
  name: "Exeevo",
  tagline: "A unified, AI-powered life sciences CRM built natively on Microsoft.",
  demoHref: "/getting-started#demo",
  videoUrl: "[VIDEO URL]",
  nav: [
    { label: "Platform", href: "/platform" },
    { label: "Industries", href: "/industries" },
    { label: "Solutions by role", href: "/solutions-by-role" },
    { label: "Why Exeevo", href: "/why-exeevo" },
    { label: "Getting started", href: "/getting-started" },
  ] satisfies NavLink[],
  footer: {
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Overview", href: "/platform" },
          { label: "Why Exeevo", href: "/why-exeevo" },
          { label: "Getting Started", href: "/getting-started" },
        ],
      },
      {
        title: "Industries",
        links: [
          { label: "Pharma", href: "/industries?industry=pharma" },
          { label: "MedTech", href: "/industries?industry=medtech" },
          { label: "Solutions by Role", href: "/solutions-by-role" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "[URL]" },
          { label: "Case Studies", href: "[URL]" },
          { label: "Trust & Compliance", href: "/why-exeevo" },
        ],
      },
    ],
    legal: "© 2026 Exeevo. A division of Valsoft.",
    legalLinks: [
      { label: "Privacy", href: "[URL]" },
      { label: "Cookie Policy", href: "[URL]" },
      { label: "Site Map", href: "[URL]" },
    ],
  },
  industriesMenu: [
    { label: "Pharma", href: "/industries?industry=pharma", blurb: "Commercial, Medical, Marketing, IT" },
    { label: "MedTech", href: "/industries?industry=medtech", blurb: "Device & diagnostics commercial teams" },
  ],
} as const;

export const home = {
  chip: "Life sciences CRM, built natively on Microsoft",
  h1: "Built to grow HCP relationships. Prove it every quarter.",
  paragraph:
    "Exeevo gives commercial, medical, and marketing teams one system to hit call-plan attainment, launch faster, and get more out of every territory, instead of reps and KAMs juggling five disconnected tools.",
  primaryCta: "Get a demo",
  videoCta: "See the platform in 90 seconds",
  heroCards: [
    { title: "Coverage gap flagged", body: "A Tier 1 HCP hasn't been reached this cycle. Added to Thursday's route.", tag: "CRM (Sales)", category: "commercial" },
    { title: "Call prep is ready", body: "Latest publications linked to this KOL's profile before you walk in.", tag: "Ask-Nova", category: "ai" },
    { title: "MLR approved in Teams", body: "E-signature captured. Audit trail logged automatically.", tag: "Content Management", category: "platform" },
  ],
  trust: [
    { icon: "shield", title: "Compliance by design", body: "FDA 21 CFR Part 11, GDPR, PIPL, and more: the regulatory groundwork life sciences teams need, wherever you operate" },
    { icon: "sparkles", title: "AI at its core", body: "Ask-Nova gives every team its own AI agent, purpose-trained on life sciences workflows" },
    { icon: "lock", title: "Your data privacy, guaranteed", body: "Customer data stays inside your own Microsoft environment, never used to train shared AI models across other companies" },
  ],
  pathways: {
    title: "Not sure where to start?",
    subtitle: "Pick the path that matches why you're here.",
    items: [
      { persona: "Evaluating vendors", question: "Comparing platforms for your evaluation?", body: "See how a life sciences-native platform differs from a generic CRM or a stack of point solutions.", cta: "Go to Why Exeevo", href: "/why-exeevo", glow: "magenta" },
      { persona: "Exploring the product", question: "Want to see what's actually included?", body: "All eight modules on one screen, no digging through eight separate pages.", cta: "Go to Platform Overview", href: "/platform", glow: "blue" },
      { persona: "Buying for a team", question: "Need something for Field Reps, MSLs, or KAMs?", body: "Role-specific tools in one place, instead of scattered across product pages.", cta: "Go to Solutions by Role", href: "/solutions-by-role", glow: "green" },
    ],
  },
  outcomes: [
    { statement: "Reps hit their call plan, cycle after cycle", body: "HCP targeting, territory alignment, and cycle tracking flag coverage gaps before a quarter is lost, so call-plan attainment is a number you can see in real time." },
    { statement: "Commercial, medical, and marketing finally share one view of the HCP", body: "No more reconciling three versions of the same account. A KAM, an MSL, and a brand manager working the same HCP all see the same engagement history." },
    { statement: "Launch faster, with less retraining", body: "Built on the Microsoft tools your teams already use daily, so a new launch or territory realignment doesn't come with months of change management." },
  ],
  platformTeaser: {
    title: "Everything in one view.",
    body: "Eight modules, one data model, one license. Read this once and you know the whole platform. Click through only where you need more.",
    legend: [
      { category: "commercial", label: "Commercial", text: "CRM, Marketing, Events, Mobile" },
      { category: "medical", label: "Medical", text: "Medical CRM for MSLs and Medical Affairs" },
      { category: "platform", label: "Platform", text: "Content, Customer Insights" },
      { category: "ai", label: "AI", text: "Ask-Nova Studio" },
    ],
    cta: "Explore all eight modules",
  },
  privacy: {
    title: "Your data stays where you put it.",
    lead: "It never leaves your Microsoft tenant.",
    body: "Your customer data is stored and processed in your own Microsoft Azure environment. We don't sell it, share it, or use it to train AI models across other customers, and it's never moved outside the tenant you control.",
    link: "See how Exeevo compares",
    diagram: {
      boundary: "Your Microsoft tenant",
      chips: ["HCP & customer data", "Ask-Nova agents, scoped to your data", "Dynamics 365, Power Platform, Azure"],
      external: "Shared AI models",
      note: "Stored and processed in your own Azure environment.",
    },
  },
  goLive: {
    title: "Two paths to go live.",
    body: "Both run on the same platform, so moving from one to the other is an expansion, not a migration.",
    cta: "Talk to our team",
    connector: "Expand, don't migrate",
  },
} as const;
