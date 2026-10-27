import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { resourceConfig } from "@/content/resources/config";
import { formatDate, resourceHref } from "@/lib/resources";
import { ResourceArt } from "./ResourceArt";

/** "Keep reading": three related items (same topic first), compact cards. */
export function KeepReading({ type, items }: { type: ResourceType; items: Resource[] }) {
  if (items.length === 0) return null;
  const c = resourceConfig(type);
  return (
    <section aria-labelledby="keep-reading-title" className="bg-porcelain py-[90px]">
      <div className="wrap flex flex-col gap-[26px]">
        <div className="flex items-end justify-between gap-4">
          <h2 id="keep-reading-title" className="h2 !text-[38px]">Keep <b>reading</b></h2>
          <Link href="/resources" className="tlink !min-h-11">
            All resources
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-[18px] md:grid-cols-3">
          {items.map((r) => (
            <li key={r.slug} className="relative flex flex-col overflow-hidden rounded-[22px] bg-white/70 shadow-[0_0_0_1px_var(--ex-hairline)]">
              <div className="relative">
                <ResourceArt image={r.image} art={c.art} className="aspect-video" sizes="(min-width: 768px) 400px, 100vw" />
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-[11px] py-[5px] text-[12px] text-heading">{c.single}</span>
              </div>
              <div className="flex flex-col gap-2 px-5 pb-5 pt-[18px]">
                {r.categories[0] && <p className="text-[12.5px] text-brand-blue">{r.categories[0]}</p>}
                <h3 className="text-[18px] font-[450] leading-[1.3] text-heading">
                  <Link href={resourceHref(type, r.slug)} className="after:absolute after:inset-0 after:content-['']">{r.title}</Link>
                </h3>
                <p className="text-[12.5px] text-muted">{formatDate(r.date)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
