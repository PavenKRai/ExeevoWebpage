export const whyExeevo = {
  label: "Why Exeevo",
  h1: "Built natively for life sciences",
  intro:
    "Most CRM platforms are general-purpose tools with life sciences features added later, or point solutions that only solve one part of the problem. Here's what a platform built natively for the industry gets you.",
  complianceTitle: "Regulatory & compliance built in",
  tenant: {
    title: "Your data stays where you put it.",
    lead: "It never leaves your Microsoft tenant.",
    body: "Your customer data is stored and processed in your own Microsoft Azure environment. We don't sell it, share it, or use it to train AI models across other customers, and it's never moved outside the tenant you control.",
    cardTitle: "Already part of your Microsoft stack",
    cardBody:
      "No parallel system for IT to secure and patch. Exeevo runs on Dynamics 365, Power Platform, and Azure, the infrastructure your organization has already invested in and your team already knows.",
    rings: { outer: "Your Microsoft tenant", inner: "Your Azure environment", core: "Your customer data" },
  },
} as const;

export const compliance = [
  { name: "21 CFR Part 11", region: "FDA", body: "Compliant audit trails and e-signatures for regulated content, approvals, and case documentation, built directly into the platform." },
  { name: "GDPR", region: "EU", body: "Consent management and data-subject controls built into how HCP and customer data is captured and stored." },
  { name: "PIPL", region: "China", body: "Data residency and localization controls for operating compliantly in China." },
  { name: "HIPAA & Sunshine Act", region: "US", body: "Transparency reporting and PHI safeguards built into the same workflows your commercial and medical teams already use." },
] as const;
