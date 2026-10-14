import { about } from "@/content/about";
import { partners } from "@/content/partners";
import { absoluteUrl } from "./seo";
import { siteUrl } from "./siteUrl";

const crumbs = (name: string, path: string) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") || siteUrl },
    { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
  ],
});

/** About page: AboutPage about the Organization (offices as in the page copy) plus breadcrumbs. */
export function aboutJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "AboutPage", "@id": `${absoluteUrl("/about")}#page`, url: absoluteUrl("/about"), name: "About Exeevo", description: about.intro, about: { "@id": `${siteUrl}/#organization` } },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Exeevo",
        foundingDate: "2017",
        parentOrganization: { "@type": "Organization", name: "Valsoft" },
        location: about.offices.list.map((o) => ({ "@type": "Place", name: o.city, address: o.addr.join(", ") })),
      },
      crumbs("About", "/about"),
    ],
  };
}

/** Partners page: the directory as an ItemList of organisations (names only, as shown on the page) plus breadcrumbs. */
export function partnersJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/partners")}#page`,
        url: absoluteUrl("/partners"),
        name: "Exeevo partners",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [{ name: "Microsoft" }, ...partners.map((p) => ({ name: p.name }))].map((p, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Organization", name: p.name } })),
        },
      },
      crumbs("Partners", "/partners"),
    ],
  };
}
