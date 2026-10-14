import type { Metadata } from "next";
import { GlossaryIndex } from "@/components/resources/GlossaryIndex";
import { NewsletterBlock } from "@/components/resources/NewsletterBlock";
import { ResourceShell } from "@/components/resources/ResourceShell";
import { ResourcesHeader } from "@/components/resources/ResourcesHeader";
import { getResources } from "@/content/resources";
import { newsletter, resourceConfig } from "@/content/resources/config";
import { listMetadata } from "@/lib/resourceSeo";

export const metadata: Metadata = listMetadata("glossary");

export default async function GlossaryPage() {
  const c = resourceConfig("glossary");
  const terms = (await getResources("glossary"))
    .map((t) => ({ slug: t.slug, title: t.title, summary: t.summary }))
    .sort((a, b) => a.title.localeCompare(b.title));
  return (
    <ResourceShell>
      <ResourcesHeader h1={c.h1} intro={c.intro} active="glossary" />
      <GlossaryIndex terms={terms} />
      <NewsletterBlock copy={newsletter} />
    </ResourceShell>
  );
}
