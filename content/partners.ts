export type PartnerCategory = "tech" | "impl" | "data" | "comp";
export type Partner = { id: string; cat: Exclude<PartnerCategory, "tech">; name: string; spec: string; regions: string[]; body: string[]; image: string };

/** Copy comes verbatim from the Partners design. */
export const partnersPage = {
  label: "Partners",
  h1: "Successful CRM programmes depend on more than software",
  intro:
    "Exeevo works with a global ecosystem of technology, implementation, data and compliance partners, so every customer gets the right expertise for their markets, their languages and their regulatory landscape.",
  body:
    "For global and multi-country programmes, Exeevo and our System Integrator partners work as a single delivery team. Exeevo governs the product, platform and roadmap, while our partners bring implementation, integration and change management capacity, with local presence where it matters.",
  browse: "Browse partners",
  becomeLabel: "Become a partner",
  filterLabel: "Filter partners by type",
  filters: [
    { id: "all", name: "All partners" },
    { id: "tech", name: "Technology" },
    { id: "impl", name: "Implementation" },
    { id: "data", name: "Data" },
    { id: "comp", name: "Compliance" },
  ],
  orbit: ["Compliance", "Data", "Implementation", "Technology"],
  microsoft: {
    kicker: "Strategic technology partner",
    name: "Microsoft",
    tagline: "The platform behind Exeevo CRM.",
    title: "The platform behind Exeevo CRM",
    body: [
      "Exeevo is built natively on Microsoft Dynamics 365, Dataverse, the Power Platform and Azure. There is no separate platform or proprietary core: Exeevo customers run on the same enterprise cloud trusted by millions of Dynamics users worldwide.",
      "This partnership means Exeevo customers inherit Microsoft security, identity (Entra ID), data residency and compliance controls, integrate natively with Outlook, Teams and Power BI, and benefit from Microsoft's continuous investment in Copilot and Azure AI. Exeevo and Microsoft account teams work together with customers from evaluation through to deployment.",
    ],
    chips: ["Dynamics 365", "Dataverse", "Power Platform", "Azure", "Entra ID", "Copilot"],
  },
  sections: [
    { cat: "impl", kicker: "Implementation partners", title: "System Integrators", body: "Our System Integrator partners combine life sciences expertise with Microsoft delivery capability to plan, implement, integrate and support Exeevo CRM programmes, from single-country launches to global rollouts." },
    { cat: "data", kicker: "Data partners", title: "Data Vendors & Connectors", body: "Exeevo connects natively to the reference data that life sciences teams rely on, so HCP and HCO records stay accurate, compliant and ready to use from the first day of a rollout." },
    { cat: "comp", kicker: "Compliance partners", title: "Compliance & Support (US)", body: "Compliance and commercial support for US field operations, alongside Exeevo CRM." },
  ],
  become: {
    title: "Become an Exeevo partner",
    body: "We are growing our partner ecosystem across implementation, data, technology and compliance. If your organisation helps life sciences companies transform how they engage customers, we would like to hear from you.",
    cta: "Contact our partnerships team",
  },
  modal: { close: "Close", previous: "Previous", next: "Next partner", of: "of", readMore: "Read more" },
} as const;

export const catNames: Record<PartnerCategory, string> = { tech: "Technology", impl: "Implementation", data: "Data", comp: "Compliance" };

export const partners: Partner[] = [
  {
    "id": "nnit",
    "cat": "impl",
    "name": "NNIT",
    "spec": "Life sciences IT consultancy",
    "regions": [
      "Nordics",
      "Europe"
    ],
    "body": [
      "NNIT is an IT consultancy dedicated to the life sciences industry, supporting pharmaceutical and biotech organisations across the transformation and implementation of business-critical digital solutions.",
      "Within CRM initiatives, NNIT supports customers from strategy and business process definition through integration, validation, deployment and ongoing support. With more than 30 years of life sciences experience, NNIT combines deep domain expertise with technology, compliance and transformation capabilities to deliver scalable, sustainable solutions aligned with each customer’s business and IT landscape.",
      "Together, Exeevo and NNIT bring complementary CRM, life sciences and transformation capabilities to support customer initiatives."
    ],
    "image": "/partners/nnit.webp"
  },
  {
    "id": "msg",
    "cat": "impl",
    "name": "msg industry advisors",
    "spec": "Life sciences CRM implementation & regulatory expertise",
    "regions": [
      "DACH",
      "Europe"
    ],
    "body": [
      "msg industry advisors supports pharmaceutical and life sciences companies in turning CRM technology into scalable commercial operations. In collaboration with Exeevo, msg combines Exeevo’s life sciences CRM platform with its expertise in pharmaceutical regulation, business requirements engineering and end-to-end implementation services.",
      "msg bridges business and IT, ensuring that Exeevo’s CRM capabilities are aligned with sales, marketing, medical and customer engagement processes, while meeting the governance and compliance requirements of the life sciences industry. Its services span the full deployment lifecycle: requirements and process design, solution architecture, configuration, integration and data migration, testing, validation, training and multi-country change management, through to go-live, hypercare and sustainable operations.",
      "Together, Exeevo and msg industry advisors enable life sciences organisations to combine a purpose-built CRM platform with strong implementation, business process transformation and adoption capabilities."
    ],
    "image": "/partners/msg.webp"
  },
  {
    "id": "hitachi",
    "cat": "impl",
    "name": "Hitachi Solutions",
    "spec": "Global Microsoft Dynamics 365 partner",
    "regions": [
      "Europe",
      "Americas",
      "APAC"
    ],
    "body": [
      "Hitachi Solutions is a global Microsoft business applications partner with deep expertise in Dynamics 365, Power Platform and Azure. Working with Exeevo, Hitachi Solutions helps life sciences organisations implement, integrate and extend Exeevo CRM, from solution design and configuration through data migration, testing, deployment and ongoing support.",
      "Together, Exeevo and Hitachi Solutions combine a purpose-built life sciences CRM with enterprise-scale Microsoft delivery across multiple regions."
    ],
    "image": "/partners/hitachi.webp"
  },
  {
    "id": "ntt",
    "cat": "impl",
    "name": "NTT DATA",
    "spec": "Global IT services, life sciences practice",
    "regions": [
      "Europe",
      "Global"
    ],
    "body": [
      "NTT DATA is a global IT services and consulting provider with a dedicated life sciences practice and strong Microsoft capabilities. Partnering with Exeevo, NTT DATA supports customers with CRM strategy, programme management, implementation, integration and managed services, with local delivery teams across Europe and beyond."
    ],
    "image": "/partners/ntt.webp"
  },
  {
    "id": "tcs",
    "cat": "impl",
    "name": "Tata Consultancy Services (TCS)",
    "spec": "Global IT services & consulting",
    "regions": [
      "Europe",
      "India",
      "APAC",
      "Global"
    ],
    "body": [
      "TCS brings global scale and life sciences consulting experience to Exeevo CRM programmes, supporting implementation, integration, testing and long-term application management for multi-country rollouts."
    ],
    "image": "/partners/tcs.webp"
  },
  {
    "id": "deloitte",
    "cat": "impl",
    "name": "Deloitte",
    "spec": "Consulting, transformation & implementation",
    "regions": [
      "Europe",
      "Americas",
      "Global"
    ],
    "body": [
      "Deloitte helps life sciences organisations shape and deliver commercial transformation. Alongside Exeevo, Deloitte supports CRM strategy, operating model and process design, implementation and change management to drive adoption and business value."
    ],
    "image": "/partners/deloitte.webp"
  },
  {
    "id": "capgemini",
    "cat": "impl",
    "name": "Capgemini",
    "spec": "Consulting, technology & digital transformation",
    "regions": [
      "France",
      "Europe",
      "Global"
    ],
    "body": [
      "Capgemini supports life sciences and MedTech organisations with end-to-end digital transformation. With Exeevo, Capgemini delivers CRM implementation, integration and managed services on the Microsoft platform for global programmes."
    ],
    "image": "/partners/capgemini.webp"
  },
  {
    "id": "medpro",
    "cat": "data",
    "name": "MedPro Systems",
    "spec": "HCP/HCO licensing data",
    "regions": [
      "United States"
    ],
    "body": [
      "Exeevo is a MedPro DirectID partner. DirectID gives Exeevo customers real-time access to MedProID, MedPro’s licensing database of HCP and HCO identifying data, directly inside Exeevo CRM.",
      "Customers can verify licences and keep HCP and HCO records current without leaving the CRM, supporting compliant sampling, transparency reporting and accurate targeting in the US market."
    ],
    "image": "/partners/medpro.webp"
  },
  {
    "id": "iqvia",
    "cat": "data",
    "name": "IQVIA",
    "spec": "Reference data & sales data",
    "regions": [],
    "body": [
      "Exeevo offers a native connector to IQVIA OneKey, the reference database of healthcare professionals and organisations, and integrates IQVIA prescription and sales data into Exeevo CRM.",
      "Field and commercial teams work from accurate customer master data and market insight, used for segmentation, targeting, call planning and performance analysis."
    ],
    "image": "/partners/iqvia.webp"
  },
  {
    "id": "qpharma",
    "cat": "comp",
    "name": "QPharma",
    "spec": "Life sciences compliance & commercial services",
    "regions": [
      "United States"
    ],
    "body": [
      "QPharma provides compliance and commercial support services to US life sciences companies, including sample management and accountability, validation, auditing and training.",
      "Together, Exeevo and QPharma help US customers run compliant sampling and field operations, with Exeevo CRM as the system of engagement and QPharma supporting the regulatory processes around it."
    ],
    "image": "/partners/qpharma.webp"
  }
];
