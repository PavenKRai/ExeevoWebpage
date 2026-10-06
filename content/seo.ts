/**
 * Per-page search metadata. Titles get " | Exeevo" appended by the root template (home sets its own full title).
 * Descriptions are assembled only from facts already in the site copy (content/*.ts); keep them <= 155 characters.
 */
export type PageSeo = { path: string; title: string; description: string; absoluteTitle?: boolean };

export const seo = {
  home: {
    path: "/",
    title: "Life sciences CRM built natively on Microsoft | Exeevo",
    absoluteTitle: true,
    description:
      "Exeevo is a unified, AI-powered life sciences CRM built natively on Microsoft. One system for commercial, medical and marketing teams.",
  },
  platform: {
    path: "/platform",
    title: "Life sciences CRM platform: eight modules, one view",
    description:
      "Eight modules, one data model, one license: CRM, Medical CRM, Marketing Automation, Events, Content, Customer Insights, Mobile App and Ask-Nova Studio.",
  },
  why: {
    path: "/why-exeevo",
    title: "Why Exeevo: a CRM built natively for life sciences",
    description:
      "Most CRMs add life sciences features later. Exeevo is built natively for the industry, with 21 CFR Part 11, GDPR, PIPL and HIPAA in your own Microsoft tenant.",
  },
  industries: {
    path: "/industries",
    title: "CRM for pharma and MedTech teams",
    description:
      "Pharma and MedTech teams run commercial, medical, marketing and IT on one platform, without separate systems or separate vendors.",
  },
  roles: {
    path: "/solutions-by-role",
    title: "CRM for Field Reps, MSLs and Key Account Managers",
    description:
      "Role-specific tools for Field Reps, Medical Science Liaisons, Key Account Managers and Consumer & Animal Health reps, all on the same HCP record.",
  },
  start: {
    path: "/getting-started",
    title: "Two paths to go live: Core and Enterprise",
    description:
      "Go live in as little as 4 weeks with Core, or scale across brands and countries with Enterprise. Same platform, so it's an expansion, not a migration.",
  },
} as const satisfies Record<string, PageSeo>;

export const orgFacts = {
  name: "Exeevo",
  legalNote: "A division of Valsoft",
  parent: "Valsoft",
  tagline: "A unified, AI-powered life sciences CRM built natively on Microsoft.",
} as const;
