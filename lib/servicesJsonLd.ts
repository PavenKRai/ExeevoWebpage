import { allServices } from "@/content/services";
import { absoluteUrl } from "./seo";
import { siteUrl } from "./siteUrl";

/** Structured data for /services: the provider, an offer catalog of the 10 services (same words as on the page) and breadcrumbs. */
export function servicesJsonLd() {
  const url = absoluteUrl("/services");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}#service`,
        name: "Exeevo Professional Services",
        url,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Exeevo Professional Services",
          itemListElement: allServices.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.desc, provider: { "@id": `${siteUrl}/#organization` } },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") || siteUrl },
          { "@type": "ListItem", position: 2, name: "Professional Services", item: url },
        ],
      },
    ],
  };
}
