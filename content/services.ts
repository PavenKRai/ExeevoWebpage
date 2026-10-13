export type PhaseSlug = "advise" | "implement" | "operate";
export type Service = { slug: string; num: string; title: string; tag: string; desc: string; inc: string[]; val: string };
export type Phase = { slug: PhaseSlug; title: string; blurb: string; color: "magenta" | "blue" | "green"; services: Service[] };

/** Copy comes verbatim from the Professional Services design. Service numbers (01-10) are a real sequence. */
export const servicesPage = {
  label: "Professional Services",
  h1: "With you from first workshop to every release after go-live",
  intro:
    "Exeevo Professional Services supports life sciences organisations across the full life of their CRM. We help shape the solution, deliver it, and run it after go-live. Our people work in pharma CRM full time, so the compliance, data and field-force requirements are understood before a project starts rather than discovered during it.",
  primaryCta: "Talk to our team",
  secondaryCta: "See all 10 services",
  engage: {
    title: "How we engage",
    body: "Most clients start with one service and add others as the programme develops. Services can be bought individually or as a single end-to-end engagement.",
    bracket: "or as one end-to-end engagement",
  },
  paths: {
    title: "Two paths to go live",
    body: "Both run on the same platform, so moving from one to the other is an expansion, not a migration.",
  },
  interested: { before: "Interested in", cta: "Talk to us about it" },
  valueLabel: "Value to clients",
  includedLabel: "What's included",
  dock: "Service phases",
} as const;

export const phases: Phase[] = [
  {
    "slug": "advise",
    "title": "Advise",
    "blurb": "Define the scope, business case and roadmap before committing to a build.",
    "color": "magenta",
    "services": [
      {
        "slug": "consulting-solution-advisory",
        "num": "01",
        "title": "Consulting & Solution Advisory",
        "tag": "Define the right solution before you build it",
        "desc": "Workshops and assessments that turn a business objective into a defined CRM scope. We map current-state processes, test requirements against what actually drives field adoption, and produce a roadmap that both the business and IT can sign off.",
        "inc": [
          "Current-state and process discovery",
          "Solution and data architecture design",
          "Commercial model and KPI definition",
          "Phased roadmap and business case"
        ],
        "val": "Delivery starts with scope that is agreed, costed and sequenced. Most CRM programmes lose their first quarter because this step was skipped."
      },
      {
        "slug": "ai-readiness-advisory",
        "num": "02",
        "title": "AI Readiness & Advisory",
        "tag": "Decide where AI adds value in your CRM",
        "desc": "A short, structured assessment of where AI will create measurable value in your commercial operation, and where it will not. We review data readiness, prioritise use cases and produce a costed roadmap.",
        "inc": [
          "Use-case discovery and prioritisation",
          "Data readiness assessment",
          "Microsoft AI and Copilot fit review",
          "Business case and phased roadmap"
        ],
        "val": "A clear view of what to build first, with the compliance questions raised before anything reaches the field."
      }
    ]
  },
  {
    "slug": "implement",
    "title": "Implement",
    "blurb": "Deploy, migrate, integrate and train to an agreed scope and timeline.",
    "color": "blue",
    "services": [
      {
        "slug": "implementation",
        "num": "03",
        "title": "Implementation",
        "tag": "Exeevo CRM live on a predictable path",
        "desc": "Deployment of Exeevo CRM on Microsoft Dynamics 365. There are two routes. A fixed-scope standard deployment for teams that want proven defaults quickly, or an enterprise implementation shaped to your therapy areas, channels and country operating models.",
        "inc": [
          "Standard or enterprise deployment track",
          "Configuration, workflows and security model",
          "Validation and compliance documentation",
          "UAT support, go-live and hypercare"
        ],
        "val": "A CRM built on pharma defaults rather than a blank platform. Time to value is shorter and your own team can maintain the configuration."
      },
      {
        "slug": "data-migration-data-operations",
        "num": "04",
        "title": "Data Migration & Data Operations",
        "tag": "Customer data your teams can trust",
        "desc": "Migration of HCP and HCO master data, affiliations, territory alignments and transactional history into Exeevo CRM, together with the cleansing and stewardship that keeps it accurate afterwards. Our AI-assisted accelerators handle profiling, mapping and match-rule generation, which takes weeks out of the schedule.",
        "inc": [
          "Master and transactional data migration",
          "Deduplication and golden-record rules",
          "Reconciliation and sign-off per country",
          "Ongoing data quality and stewardship"
        ],
        "val": "Field teams trust the system from the first login. Data quality drives CRM adoption more than any other factor, and it is the hardest thing to repair later."
      },
      {
        "slug": "integrations-connectivity",
        "num": "05",
        "title": "Integrations & Connectivity",
        "tag": "Connected to the systems your business already runs",
        "desc": "We connect Exeevo CRM to the wider commercial and corporate estate, including reference data providers, ERP, compliance platforms and analytics. Standard product connectors are used where they exist. Where they do not, we build integrations for the purpose.",
        "inc": [
          "Reference data: IQVIA OneKey, MedPro and similar",
          "Sales and prescription data feeds",
          "ERP, finance and HR master data",
          "Custom and bi-directional integrations"
        ],
        "val": "One reliable commercial picture instead of reconciled spreadsheets. Monitoring is built in, so broken feeds are found by us rather than reported by your users."
      },
      {
        "slug": "training-enablement",
        "num": "06",
        "title": "Training & Enablement",
        "tag": "Make sure the system gets used",
        "desc": "Role-based training for field teams, managers and administrators, delivered as onboarding waves or train-the-trainer. Materials are built around your configuration and your therapy areas rather than generic platform screens.",
        "inc": [
          "Role-based training by field, manager and admin",
          "Train-the-trainer and champion programmes",
          "Recorded modules and quick-reference guides",
          "Post-release refreshers"
        ],
        "val": "Adoption that holds after the first few months, and an internal team able to support its own users."
      }
    ]
  },
  {
    "slug": "operate",
    "title": "Operate",
    "blurb": "Run, host, enhance and improve the solution after go-live.",
    "color": "green",
    "services": [
      {
        "slug": "managed-services",
        "num": "07",
        "title": "Managed Services",
        "tag": "Your CRM run as a service",
        "desc": "Day-to-day operation of your live CRM by a team that already knows the product. This covers territory and roster management, configuration changes, user administration, issue triage and integration monitoring. An optional development capacity team handles enhancements and new features as your business changes.",
        "inc": [
          "Roster, territory and alignment management",
          "Configuration and user administration",
          "Issue triage and resolution, with product escalation",
          "Integration monitoring and release regression support",
          "Optional sprint capacity for enhancements"
        ],
        "val": "Predictable support cost and no dependency on a single internal administrator. Your team is freed to work on commercial outcomes rather than CRM upkeep."
      },
      {
        "slug": "hosting-platform-operations",
        "num": "08",
        "title": "Hosting & Platform Operations",
        "tag": "A managed, compliant platform underneath it all",
        "desc": "Hosting and ongoing operation of your Exeevo CRM environment on Microsoft Azure and Dynamics 365. This includes environment management, release and patch cycles, performance tuning, monitoring and backup.",
        "inc": [
          "Environment provisioning and lifecycle management",
          "Release, patch and update management",
          "Performance monitoring and tuning",
          "Backup, recovery and data residency controls"
        ],
        "val": "Enterprise-grade platform operations without building the capability in house. Data residency and validation evidence are handled for regulated markets."
      },
      {
        "slug": "ai-enablement-services",
        "num": "09",
        "title": "AI Enablement Services",
        "tag": "Put AI to work inside the CRM your teams already use",
        "desc": "Design, build and tuning of AI agents and assistants that sit inside your commercial workflows. These can be built within Exeevo CRM or on your existing Microsoft Copilot investment. We handle grounding, prompt design, evaluation and the compliance review that regulated markets require.",
        "inc": [
          "Agent design, build and deployment",
          "Grounding across CRM and connected content",
          "Evaluation, tuning and ongoing agent care",
          "Microsoft Copilot and Sales AI enablement"
        ],
        "val": "AI that answers from your data and your rules, delivered into the tools your field teams already open every morning, with the compliance questions addressed up front."
      },
      {
        "slug": "machine-learning-services",
        "num": "10",
        "title": "Machine Learning Services",
        "tag": "Models tuned to your market",
        "desc": "Training and fine-tuning of Exeevo machine learning models on your own commercial data. This covers next best action, HCP prioritisation, channel preference and engagement propensity, so recommendations reflect your therapy areas, markets and field behaviour. Models are monitored and retrained as the market shifts.",
        "inc": [
          "Data readiness assessment and uplift estimate",
          "Model training and fine-tuning on client data",
          "Evaluation harness and performance baseline",
          "Scheduled retraining and drift monitoring"
        ],
        "val": "Recommendations your field force acts on, because they reflect how your markets actually behave, and they stay accurate as conditions change."
      }
    ]
  }
];

export const allServices: Service[] = phases.flatMap((p) => p.services);
export const phaseOf = (serviceSlug: string) => phases.find((p) => p.services.some((s) => s.slug === serviceSlug));

/** The two launch paths (Implement section here, and the Home go-live band). */
export const gettingStarted = {
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
} as const;

export const contact = {
  title: "Talk to our team",
  body: "To discuss any of these services, contact your Exeevo account team, or tell us where you are and we'll come back with the right starting point.",
  consent: "[Privacy consent copy and link]",
  success: "Request received. [CONFIRMATION COPY]",
  submit: "Send request",
  serviceLabel: "Which service are you interested in?",
  serviceOptions: [
    "Not sure yet: help me choose",
    ...[
  "Consulting & Solution Advisory",
  "AI Readiness & Advisory",
  "Implementation",
  "Data Migration & Data Operations",
  "Integrations & Connectivity",
  "Training & Enablement",
  "Managed Services",
  "Hosting & Platform Operations",
  "AI Enablement Services",
  "Machine Learning Services"
],
    "End-to-end engagement",
  ],
} as const;
