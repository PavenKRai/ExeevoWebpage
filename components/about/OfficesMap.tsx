"use client";
import { useState } from "react";
import { Glow } from "@/components/glass/Glow";
import { about } from "@/content/about";
import { cn } from "@/components/ui/cn";

/** "Where to find us": pick an office in the list (or on the map) to see its address. All three addresses stay in the HTML. */
export function OfficesMap() {
  const o = about.offices;
  const [sel, setSel] = useState<string>(o.list[0].id);
  return (
    <section aria-labelledby="offices-title" className="on-dark relative overflow-hidden bg-ink py-20 text-[#EEF2F4] lg:py-[110px]">
      <Glow parallax color="gradient" className="-bottom-24 right-[8%] h-[420px] w-[620px] blur-[130px] max-lg:hidden" style={{ opacity: 0.3 }} />
      <div className="frame relative">
        <div className="srl flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-end lg:gap-10">
          <div className="flex flex-col gap-3.5">
            <p className="text-[15px] text-on-dark-muted">{o.label}</p>
            <h2 id="offices-title" className="text-[clamp(34px,3.6vw,48px)] leading-[1.05] tracking-[-0.03em]">{o.title}</h2>
          </div>
          <p className="max-w-[400px] text-[16px] leading-[1.6] text-on-dark-muted">{o.body}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
          <ul className="srl flex flex-col gap-1 lg:col-span-4 lg:pt-12">
            {o.list.map((x) => {
              const on = x.id === sel;
              return (
                <li key={x.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSel(x.id)}
                    className={cn("flex w-full min-h-14 flex-col gap-2.5 rounded-[20px] border px-5 py-4 text-left transition-colors", on ? "glass-dark" : "border-transparent hover:bg-white/5")}
                  >
                    <span className="flex items-center gap-3">
                      <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full" style={{ background: x.color }} />
                      <span className="flex-1 text-[17px] font-semibold text-white">{x.city}</span>
                      <span className="text-[12.5px] text-on-dark-muted">{x.region}</span>
                    </span>
                    <span className={cn("flex-col gap-0.5 pl-[22px] text-[13.5px] leading-[1.5] text-on-dark", on ? "flex" : "sr-only")}>
                      {x.addr.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="glass-dark srg overflow-hidden rounded-[32px] p-4 lg:col-span-8 lg:p-6">
            <svg viewBox="0 0 1200 440" role="img" aria-label={o.mapLabel} className="block h-auto w-full overflow-visible">
              <image href="/about/world-dots.svg" x="0" y="0" width="1200" height="440" />
              {o.list.map((x) => {
                const on = x.id === sel;
                return (
                  <g key={x.id} className="cursor-pointer" onClick={() => setSel(x.id)}>
                    <circle cx={x.x} cy={x.y} r={on ? 40 : 0.01} fill="none" stroke={x.color} strokeOpacity=".4" strokeWidth="1.5" style={{ transition: "r .5s" }} />
                    <circle cx={x.x} cy={x.y} r="22" fill={x.color} fillOpacity=".14" />
                    <circle cx={x.x} cy={x.y} r={on ? 10 : 6} fill={x.color} stroke="var(--ex-ink)" strokeWidth="3" style={{ transition: "r .4s" }} />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
