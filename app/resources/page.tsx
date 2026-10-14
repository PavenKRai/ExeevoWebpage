import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterBlock } from "@/components/resources/NewsletterBlock";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceShell } from "@/components/resources/ResourceShell";
import { ResourcesHeader } from "@/components/resources/ResourcesHeader";
import { getResources, type ResourceType } from "@/content/resources";
import { newsletter, resourceConfig, resourcesHub } from "@/content/resources/config";

export const metadata: Metadata = {
  title: resourcesHub.h1,
  description: resourcesHub.intro,
  alternates: { canonical: "/resources" },
  openGraph: { title: `${resourcesHub.h1} | Exeevo`, description: resourcesHub.intro, url: "/resources", siteName: "Exeevo", type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Exeevo" }] },
  twitter: { card: "summary_large_image", title: `${resourcesHub.h1} | Exeevo`, description: resourcesHub.intro, images: ["/twitter-image"] },
};

const sections: ResourceType[] = ["blog", "white-papers", "webinars", "case-studies", "press-releases"];

export default async function ResourcesPage() {
  const latest = Object.fromEntries(await Promise.all(sections.map(async (t) => [t, (await getResources(t)).slice(0, 3)]))) as Record<ResourceType, Awaited<ReturnType<typeof getResources>>>;
  return (
    <ResourceShell>
      <ResourcesHeader label={resourcesHub.label} h1={resourcesHub.h1} intro={resourcesHub.intro} />
      {sections.map((type) => ({ type, items: latest[type] })).map(({ type, items }) => {
        const c = resourceConfig(type);
        return (
          <section key={type} aria-labelledby={`hub-${type}`} className="mt-16 lg:mt-[72px]">
            <div className="sr flex items-end justify-between gap-4">
              <h2 id={`hub-${type}`} className="text-[32px] leading-[1.1] tracking-[-0.025em]">{c.label}</h2>
              <Link href={c.path} className="inline-flex min-h-11 items-center font-semibold underline decoration-brand-blue decoration-2 underline-offset-[3px]">All {c.label.toLowerCase()}</Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((r, n) => (
                <ResourceCard key={r.slug} type={type} item={r} index={n} priority={type === "blog" && n < 3} showRead={type === "blog" || type === "white-papers"} />
              ))}
            </div>
          </section>
        );
      })}
      <NewsletterBlock copy={newsletter} />
    </ResourceShell>
  );
}
