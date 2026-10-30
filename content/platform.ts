/** Platform page content (from the Platform design). Capabilities are server-rendered; the explorer filters them in the browser. */
export type PlatformIndustry = "Pharma" | "MedTech" | "Consumer Health";
export type Capability = {
  id: string;
  name: string;
  promise: string;
  industries: PlatformIndustry[];
  roles: string[];
  outcomes: string[];
  ai: string;
  /** Web, Tablet, Phone, Offline. */
  avail: boolean[];
  features: { title: string; body: string; industry?: PlatformIndustry; link?: { label: string; href: string } }[];
  /** "Powered by" partner shown under the outcomes (Medical Affairs: Anju). */
  poweredBy?: { prefix: string; name: string; logo: string; href: string; cta: string };
  /** Optional screenshot (16:10, click to enlarge). Without one, the design's dashed placeholder frame shows. */
  shot?: string;
  /** Pixel size of the screenshot when it is not 1600 x 1000. */
  shotSize?: [number, number];
  /** Several screenshots: shown as a carousel, in this order, each with the label for the frame's title bar. Replaces `shot`. */
  shots?: { src: string; label: string; size?: [number, number] }[];
};

export const platformPage = {
  h1: { light: "Everything in", bold: "one view" },
  lead: "See what each capability does, who uses it and what changes for the business.",
  devices: {
    title: "One platform, wherever your teams work",
    items: ["Web", "Tablet", "Phone", "Offline in the field"],
  },
  filter: {
    title: "Filter capabilities",
    industryLabel: "Filter by industry",
    all: "All industries",
    usedBy: "Used by",
    roleLabel: "Filter by who uses it",
    allRoles: "All roles",
    jump: "Jump to a capability",
  },
  empty: "No capabilities match this combination. Try another industry or role.",
  shown: (n: number) => `${n} ${n === 1 ? "capability" : "capabilities"} shown`,
  section: {
    usedBy: "Used by",
    ai: "Ask-Nova AI",
    availableOn: "Available on",
    allShown: "All features shown above.",
    shotTitle: (n: string) => `Screenshot: ${n}`,
    shotNote: "1600 × 1000 px recommended",
    frame: (n: string) => `Exeevo CRM · ${n}`,
    shotAlt: (n: string) => `Screenshot of ${n} in Exeevo CRM`,
    enlarge: (n: string) => `Enlarge the ${n} screenshot`,
    closeShot: "Close screenshot",
    prevShot: "Previous screenshot",
    nextShot: "Next screenshot",
    goToShot: "Go to screenshot {n}",
    shotGroup: (n: string, count: number) => `${n}: ${count} screenshots`,
    shotLabelAlt: (n: string, label: string) => `${n} screenshot: ${label}`,
  },
  devicesList: ["Web", "Tablet", "Phone", "Offline"],
  cta: {
    h2: { light: "See these capabilities", bold: "working for your teams" },
    lead: "Book a demo and we'll walk through the capabilities that matter to your business, with your industry and your roles in mind.",
    primary: "Get a demo",
    secondary: "Talk to our team",
  },
} as const;

export const platformIndustries: { name: PlatformIndustry; color: string }[] = [
  { name: "Pharma", color: "var(--ex-blue)" },
  { name: "MedTech", color: "var(--ex-magenta)" },
  { name: "Consumer Health", color: "var(--ex-green)" },
];

/** URL slugs for the filtered views (`/platform?industry=medtech`, `/platform?role=msl`), used by the footer and the old Industries / Solutions by role redirects. */
export const industrySlugs: Record<string, PlatformIndustry> = { pharma: "Pharma", medtech: "MedTech", "consumer-health": "Consumer Health" };
export const roleSlugs: Record<string, string> = { "field-rep": "Field reps", msl: "MSLs", kam: "Key account managers" };

export const platformRoles: string[] = [
  "Field reps",
  "First-line managers",
  "Key account managers",
  "MedTech reps",
  "Contract teams",
  "MSLs",
  "Medical information",
  "Medical directors",
  "Brand managers",
  "Omnichannel teams",
  "Event managers",
  "Brand teams",
  "Medical teams",
  "MLR reviewers",
  "Compliance teams",
  "Commercial operations",
  "Sales managers",
  "Commercial excellence",
  "Admins and IT",
  "Pharmacy reps",
  "Trade marketing",
  "Clinical specialists",
  "Inventory and logistics",
];

/** Old module slugs (Home cards, mega menu, redirects) mapped to the capability that now covers them. */
export const moduleToCapability: Record<string, string> = {
  "crm-sales": "field-sales",
  "mobile-app": "field-sales",
  "medical-crm": "medical",
  "marketing-automation": "marketing",
  "event-management": "events",
  "content-management": "content",
  "customer-insights": "insights",
  "ask-nova-studio": "ask-nova",
};

export const capabilities: Capability[] = [
  {
    id: "field-sales",
    shots: [
      { src: "/platform/field-sales-0.webp", label: "My customers · goal completion by customer", size: [1855, 1156] },
      { src: "/platform/field-sales-1.webp", label: "Recommended customers · priority clusters on the map" },
      { src: "/platform/field-sales-2.webp", label: "Why a customer is recommended · the top factors" },
      { src: "/platform/field-sales-3.webp", label: "Visit list · planned by area on the map" },
    ],
    name: "Field Sales",
    promise: "Every rep working the right HCPs, every quarter.",
    industries: ["Pharma", "MedTech", "Consumer Health"],
    roles: ["Field reps", "First-line managers"],
    outcomes: [
      "Higher call-plan attainment, territory by territory",
      "Follow-ups that happen every time, not when reps remember",
      "Every sample accounted for and audit-ready",
    ],
    ai: "AI contact and account summaries before every call.",
    avail: [true, true, true, true],
    features: [
      {
        title: "Territories and call plans",
        body: "Territories and HCP targets set by tier and potential, with call plans that update themselves when segments change mid-cycle, so reps always work the right list.",
      },
      {
        title: "In-call content",
        body: "Present approved content in person or remotely, with what was shown logged to the call.",
      },
      {
        title: "Approved email",
        body: "Reps send MLR-approved emails from templates, personalised only within approved fields and checked against consent before sending, with opens and clicks logged to the HCP record.",
      },
      {
        title: "Samples",
        body: "Sample drops with HCP e-signature, digital sample requests shipped by your 3PL, licence checks before every drop, and inventory reconciliation, so every sample is accounted for.",
        industry: "Pharma",
      },
      {
        title: "Field coaching",
        body: "Managers record coaching reports from ride-alongs against agreed competencies, so development is tracked, not remembered.",
      },
      {
        title: "Surveys and assessments",
        body: "Structured surveys and customer assessments during visits, with progress and results by territory.",
      },
      {
        title: "Visit routing",
        body: "Nearby customers and efficient routes across planned visits, so reps spend more time with HCPs and less in traffic.",
      },
    ],
  },
  {
    id: "accounts",
    shots: [
      { src: "/platform/accounts-0.webp", label: "Order entry · quantities by delivery with live pricing" },
      { src: "/platform/accounts-1.webp", label: "Order offers · add your own custom offers and more" },
    ],
    name: "Account Management",
    promise: "Plan, price and win at the account level.",
    industries: ["Pharma", "MedTech", "Consumer Health"],
    roles: ["Key account managers", "MedTech reps", "Contract teams"],
    outcomes: [
      "One view of every key account and who influences it",
      "Pipeline visible from first conversation to order",
      "Orders that reach the ERP right the first time",
    ],
    ai: "AI account summaries before every account meeting.",
    avail: [true, true, true, true],
    features: [
      {
        title: "Account plans",
        body: "Every stakeholder in a hospital or institution mapped, with SWOT and shared objectives, so the account team works one plan instead of five spreadsheets.",
      },
      {
        title: "Opportunities",
        body: "Deals tracked by stage, value and expected close, with required fields at each stage, so pipeline reviews run on real data.",
      },
      {
        title: "Pricing and contracts",
        body: "Account-specific prices, discounts and contracts applied automatically to quotes and orders.",
      },
      {
        title: "Order management",
        body: "Direct and wholesaler orders with approvals and ERP sync, so customer service stops re-keying.",
      },
    ],
  },
  {
    id: "medical",
    shot: "/platform/medical.png",
    name: "Medical Affairs",
    promise: "Scientific engagement, kept separate from promotion.",
    industries: ["Pharma", "MedTech"],
    roles: ["MSLs", "Medical information", "Medical directors"],
    outcomes: [
      "Medical engagement you can measure, not just log",
      "Inquiry response times you can report on",
      "Confidence that no adverse event gets stuck in the field",
    ],
    ai: "Insight tagging and scientific summaries.",
    avail: [true, true, true, true],
    poweredBy: { prefix: "Powered by", name: "Anju", logo: "/partners/anju.png", href: "/partners#sol", cta: "Explore Medical Affairs Solutions" },
    features: [
      {
        title: "Scientific plans",
        body: "Objectives per expert and therapy area, the MSL’s equivalent of a call plan, so engagement follows a strategy.",
      },
      {
        title: "KOL profiles and tiering",
        body: "Affiliations, publications and engagement history in one profile, with local, regional and global tiers and clear owners.",
      },
      {
        title: "KOL nomination",
        body: "Reps and MSLs nominate local experts for regional or global status, routed for review and approval, so the global list reflects what the field knows.",
      },
      {
        title: "Medical inquiries",
        body: "Raised by MSLs and reps in the field, or received from any channel, and routed to the medical information team to respond, with a complete record of question and answer.",
      },
      {
        title: "Adverse event capture",
        body: "Events captured where they’re heard and routed to your safety system on time, so nothing sits in someone’s notes.",
      },
      {
        title: "Medical insights",
        body: "Insights from the field tagged with priority and reference links, so Medical sees themes across conversations.",
      },
    ],
  },
  {
    id: "marketing",
    shot: "/platform/marketing.png",
    name: "Marketing and Omnichannel",
    promise: "Journeys that know what happened in the field.",
    industries: ["Pharma", "MedTech", "Consumer Health"],
    roles: ["Brand managers", "Omnichannel teams"],
    outcomes: [
      "Campaigns in step with what the field is doing this week",
      "One audience definition Sales, Marketing and Medical all trust",
      "Consent issues caught before a message goes out",
    ],
    ai: "Next-best-message and content suggestions.",
    avail: [true, false, false, false],
    features: [
      {
        title: "Journeys",
        body: "Email, SMS, web and social journeys triggered by what HCPs do (opens, visits, event attendance), with consent checked at every step.",
      },
      {
        title: "Segments",
        body: "Audiences built from CRM, engagement and prescribing data in one place, so campaigns don’t wait on list exports.",
      },
      {
        title: "Field alerts",
        body: "Engaged HCPs flagged to their rep while interest is high, so marketing and the field act on the same moment.",
      },
      {
        title: "Approved email at scale",
        body: "The same MLR-approved templates reps use, sent at scale through journeys and campaigns.",
      },
    ],
  },
  {
    id: "events",
    shot: "/platform/events.png",
    name: "Events",
    promise: "Speaker programmes to congresses, in one workflow.",
    industries: ["Pharma", "MedTech", "Consumer Health"],
    roles: ["Event managers", "Brand teams", "Medical teams"],
    outcomes: [
      "Every event’s cost and attendance in one place",
      "Event engagement visible to the reps who follow up",
      "Transparency reporting that includes events automatically",
    ],
    ai: "Post-event summaries and follow-up suggestions.",
    avail: [true, true, true, false],
    features: [
      {
        title: "Event planning",
        body: "In-person, virtual and hybrid events, with budgets, speakers and logistics in one workflow, so the team stops stitching together spreadsheets and email.",
      },
      {
        title: "Registration and Teams webinars",
        body: "Registration plus native Microsoft Teams webinars with live streaming, translation and Q&A moderation, with no separate webinar tool to buy or validate.",
      },
      {
        title: "Speaker eligibility and contracts",
        body: "Approved speakers flagged from KOL profiles, with agreements, fees and annual caps tracked per speaker.",
      },
      {
        title: "Expert engagements (fee-for-service)",
        body: "HCP consulting work justified, contracted and certified before it’s paid, with HCPs logging hours and expenses in their own portal.",
      },
      {
        title: "Check-in",
        body: "Attendees checked in at the event, with records kept in step with registration status.",
      },
    ],
  },
  {
    id: "content",
    name: "Content and MLR",
    promise: "Approved content, faster, wherever it’s used.",
    industries: ["Pharma", "MedTech", "Consumer Health"],
    roles: ["Brand managers", "Medical teams", "MLR reviewers"],
    outcomes: [
      "Faster MLR turnaround",
      "No expired content in front of HCPs",
      "Content decisions based on real usage",
    ],
    ai: "Compliance checks before content reaches review.",
    avail: [true, true, false, false],
    features: [
      {
        title: "MLR review in Teams",
        body: "Reviewers approve where they already work, with e-signatures, so content stops waiting in inboxes.",
      },
      {
        title: "Content library",
        body: "Versions, expiry dates and role-based permissions, so an expired asset can’t reach an HCP.",
      },
      {
        title: "Content usage tracking",
        body: "The same approved asset in calls, emails and events, with usage tracked, so you can see which content works.",
      },
      {
        title: "Localisation",
        body: "Local versions of global assets, each with its own approval.",
      },
    ],
  },
  {
    id: "compliance",
    shot: "/platform/compliance.png",
    name: "Compliance and Transparency",
    promise: "Compliant by design, in every market you sell in.",
    industries: ["Pharma", "MedTech", "Consumer Health"],
    roles: ["Compliance teams", "Field reps", "Commercial operations"],
    outcomes: [
      "Disclosure reports without a year-end scramble",
      "Consent you can prove in an audit",
      "One compliance model across markets",
    ],
    ai: "Compliance scanning of call notes and messages.",
    avail: [true, true, true, true],
    features: [
      {
        title: "Transparency reporting",
        body: "Transfers of value from calls, samples, meals and events collected as they happen, ready for Sunshine Act (Open Payments) and EFPIA disclosure.",
      },
      {
        title: "Consent management",
        body: "Consent by channel and topic, HCP self-service preference pages, and topic-level opt-outs synced with marketing, so no message breaks an HCP’s preferences.",
      },
      {
        title: "Prescriber data restrictions",
        body: "PDRP opt-outs applied automatically, and Rx data hidden for flagged contacts, so reps never see data they shouldn’t.",
      },
      {
        title: "Spend caps",
        body: "Per-HCP and per-event limits enforced as spend is entered.",
      },
      {
        title: "Audit trail and validation",
        body: "Full audit history, 21 CFR Part 11, GDPR and PIPL.",
      },
    ],
  },
  {
    id: "insights",
    shot: "/platform/insights.png",
    name: "Insights and Analytics",
    promise: "From activity to impact, by brand and territory.",
    industries: ["Pharma", "MedTech", "Consumer Health"],
    roles: ["Sales managers", "Field reps", "Commercial excellence"],
    outcomes: [
      "Quarterly reviews built on live data, not slides",
      "Managers who know where to step in",
      "Reps who know which customers to see next",
    ],
    ai: "AI summaries and recommended next engagements.",
    avail: [true, true, true, false],
    features: [
      {
        title: "Actionable rep metrics",
        body: "Call plan progress and customer-level metrics shown inside the rep’s daily screens, each with a clear next action, so reps act without opening a report.",
      },
      {
        title: "Customer 360",
        body: "Every interaction with a customer on one profile, with an AI summary and where they stand on the adoption journey for each product.",
      },
      {
        title: "Team dashboards",
        body: "Call-plan attainment, reach and frequency, and meeting and email engagement by rep and team, so managers coach on facts.",
      },
      {
        title: "Reporting",
        body: "Your own reports on the same data, alongside the standard dashboards.",
      },
    ],
  },
  {
    id: "ask-nova",
    name: "Ask-Nova",
    promise: "AI in every capability, and agents you configure yourself.",
    industries: ["Pharma", "MedTech", "Consumer Health"],
    roles: ["Every user", "Admins and IT"],
    outcomes: [
      "Answers in seconds instead of report requests",
      "AI your compliance team will approve",
      "No separate AI vendor or data export",
    ],
    ai: "This is the AI layer. Every other capability lists what it adds there.",
    avail: [true, true, true, false],
    features: [
      {
        title: "AI assistant",
        body: "Ask in plain language and get answers from your own CRM data, instead of exporting to Excel to find out.",
      },
      {
        title: "Ask-Nova Studio",
        body: "Configure agents for call prep, scientific summaries or case triage, grounded in your data and your workflows.",
      },
      {
        title: "Built-in guardrails",
        body: "Agents inherit the platform’s permissions, audit trail and compliance rules, so IT and Compliance can say yes.",
      },
      {
        title: "Ask-Nova Plus",
        body: "",
        link: { label: "Explore Ask-Nova features in depth", href: "/ask-nova" },
      },
    ],
  },
  {
    id: "retail",
    name: "Retail Execution",
    promise: "Win at the pharmacy shelf, store by store.",
    industries: ["Consumer Health"],
    roles: ["Pharmacy reps", "Trade marketing", "Key account managers"],
    outcomes: [
      "Promotion compliance visible across every store",
      "Stock-outs caught before they cost sales",
      "More orders per visit",
    ],
    ai: "Store prioritisation from offtake trends.",
    avail: [true, true, true, true],
    features: [
      {
        title: "Store checks",
        body: "Shelf presence, pricing, placement and promotion compliance captured in a few taps, so trade marketing sees the shelf as it is.",
      },
      {
        title: "Offtake checks",
        body: "Stock and sell-out recorded per store, so replenishment follows real demand.",
      },
      {
        title: "Pharmacy orders",
        body: "Turn a store visit into an order on the spot, routed through the pharmacy’s wholesaler.",
      },
      {
        title: "Photo capture",
        body: "Shelf and display photos attached to the visit as evidence.",
      },
    ],
  },
  {
    id: "cases",
    name: "Cases, Assets and Kits",
    promise: "Every procedure covered, every device and kit accounted for.",
    industries: ["MedTech"],
    roles: ["MedTech reps", "Clinical specialists", "Inventory and logistics"],
    outcomes: [
      "Procedure and product usage captured the same day",
      "A full view of the installed base by account",
      "Kits and demo units where they’re needed, when they’re needed",
    ],
    ai: "Kit demand and procedure trends.",
    avail: [true, true, true, true],
    features: [
      {
        title: "Procedure logging",
        body: "Log each procedure attended, the surgeon and the products used, so usage and replenishment start from the theatre, not a phone call.",
      },
      {
        title: "Device register",
        body: "Every device in your accounts with its location and owner, so reps know what’s installed before they walk in.",
      },
      {
        title: "Demo and kit booking",
        body: "Book demo units and raise kit requests for upcoming surgeries, with status updates from your logistics systems, so no procedure waits on a missing set.",
      },
      {
        title: "Surgeon preferences",
        body: "Each surgeon’s preferred products and set-up per procedure, so the right kit is prepared every time.",
      },
    ],
  },
];
