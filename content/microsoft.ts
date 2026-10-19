/** Microsoft page copy (from the Microsoft design). Logos live in public/microsoft/. */
export type MsColor = "blue" | "magenta" | "green" | "violet" | "sky";
export type MsCard = {
  id: string;
  logo: string;
  extraLogos?: string[];
  title: string;
  desc: string;
  bullets: string[];
  powers: { label: string; color: MsColor }[];
};
export type MsGroup = { id: string; title: string; sub: string; dot: MsColor; cards: MsCard[] };
export type MsWhyIcon = "home" | "shield" | "refresh" | "arrow";

export const microsoft = {
  hero: {
    chip: "Built on Microsoft",
    h1: { light: "One platform,", bold: "built entirely on Microsoft" },
    lead: "Exeevo CRM is built on Microsoft Power Platform, Dynamics 365 and Azure. You get pharma-ready modules on the enterprise cloud your IT team already trusts, with Microsoft's security, compliance and global data residency underneath.",
    primary: "Get a demo",
    secondary: "See the stack",
  },
  tenant: {
    title: "Your Microsoft tenant",
    note: "One estate",
    more: "+ many more",
    columns: [
      {
        title: "Microsoft 365",
        highlight: false,
        moreHref: "#ai",
        items: [
          { label: "Teams", logo: "/microsoft/teams.png", href: "#ms-copilot" },
          { label: "M365 Copilot", logo: "/microsoft/m365-copilot.png", href: "#ms-copilot" },
          { label: "Copilot Studio", logo: "/microsoft/copilot-studio.svg", href: "#ms-copilot" },
        ],
      },
      {
        title: "Exeevo CRM",
        highlight: true,
        moreHref: "#platform",
        items: [
          {
            label: "Power Platform",
            logo: "/microsoft/power-platform.png",
            href: "#ms-powerplatform",
          },
          { label: "Dataverse", logo: "/microsoft/dataverse.png", href: "#ms-dataverse" },
          { label: "Microsoft Foundry", logo: "/microsoft/foundry.svg", href: "#ms-foundry" },
        ],
      },
      {
        title: "Data and analytics",
        highlight: false,
        moreHref: "#cloud",
        items: [
          { label: "Power BI", logo: "/microsoft/power-bi.png", href: "#ms-powerbi" },
          { label: "Microsoft Fabric", logo: "/microsoft/fabric.png", href: "#ms-fabric" },
          { label: "Azure Data Lake", logo: "/microsoft/data-lake.svg", href: "#ms-datalake" },
        ],
      },
    ],
    entra: {
      label: "Microsoft Entra ID",
      rest: " · one sign-in and one directory across all of it",
      logo: "/microsoft/entra.png",
      href: "#ms-entra",
    },
    checks: [
      "Same Microsoft cloud as your email, Teams and identity",
      "No separate platform for IT to secure",
      "Microsoft certifications carry through",
    ],
  },
  stats: {
    h2: { light: "A backend", bold: "the world already runs on" },
    lead: "Exeevo CRM sits on the same Microsoft business platform that organisations of every size use every day.",
    items: [
      {
        value: "56M",
        color: "blue",
        text: "monthly active users of Microsoft Power Platform, the platform Exeevo CRM is built on.",
        source: "Source: Microsoft FY25 Q3 earnings call, April 2025",
      },
      {
        value: "1B",
        color: "violet",
        text: "monthly active users of Microsoft Entra ID, the identity service every Exeevo user signs in with.",
        source: "Source: Microsoft FY26 Q1 earnings call, October 2025",
      },
      {
        value: "+18%",
        color: "sky",
        text: "Dynamics 365 revenue growth in fiscal year 2026, with growth across all workloads.",
        source: "Source: Microsoft Form 10-K, fiscal year 2026",
      },
      {
        value: "15,000+",
        color: "magenta",
        text: "life sciences users already work in Exeevo CRM on this Microsoft foundation.",
        source: "Source: Exeevo",
      },
    ] as { value: string; color: MsColor; text: string; source: string }[],
  },
  groups: [
    {
      id: "apps",
      title: "Business applications",
      sub: "Power Platform, Dynamics 365 Customer Service, Customer Insights",
      dot: "blue",
      cards: [
        {
          id: "ms-powerplatform",
          logo: "/microsoft/power-platform.png",
          title: "Microsoft Power Platform",
          desc: "The core of the field-force CRM, built as Power Apps on Dataverse with Exeevo's pharma data model and processes.",
          bullets: [
            "HCP and HCO accounts, affiliations and territory alignment",
            "Call planning, call reporting and sample management",
            "Field coaching, goals and activity tracking",
          ],
          powers: [
            { label: "Sales CRM", color: "blue" },
            { label: "Mobile App", color: "blue" },
          ],
        },
        {
          id: "ms-customer-service",
          logo: "/microsoft/dynamics-customer-service.png",
          title: "Dynamics 365 Customer Service",
          desc: "The case-management engine behind Medical CRM, configured for medical affairs teams.",
          bullets: [
            "Intake and tracking of medical information inquiries",
            "Routing, response templates and SLA tracking",
            "Full history of every inquiry and response",
          ],
          powers: [{ label: "Medical CRM", color: "magenta" }],
        },
        {
          id: "ms-journeys",
          logo: "/microsoft/insights-journeys.png",
          title: "Customer Insights – Journeys",
          desc: "Microsoft's marketing automation platform, used for compliant multichannel engagement.",
          bullets: [
            "Approved email and multichannel customer journeys",
            "Event registration, invitations and attendance",
            "Consent and preference management by channel",
          ],
          powers: [
            { label: "Marketing Automation", color: "blue" },
            { label: "Event Management", color: "blue" },
          ],
        },
        {
          id: "ms-insights-data",
          logo: "/microsoft/insights-data.svg",
          title: "Customer Insights – Data",
          desc: "Microsoft's customer data platform, bringing HCP data from every source into one profile.",
          bullets: [
            "Unified HCP profiles across CRM, marketing and third-party data",
            "Segments for targeting, journeys and field campaigns",
            "Engagement history across every channel",
          ],
          powers: [{ label: "Customer Insights", color: "green" }],
        },
      ],
    },
    {
      id: "platform",
      title: "Platform",
      sub: "Dataverse, Power Automate, Entra ID",
      dot: "violet",
      cards: [
        {
          id: "ms-dataverse",
          logo: "/microsoft/dataverse.png",
          title: "Microsoft Dataverse",
          desc: "The single data store and security model that every Exeevo module and Ask-Nova share.",
          bullets: [
            "One data model across sales, medical and marketing",
            "Role-based security down to the record and field level",
            "Change auditing built into the platform",
          ],
          powers: [],
        },
        {
          id: "ms-power-automate",
          logo: "/microsoft/power-automate.png",
          title: "Power Automate & low-code tools",
          desc: "The low-code tools used to configure Exeevo CRM and automate business processes.",
          bullets: [
            "Pharma-specific forms, views and business rules",
            "Automated approvals, notifications and workflows",
            "Changes your own admins can maintain, without custom code",
          ],
          powers: [],
        },
        {
          id: "ms-powerbi",
          logo: "/microsoft/power-bi.png",
          title: "Power BI",
          desc: "Bring your own Power BI. Clients can embed their existing Power BI reports and dashboards in Exeevo CRM.",
          bullets: [
            "Embed your own reports in CRM dashboards and forms",
            "Reports run on live CRM data, under your own Power BI licences",
            "Reuse the analytics your teams have already built",
          ],
          powers: [],
        },
        {
          id: "ms-entra",
          logo: "/microsoft/entra.png",
          title: "Microsoft Entra ID",
          desc: "Microsoft's identity service, used for every user who signs in to Exeevo CRM.",
          bullets: [
            "Single sign-on with your corporate Microsoft account",
            "Multi-factor authentication and conditional access",
            "Joiners and leavers managed from one directory",
          ],
          powers: [],
        },
      ],
    },
    {
      id: "cloud",
      title: "Azure cloud and data",
      sub: "Azure services, data lake and analytics",
      dot: "sky",
      cards: [
        {
          id: "ms-functions",
          logo: "/microsoft/azure-functions.svg",
          title: "Azure Functions & microservices",
          desc: "Serverless and microservice components that run the services behind the platform.",
          bullets: [
            "Back-end services for Exeevo Mobile CRM",
            "Integrations with reference data, ERP and compliance systems",
            "Scale automatically with the size of your field force",
          ],
          powers: [],
        },
        {
          id: "ms-azure-sql",
          logo: "/microsoft/azure-sql.svg",
          title: "Azure SQL",
          desc: "A managed database that supports platform services alongside Dataverse.",
          bullets: [
            "Operational data for mobile and integration services",
            "Connected data sources that Ask-Nova can answer from",
            "Built-in backup, high availability and encryption",
          ],
          powers: [],
        },
        {
          id: "ms-datalake",
          logo: "/microsoft/data-lake.svg",
          extraLogos: ["/microsoft/synapse-link.svg"],
          title: "Azure Data Lake & Synapse Link",
          desc: "A continuous, near real-time copy of CRM data in your own data lake.",
          bullets: [
            "Analytics without slowing down the live CRM",
            "Long-term retention for regulatory and audit needs",
            "Feeds downstream warehouses such as Snowflake",
          ],
          powers: [],
        },
        {
          id: "ms-fabric",
          logo: "/microsoft/fabric.png",
          title: "Microsoft Fabric",
          desc: "Microsoft's unified analytics platform for CRM and engagement data.",
          bullets: [
            "Lakehouse access to CRM and marketing interaction data",
            "One place for data engineering and analytics",
            "Ready-to-use data for your own data science teams",
          ],
          powers: [],
        },
      ],
    },
    {
      id: "ai",
      title: "AI, productivity and operations",
      sub: "Foundry, Copilot Studio, Teams, Microsoft 365",
      dot: "magenta",
      cards: [
        {
          id: "ms-foundry",
          logo: "/microsoft/foundry.svg",
          title: "Microsoft Foundry",
          desc: "Microsoft's enterprise AI platform, where Ask-Nova agents and models run.",
          bullets: [
            "Enterprise models, including Azure OpenAI, under Microsoft's data protections",
            "Client data is not used to train the models",
            "Option to run agents in your own Foundry instance",
          ],
          powers: [],
        },
        {
          id: "ms-copilot",
          logo: "/microsoft/copilot-studio.svg",
          extraLogos: ["/microsoft/m365-copilot.png", "/microsoft/teams.png"],
          title: "Copilot Studio, Microsoft 365 Copilot & Teams",
          desc: "Brings Ask-Nova into the Microsoft tools reps already open every day.",
          bullets: [
            "Ask-Nova Assistant published as a governed Copilot Studio agent",
            "CRM questions answered inside Teams and Microsoft 365 Copilot",
            "Your IT team controls who can use it and where",
          ],
          powers: [],
        },
        {
          id: "ms-monitor",
          logo: "/microsoft/azure-monitor.svg",
          extraLogos: ["/microsoft/application-insights.svg"],
          title: "Azure Monitor & Application Insights",
          desc: "End-to-end monitoring for the platform, integrations and AI.",
          bullets: [
            "Performance and availability monitoring with alerting",
            "Integration failures caught before users report them",
            "AI usage and answer ratings in your own dashboards",
          ],
          powers: [],
        },
        {
          id: "ms-regions",
          logo: "/microsoft/azure-regions.png",
          title: "Global Azure regions",
          desc: "Microsoft's worldwide data centre network, used to host each client environment.",
          bullets: [
            "Hosting in the region your regulators require",
            "Data residency controls for the EU, APAC and North America",
            "Microsoft compliance certifications inherited by the platform",
          ],
          powers: [],
        },
      ],
    },
  ] as MsGroup[],
  why: {
    h2: { light: "Why a Microsoft foundation", bold: "matters" },
    items: [
      {
        icon: "home",
        title: "One estate",
        body: "Exeevo CRM runs in the same Microsoft cloud as your email, Teams and identity, so there is no separate platform for IT to secure and support.",
      },
      {
        icon: "shield",
        title: "Compliance inherited",
        body: "Microsoft's global security and compliance certifications and regional hosting carry through to your CRM and its AI.",
      },
      {
        icon: "refresh",
        title: "Investment protected",
        body: "Existing Microsoft licences, Copilot and Power Platform skills are reused rather than duplicated.",
      },
      {
        icon: "arrow",
        title: "Ready for what's next",
        body: "New Dynamics 365, Azure and Microsoft AI capabilities reach Exeevo CRM as Microsoft releases them.",
      },
    ] as { icon: MsWhyIcon; title: string; body: string }[],
    cta: "Get a demo",
  },
};
