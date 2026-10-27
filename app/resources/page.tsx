import type { Metadata } from "next";
import { NewsletterBlock } from "@/components/resources/NewsletterBlock";
import { ResourceFeatured } from "@/components/resources/ResourceFeatured";
import { ResourceGroup } from "@/components/resources/ResourceGroup";
import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { getResources } from "@/content/resources";
import { resourceTypes, resourcesHub } from "@/content/resources/config";

export const metadata: Metadata = {
  title: resourcesHub.h1,
  description: resourcesHub.intro,
  alternates: { canonical: "/resources" },
  openGraph: { title: `${resourcesHub.h1} | Exeevo`, description: resourcesHub.intro, url: "/resources", siteName: "Exeevo", type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Exeevo: life sciences CRM built natively on Microsoft" }] },
  twitter: { card: "summary_large_image", title: `${resourcesHub.h1} | Exeevo`, description: resourcesHub.intro, images: ["/twitter-image"] },
};

/** All: the lead article, then a row of the three newest items for every type that has content. */
export default async function ResourcesPage() {
  const groups = (
    await Promise.all(resourceTypes.map(async (t) => ({ type: t.type, items: await getResources(t.type) })))
  ).filter((g) => g.items.length > 0);
  const lead = groups.find((g) => g.type === "blog") ?? groups[0];
  const featured = lead ? (lead.items.find((r) => r.image) ?? lead.items[0]) : undefined;
  return (
    <>
      <ResourcesHero active="all" />
      {lead && featured && <ResourceFeatured type={lead.type} item={featured} />}
      {groups.map((g, n) => (
        <ResourceGroup key={g.type} type={g.type} items={g.items.slice(0, 3)} tone={n % 2 === 0 ? "white" : "porcelain"} />
      ))}
      <NewsletterBlock />
    </>
  );
}
