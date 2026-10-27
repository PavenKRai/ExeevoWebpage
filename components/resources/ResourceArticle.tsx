import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { getResources } from "@/content/resources";
import { resourceConfig } from "@/content/resources/config";
import { resourceJsonLd } from "@/lib/resourceSeo";
import { formatDate, headingsOf, readMinutes, showsReadTime } from "@/lib/resources";
import { ArticleBody } from "./ArticleBody";
import { ArticleSidebar } from "./ArticleSidebar";
import { JsonLd } from "./JsonLd";
import { KeepReading } from "./KeepReading";
import { NewsletterBlock } from "./NewsletterBlock";
import { ResourceArt } from "./ResourceArt";

async function related(type: ResourceType, item: Resource) {
  const pool = (await getResources(type)).filter((r) => r.slug !== item.slug);
  const same = pool.filter((r) => r.categories.some((c) => item.categories.includes(c)));
  return [...same, ...pool.filter((r) => !same.includes(r))].slice(0, 3);
}

/** Detail page: breadcrumb, topic, one h1, meta, image or video, summary and body with the sidebar (Details, On this page, Get a demo), Keep reading, newsletter. Every block appears only when the item has the data for it. */
export async function ResourceArticle({ type, item }: { type: ResourceType; item: Resource }) {
  const c = resourceConfig(type);
  const more = await related(type, item);
  const headings = headingsOf(item);
  const topic = item.categories.join(", ");
  return (
    <>
      <JsonLd data={resourceJsonLd(type, item)} />
      <section className="relative overflow-hidden bg-porcelain pb-10 pt-[128px] lg:pt-[140px]">
        <div className="aura -right-20 top-10 h-[480px] w-[540px] bg-brand-blue opacity-[.13] max-lg:hidden" aria-hidden="true" />
        <div className="wrap flex max-w-[1080px] flex-col gap-[22px]">
          <nav aria-label="Breadcrumb" className="rise text-[13px] text-muted">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li><Link href="/resources" className="inline-flex min-h-11 items-center text-brand-blue">Resources</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={c.path} className="inline-flex min-h-11 items-center text-brand-blue">{c.label}</Link></li>
            </ol>
          </nav>
          {topic && (
            <p className="rise inline-flex items-center gap-[7px] self-start rounded-full bg-white/70 px-3 py-[5px] text-[12.5px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]">
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: c.color }} />
              {topic}
            </p>
          )}
          <h1 className="h1 rise !text-[clamp(38px,4.4vw,60px)] !text-heading">{item.title}</h1>
          <p className="rise flex flex-wrap items-center gap-x-[18px] gap-y-2 text-[14px] text-muted">
            <time dateTime={item.date}>{formatDate(item.date)}</time>
            {showsReadTime(type) && (
              <>
                <span aria-hidden="true">·</span>
                <span>{readMinutes(item)} min read</span>
              </>
            )}
            {item.updated > item.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated <time dateTime={item.updated}>{formatDate(item.updated)}</time></span>
              </>
            )}
          </p>
        </div>
        {(item.videoUrl || item.image) && (
          <div className="wrap mt-[30px] max-w-[1080px]">
            {item.videoUrl ? (
              <figure id="recording" className="glass scroll-mt-28 rounded-[28px] p-3">
                <iframe src={item.videoUrl} title={item.title} loading="lazy" allowFullScreen className="aspect-video w-full rounded-[20px] border-0" />
              </figure>
            ) : (
              item.image && <ResourceArt image={item.image} art={c.art} priority className="aspect-[16/8] rounded-[28px]" sizes="(min-width: 1080px) 1000px, 100vw" />
            )}
          </div>
        )}
      </section>
      <section className="bg-white pb-[90px] pt-[30px]">
        <div className="wrap grid items-start gap-x-10 gap-y-8 lg:grid-cols-12">
          <article className="max-w-[760px] lg:col-span-8">
            {item.summary && <p className="mb-[26px] text-[20px] font-[350] leading-[1.6] text-heading">{item.summary}</p>}
            <ArticleBody body={item.body} html={item.bodyHtml} />
          </article>
          <ArticleSidebar type={type} item={item} headings={headings} />
        </div>
      </section>
      <KeepReading type={type} items={more} />
      <NewsletterBlock />
    </>
  );
}
