/** Why Exeevo page copy that is not in compliance.ts / comparison.ts (verbatim from the design). */
export const why = {
  heading: { light: "Built natively", bold: "for life sciences" },
  complianceLabel: "Regulatory & compliance built in",
  bestOfBoth: {
    heading: { light: "The best of", bold: "both worlds" },
    body: "Through close collaboration with Microsoft and our accredited implementation partners, Exeevo CRM Suite delivers the best of both worlds: Gold-standard hosting, performance and security, with Exeevo's Life Science capabilities and compliance features built on top.",
    left: "Gold-standard hosting, performance and security",
    right: "Exeevo's Life Science capabilities and compliance features, built on top",
    note: "Microsoft Customers can benefit from their existing investments and deployments, expanding the use of Microsoft's Customer Data Platform, Power Platform, Advanced Analytics and AI capabilities within Exeevo CRM Suite.",
  },
  reasons: {
    title: "Why life sciences chooses Exeevo",
    items: [
      { title: "Built on Microsoft", body: "Native Dynamics 365, Dataverse, Power Platform and Azure, with the security, identity and governance IT already trusts." },
      { title: "Compliant from day one", body: "Designed for 21 CFR Part 11, GDPR and PhRMA/EFPIA requirements." },
      { title: "AI Innovation you inherit", body: "As Microsoft ships new Copilot and Azure AI capabilities, Exeevo customers benefit." },
      { title: "Lower total cost of ownership", body: "A single licence replaces multiple subscriptions, and every user can extend the platform with Power Platform at no extra per-user cost." },
      { title: "Adoption, not resistance", body: "Reps work in a modern interface that connects natively with Outlook, Teams and Microsoft 365." },
    ],
  },
  platform: {
    heading: { light: "One configurable platform,", bold: "no bolt-ons" },
    body: "Exeevo CRM brings the capabilities life sciences teams need into a single, highly configurable platform, with no bolt-on modules and no separate contracts as teams grow:",
    cta: "Explore the platform",
    items: [
      { title: "Commercial & Medical CRM", body: "Territory Management, Account & Cycle plans, call planning and execution, HCP/HCO 360, samples, medical inquiries, fully available offline in our Mobile application." },
      { title: "Key Account Management, Retail & Order Management", body: "For Rx, Rare Disease, Consumer Health and Retail/OTC models. Full capabilities are available on request." },
      { title: "Marketing Automation & Event Management", body: "Omnichannel campaigns, mass email, and HCP events on the same data model, combining sales, medical and marketing activities in a 360 view." },
      { title: "Content & Consent Management", body: "Approved content (CLM) and compliant consent capture across channels." },
      { title: "Analytics & Reporting", body: "Embedded dashboards, extended with Microsoft Power BI." },
      { title: "Nova AI", body: "AI summaries, proactive insights and a conversational assistant built into every screen, included in the licence." },
    ],
    images: {
      monitor: { src: "/why/i1.webp", alt: "Exeevo CRM opportunity dashboard on a desktop monitor" },
      tablet: { src: "/why/i2.webp", alt: "Exeevo CRM calendar and to-do view on a tablet" },
      phone: { src: "/why/i3.webp", alt: "Exeevo mobile app home screen with pending activities" },
    },
  },
  compare: { heading: { light: "How the approaches", bold: "compare" } },
  tenant: {
    heading: { light: "Your data stays where you put it.", bold: "It never leaves your Microsoft tenant." },
    diagramLabel: "Concentric diagram: your customer data at the centre, inside your Microsoft tenant, inside your Azure environment. Data moves only inside the tenant boundary; it is never sent to shared AI models.",
    core: "Your customer data",
    chips: [
      { label: "Dynamics 365", left: "19%", top: "38.7%" },
      { label: "Power Platform", left: "81%", top: "38.7%" },
      { label: "Azure", left: "38.7%", top: "81%" },
    ],
    never: "Shared AI models",
  },
} as const;
