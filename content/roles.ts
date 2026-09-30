export const rolesPage = {
  label: "Solutions by role",
  h1: "Built around how each role works",
  intro: "Consolidated here once, instead of repeated across every product page.",
  closing: { line: "Every role works from the same HCP record, on the same platform.", cta: "Get a demo" },
} as const;

export const roles = [
  {
    slug: "field-rep",
    name: "Field Rep",
    glow: "blue",
    description: "Territory coverage and call-cycle tools built around how details actually get delivered and tracked.",
    capabilities: [
      "Compliant rep-triggered email sent automatically after a call, logged for MLR audit",
      "Sample and voucher management with e-signature capture and inventory reconciliation",
      "Call reporting tied directly to next-best-message recommendations",
    ],
  },
  {
    slug: "msl",
    name: "Medical Science Liaison",
    glow: "magenta",
    description: "Scientific and compliance workflows distinct from commercial CRM.",
    capabilities: [
      "Scientific literature summarization linked to each KOL's profile",
      "Solicited vs. unsolicited medical inquiry routing",
      "Publication and congress tracking tied to KOL engagement history",
    ],
  },
  {
    slug: "kam",
    name: "Key Account Manager",
    glow: "purple",
    description: "Account-level tools for institutional and multi-stakeholder accounts.",
    capabilities: [
      "Plan of action (POA) tracking across every stakeholder on the account",
      "Formulary access, contract, and tender tracking",
      "Shared visibility for Sales, Medical, and Market Access on the same account",
    ],
  },
  {
    slug: "consumer-animal-health",
    name: "Consumer & Animal Health Rep",
    glow: "green",
    description: "Trade and retail-specific tools for consumer-facing field teams.",
    capabilities: [
      "Retail shelf and planogram compliance capture",
      "Trade promotions and order management",
      "Distributor inventory visibility",
    ],
  },
] as const;
