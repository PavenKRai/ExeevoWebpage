/**
 * Per-page search metadata. Titles get " | Exeevo" appended by the root template (home sets its own full title).
 * Descriptions are assembled only from facts already in the site copy (content/*.ts); keep them <= 155 characters.
 */
export type PageSeo = { path: string; title: string; description: string; absoluteTitle?: boolean };

export const seo = {
  home: {
    path: "/",
    title: "The Microsoft-native CRM for life sciences | Exeevo",
    absoluteTitle: true,
    description:
      "One CRM for commercial, medical and marketing teams: purpose-built for life sciences, with an offline-first mobile app and AI, on the Microsoft cloud.",
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
  askNova: {
    path: "/ask-nova",
    title: "Ask-Nova: AI for life sciences CRM, before and after meetings",
    description:
      "Thirteen AI features for life sciences teams, three included with every licence. Ask-Nova Studio adds agents and MCP inside your CRM access rules.",
  },
  about: {
    path: "/about",
    title: "About Exeevo: life sciences CRM built natively on Microsoft",
    description:
      "Exeevo is a life sciences CRM on Microsoft Dynamics 365, part of Valsoft. Meet the leadership team and find our offices in the US, Canada, India and China.",
  },
  microsoft: {
    path: "/microsoft",
    title: "Life sciences CRM built natively on Microsoft",
    description:
      "Exeevo CRM runs on Power Platform, Dynamics 365, Dataverse, Azure and Foundry: one Microsoft estate for IT, with Microsoft security and compliance underneath.",
  },
  partners: {
    path: "/partners",
    title: "Exeevo partners: technology, implementation, data and compliance",
    description:
      "Microsoft, system integrators, data vendors and compliance partners that deliver Exeevo CRM programmes for life sciences teams across markets and languages.",
  },
  services: {
    path: "/services",
    title: "Life sciences CRM professional services",
    description:
      "Advisory, implementation, data migration, integrations, training and managed services for life sciences CRM, from first workshop to go-live and beyond.",
  },
} as const satisfies Record<string, PageSeo>;

export const orgFacts = {
  name: "Exeevo",
  legalNote: "A division of Valsoft",
  parent: "Valsoft",
  tagline: "A unified, AI-powered life sciences CRM built natively on Microsoft.",
} as const;
