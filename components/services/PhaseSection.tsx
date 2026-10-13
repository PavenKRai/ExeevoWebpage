"use client";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Glow } from "@/components/glass/Glow";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
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
    <section ref={ref} id={phase.slug} aria-labelledby={`${phase.slug}-title`} className="flex scroll-mt-32 flex-col gap-8 pt-24 lg:gap-11 lg:pt-[110px]">
      <div className="sr flex flex-col justify-between gap-3 lg:flex-row lg:items-center lg:gap-10">
        <h2 id={`${phase.slug}-title`} className="text-[clamp(36px,3.6vw,46px)] leading-[1.04] tracking-[-0.03em]">{phase.title}</h2>
        <p className="max-w-[480px] text-[17px] leading-[1.55] text-muted">
          {phase.blurb} <span className="font-semibold text-heading">{n} services.</span>
        </p>
      </div>
      {children}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-x-7">
        <div className="srl flex min-w-0 flex-col gap-[18px] lg:col-span-4">
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
                    "flex min-h-14 shrink-0 flex-col gap-2 rounded-[22px] px-[22px] py-5 text-left transition-[background,color,box-shadow] duration-300 max-lg:w-[78%] max-lg:max-w-[320px]",
                    on ? "bg-ink text-white shadow-[0_24px_44px_-24px_rgba(24,32,38,.55)]" : "text-heading shadow-[inset_0_-1px_0_rgba(51,63,72,.12)] hover:bg-white/50",
                  )}
                >
                  <span className="flex items-center gap-3.5">
                    <span className={cn("w-[22px] text-[13px] font-semibold tabular-nums", on ? "text-on-dark-muted" : "text-muted")}>{s.num}</span>
                    <span className="flex-1 text-[18px] font-semibold leading-[1.25] tracking-[-0.01em]">{s.title}</span>
                    <span aria-hidden="true" className={cn("size-2.5 rounded-full transition-colors", on ? style.dot : "bg-slate/[.18]")} />
                  </span>
                  {on && <span className="pl-9 text-[14px] leading-[1.45] text-on-dark">{s.tag}</span>}
                </button>
              );
            })}
          </div>
          <div className="glass-light mt-auto flex flex-col gap-3 rounded-[24px] px-6 py-[22px]">
            <p className="text-[14px] leading-[1.5] text-muted">
              {servicesPage.interested.before} <span className="font-semibold text-heading">{cur.title}</span>?
            </p>
            <Button href={`/services?service=${cur.slug}#demo`} size="nav" solid className="h-[46px]! min-h-[46px]! self-start rounded-[15px]! px-5! text-[14.5px]!">
              {servicesPage.interested.cta}
              <ChevronRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </Button>
          </div>
        </div>

        <div className="srg relative min-w-0 lg:col-span-8">
          <Glow color={style.glow} className="left-[12%] top-[8%] h-[84%] w-[76%] blur-[110px]" style={{ opacity: 0.2 }} />
          {list.map((s, i) => (
            <div
              key={s.slug}
              id={panelId(s.slug)}
              role="tabpanel"
              aria-labelledby={tabId(s.slug)}
              hidden={i !== sel}
              className="svc-panel glass-light relative flex flex-col gap-6 rounded-[34px] p-6 sm:p-9 lg:min-h-[700px] lg:gap-[26px] lg:px-11 lg:py-10"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2.5 text-[13.5px] font-semibold text-muted">
                  <span className="flex h-7 items-center gap-2 rounded-[14px] bg-ink px-3 text-white">
                    <span aria-hidden="true" className={cn("size-2 rounded-full", style.dot)} />
                    {phase.title}
                  </span>
                  Service {s.num}
                </p>
                <div className="flex items-center gap-2">
                  <span className="mr-1.5 text-[13px] text-muted">{i + 1} of {n}</span>
                  <IconButton label="Previous service" onClick={() => go(sel - 1)} className="size-11 rounded-[13px]"><ChevronLeft size={18} strokeWidth={1.8} /></IconButton>
                  <IconButton label="Next service" onClick={() => go(sel + 1)} className="size-11 rounded-[13px]"><ChevronRight size={18} strokeWidth={1.8} /></IconButton>
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                <h3 className="text-[clamp(26px,2.4vw,32px)] leading-[1.12] tracking-[-0.025em]">{s.tag}</h3>
                <p className="max-w-[680px] text-[16px] leading-[1.65] text-[#4A5760]">{s.desc}</p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-[13px] font-semibold text-muted">{servicesPage.includedLabel}</h4>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {s.inc.map((x) => (
                    <li key={x} className="flex items-center gap-3 rounded-2xl border border-white/95 bg-white/60 px-3.5 py-[13px] text-[14px] leading-[1.35] text-heading">
                      <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-ink text-white"><Check size={14} strokeWidth={2} /></span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="on-dark relative mt-auto grid gap-3 overflow-hidden rounded-3xl bg-ink px-7 py-6 sm:grid-cols-[150px_1fr] sm:gap-5">
                <span aria-hidden="true" className={cn("pointer-events-none absolute -right-14 -top-16 size-[220px] rounded-full opacity-30 blur-[60px]", style.dot)} />
                <h4 className="relative text-[13px] font-semibold text-on-dark-muted">{servicesPage.valueLabel}</h4>
                <p className="relative text-[17px] font-[450] leading-[1.55] text-white">{s.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
