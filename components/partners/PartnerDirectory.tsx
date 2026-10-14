"use client";
import Image from "next/image";
import { useState } from "react";
import { Glow } from "@/components/glass/Glow";
import { cn } from "@/components/ui/cn";
import { partners, partnersPage, type PartnerCategory } from "@/content/partners";
import { PartnerCard, catDot } from "./PartnerCard";
import { PartnerDialog } from "./PartnerDialog";

type Filter = "all" | PartnerCategory;

/** Filter bar, the Microsoft feature block and the partner grids. Filtered-out sections stay in the HTML (hidden). */
export function PartnerDirectory() {
  const p = partnersPage;
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const counts: Record<string, number> = { all: partners.length + 1, tech: 1 };
  for (const x of partners) counts[x.cat] = (counts[x.cat] ?? 0) + 1;
  const show = (c: Filter) => filter === "all" || filter === c;
  const list = partners.filter((x) => filter === "all" || filter === "tech" || x.cat === filter);
  const at = list.findIndex((x) => x.id === openId);
  const step = (d: -1 | 1) => {
    if (at < 0) return;
    setOpenId(list[(at + d + list.length) % list.length].id);
  };

  return (
    <div id="directory" className="relative scroll-mt-24">
      <div className="pointer-events-none sticky top-[100px] z-30 -mt-7 flex justify-center px-3 md:top-[108px]">
        <div role="group" aria-label={p.filterLabel} className="glass-light pointer-events-auto flex max-w-full gap-1 overflow-x-auto rounded-[20px] p-1.5">
          {p.filters.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id as Filter)}
                className={cn("flex h-11 shrink-0 items-center gap-[9px] rounded-[14px] px-[18px] text-[15px] font-semibold transition-colors", on ? "bg-ink text-white" : "text-heading hover:bg-slate/[.07]")}
              >
                <span aria-hidden="true" className={cn("size-[9px] rounded-full", f.id === "all" ? "bg-[image:var(--ex-gradient)]" : catDot[f.id])} />
                {f.name}
                <span className="text-[12.5px] font-medium opacity-60">{counts[f.id]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section hidden={!show("tech")} aria-labelledby="ms-partner-title" className="frame pt-20 lg:pt-[120px]">
        <div className="sr mb-10 flex flex-col gap-3.5 lg:mb-14">
          <p className="flex items-center gap-2.5 text-[14px] text-muted"><span aria-hidden="true" className="size-[9px] rounded-full bg-brand-blue" />{p.microsoft.kicker}</p>
          <div className="grid items-start gap-3 lg:grid-cols-12 lg:gap-x-6">
            <h2 id="ms-partner-title" className="text-[clamp(32px,3.2vw,42px)] leading-[1.08] tracking-[-0.03em] lg:col-span-6">{p.microsoft.name}</h2>
            <p className="text-[16px] leading-[1.6] text-muted lg:col-span-5 lg:col-start-8">{p.microsoft.tagline}</p>
          </div>
        </div>
        <div className="on-dark srg relative grid gap-8 overflow-hidden rounded-[34px] bg-ink p-6 sm:p-9 lg:grid-cols-12 lg:gap-x-6 lg:p-11">
          <Glow parallax color="blue" className="-right-28 -top-36 h-[420px] w-[460px] blur-[110px]" style={{ opacity: 0.35 }} />
          <div className="relative flex flex-col gap-3.5 lg:col-span-4">
            <div className="relative h-[150px] rounded-3xl bg-white"><Image src="/partners/microsoft.webp" alt="Microsoft" fill sizes="340px" className="object-contain p-7" /></div>
            <div className="relative h-[150px] rounded-3xl bg-white"><Image src="/partners/microsoft-solutions-partner.webp" alt="Microsoft Solutions Partner" fill sizes="340px" className="object-contain p-6" /></div>
          </div>
          <div className="relative flex flex-col gap-4 lg:col-span-7 lg:col-start-6">
            <h3 className="text-[clamp(24px,2.2vw,28px)] leading-[1.15] tracking-[-0.02em]">{p.microsoft.title}</h3>
            <p className="text-[17px] leading-[1.6] text-white">{p.microsoft.body[0]}</p>
            <p className="text-[16px] leading-[1.65] text-on-dark-muted">{p.microsoft.body[1]}</p>
            <ul className="flex flex-wrap gap-2 pt-1.5">
              {p.microsoft.chips.map((c) => (
                <li key={c} className="flex h-9 items-center rounded-full border border-white/[.18] px-3.5 text-[13px] text-[#DCE3E7]">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {p.sections.map((s) => (
        <section key={s.cat} hidden={!show(s.cat)} aria-labelledby={`partners-${s.cat}-title`} className="frame pt-20 lg:pt-[120px]">
          <div className="sr mb-10 flex flex-col gap-3.5 lg:mb-14">
            <p className="flex items-center gap-2.5 text-[14px] text-muted"><span aria-hidden="true" className={cn("size-[9px] rounded-full", catDot[s.cat])} />{s.kicker}</p>
            <div className="grid items-start gap-3 lg:grid-cols-12 lg:gap-x-6">
              <h2 id={`partners-${s.cat}-title`} className="text-[clamp(30px,3.2vw,42px)] leading-[1.08] tracking-[-0.03em] lg:col-span-7">{s.title}</h2>
              <p className="text-[16px] leading-[1.6] text-muted lg:col-span-5 lg:col-start-8">{s.body}</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.filter((x) => x.cat === s.cat).map((x) => (
              <PartnerCard key={x.id} partner={x} onOpen={() => setOpenId(x.id)} />
            ))}
          </div>
        </section>
      ))}

      {partners.map((x) => (
        <PartnerDialog key={x.id} partner={x} open={openId === x.id} pos={openId === x.id ? at + 1 : 0} total={list.length} onClose={() => setOpenId((cur) => (cur === x.id ? null : cur))} onStep={step} />
      ))}
    </div>
  );
}
