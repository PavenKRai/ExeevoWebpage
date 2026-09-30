export type Category = "commercial" | "medical" | "platform" | "ai";

export type Module = {
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  menuBlurb: string;
  summary: string;
  headline: string;
  lead: string;
  features: { title: string; body: string }[];
  fitTitle: string;
  fit: string[];
  link?: { label: string; href: string };
};

export const platformPage = {
  label: "Platform",
  h1: "Everything in one view",
  intro:
    "Eight modules, one data model, one license. Read this once and you know the whole platform. Click through only where you need more.",
  overview: { name: "Platform overview", blurb: "All eight modules, one screen" },
  band: {
    text: "Role-specific tools for Field Reps, MSLs, Key Account Managers, and Consumer/Animal Health teams are covered once, in Solutions by Role, rather than repeated on every module page.",
    cta: "Solutions by Role",
    href: "/solutions-by-role",
  },
} as const;

const FIT = "Good fit if you need";

export const modules: Module[] = [
  {
    slug: "crm-sales",
    name: "CRM (Sales)",
    category: "commercial",
    categoryLabel: "Commercial",
    menuBlurb: "Territory, targeting, call planning",
    summary:
      "HCP targeting and segmentation, territory alignment, call planning, and sample compliance, built around the metric that actually matters: call-plan attainment.",
    headline: "Engineered around the pharma call cycle.",
    lead: "Territory alignment, HCP targeting, and call planning designed for how pharma commercial teams are actually measured: call-plan attainment, reach and frequency, and share of voice by brand.",
    features: [
      { title: "HCP targeting by tier and potential", body: "Rank HCPs by potential, so reps and KAMs always work the list that drives results." },
      { title: "Compliant rep-triggered email", body: "Pre-approved content sent automatically after a call, logged for MLR audit. No manual follow-up required." },
      { title: "Sample & voucher management", body: "E-signature capture and inventory reconciliation at the point of the call, with Sunshine Act reporting handled automatically." },
    ],
    fitTitle: FIT,
    fit: [
      "Reps consistently hitting call-plan attainment targets",
      "Territories realigned continuously to real HCP potential",
      "Reach and frequency visibility by brand, segment, and rep",
    ],
  },
  {
    slug: "medical-crm",
    name: "Medical CRM",
    category: "medical",
    categoryLabel: "Medical",
    menuBlurb: "Scientific plans, adverse events, KOLs",
    summary:
      "Scientific plans, adverse event and medical inquiry case management, KOL engagement tracking for Medical Affairs and MSLs.",
    headline: "Purpose-built for Medical Affairs.",
    lead: "Scientific plans, adverse event tracking, and medical inquiry management designed around how MSLs and Medical Affairs teams actually work.",
    features: [
      { title: "Scientific plans", body: "Set goals and track engagement against therapeutic objectives." },
      { title: "Adverse event management", body: "Automated, audit-ready workflows shared with Sales and Regulatory." },
      { title: "Medical inquiry handling", body: "Intake through resolution, logged from CRM, phone, email, or web." },
    ],
    fitTitle: FIT,
    fit: [
      "A compliant, auditable path for adverse events",
      "KOL relationship tracking distinct from commercial CRM",
      "Scientific content tied to real engagement history",
    ],
  },
  {
    slug: "marketing-automation",
    name: "Marketing Automation",
    category: "commercial",
    categoryLabel: "Commercial",
    menuBlurb: "Omnichannel HCP journeys",
    summary:
      "Omnichannel HCP journeys, segment building, and campaign reporting, built on the same data Sales and Medical already see.",
    headline: "Personalize at scale, without a separate martech stack.",
    lead: "Orchestrate omnichannel HCP journeys using the same data Sales and Medical already see. No exporting lists between systems.",
    features: [
      { title: "Journey builder", body: "Design multi-channel journeys triggered by real HCP behavior." },
      { title: "Segment builder", body: "Build audiences from unified CRM + engagement data." },
      { title: "Automated sales handoff", body: "Route hot leads to reps the moment they're ready." },
    ],
    fitTitle: FIT,
    fit: [
      "Campaigns that reflect real-time field activity",
      "One system Marketing, Medical, and Sales all trust",
      "Compliant email, SMS, and social orchestration",
    ],
  },
  {
    slug: "event-management",
    name: "Event Management",
    category: "commercial",
    categoryLabel: "Commercial",
    menuBlurb: "Virtual, hybrid, in-person events",
    summary:
      "Plan, run, and report on virtual, hybrid, and in-person events, from speaker programs to symposiums, with native Teams webinars.",
    headline: "Run compliant events end to end.",
    lead: "From speaker programs to symposiums: budgeting, registration, and native Microsoft Teams webinars in one workflow.",
    features: [
      { title: "Full lifecycle planning", body: "Budgets, registration, agendas, speakers, and sponsors in one place." },
      { title: "Native Teams webinars", body: "Live streaming, translation, and Q&A moderation built in." },
      { title: "Post-event reporting", body: "Attendance and engagement flow straight into Customer Insights." },
    ],
    fitTitle: FIT,
    fit: [
      "Virtual, hybrid, and in-person events on one platform",
      "GDPR/HIPAA-compliant registration and content",
      "Event data connected to the rest of your CRM",
    ],
  },
  {
    slug: "content-management",
    name: "Content Management",
    category: "platform",
    categoryLabel: "Platform",
    menuBlurb: "Compliant DAM & MLR review",
    summary:
      "Compliant digital asset management with MLR review built into Microsoft Teams, e-signatures, and full audit trails.",
    headline: "Compliant content, without the review bottleneck.",
    lead: "A digital asset management system with MLR review built directly into Microsoft Teams, where your teams already work.",
    features: [
      { title: "MLR review workflows", body: "Review, annotate, and approve inside Teams. No context switching." },
      { title: "E-signatures & audit trails", body: "Full traceability on every content change and approval." },
      { title: "Permission-based access", body: "Granular control by role: Writer, Editor, Approver, Admin." },
    ],
    fitTitle: FIT,
    fit: [
      "Faster MLR turnaround without new tools to learn",
      "One global, searchable content repository",
      "Reliable audit trails for regulatory review",
    ],
  },
  {
    slug: "customer-insights",
    name: "Customer Insights",
    category: "platform",
    categoryLabel: "Platform",
    menuBlurb: "Unified 360° customer profile",
    summary:
      "Unifies data from every source into one customer profile, with out-of-box models for churn, lifetime value, and sentiment.",
    headline: "One customer profile, built from every data source.",
    lead: "A no-code data unification layer that turns fragmented sources into a single 360° view, with prediction models ready out of the box.",
    features: [
      { title: "Data unification", body: "Connect sources, define matching rules, get one customer record." },
      { title: "Out-of-box AI models", body: "Churn, lifetime value, product recommendation, sentiment." },
      { title: "Flexible exports", body: "Push segments to ad platforms or full tables to Azure Data Lake." },
    ],
    fitTitle: FIT,
    fit: [
      "A single source of truth across CRM + third-party data",
      "Self-service analytics without a data science team",
      "Prediction models you don't have to build from scratch",
    ],
  },
  {
    slug: "mobile-app",
    name: "Mobile App",
    category: "commercial",
    categoryLabel: "Commercial",
    menuBlurb: "Offline-capable field & MSL app",
    summary:
      "Every module, offline-capable, with voice-to-text capture and geo-routing for field reps, MSLs, and account managers.",
    headline: "The full platform, offline-capable, in the field.",
    lead: "Voice-to-text capture, geo-routing, and every core module, built for reps and MSLs who spend their day away from a desk.",
    features: [
      { title: "Offline-first", body: "Full functionality with no connection; auto-syncs when back online." },
      { title: "Voice-to-text capture", body: "Log visits and notes hands-free, right after a call." },
      { title: "Geo-routing", body: "Plans the most efficient route across scheduled and nearby visits." },
    ],
    fitTitle: "Role-specific tools live here",
    fit: [
      "Field Reps: call cycle plans, territory routing",
      "MSLs: scientific plans, case routing",
      "Account Managers: CPQ, bids & tenders",
    ],
    link: { label: "See full role breakdown", href: "/solutions-by-role" },
  },
  {
    slug: "ask-nova-studio",
    name: "Ask-Nova Studio",
    category: "ai",
    categoryLabel: "Platform / AI",
    menuBlurb: "Build custom AI agents for your workflows",
    summary:
      "Build and configure AI agents scoped to your own data and compliance guardrails, for scientific summarization, call prep, and workflows beyond the built-in AI in each module.",
    headline: "Real agentic AI, engineered for your workflows.",
    lead: "Every module ships with AI built in. Ask-Nova Studio goes further: a workspace for configuring your own AI agents on top of your CRM data, scoped to the compliance guardrails already built into the platform.",
    features: [
      { title: "Custom agent configuration", body: "Build agents for scientific summarization, call prep, or case triage, trained on your own data." },
      { title: "Compliance-scoped by design", body: "Agents inherit the same permissioning, audit trail, and regulatory guardrails as the rest of the platform." },
      { title: "Extends, doesn't replace", body: "Works alongside the AI already built into CRM, Medical, and Marketing, for the workflows those don't cover out of the box." },
    ],
    fitTitle: FIT,
    fit: [
      "An AI agent scoped precisely to one team's workflow",
      "Guardrails that respect the same compliance boundaries as the rest of your CRM",
      "A way to extend AI coverage without a separate AI vendor or data export",
    ],
  },
];

export const moduleSlugs = modules.map((m) => m.slug);
export const getModule = (slug?: string | null) => modules.find((m) => m.slug === slug) ?? modules[0];
