"use client";
import { useState } from "react";
import { about } from "@/content/about";
import { cn } from "@/components/ui/cn";

/** "Where to find us": pick an office in the list (or on the map) to see its address. All four addresses stay in the HTML. */
export function OfficesMap() {
  const o = about.offices;
  const [sel, setSel] = useState<string>(o.list[0].id);
  return (
    <section aria-labelledby="offices-title" className="overflow-x-clip bg-porcelain py-20 lg:py-[120px]">
      <div className="frame flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="offices-title" className="h2 sr max-w-[760px]">{o.parts.light} <b>{o.parts.bold}</b></h2>
          <p className="lead sr max-w-[420px]">{o.body}</p>
        </div>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <ul className="flex flex-col gap-2 lg:col-span-4">
            {o.list.map((x) => {
              const on = x.id === sel;
              return (
                <li key={x.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSel(x.id)}
                    className={cn("flex min-h-14 w-full flex-col gap-2.5 rounded-[18px] border px-5 py-[18px] text-left text-heading transition-all duration-300", on ? "border-[#D9E0E5] bg-white shadow-[0_24px_40px_-28px_rgba(29,38,45,.4)]" : "border-heading/[.08] bg-transparent")}
                  >
                    <span className="flex w-full items-center justify-between gap-3">
                      <span className="flex items-center gap-2.5 text-[17px] font-[450]">
                        <span aria-hidden="true" className="size-2 shrink-0 rounded-[2px]" style={{ background: x.color }} />
                        {x.city}
                      </span>
                      <span className="label">{x.region}</span>
                    </span>
                    <span className={cn("flex-col gap-0.5 text-[14px] leading-[1.5] text-muted", on ? "flex" : "sr-only")}>
                      {x.addr.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="glass srg relative rounded-[28px] p-4 sm:p-6 lg:col-span-7 lg:col-start-6">
            <svg viewBox="0 0 1200 440" role="img" aria-label={o.mapLabel} className="block h-auto w-full overflow-visible">
              <image href="/about/world-dots.svg" x="0" y="0" width="1200" height="440" />
              {o.list.map((x) => {
                const on = x.id === sel;
                return (
                  <g key={x.id} className="cursor-pointer" onClick={() => setSel(x.id)} aria-hidden="true">
                    <circle cx={x.x} cy={x.y} r={on ? 36 : 0.01} fill="none" stroke={x.color} strokeOpacity=".5" strokeWidth="1" style={{ transition: "r .5s" }} />
                    <circle cx={x.x} cy={x.y} r="16" fill={x.color} fillOpacity=".1" />
                    <path d={`M${x.x - 24} ${x.y}h14M${x.x + 10} ${x.y}h14M${x.x} ${x.y - 24}v14M${x.x} ${x.y + 10}v14`} stroke={x.color} strokeWidth="1" />
                    <circle cx={x.x} cy={x.y} r={on ? 8 : 5} fill={x.color} stroke="#fff" strokeWidth="2.5" style={{ transition: "r .4s" }} />
                  </g>
                );
              })}
              {o.team.map((m) => (
                <g key={m.id} aria-hidden="true">
                  <circle cx={m.x} cy={m.y} r="6" fill="#fff" stroke="var(--ex-blue)" strokeWidth="2" />
                  <circle cx={m.x} cy={m.y} r="2.2" fill="var(--ex-blue)" />
                  <text x={m.side === "right" ? m.x + 12 : m.x - 12} y={m.y + 4} textAnchor={m.side === "right" ? "start" : "end"} fontFamily="Geist, Segoe UI, sans-serif" fontSize="13" fill="#333F48">{m.name}</text>
                </g>
              ))}
            </svg>
            <p className="flex gap-5 px-1.5 pt-2.5 text-[12.5px] text-muted">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-brand-blue shadow-[0_0_0_2px_#fff,0_0_0_3px_var(--ex-blue)]" />
                {o.legend.office}
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="size-2.5 rounded-full border-2 border-brand-blue bg-white" />
                {o.legend.team}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
