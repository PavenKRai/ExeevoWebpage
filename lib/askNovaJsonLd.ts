import { askNova, features } from "@/content/askNova";
import { absoluteUrl } from "./seo";
import { siteUrl } from "./siteUrl";

/** Structured data for /ask-nova: the product and its 13 features (names as on the page; no prices or ratings) plus breadcrumbs. */
export function askNovaJsonLd() {
  const url = absoluteUrl("/ask-nova");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name: "Ask-Nova",
        url,
        description: askNova.intro,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "AI assistant for life sciences CRM",
        featureList: features.map((f) => f.name),
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") || siteUrl },
          { "@type": "ListItem", position: 2, name: "Ask-Nova Studio & AI", item: url },
        ],
      },
    ],
  };
}
