export type Tier = "inc" | "plus" | "tbc";
export type NovaFeature = { num: string; slug: string; name: string; tier: Tier; stage: 0 | 1 | 2 | 3; icon: string; desc: string };

/** Copy comes verbatim from the Ask-Nova design. `tbc` renders the placeholder "[Tier to confirm]" until the tier is decided. */
export const askNova = {
  label: "Ask-Nova Studio & AI",
  h1: "AI before, during and after every customer meeting.",
  /** The h1 as the design sets it: light phrase, then a bold ink phrase. */
  h1Parts: { light: "AI before, during and after", bold: "every customer meeting." },
  intro:
    "Exeevo CRM puts AI where your teams already work. Three features come with every licence; Ask-Nova Plus adds more data, voice, languages, admin tools and openness to the AI tools your teams already use.",
  primaryCta: "Get a demo",
  secondaryCta: "See all 13 features",
  dial: { prev: "Previous feature", next: "Next feature", read: "Read about this feature" },
  tiers: { inc: "Included", plus: "Ask-Nova Plus", tbc: "[Tier to confirm]" },
  stats: [
    { value: "13", label: "AI features, grouped by who uses them and when" },
    { value: "3", label: "included with every licence" },
    { value: "4", label: "places to ask: the CRM app, Teams, Copilot and Claude" },
  ],
  grounded: { title: "Grounded in your data, not trained on it", body: "Answers draw on your CRM and the databases you connect" },
  cycle: { title: "Thirteen features, grouped by who uses them and when", parts: { light: "Thirteen features,", bold: "grouped by who uses them and when" }, all: "All 13 features", groupLabel: "Filter by stage" },
  licensing: {
    label: "Licensing",
    titleBefore: "What comes with every licence, and what",
    titleAfter: "adds",
    parts: { light: "What comes with every licence,", bold: "and what Ask-Nova Plus adds" },
    body: "Every user gets AI on day one. Ask-Nova Plus is for teams that want more data, voice, languages, admin tools and openness to the AI tools they already use.",
    includedTitle: "Included with every licence",
    includedCount: "3 features",
    plusCount: "9 more features",
    plusChips: ["More data", "Voice", "Languages", "Admin tools", "Openness to the AI tools you already use"],
    note: "Select a feature to see it in the meeting cycle below. Ask-Nova Assistant (06): [Tier to confirm].",
    /** Short descriptions shown in the "included" list. */
    includedDesc: {
      "ai-summaries": "A short brief on an HCP, an HCO or the whole territory.",
      "ai-insights": "Flags what is worth knowing, without the rep having to ask.",
      "embedded-note-taker": "Turns a spoken or typed note into the CRM meeting record.",
    } as Record<string, string>,
  },
  studio: {
    label: "Ask-Nova Studio",
    title: "Real agentic AI, engineered for your workflows.",
    parts: { light: "Real agentic AI,", bold: "engineered for your workflows." },
    body: "Build your own AI skills, tools and agents on top of your CRM data, or bring in agents you already use. Exeevo CRM comes with AI built in for every user; Ask-Nova Studio lets you go further, for the workflows that don't come out of the box. Everything runs inside the access rules and compliance guardrails already built into the platform.",
    fitTitle: "Good fit if you need",
    fit: [
      "An AI agent scoped precisely to one team's workflow",
      "Guardrails that follow the same access rules as the rest of your CRM",
      "To extend AI without exporting data to a separate AI platform",
      "To reach CRM data from Teams, Copilot or Claude",
    ],
    platformsLabel: "Available on Exeevo Mobile CRM",
    platforms: ["iOS", "Android", "Windows", "Web"],
    deckLabel: "Key features",
    deckPrev: "Previous key feature",
    deckNext: "Next key feature",
  },
  fits: {
    title: "How it fits together",
    legend: { request: "Request", answer: "Answer" },
    reply: "Answer drawn from your CRM data",
    alt: "Diagram: your CRM records, connected databases, device context and SAP feed Ask-Nova Studio's skills, tools and agents, which answer in the Exeevo CRM app and, via MCP, in Teams, Copilot, Claude, ChatGPT and partner tools, all inside your access rules and compliance guardrails.",
    body: "Teams, Copilot, Claude, ChatGPT and partner tools reach your CRM data through the MCP Server, under each user's own access.",
    data: { label: "Your data", items: [{ name: "CRM records" }, { name: "Databases you connect", note: "As a query or in a no-code editor" }, { name: "Device context" }, { name: "SAP and other business systems" }] },
    studio: { label: "Ask-Nova Studio", name: "Ask-Nova Studio", parts: ["Skills", "Tools", "Agents"], third: "+ Third-party agents", guard: "Inside your existing access rules and compliance guardrails" },
    ask: {
      label: "Where your teams ask",
      items: [
        { name: "Exeevo CRM app", tag: "Built in" },
        { name: "Microsoft Teams", tag: "MCP" },
        { name: "Microsoft Copilot", tag: "MCP" },
        { name: "Claude", tag: "MCP" },
        { name: "ChatGPT and partner tools", tag: "MCP" },
      ],
    },
  },
  trust: {
    label: "Trust",
    title: "The AI works from your data, under your rules",
    parts: { light: "The AI works from your data,", bold: "under your rules" },
    lead: "Agents are grounded in your data, not trained on it.",
    cards: [
      { icon: "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6 M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3", title: "Uses your data", body: "Answers come from your CRM records and the databases you choose to connect." },
      { icon: "M7 11V8a5 5 0 0 1 10 0v3 M5 11h14v10H5z M12 15v2", title: "Respects existing access", body: "Each user sees only what they can already see in the CRM." },
      { icon: "M5 20V10 M10 20V4 M15 20v-7 M20 20V8", title: "Shows how it is used", body: "Usage and the ratings reps give to answers flow into your own dashboards." },
      { icon: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z", title: "Runs in your Microsoft environment", body: "Built on Dynamics 365 and Microsoft Foundry, with the option to use your own Foundry instance." },
    ],
  },
  cta: {
    title: "See Ask-Nova on your own CRM data",
    parts: { light: "See Ask-Nova", bold: "on your own CRM data" },
    body: "We'll walk through the AI your reps get on day one, and what Ask-Nova Plus and Ask-Nova Studio add for your teams.",
    button: "Get a demo",
  },
} as const;

export const novaStages = [
  { short: "Before", long: "Before the meeting", who: "For reps", ruler: "Before" },
  { short: "During and after", long: "During and after", who: "For reps", ruler: "During and after" },
  { short: "Anywhere", long: "Anywhere, any language", who: "For reps", ruler: "Anywhere" },
  { short: "Admins and IT", long: "Admins, IT and partners", who: "For admins, IT and partners", ruler: "Admins, IT and partners" },
] as const;

/** Index of the first feature of each stage (the stage tabs jump here). */
export const stageFirst = [0, 2, 6, 8] as const;

export const features: NovaFeature[] = [
  {
    "num": "01",
    "slug": "ai-summaries",
    "name": "AI Summaries",
    "tier": "inc",
    "stage": 0,
    "icon": "M7 3h10v18H7z M10 8h4 M10 12h4 M10 16h2",
    "desc": "A short brief on an HCP or HCO on its record page, or on the whole territory from the home page, so reps walk in prepared."
  },
  {
    "num": "02",
    "slug": "ai-insights",
    "name": "AI Insights",
    "tier": "inc",
    "stage": 0,
    "icon": "M12 2v3 M12 19v3 M2 12h3 M19 12h3 M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8",
    "desc": "Flags what is worth knowing about the customer or account the rep is viewing, without the rep having to ask."
  },
  {
    "num": "03",
    "slug": "conversation-analysis",
    "name": "Conversation Analysis",
    "tier": "plus",
    "stage": 1,
    "icon": "M3 12h2 M7 8v8 M11 4v16 M15 8v8 M19 10v4",
    "desc": "Captures the meeting and who said what, then pulls out sentiment, key messages, follow-up actions and coaching tips."
  },
  {
    "num": "04",
    "slug": "embedded-note-taker",
    "name": "Embedded Note Taker",
    "tier": "inc",
    "stage": 1,
    "icon": "M4 20l4-1 11-11-3-3L5 16z M14 7l3 3",
    "desc": "Turns a spoken or typed note into the CRM meeting record and sets objectives for the next call."
  },
  {
    "num": "05",
    "slug": "companion-app",
    "name": "Companion App",
    "tier": "plus",
    "stage": 1,
    "icon": "M8 2h8v20H8z M11 18h2",
    "desc": "Fills in the call report after a meeting and detects the HCP, products discussed and next best action."
  },
  {
    "num": "06",
    "slug": "ask-nova-assistant",
    "name": "Ask-Nova Assistant",
    "tier": "tbc",
    "stage": 1,
    "icon": "M4 5h16v11H10l-5 4v-4H4z M8 10h8",
    "desc": "Answers plain-English questions such as “When did I last meet this customer?”, in the CRM app and in Teams, Copilot and Claude."
  },
  {
    "num": "07",
    "slug": "voice-interaction",
    "name": "Voice Interaction",
    "tier": "plus",
    "stage": 2,
    "icon": "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0 M12 18v3",
    "desc": "Reps talk to Ask-Nova hands-free between calls, without typing on a phone or tablet."
  },
  {
    "num": "08",
    "slug": "multi-language-support",
    "name": "Multi-Language Support",
    "tier": "plus",
    "stage": 2,
    "icon": "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18 M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
    "desc": "Questions and note capture in multiple languages, so regional teams work in their own language."
  },
  {
    "num": "09",
    "slug": "ask-nova-studio",
    "name": "Ask-Nova Studio",
    "tier": "plus",
    "stage": 3,
    "icon": "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 16.5h7 M16.5 13v7",
    "desc": "Build custom AI skills, tools and agents on your CRM data, or bring in third-party agents."
  },
  {
    "num": "10",
    "slug": "data-connectivity",
    "name": "Data Connectivity",
    "tier": "plus",
    "stage": 3,
    "icon": "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6 M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3",
    "desc": "Answers draw on CRM data, device context, SAP and other business systems you connect."
  },
  {
    "num": "11",
    "slug": "mcp-server",
    "name": "MCP Server",
    "tier": "plus",
    "stage": 3,
    "icon": "M9 3v5 M15 3v5 M6 8h12v4a6 6 0 0 1-12 0z M12 18v3",
    "desc": "Lets Claude, Copilot, ChatGPT, Teams and partner tools work with your CRM data, under each user's own access."
  },
  {
    "num": "12",
    "slug": "ai-configurator",
    "name": "AI Configurator",
    "tier": "plus",
    "stage": 3,
    "icon": "M4 7h9 M17 7h3 M15 5v4 M4 17h3 M11 17h9 M9 15v4",
    "desc": "Guides admins through setting up a new business unit, from data to territories."
  },
  {
    "num": "13",
    "slug": "ai-support-tool",
    "name": "AI Support Tool",
    "tier": "plus",
    "stage": 3,
    "icon": "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14 M16 16l5 5 M8 11h6",
    "desc": "Lets support and admin teams query CRM data in plain English to resolve issues faster."
  }
];

export const keyFeatures: { t: string; d: string; icon: string }[] = [
  {
    "t": "Custom skills, tools and agents",
    "d": "Build AI for call preparation, post-call reporting or territory analysis, grounded in your CRM data.",
    "icon": "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 16.5h7 M16.5 13v7"
  },
  {
    "t": "Bring in third-party agents",
    "d": "Extend the AI you already have rather than replace it.",
    "icon": "M8 12h8 M12 8v8 M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18"
  },
  {
    "t": "Grounded in your data",
    "d": "Answers draw on your CRM and the databases you connect, set up as a query or in a no-code editor.",
    "icon": "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6 M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"
  },
  {
    "t": "Compliance-scoped by design",
    "d": "Each user sees only the data they can already see in the CRM.",
    "icon": "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z M8.5 12l2.5 2.5 4.5-5"
  }
];
