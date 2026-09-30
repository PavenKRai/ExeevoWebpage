export const gettingStarted = {
  label: "Getting started",
  h1: "Two paths to go live",
  intro:
    "However complex your organization, there's a launch path sized to it: from a focused first deployment to a fully tailored, multi-country rollout. Both run on the same platform, so moving from one to the other is an expansion, not a migration.",
  connector: "Expand, don't migrate",
  paths: [
    {
      slug: "core",
      name: "Core",
      title: "Core: live in as little as 4 weeks",
      tag: "Start focused",
      body: "A focused, standard configuration for teams launching their first unified CRM: one country, one brand, fast time to value.",
      chips: ["One country", "One brand", "Standard configuration"],
    },
    {
      slug: "enterprise",
      name: "Enterprise",
      title: "Enterprise: a tailored rollout",
      tag: "Scale across brands and countries",
      body: "A custom implementation across Commercial, Medical, Marketing, and Events, with dedicated deployment support for multi-brand or multi-country organizations.",
      chips: ["Multi-brand", "Multi-country", "Dedicated deployment support"],
    },
  ],
  demo: {
    title: "Talk to our team.",
    body: "Tell us about your teams and markets, and we'll size the right path with you.",
    consent: "[Privacy consent copy and link]",
    success: "Request received. [CONFIRMATION COPY]",
    teams: ["Commercial", "Medical Affairs", "Marketing", "Commercial, Medical and Marketing"],
  },
} as const;
