import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Specimen } from "@/components/glass/Specimen";
import { HeroOrb } from "@/components/glass/HeroOrb";
import { Layer } from "@/components/scene/Layer";
import { phases, servicesPage } from "@/content/services";
import { site } from "@/content/site";
import { phaseStyle } from "./phaseStyle";
import { cn } from "@/components/ui/cn";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
// Design-space (600x600) positions of the three phase pills around the sphere.
const pills = [
  { left: 30, top: 150 },
  { left: 360, top: 290 },
  { left: 90, top: 440 },
] as const;

/** Dark hero: label, h1, intro, two actions, and the sphere with the three phases orbiting it. */
export function ServicesHero() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="svc-arcs pointer-events-none absolute inset-x-0 -top-[120px] h-[900px]" />
      <div className="frame grid items-center gap-10 pb-12 pt-[128px] lg:grid-cols-[minmax(0,720px)_1fr] lg:pb-[40px] lg:pt-[150px]">
        <div className="flex flex-col gap-6">
          <p className="rise text-[15px] text-on-dark-muted" style={i(0)}>{servicesPage.label}</p>
          <h1 className="rise text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.035em]" style={i(1)}>{servicesPage.h1}</h1>
          <p className="rise max-w-[720px] text-[18px] font-[350] leading-[1.6] text-on-dark" style={i(2)}>{servicesPage.intro}</p>
          <div className="rise flex flex-wrap items-center gap-3 pt-1" style={i(3)}>
            <Button href={site.demoHref} size="hero">{servicesPage.primaryCta}</Button>
            <a
              href="#how-we-engage"
              className="glass-dark nav-link nav-link-dark inline-flex h-14 items-center rounded-[17px] px-6 text-[16px] font-medium leading-[normal] text-white"
            >
              {servicesPage.secondaryCta}
            </a>
          </div>
        </div>
        <HeroOrb className="relative mx-auto w-full max-w-[420px] lg:max-w-[560px]">
          <Specimen size="100%">
            {phases.map((p, n) => (
              <Layer
                key={p.slug}
                intro={0.4 + n * 0.15}
                from={{ o: 0, y: 24, s: 0.92 }}
                className={cn("glass-dark absolute flex h-[52px] items-center gap-2.5 rounded-[26px] bg-ink/55 pl-3.5 pr-5 text-[16px] font-semibold text-white")}
                style={pills[n] as CSSProperties}
              >
                <span aria-hidden="true" className={cn("size-3 rounded-full", phaseStyle[p.color].dot)} />
                {p.title}
              </Layer>
            ))}
          </Specimen>
        </HeroOrb>
      </div>
    </div>
  );
}
