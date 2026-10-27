import { CalendarClock, MapPin } from "lucide-react";
import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { resourceConfig } from "@/content/resources/config";
import { eventParts, formatDate, formatDateTime, readMinutes, resourceHref, showsReadTime } from "@/lib/resources";
import { ResourceAction } from "./ResourceAction";
import { ResourceArt } from "./ResourceArt";

/** One card (design: 16:9 art with type chip and event date badge, topic, title, summary, then the meta line and the one action). Everything shown comes from the item's fields. */
export function ResourceCard({ type, item, priority = false }: { type: ResourceType; item: Resource; priority?: boolean }) {
  const c = resourceConfig(type);
  const topic = item.categories[0];
  const badge = type === "events" && item.startDate ? eventParts(item.startDate) : null;
  const meta = [type !== "events" && item.date ? formatDate(item.date) : "", showsReadTime(type) ? `${readMinutes(item)} min read` : ""].filter(Boolean).join(" · ");
  return (
    <article className="lift srg relative flex flex-col overflow-hidden rounded-[22px] bg-white/70 shadow-[0_0_0_1px_var(--ex-hairline)]">
      <div className="relative">
        <ResourceArt image={item.image} art={c.art} priority={priority} className="aspect-video" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-[7px] rounded-full bg-white/90 px-[11px] py-[5px] text-[12px] text-heading">
          <span aria-hidden="true" className="size-2 rounded-full" style={{ background: c.color }} />
          {c.single}
        </span>
        {badge && (
          <span className="absolute right-3.5 top-3.5 flex h-[60px] w-14 flex-col items-center justify-center rounded-[14px] bg-white shadow-[0_10px_20px_-14px_rgba(29,38,45,.5)]">
            <span className="text-[11px] font-medium text-magenta">{badge.month}</span>
            <span className="text-[20px] leading-none text-heading">{badge.day}</span>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-[22px] pb-[22px] pt-5">
        {topic && <p className="text-[12.5px] text-brand-blue">{topic}</p>}
        <h3 className="text-[19px] font-[450] leading-[1.3] tracking-[-0.01em] text-heading [text-wrap:pretty]">
          <Link href={resourceHref(type, item.slug)} className="after:absolute after:inset-0 after:content-['']">{item.title}</Link>
        </h3>
        {item.summary && <p className="line-clamp-3 text-[14px] leading-[1.55] text-muted">{item.summary}</p>}
        {type === "events" && (item.startDate || item.location) && (
          <ul className="flex flex-col gap-1.5 pt-1 text-[13px] text-body">
            {item.startDate && (
              <li className="inline-flex items-start gap-2">
                <CalendarClock size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-magenta" aria-hidden="true" />
                <span>{formatDateTime(item.startDate)}{item.endDate ? ` – ${formatDateTime(item.endDate)}` : ""}</span>
              </li>
            )}
            {item.location && (
              <li className="inline-flex items-start gap-2">
                <MapPin size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-magenta" aria-hidden="true" />
                <span>{item.location}</span>
              </li>
            )}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgba(29,38,45,.06)] pt-3.5">
          <span className="text-[12.5px] text-muted">{meta}</span>
          <ResourceAction type={type} item={item} />
        </div>
      </div>
    </article>
  );
}
