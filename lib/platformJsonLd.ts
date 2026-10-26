import { capabilities } from "@/content/platform";
import { absoluteUrl } from "./seo";
import { siteUrl } from "./siteUrl";

/** Platform page: a CollectionPage listing the capabilities (names as shown on the page) plus breadcrumbs. */
export function platformJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/platform")}#page`,
        url: absoluteUrl("/platform"),
        name: "Exeevo platform capabilities",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: capabilities.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: `${absoluteUrl("/platform")}#cap-${c.id}` })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") || siteUrl },
          { "@type": "ListItem", position: 2, name: "Platform", item: absoluteUrl("/platform") },
        ],
      },
    ],
  };
}
