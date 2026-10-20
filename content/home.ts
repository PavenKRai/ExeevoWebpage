/** Home page copy (new design). Headings pair a light phrase (`light`) with one bold ink phrase (`bold`). */
export const home = {
  chip: "Life sciences CRM, built natively on",
  chipBrand: "Microsoft",
  h1: { light: "The Microsoft-native CRM", bold: "for life sciences." },
  paragraph:
    "Give your field force the insight to win every call, and yourself the visibility to prove it every cycle. One CRM for commercial, medical and marketing, running on the Microsoft cloud your company already trusts, so you launch faster and your reps work in the tools they already use.",
  primaryCta: "Get a demo",
  secondaryCta: "Why Microsoft matters",
  recordLabel:
    "Animated demo: a pointer hovers over parts of an HCP record in Exeevo CRM and reveals the Microsoft technology underneath each: Power Platform, Dataverse field security, Microsoft Foundry and global Azure regions.",
  adoption: {
    h2: { light: "Adoption,", bold: "not resistance" },
    lead: "The CRM only pays off if reps use it. Exeevo is built around the field's day, so it becomes the tool they reach for, not the one they log into at the end of the week.",
    items: [
      { title: "Works where reps already are", body: "Outlook, Teams and the native Exeevo mobile app, in a modern interface reps actually want to open." },
      { title: "Offline-first, with voice capture", body: "Full functionality with no connection. Reps log visits hands-free right after a call, and it syncs when they are back online." },
      { title: "Briefed before every visit", body: "Ask-Nova prepares a short brief on the HCP, so reps walk in prepared instead of digging through notes." },
    ],
    label: "Animated demo: a rep opens an Ask-Nova call brief before a visit, records a voice note after it while offline, the note syncs to Exeevo CRM when back online, and an approved follow-up is sent from Teams.",
  },
  licence: {
    h2: { light: "One licence,", bold: "instead of a stack" },
    lead: "A single licence replaces multiple subscriptions. AI is included, and every user can extend the platform with Power Platform at no extra per-user cost.",
  },
  moments: {
    h2: { light: "Purpose-built shows up", bold: "in the moments that matter" },
    lead: "The difference between a generic CRM and one built for life sciences is not a feature list. It is how your teams' day actually goes.",
    generic: "With a generic CRM",
    exeevo: "With Exeevo",
    rows: [
      { title: "Prepping a call", generic: "The rep pieces together notes from the CRM, email and a separate content library before every visit.", exeevo: "Ask-Nova briefs the rep on the HCP from the record page, so they walk in prepared." },
      { title: "Seeing the whole HCP", generic: "Sales, Medical and Marketing each keep their own version of the same account.", exeevo: "A KAM, an MSL and a brand manager working the same HCP all see the same engagement history." },
      { title: "Following up compliantly", generic: "Follow-up emails are written by hand, then chased for MLR approval.", exeevo: "Pre-approved content goes out automatically after the call, logged for MLR audit. No manual follow-up." },
      { title: "Realigning territories", generic: "Every realignment becomes a project: exports, spreadsheets and retraining.", exeevo: "Territories align to real HCP potential, in tools reps already use, without months of change management." },
    ],
  },
  underneath: {
    h2: { light: "Microsoft underneath,", bold: "so your CRM is trusted, tested and always current" },
    cta: "See the full Microsoft stack",
    cards: [
      {
        visual: "trust",
        title: { light: "Trusted", bold: "by IT" },
        body: "Your IT and security teams already approve Microsoft. Exeevo builds on that, so sign-off is faster and customer data is protected to the standard your company already holds.",
        chips: [
          { label: "Entra ID", logo: "/microsoft/entra.png" },
          { label: "Dataverse security", logo: "/microsoft/dataverse.png" },
          { label: "Regional hosting", logo: "/microsoft/azure-regions.png" },
        ],
      },
      {
        visual: "scale",
        title: { light: "Tested", bold: "at global scale" },
        body: "The same Microsoft foundation runs some of the world's largest organisations every day. Your teams get proven reliability from day one, not a platform still finding its feet.",
        note: "Sources: Microsoft FY25 Q3 and FY26 Q1 earnings calls; Exeevo.",
      },
      {
        visual: "updates",
        title: { light: "Always", bold: "up to date" },
        body: "New Microsoft capabilities, including AI, reach your teams as soon as they're released. No upgrade projects, no migrations, and no paying twice for what you already license.",
        chips: [
          { label: "Dynamics 365", logo: "/microsoft/dynamics-customer-service.png" },
          { label: "Microsoft Foundry", logo: "/microsoft/foundry.svg" },
          { label: "Copilot Studio", logo: "/microsoft/copilot-studio.svg" },
        ],
      },
    ],
  },
  outcomesHead: {
    h2: { light: "What changes", bold: "for your teams" },
    lead: "Three outcomes commercial, medical and marketing leaders see once everyone works in one system.",
  },
  closing: {
    h2: { light: "Pharma-ready CRM,", bold: "on the cloud your IT team already runs" },
    primary: "Get a demo",
    secondary: "Built on Microsoft",
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
} as const;
