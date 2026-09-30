export const comparison = {
  title: "How the approaches compare",
  columns: ["Capability", "Exeevo", "Generic CRM platform", "Point solution add-ons"],
  rows: [
    { capability: "AI-powered next-best-action", exeevo: "Included, platform-wide", generic: "Not life sciences-specific", point: "Varies by add-on" },
    { capability: "Native Microsoft integration", exeevo: "Built on Dynamics 365 / Dataverse", generic: "Often a separate stack", point: "Requires custom integration" },
    { capability: "Life sciences compliance (Part 11, GDPR, PIPL, Sunshine Act)", exeevo: "Built in", generic: "Configured after the fact, if at all", point: "Depends on each vendor" },
    { capability: "Additional licensing for AI & analytics", exeevo: "Included in one license", generic: "Often extra cost", point: "Priced per module" },
    { capability: "Where customer data lives", exeevo: "Stays in your own Microsoft tenant", generic: "Typically vendor-hosted", point: "Typically vendor-hosted" },
  ],
  footnote: "Comparison describes typical characteristics of general-purpose CRM platforms and point-solution add-ons in life sciences as a category.",
} as const;
