import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { phases, servicesPage } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/components/ui/cn";
import { phaseStyle } from "./phaseStyle";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Light hero: three phase chips, display heading (light + bold), lead and two pills. */
export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-porcelain pb-[110px] pt-[140px] lg:pt-[160px]">
      <div className="gridbg" aria-hidden="true" />
      <span className="aura left-[52%] top-10 size-[420px] bg-magenta opacity-10 max-lg:hidden" aria-hidden="true" />
      <span className="aura -right-20 top-[180px] size-[460px] bg-brand-blue opacity-[.14] max-lg:hidden" aria-hidden="true" />
      <span className="aura right-60 top-[420px] size-[360px] bg-brand-green opacity-[.13] max-lg:hidden" aria-hidden="true" />
      <div className="frame relative flex flex-col items-start gap-[30px]">
        <ul className="rise flex flex-wrap gap-2" style={i(0)}>
          {phases.map((p) => (
            <li key={p.slug} className="glass inline-flex h-[34px] items-center gap-2 rounded-full px-3.5 text-[13px] text-body">
              <span aria-hidden="true" className={cn("dot", phaseStyle[p.color].dot)} />
              {p.title}
            </li>
          ))}
        </ul>
        <h1 className="h1 rise max-w-[1020px]" style={i(1)}>
          With you from first workshop <b>to every release after go-live</b>
        </h1>
        <p className="text-[18px] font-[350] leading-[1.6] tracking-normal text-muted [text-wrap:pretty] rise max-w-[720px]" style={i(2)}>{servicesPage.intro}</p>
        <div className="rise flex flex-wrap gap-2.5" style={i(3)}>
          <Button href={site.demoHref}>{servicesPage.primaryCta}</Button>
          <Button href="#engage" variant="secondary">{servicesPage.secondaryCta}</Button>
        </div>
      </div>
    </section>
  );
}
