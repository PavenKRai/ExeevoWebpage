/** Copy comes verbatim from the About design (office addresses and company figures are the design's own). */
export const about = {
  label: "About Exeevo",
  h1: "Life sciences CRM Suite, built natively on Microsoft",
  h1Parts: { light: "Life sciences CRM Suite,", bold: "built natively on Microsoft" },
  intro: "Exeevo gives pharmaceutical, biotech, consumer health and MedTech companies one CRM platform for their commercial, medical and marketing teams.",
  body: "Built natively on Microsoft Dynamics 365, Dataverse and the Power Platform, and powered by Nova AI, Exeevo helps field teams plan, engage and follow up faster, while giving leadership a single, compliant view of every healthcare professional and organisation.",
  oneLines: [
    { text: "One platform. One licence.", strong: false },
    { text: "Every team on the same underlying data.", strong: true },
  ],
  heroImage: { src: "/about/hero.webp", alt: "An Exeevo user reviewing clinical data on a tablet with a physician in a hospital corridor", width: 1280, height: 300, tag: "Field view · HCP detailing" },
  stats: [
    { value: "2017", label: "Founded" },
    { value: "15,000+", label: "Life sciences users" },
    { value: "Global", label: "& regional implementations" },
    { value: "~200", label: "Exeevo employees + SI Partners" },
    { value: "100%", label: "Native on Microsoft" },
  ],
  story: {
    label: "Our story",
    title: "From a Microsoft partnership to a global CRM provider",
    parts: { light: "From a Microsoft partnership", bold: "to a global CRM provider" },
    items: [
      { when: "2017", title: "Founded", body: "Exeevo was founded in 2017 through a strategic partnership between Indegene and Microsoft, with a clear goal: to give life sciences a modern CRM built on the enterprise platform that IT teams already trust.", dot: "var(--ex-magenta)" },
      { when: "Global", title: "Independent and global", body: "Exeevo then grew into an independent, global life sciences CRM provider, supporting more than 15,000 users across EMEA, the Americas and APAC.", dot: "var(--ex-purple)" },
      { when: "Dec 2024", title: "Part of Valsoft", body: "In December 2024, Exeevo was acquired by Valsoft Corporation, giving the business the long-term backing to invest in its products, its people and its customers.", dot: "var(--ex-blue)" },
      { when: "Today", title: "Domain and engineering, together", body: "Today, our team brings together life sciences domain expertise and deep Microsoft engineering to deliver a platform that is purpose-built for how commercial and medical teams work, online or offline, in the office or in the field.", dot: "var(--ex-green)" },
    ],
  },
  microsoft: {
    label: "Microsoft Partnership",
    title: "The best of both worlds",
    parts: { light: "The best of", bold: "both worlds" },
    body: [
      "Through close collaboration with Microsoft and our accredited implementation partners, Exeevo CRM Suite delivers the best of both worlds: Gold-standard hosting, performance and security, with Exeevo's Life Science capabilities and compliance features built on top.",
      "Microsoft Customers can benefit from their existing investments and deployments, expanding the use of Microsoft's Customer Data Platform, Power Platform, Advanced Analytics and AI capabilities within Exeevo CRM Suite.",
    ],
    link: "See all our partners",
    badge: { src: "/about/microsoft-solutions-partner.webp", alt: "Microsoft Solutions Partner" },
  },
  why: {
    title: "Why life sciences chooses Exeevo",
    items: [
      { title: "Built on Microsoft.", body: "Native Dynamics 365, Dataverse, Power Platform and Azure, with the security, identity and governance IT already trusts." },
      { title: "Compliant from day one.", body: "Designed for 21 CFR Part 11, GDPR and PhRMA/EFPIA requirements." },
      { title: "AI Innovation you inherit.", body: "As Microsoft ships new Copilot and Azure AI capabilities, Exeevo customers benefit." },
      { title: "Lower total cost of ownership.", body: "A single licence replaces multiple subscriptions, and every user can extend the platform with Power Platform at no extra per-user cost." },
      { title: "Adoption, not resistance.", body: "Reps work in a modern interface that connects natively with Outlook, Teams and Microsoft 365." },
    ],
  },
  valsoft: {
    label: "Part of Valsoft",
    title: "A partner that is here to stay",
    parts: { light: "A partner that is", bold: "here to stay" },
    logo: { src: "/about/exeevo-valsoft.webp", alt: "Exeevo, a Valsoft company" },
    body: [
      "Exeevo is a Valsoft company. Headquartered in Montreal, Canada, Valsoft acquires and grows mission-critical vertical market software businesses, and today supports more than 150 companies across more than 20 industries.",
      "Unlike private equity or venture capital investors, Valsoft has no predefined investment horizon. It buys to hold, partnering with management teams and customers for the long term. For Exeevo customers, that means stability, continued investment in the roadmap, and a partner that is here to stay.",
      "As part of the Valsoft family, Exeevo also collaborates with sister companies serving life sciences, such as Anju Software, to bring customers a broader set of connected solutions.",
    ],
    stats: [
      { value: "Montreal", label: "Valsoft headquarters" },
      { value: "150+", label: "Companies supported" },
      { value: "20+", label: "Industries" },
      { value: "No fixed horizon", label: "Buys to hold" },
    ],
  },
  values: {
    title: "Our values",
    parts: { light: "Our", bold: "values" },
    items: [
      { title: "Passion for life sciences", body: "We understand the industry we serve and focus on solving real problems for commercial and medical teams.", dot: "var(--ex-magenta)" },
      { title: "Technological Innovation", body: "We invest continuously in new technology, from AI to mobile, so our customers stay ahead.", dot: "var(--ex-blue)" },
      { title: "Industry Collaboration", body: "We work as one team with our customers, implementation partners and Microsoft, bringing together diverse skills and perspectives to deliver modern, next-generation CRM and AI solutions.", dot: "var(--ex-green)" },
    ],
  },
  offices: {
    label: "Offices",
    title: "Where to find us",
    parts: { light: "Where to", bold: "find us" },
    body: "Supporting more than 15,000 users across EMEA, the Americas and APAC. Select an office to see its address.",
    mapLabel: "World map showing Exeevo offices in Clearwater, Bangalore and Shanghai",
    list: [
      { id: "clw", city: "Clearwater, Florida", region: "North America", addr: ["19321 US Hwy 19 N, Suite 607", "Clearwater, FL 33764", "United States"], x: 324.2, y: 156.7, color: "var(--ex-green)" },
      { id: "blr", city: "Bangalore, India", region: "India", addr: ["12th Floor, Summit A, Brigade Metropolis", "Mahadevapura (Garudachar Palya), Bangalore North", "Karnataka 560048, India"], x: 859.0, y: 206.7, color: "var(--ex-magenta)" },
      { id: "sha", city: "Shanghai, China", region: "China", addr: ["Exeevo Shanghai Limited", "Room 04-168 of We Work Liwei Jiang commercial Info consulting co ltd", "333 Cheng Du Bei Lu, Shanghai"], x: 1004.8, y: 145.9, color: "var(--ex-blue)" },
    ],
  },
  closing: {
    partners: { label: "Partners", dot: "var(--ex-magenta)", title: "Meet the partners who deliver with us", cta: "See our partner ecosystem" },
    contact: { label: "Contact", dot: "var(--ex-green)", title: "Talk to our team", cta: "Get in touch" },
  },
} as const;
