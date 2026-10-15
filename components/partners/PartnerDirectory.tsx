"use client";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { cn } from "@/components/ui/cn";
import { partners, partnersPage, type PartnerCategory } from "@/content/partners";
import { catColor } from "./catColor";
import { PartnerRow } from "./PartnerRow";

type Filter = "all" | PartnerCategory;
const dot = (c: string) => ({ "--c": c }) as CSSProperties;

/** Sticky filter bar (under the site nav), the Microsoft block and the partner lists. Filtered-out sections stay in the HTML (hidden). */
export function PartnerDirectory() {
  const p = partnersPage;
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const counts: Record<string, number> = { all: partners.length + 1, tech: 1 };
  for (const x of partners) counts[x.cat] = (counts[x.cat] ?? 0) + 1;
  const show = (c: Filter) => filter === "all" || filter === c;
  const grounds = { impl: "bg-white", data: "bg-porcelain", comp: "bg-white" } as const;
  const auras = { impl: "#DF1995", data: "#00C389", comp: "#56636C" } as const;

  return (
    <div id="directory" className="relative">
      <div id="browse" className="sticky top-[84px] z-30 scroll-mt-20 border-y border-hairline bg-white/95 backdrop-blur-md">
        <div className="frame flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
          <p className="text-[13.5px] font-medium text-muted max-sm:hidden">{p.filterPrefix}</p>
          <div role="group" aria-label={p.filterLabel} className="-mx-1 flex max-w-full gap-1.5 overflow-x-auto px-1">
            {p.filters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id as Filter)}
                  className={cn("inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full border px-4 text-[14px] transition-all duration-300", on ? "border-heading bg-heading text-white" : "border-[#D9E0E5] bg-white text-heading hover:bg-porcelain")}
                >
                  <span aria-hidden="true" className={cn("dot", f.id === "all" && "dot-ai")} style={f.id === "all" ? undefined : dot(catColor[f.id as PartnerCategory])} />
                  {f.name}
                  <span className="num text-[12px] opacity-70">{counts[f.id]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section hidden={!show("tech")} id="tech" aria-labelledby="ms-partner-title" className="relative scroll-mt-32 overflow-hidden bg-porcelain py-20 lg:py-[110px]">
        <span aria-hidden="true" className="aura -right-[120px] top-10 size-[520px] bg-brand-blue opacity-[.14] max-lg:hidden" />
        <div className="frame relative grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="sr flex max-w-[760px] flex-col gap-5">
              <h2 id="ms-partner-title" className="h2"><b>{p.microsoft.name}</b></h2>
              <p className="text-[18px] font-[350] leading-[1.6] tracking-normal text-muted [text-wrap:pretty] max-w-[640px]">{p.microsoft.tagline}</p>
            </div>
            <ul className="sr flex flex-wrap gap-1.5">
              {p.microsoft.chips.map((c) => (
                <li key={c} className="rounded-full border border-hairline bg-white px-3 py-2 text-[13.5px] font-medium text-body">{c}</li>
              ))}
            </ul>
          </div>
          <div className="glass srg flex flex-col gap-5 rounded-[28px] p-6 sm:p-8 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="relative h-[120px] rounded-[18px] bg-white"><Image src="/partners/microsoft.webp" alt="Microsoft" fill sizes="240px" className="object-contain p-[26px]" /></div>
              <div className="relative h-[120px] rounded-[18px] bg-white"><Image src="/partners/microsoft-solutions-partner.webp" alt="Microsoft Solutions Partner" fill sizes="240px" className="object-contain p-5" /></div>
            </div>
            <h3 className="h3">{p.microsoft.title}</h3>
            {p.microsoft.body.map((t, n) => (
              <p key={n} className="body-text !text-[16px]">{t}</p>
            ))}
          </div>
        </div>
      </section>

      {p.sections.map((s) => {
        const list = partners.filter((x) => x.cat === s.cat);
        const noun = list.length === 1 ? p.countNoun.one : p.countNoun.many;
        return (
          <section key={s.cat} hidden={!show(s.cat)} id={s.cat} aria-labelledby={`partners-${s.cat}-title`} className={cn("relative scroll-mt-32 overflow-hidden py-20 lg:py-[110px]", grounds[s.cat])}>
            <span aria-hidden="true" className="aura -right-20 top-20 h-[420px] w-[460px] opacity-10 max-lg:hidden" style={{ background: auras[s.cat] }} />
            <div className="frame relative grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
              <div className="flex flex-col gap-[22px] lg:sticky lg:top-[170px] lg:col-span-4">
                <h2 id={`partners-${s.cat}-title`} className="h2 sr max-w-[420px]"><b>{s.title}</b></h2>
                <p className="body-text sr !text-[16px]">{s.body}</p>
                <p className="sr flex items-baseline gap-2.5 border-t border-[#D9E0E5] pt-[18px]">
                  <span className="num text-[44px] font-extralight leading-none tracking-[-0.045em] text-heading">{String(list.length).padStart(2, "0")}</span>
                  <span className="text-[13.5px] font-medium text-muted">{noun}</span>
                </p>
              </div>
              <div className="glass srg rounded-[28px] px-6 py-2 sm:px-7 lg:col-span-7 lg:col-start-6">
                {list.map((x, n) => (
                  <PartnerRow key={x.id} partner={x} first={n === 0} open={!!open[x.id]} onToggle={() => setOpen((o) => ({ ...o, [x.id]: !o[x.id] }))} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
