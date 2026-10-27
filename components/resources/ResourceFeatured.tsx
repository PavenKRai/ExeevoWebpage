import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { resourceConfig } from "@/content/resources/config";
import { formatDate, readMinutes, resourceHref } from "@/lib/resources";
import { Button } from "../ui/Button";
import { ResourceArt } from "./ResourceArt";

/** Lead item at the top of the hub: image panel (7 columns) and text (5). */
export function ResourceFeatured({ type, item }: { type: ResourceType; item: Resource }) {
  const c = resourceConfig(type);
  const topic = item.categories[0];
  return (
    <section aria-label="Featured" className="bg-porcelain pb-10 pt-5">
      <div className="wrap">
        <article className="srg relative grid overflow-hidden rounded-[28px] bg-white/70 shadow-[0_0_0_1px_var(--ex-hairline)] lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <ResourceArt image={item.image} art={c.art} priority className="h-full min-h-[240px] lg:min-h-[340px]" sizes="(min-width: 1024px) 700px, 100vw" />
            <span className="absolute left-[18px] top-[18px] rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] text-heading">Featured · {c.single}</span>
          </div>
          <div className="flex flex-col justify-center gap-3.5 p-7 lg:col-span-5 lg:p-[34px]">
            {topic && <p className="text-[13px] text-brand-blue">{topic}</p>}
            <h2 className="text-[clamp(24px,2.2vw,30px)] font-normal leading-[1.15] tracking-[-0.025em] text-heading">
              <Link href={resourceHref(type, item.slug)} className="after:absolute after:inset-0 after:content-['']">{item.title}</Link>
            </h2>
            {item.summary && <p className="body-text !text-[15.5px]">{item.summary}</p>}
            <p className="text-[13px] text-muted">{formatDate(item.date)} · {readMinutes(item)} min read</p>
            <Button href={resourceHref(type, item.slug)} className="relative z-[2] self-start">
              Read
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
