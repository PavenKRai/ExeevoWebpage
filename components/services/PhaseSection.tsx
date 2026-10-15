"use client";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/ui/cn";
import { servicesPage, type Phase } from "@/content/services";
import { phaseStyle } from "./phaseStyle";
import { useServiceParam } from "./ServiceParam";

const tabId = (slug: string) => `svc-tab-${slug}`;
const panelId = (slug: string) => `svc-panel-${slug}`;

/** One phase: heading, a rail of its services and the detail of the selected one. Every service's detail is in the HTML (inactive ones are `hidden`). */
export function PhaseSection({ phase, children }: { phase: Phase; children?: ReactNode }) {
  const list = phase.services;
  const n = list.length;
  const [sel, setSel] = useState(0);
  const param = useServiceParam();
  const ref = useRef<HTMLElement>(null);
  const style = phaseStyle[phase.color];
  const ground = phase.slug === "implement" ? "bg-porcelain" : "bg-white";

  // ?service=<slug> from "How we engage" or "Talk to us about it": select it (adjusted during render, not in an effect)...
  const [seen, setSeen] = useState<string | null>(null);
  if (param !== seen) {
    setSeen(param);
    const at = list.findIndex((s) => s.slug === param);
    if (at >= 0) setSel(at);
  }
  // ...and scroll to this phase unless the link carries its own #hash (the form link does).
  useEffect(() => {
    if (!list.some((s) => s.slug === param) || window.location.hash) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [param, list]);

  const go = (i: number, focus = false) => {
    const next = (i + n) % n;
    setSel(next);
    if (focus) requestAnimationFrame(() => document.getElementById(tabId(list[next].slug))?.focus());
  };
  const onKey = (e: KeyboardEvent) => {
    const key: Record<string, number> = { ArrowDown: sel + 1, ArrowRight: sel + 1, ArrowUp: sel - 1, ArrowLeft: sel - 1, Home: 0, End: n - 1 };
    if (!(e.key in key)) return;
    e.preventDefault();
    go(key[e.key], true);
  };

  const cur = list[sel];
  return (
    <section ref={ref} id={phase.slug} aria-labelledby={`${phase.slug}-title`} className={cn("relative scroll-mt-[140px] overflow-hidden py-20 lg:py-[110px]", ground)}>
      <span aria-hidden="true" className="aura -right-[120px] top-[120px] size-[480px] opacity-10 max-lg:hidden" style={{ background: style.glow }} />
      <div className="frame relative flex flex-col gap-12">
        <div className="sr flex max-w-[760px] flex-col gap-5">
          <h2 id={`${phase.slug}-title`} className="h2"><b>{phase.title}</b></h2>
          <p className="text-[18px] font-[350] leading-[1.6] tracking-normal text-muted [text-wrap:pretty] max-w-[640px]">{phase.blurb}</p>
        </div>
        {children}
        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-x-6">
          <div className="srl flex min-w-0 flex-col gap-1.5 lg:col-span-5">
            <div role="tablist" aria-label={`${phase.title} services`} onKeyDown={onKey} className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
              {list.map((s, i) => {
                const on = i === sel;
                return (
                  <button
                    key={s.slug}
                    id={tabId(s.slug)}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={panelId(s.slug)}
                    tabIndex={on ? 0 : -1}
                    onClick={() => go(i)}
                    className={cn(
                      "grid min-h-14 w-full shrink-0 grid-cols-[44px_minmax(0,1fr)_12px] items-center gap-3.5 rounded-[18px] border px-[18px] py-[18px] text-left text-heading transition-[background,box-shadow] duration-300 max-lg:w-[78%] max-lg:max-w-[340px]",
                      on ? "border-[#D9E0E5] bg-white shadow-[0_24px_40px_-28px_rgba(29,38,45,.4)]" : "border-transparent shadow-[inset_0_-1px_0_rgba(29,38,45,.08)] hover:bg-white/70",
                    )}
                  >
                    <span className="num text-[13px] text-muted">{s.num}</span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[17px] font-[450]">{s.title}</span>
                      <span className="text-[13px] leading-[1.45] text-muted">{s.tag}</span>
                    </span>
                    <span aria-hidden="true" className={cn("size-2 rounded-full transition-colors", !on && "bg-[rgba(29,38,45,.16)]")} style={on ? { background: style.glow } : undefined} />
                  </button>
                );
              })}
            </div>
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-dashed border-[#C3CDD3] p-[18px]">
              <p className="text-[14px] text-muted">
                {servicesPage.interested.before} <span className="font-medium text-heading">{cur.title}</span>?
              </p>
              <Link href={`/services?service=${cur.slug}#demo`} className="tlink text-[14px]">
                {servicesPage.interested.cta}
                <ArrowRight aria-hidden="true" size={15} strokeWidth={1.6} />
              </Link>
            </div>
          </div>

          <div className="srg min-w-0 lg:col-span-6 lg:col-start-7">
            {list.map((s, i) => (
              <article
                key={s.slug}
                id={panelId(s.slug)}
                role="tabpanel"
                aria-labelledby={tabId(s.slug)}
                hidden={i !== sel}
                className="svc-panel glass relative flex flex-col gap-[22px] overflow-hidden rounded-[28px] p-6 sm:p-8"
              >
                <span aria-hidden="true" className="aura -right-20 -top-20 size-60 opacity-[.18]" style={{ background: style.glow }} />
                <div className="relative flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2.5 text-[13.5px] font-medium text-muted">
                    <span aria-hidden="true" className={cn("dot", style.dot)} />
                    {phase.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="num mr-1 text-[12px] text-muted">{i + 1} of {n}</span>
                    <button type="button" aria-label="Previous service" onClick={() => go(sel - 1)} className="btn btn-glass size-11 !p-0"><ChevronLeft size={18} strokeWidth={1.6} /></button>
                    <button type="button" aria-label="Next service" onClick={() => go(sel + 1)} className="btn btn-glass size-11 !p-0"><ChevronRight size={18} strokeWidth={1.6} /></button>
                  </div>
                </div>
                <h3 className="relative text-[clamp(24px,2.2vw,30px)] font-[350] leading-[1.12] tracking-[-0.03em] text-heading">{s.tag}</h3>
                <p className="body-text relative !text-[16px]">{s.desc}</p>
                <div className="relative flex flex-col gap-3 border-t border-[rgba(29,38,45,.1)] pt-3.5">
                  <h4 className="text-[13.5px] font-medium text-muted">{servicesPage.includedLabel}</h4>
                  <ul className="flex flex-col gap-2.5">
                    {s.inc.map((x) => (
                      <li key={x} className="flex items-start gap-3 text-[15px] leading-[1.5] text-body">
                        <span aria-hidden="true" className={cn("flex pt-0.5", style.check)}><Check size={16} strokeWidth={1.8} /></span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative flex flex-col gap-2 rounded-[18px] border border-hairline bg-white/75 px-[22px] py-5">
                  <h4 className="text-[13.5px] font-medium text-muted">{servicesPage.valueLabel}</h4>
                  <p className="text-[15px] leading-[1.6] text-heading">{s.val}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
