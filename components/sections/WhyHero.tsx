import { ShieldCheck } from "lucide-react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { Glow } from "@/components/glass/Glow";
import { HeroOrb } from "@/components/glass/HeroOrb";
import { Specimen } from "@/components/glass/Specimen";

type Item = { name: string; region: string; body: string };

export function WhyHero({
  label,
  h1,
  intro,
  complianceTitle,
  compliance,
}: {
  label: string;
  h1: string;
  intro: string;
  complianceTitle: string;
  compliance: readonly Item[];
}) {
  const delays = ["d1", "d2", "d3", "d3"];
  return (
    <section className="on-dark relative overflow-hidden bg-ink pb-[var(--ex-section-y)] pt-[140px] text-on-dark">
      <div className="rings-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <HeroOrb className="pointer-events-none absolute -right-32 top-16 hidden opacity-95 md:block lg:right-0">
        <Specimen size={520} />
      </HeroOrb>
      <Glow color="blue" className="-left-24 bottom-0 h-80 w-80" />
      <div className="frame">
        <div className="max-w-[720px]">
          <p className="rise mb-4 text-[15px] font-semibold text-link-on-dark" style={{ "--i": 0 } as React.CSSProperties}>
            {label}
          </p>
          <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
            {h1}
          </h1>
          <p className="body-lg rise mt-6 text-on-dark" style={{ "--i": 2 } as React.CSSProperties}>
            {intro}
          </p>
        </div>
        <h2 className="rise mb-8 mt-20 text-[clamp(26px,2vw+12px,34px)] md:mt-28" style={{ "--i": 3 } as React.CSSProperties}>
          {complianceTitle}
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {compliance.map((c, i) => (
            <li key={c.name} className={`srg ${delays[i]}`}>
              <GlassPanel tone="dark" className="lift h-full rounded-card p-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <ShieldCheck size={28} strokeWidth={1.8} className="text-link-on-dark" aria-hidden="true" />
                  <span className="rounded-chip border border-white/20 px-3 py-1 text-[14px] font-semibold text-white">{c.region}</span>
                </div>
                <h3 className="mb-3 text-[24px]">{c.name}</h3>
                <p className="text-[16px] text-on-dark">{c.body}</p>
              </GlassPanel>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
