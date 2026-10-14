import Image from "next/image";
import type { CSSProperties } from "react";
import { Glow } from "@/components/glass/Glow";
import { about } from "@/content/about";
import { cn } from "@/components/ui/cn";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Dark hero: headline and the "one platform, one licence" lines, then the photo band with the five company figures. */
export function AboutHero() {
  const a = about;
  return (
    <section className="on-dark relative overflow-hidden bg-ink pb-16 text-[#EEF2F4] lg:pb-24">
      <div aria-hidden="true" className="co-grid-bg pointer-events-none absolute inset-0" />
      <Glow parallax color="purple" className="-top-20 right-[6%] h-[520px] w-[640px] blur-[130px] max-lg:hidden" style={{ opacity: 0.35 }} />
      <div className="frame relative pt-[128px] lg:pt-[150px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="rise text-[15px] text-on-dark-muted" style={i(0)}>{a.label}</p>
            <h1 className="rise text-[clamp(38px,4.3vw,62px)] leading-[1.05] tracking-[-0.035em]" style={i(1)}>{a.h1}</h1>
            <p className="rise max-w-[640px] text-[18px] font-[350] leading-[1.65] text-on-dark" style={i(2)}>{a.intro}</p>
            <p className="rise max-w-[640px] text-[16px] leading-[1.65] text-on-dark-muted" style={i(3)}>{a.body}</p>
          </div>
          <ul className="srr flex flex-col self-end pb-1.5 lg:col-span-4 lg:col-start-9">
            {a.oneLines.map((l) => (
              <li key={l.text} className="flex items-baseline gap-3.5 border-t border-white/[.12] py-4">
                <span aria-hidden="true" className={cn("size-[9px] shrink-0 -translate-y-[3px] rounded-full", l.dot)} />
                <span className="font-display text-[clamp(20px,1.7vw,24px)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">{l.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="srg relative mt-12 h-[220px] overflow-hidden rounded-[32px] bg-[#0E1317] sm:h-[260px] lg:mt-[72px] lg:h-[300px]">
          <Image src={a.heroImage.src} alt={a.heroImage.alt} fill priority sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,32,38,0)_45%,rgba(24,32,38,.65))]" />
        </div>
        <dl className="glass-dark srg relative -mt-12 grid grid-cols-2 rounded-[26px] bg-ink/80 sm:mx-6 sm:grid-cols-3 lg:-mt-16 lg:mx-10 lg:grid-cols-5">
          {a.stats.map((s, n) => (
            <div key={s.value} className={cn("flex flex-col gap-1.5 px-6 py-5 lg:px-7 lg:py-[26px]", n > 0 && "border-white/10 lg:border-l")}>
              <dt className="font-display text-[clamp(26px,2.5vw,36px)] font-semibold leading-none tracking-[-0.03em] text-white">{s.value}</dt>
              <dd className="text-[13.5px] leading-[1.35] text-on-dark-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
