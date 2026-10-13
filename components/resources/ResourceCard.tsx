import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { categoryTone, formatDate, readMinutes, resourceHref } from "@/lib/resources";
import { CategoryDot } from "../ui/CategoryDot";
import { ResourceArt } from "./ResourceArt";

/** One card in a resource grid. The whole card is a single link on the title (stretched), so it is one tab stop. */
export function ResourceCard({ type, item, index = 0, showRead = true, priority = false }: { type: ResourceType; item: Resource; index?: number; showRead?: boolean; priority?: boolean }) {
  const cat = item.categories[0];
  return (
    <article className="glass-light lift srg relative flex flex-col rounded-[28px] p-3">
      <ResourceArt image={item.image} seed={index} priority={priority} className="h-[210px] rounded-[20px]" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col gap-3 px-3.5 pb-3.5 pt-[22px]">
        {cat && (
          <span className="flex items-center gap-2 text-[13px] text-muted">
            <CategoryDot category={categoryTone(cat)} className="!size-2" />
            {cat}
          </span>
        )}
        <h3 className="text-[21px] leading-[1.22] tracking-[-0.015em] [text-wrap:pretty]">
          <Link href={resourceHref(type, item.slug)} className="after:absolute after:inset-0 after:rounded-[28px]">
            {item.title}
          </Link>
        </h3>
        {item.summary && <p className="line-clamp-3 text-[14.5px] leading-[1.55] text-muted">{item.summary}</p>}
        <div className="mt-auto flex justify-between gap-3 pt-2.5 text-[13px] text-[#6A777F]">
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          {showRead && <span>{readMinutes(item)} min read</span>}
        </div>
      </div>
    </article>
  );
}
