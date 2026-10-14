/** Home page copy (new design). Headings pair a light phrase (`light`) with one bold ink phrase (`bold`). */
export const home = {
  chip: "Life sciences CRM, built natively on",
  chipBrand: "Microsoft",
  h1: { light: "Built to grow HCP relationships.", bold: "Prove it every quarter." },
  paragraph:
    "Exeevo gives commercial, medical, and marketing teams one system to hit call-plan attainment, launch faster, and get more out of every territory, instead of reps and KAMs juggling five disconnected tools.",
  primaryCta: "Get a demo",
  videoCta: "See the platform in 90 seconds",
  demo: {
    title: "Exeevo CRM · Field view",
    app: "Exeevo CRM",
    list: "My HCPs · this cycle",
    count: "04",
    tiers: ["Tier 1", "Tier 1", "Tier 2", "Tier 3"],
    hcp: { name: "Tier 1 HCP", meta: "HCP 360 · CRM (Sales)" },
    alert: { title: "Coverage gap flagged", body: "A Tier 1 HCP hasn't been reached this cycle." },
    add: "+ Add to route",
    added: "Added to Thursday's route",
    ask: { placeholder: "Ask Nova anything…", typed: "Prep me for this call" },
    reply: { title: "Call prep is ready", body: "Latest publications linked to this KOL's profile before you walk in." },
    toast: { title: "MLR approved in Teams", body: "E-signature captured. Audit trail logged." },
    label:
      "Animated demo: a rep opens a Tier 1 HCP, sees a coverage gap flagged and adds the visit to Thursday's route, asks Ask-Nova to prep the call, and receives an MLR approval in Teams.",
  },
  trust: [
    { icon: "shield", title: "Compliance by design", body: "FDA 21 CFR Part 11, GDPR, PIPL, and more: the regulatory groundwork life sciences teams need, wherever you operate" },
    { icon: "sparkles", title: "AI at its core", body: "Ask-Nova gives every team its own AI agent, purpose-trained on life sciences workflows" },
    { icon: "lock", title: "Your data privacy, guaranteed", body: "Customer data stays inside your own Microsoft environment, never used to train shared AI models across other companies" },
  ],
  outcomes: [
    {
      visual: "cycle",
      statement: "Reps hit their call plan, cycle after cycle",
      body: "HCP targeting, territory alignment, and cycle tracking flag coverage gaps before a quarter is lost, so call-plan attainment is a number you can see in real time.",
      cycle: { left: "Call cycle", right: "Tier 1 HCPs", flag: "Coverage gap flagged" },
    },
    {
      visual: "hcp",
      statement: "Commercial, medical, and marketing finally share one view of the HCP",
      body: "No more reconciling three versions of the same account. A KAM, an MSL, and a brand manager working the same HCP all see the same engagement history.",
      hcp: { roles: ["KAM", "MSL", "Brand manager"], card: "One HCP", sub: "Same engagement history" },
    },
    {
      visual: "launch",
      statement: "Launch faster, with less retraining",
      body: "Built on the Microsoft tools your teams already use daily, so a new launch or territory realignment doesn't come with months of change management.",
      launch: { tools: ["Outlook", "Teams", "Dynamics 365", "Power Platform"], from: "Kick-off", to: "New launch live" },
    },
  ],
  platform: {
    h2: { light: "Everything", bold: "in one view" },
    body: "Eight modules, one data model, one license. Read this once and you know the whole platform. Click through only where you need more.",
    legend: [
      { category: "commercial", text: "Commercial: CRM, Marketing, Events, Mobile" },
      { category: "medical", text: "Medical: Medical CRM for MSLs and Medical Affairs" },
      { category: "platform", text: "Platform: Content, Customer Insights" },
      { category: "ai", text: "AI: Ask-Nova Studio" },
    ],
    cta: "Explore all eight modules",
    /** Card titles break onto two lines as in the design. */
    breaks: { "crm-sales": ["CRM", "(Sales)"], "mobile-app": ["Mobile", "App"] } as Record<string, string[]>,
  },
  privacy: {
    h2: { light: "Your data stays where you put it.", bold: "It never leaves your Microsoft tenant." },
    body: "Your customer data is stored and processed in your own Microsoft Azure environment. We don't sell it, share it, or use it to train AI models across other customers, and it's never moved outside the tenant you control.",
    link: "See how Exeevo compares",
    diagram: {
      boundary: "Your Microsoft tenant",
      chips: [
        { icon: "person", text: "HCP & customer data" },
        { icon: "agent", text: "Ask-Nova agents, scoped to your data" },
        { icon: "grid", text: "Dynamics 365, Power Platform, Azure" },
      ],
      external: "Shared AI models",
      note: "Stored and processed in your own Azure environment.",
      tag: "Never leaves your tenant",
    },
  },
  goLive: {
    h2: { light: "Two paths", bold: "to go live" },
    body: "Both run on the same platform, so moving from one to the other is an expansion, not a migration.",
    cta: "Talk to our team",
  },
  pathways: {
    h2: { light: "Not sure", bold: "where to start?" },
    lead: "Pick the path that matches why you're here.",
    items: [
      { persona: "Evaluating vendors", category: "medical", question: "Comparing platforms for your evaluation?", body: "See how a life sciences-native platform differs from a generic CRM or a stack of point solutions.", cta: "Go to Why Exeevo", href: "/why-exeevo" },
      { persona: "Exploring the product", category: "commercial", question: "Want to see what's actually included?", body: "All eight modules on one screen, no digging through eight separate pages.", cta: "Go to Platform Overview", href: "/platform" },
    ],
  },
} as const;
