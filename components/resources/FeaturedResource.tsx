import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { categoryTone, formatDate, readMinutes, resourceHref } from "@/lib/resources";
import { Button } from "../ui/Button";
import { CategoryDot } from "../ui/CategoryDot";
import { ResourceArt } from "./ResourceArt";

/** Large lead item at the top of a list (design: 7/5 split, image left, text and primary action right). */
export function FeaturedResource({ type, item, label, cta }: { type: ResourceType; item: Resource; label: string; cta: string }) {
  const cat = item.categories[0];
  return (
    <article className="glass-light srg mt-12 grid overflow-hidden rounded-[34px] lg:mt-14 lg:grid-cols-12">
      <div className="p-3.5 lg:col-span-7">
        <ResourceArt image={item.image} priority className="h-[260px] rounded-[26px] lg:h-[432px]" sizes="(min-width: 1024px) 700px, 100vw" />
      </div>
      <div className="flex flex-col justify-between gap-8 p-7 lg:col-span-5 lg:py-10 lg:pl-[30px] lg:pr-11">
        <div className="flex flex-col gap-[18px]">
          <p className="flex items-center gap-2.5 text-[14px] text-muted">
            <CategoryDot category={categoryTone(cat)} className="!size-[9px]" />
            {label}{cat ? `, ${cat}` : ""}
          </p>
          <h2 className="text-[clamp(28px,2.6vw,38px)] leading-[1.1] tracking-[-0.03em]">
            <Link href={resourceHref(type, item.slug)}>{item.title}</Link>
          </h2>
          {item.summary && <p className="line-clamp-4 text-[16px] leading-[1.6] text-muted">{item.summary}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex flex-col text-[14px] text-muted">
            <time dateTime={item.date}>{formatDate(item.date)}</time>
            <span>{readMinutes(item)} min read</span>
          </p>
          <Button href={resourceHref(type, item.slug)}>{cta}</Button>
        </div>
      </div>
    </article>
  );
}
