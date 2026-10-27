import type { Metadata } from "next";
import { GlossaryIndex } from "@/components/resources/GlossaryIndex";
import { NewsletterBlock } from "@/components/resources/NewsletterBlock";
import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { getResources } from "@/content/resources";
import { resourceConfig } from "@/content/resources/config";
import { listMetadata } from "@/lib/resourceSeo";

export const metadata: Metadata = listMetadata("glossary");

export default async function GlossaryPage() {
  const c = resourceConfig("glossary");
  const terms = (await getResources("glossary"))
    .map((t) => ({ slug: t.slug, title: t.title, summary: t.summary }))
    .sort((a, b) => a.title.localeCompare(b.title));
  return (
    <>
      <ResourcesHero h1={c.h1} intro={c.intro} active="glossary" />
      <section className="bg-porcelain pb-[100px]">
        <div className="wrap">
          <GlossaryIndex terms={terms} />
        </div>
      </section>
      <NewsletterBlock />
    </>
  );
}
