"use client";
import Image from "next/image";
import { askNova, builtLogos, features, novaStages } from "@/content/askNova";
import { cn } from "@/components/ui/cn";
import { NovaIcon } from "./NovaIcon";
import { useNova } from "./NovaProvider";
import { TierBadge } from "./TierBadge";

const STAGE_DOT = ["var(--ex-blue)", "var(--ex-magenta)", "var(--ex-purple)", "var(--ex-green)"];
const two = (n: number) => String(n).padStart(2, "0");

/** The thirteen features grouped by stage: filter segments (each with its feature numbers) and a ruled list. */
export function FeatureList() {
  const { stage, setStage, flash } = useNova();
  const c = askNova.cycle;
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-20 bg-porcelain py-20 lg:py-[120px]">
      <div className="frame flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="features-title" className="h2 sr max-w-[820px]">{c.parts.light} <b>{c.parts.bold}</b></h2>
          <button type="button" aria-pressed={stage === -1} onClick={() => setStage(-1)} className={cn("btn sr !h-11 !px-[18px] !text-[14px]", stage === -1 ? "bg-heading text-white" : "bg-white text-heading shadow-[0_0_0_1px_#D3DBE0]")}>
            {c.all}
          </button>
        </div>
        <div role="group" aria-label={c.groupLabel} className="sr flex gap-2 overflow-x-auto pb-1">
          {novaStages.map((st, k) => {
            const fs = features.filter((x) => x.stage === k);
            const on = stage === k;
            const any = stage === -1 || on;
            return (
              <button key={st.short} type="button" aria-pressed={on} onClick={() => setStage(on ? -1 : k)} className={cn("row flex min-w-[180px] flex-col gap-3.5 rounded-[18px] border px-[18px] pb-4 pt-[18px] text-left transition-all duration-300", on ? "border-[#C3CDD3] bg-porcelain" : "border-hairline bg-white")} style={{ flex: `${fs.length} 1 0` }}>
                <span className="flex w-full items-center justify-between">
                  <span className="label inline-flex items-center gap-2 !font-normal !text-heading"><span className="dot !size-2" style={{ ["--c" as string]: STAGE_DOT[k] }} aria-hidden="true" />{st.long}</span>
                  <span className="num text-[12px] text-muted">{two(fs.length)}</span>
                </span>
                <span aria-hidden="true" className="relative flex h-[22px] w-full items-center justify-between">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-[#C3CDD3]" />
                  {fs.map((x) => (
                    <span key={x.num} className={cn("num relative rounded-full px-1.5 py-0.5 text-[11px] shadow-[0_0_0_1px_#D3DBE0]", on ? "bg-heading text-white !shadow-[0_0_0_1px_#1D262D]" : any ? "bg-white text-body" : "bg-white text-[#6B7780]")}>{x.num}</span>
                  ))}
                </span>
                <span className="text-[13px] text-muted">{st.who}</span>
                <span aria-hidden="true" className="h-0.5 rounded-sm transition-colors" style={{ background: on ? STAGE_DOT[k] : any ? "#D3DBE0" : "#EEF2F4" }} />
              </button>
            );
          })}
        </div>
        <div className="flex flex-col">
          {novaStages.map((st, k) => {
            if (stage !== -1 && stage !== k) return null;
            return (
              <div key={st.short} className="fi mb-7 flex flex-col">
                <div className="flex items-center gap-3.5 py-3.5">
                  <h3 className="label inline-flex items-center gap-2 whitespace-nowrap !font-normal !text-heading"><span className="dot !size-2" style={{ ["--c" as string]: STAGE_DOT[k] }} aria-hidden="true" />{st.long}</h3>
                  <span className="ruler hidden flex-1 sm:block" aria-hidden="true" />
                  <span className="label ml-auto whitespace-nowrap">{st.who}</span>
                </div>
                <ul>
                  {features.filter((f) => f.stage === k).map((f) => {
                    const hot = flash === f.num;
                    return (
                      <li key={f.slug} id={`f${f.num}`} className="row relative grid scroll-mt-[140px] grid-cols-[48px_44px_minmax(0,1fr)] items-center gap-x-5 gap-y-2 rounded border-t border-hairline px-3 py-5 lg:grid-cols-[64px_52px_minmax(0,1fr)_minmax(0,1.5fr)_170px]">
                        <span className={cn("num text-[13px] transition-colors duration-500", hot ? "text-brand-blue" : "text-muted")}>{f.num}</span>
                        <span className={cn("flex size-10 items-center justify-center rounded-xl border border-hairline bg-porcelain transition-colors duration-500", hot ? "text-brand-blue" : "text-heading")}><NovaIcon d={f.icon} size={20} /></span>
                        <h4 className={cn("text-[19px] font-[450] leading-[1.25] tracking-[-0.015em] transition-colors duration-500", hot ? "text-brand-blue" : "text-heading")}>{f.name}</h4>
                        <div className="col-start-3 flex flex-col gap-2.5 lg:col-start-auto">
                          <p className={cn("body-text !text-[14.5px] transition-colors duration-500", hot && "!text-brand-blue")}>{f.desc}</p>
                          <ul aria-label="Built on" className="flex flex-wrap items-center gap-[5px]">
                            <li aria-hidden="true" className="mr-0.5 inline-flex items-center gap-1.5 text-[12px] text-muted">
                              <Image src="/microsoft/microsoft-square.png" alt="" width={11} height={11} />
                              Built on
                            </li>
                            {f.built.map((b) => (
                              <li key={b} className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-[9px] py-[3px] text-[12px] text-body shadow-[0_0_0_1px_var(--ex-hairline)]">
                                {builtLogos[b] && <Image src={builtLogos[b]} alt="" width={14} height={14} className="size-3.5" />}
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-start-3 flex lg:col-start-auto lg:justify-end"><TierBadge tier={f.tier} /></div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
