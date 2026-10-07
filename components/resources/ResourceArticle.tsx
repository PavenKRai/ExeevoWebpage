import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { getResources } from "@/content/resources";
import { newsletter, resourceConfig } from "@/content/resources/config";
import { site } from "@/content/site";
import { resourceJsonLd } from "@/lib/resourceSeo";
import { categoryTone, formatDate, readMinutes } from "@/lib/resources";
import { Button } from "../ui/Button";
import { CategoryDot } from "../ui/CategoryDot";
import { ArticleBody } from "./ArticleBody";
import { JsonLd } from "./JsonLd";
import { NewsletterBlock } from "./NewsletterBlock";
import { ResourceArt } from "./ResourceArt";
import { ResourceCard } from "./ResourceCard";
import { ResourceShell } from "./ResourceShell";

async function related(type: ResourceType, item: Resource) {
  const pool = (await getResources(type)).filter((r) => r.slug !== item.slug);
  const same = pool.filter((r) => r.categories.some((c) => item.categories.includes(c)));
  return [...same, ...pool.filter((r) => !same.includes(r))].slice(0, 3);
}

/** Detail page for every migrated item: breadcrumb, one h1, meta, hero, body, related items, demo CTA. */
export async function ResourceArticle({ type, item }: { type: ResourceType; item: Resource }) {
  const c = resourceConfig(type);
  const cat = item.categories[0];
  const more = type === "glossary" ? [] : await related(type, item);
  return (
    <ResourceShell>
      <JsonLd data={resourceJsonLd(type, item)} />
      <nav aria-label="Breadcrumb" className="rise text-[14px] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li><Link href="/resources" className="inline-flex min-h-11 items-center underline-offset-[3px] hover:underline">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={c.path} className="inline-flex min-h-11 items-center underline-offset-[3px] hover:underline">{c.label}</Link></li>
        </ol>
      </nav>
      <article className="mt-2">
        <header className="flex max-w-[900px] flex-col gap-5">
          {cat && (
            <p className="rise flex items-center gap-2 text-[14px] text-muted">
              <CategoryDot category={categoryTone(cat)} className="!size-2" />
              {item.categories.join(", ")}
            </p>
          )}
          <h1 className="rise text-[clamp(34px,4.4vw,56px)] leading-[1.06] tracking-[-0.03em]">{item.title}</h1>
          <p className="rise flex flex-wrap gap-x-4 text-[14px] text-muted">
            <time dateTime={item.date}>{formatDate(item.date)}</time>
            {type !== "glossary" && <span>{readMinutes(item)} min read</span>}
            {item.updated > item.date && <span>Updated <time dateTime={item.updated}>{formatDate(item.updated)}</time></span>}
          </p>
        </header>

        {item.videoUrl ? (
          <div className="glass-light mt-10 max-w-[900px] rounded-[28px] p-3">
            <iframe src={item.videoUrl} title={item.title} loading="lazy" allowFullScreen className="aspect-video w-full rounded-[20px] border-0" />
          </div>
        ) : item.image && type !== "glossary" ? (
          <ResourceArt image={item.image} priority className="mt-10 aspect-[16/9] max-w-[900px] rounded-[28px]" sizes="(min-width: 1024px) 900px, 100vw" />
        ) : null}

        <div className="mt-10">
          <ArticleBody body={item.body} html={item.bodyHtml} />
        </div>

        {item.pdfUrl && (
          <div className="mt-10">
            <Button href={item.pdfUrl} variant="text">Download the PDF</Button>
          </div>
        )}
      </article>

      {more.length > 0 && (
        <section aria-labelledby="related-title" className="mt-20">
          <h2 id="related-title" className="text-[32px] leading-[1.1] tracking-[-0.025em]">More {c.label.toLowerCase()}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {more.map((r, n) => (
              <ResourceCard key={r.slug} type={type} item={r} index={n} showRead={type !== "events"} />
            ))}
          </div>
        </section>
      )}

      <section className="glass-light sr mt-16 flex flex-col gap-5 rounded-[32px] p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <h2 className="max-w-[560px] text-[clamp(26px,2.6vw,34px)] leading-[1.1] tracking-[-0.025em]">See how Exeevo works for your teams</h2>
        <Button href={site.demoHref}>Get a demo</Button>
      </section>
      <NewsletterBlock copy={newsletter} />
    </ResourceShell>
  );
}
