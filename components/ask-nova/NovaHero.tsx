import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Layer } from "@/components/scene/Layer";
import { askNova } from "@/content/askNova";
import { site } from "@/content/site";
import { FeatureDial } from "./FeatureDial";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Dark hero: headline and actions on the left, the feature dial on the right, then the four-figure strip. */
export function NovaHero() {
  return (
    <section className="on-dark relative overflow-x-clip bg-ink text-[#EEF2F4] lg:min-h-[800px]">
      <div aria-hidden="true" className="nova-grid-bg pointer-events-none absolute inset-0" />
      <div className="frame grid items-start gap-10 pb-8 pt-[128px] lg:grid-cols-[minmax(0,640px)_1fr] lg:gap-6 lg:pb-6 lg:pt-[104px]">
        <div className="flex min-w-0 flex-col gap-[22px] lg:pt-[46px]">
          <div className="glass-dark rise inline-flex h-[38px] items-center gap-2.5 self-start rounded-[19px] pl-2 pr-4 text-[14px] text-[#DCE3E7]" style={i(0)}>
            <span aria-hidden="true" className="orb size-[22px]" />
            {askNova.label}
          </div>
          <h1 className="rise text-[clamp(36px,4vw,54px)] leading-[1.04] tracking-[-0.035em]" style={i(1)}>{askNova.h1}</h1>
          <p className="rise max-w-[560px] text-[17px] font-[350] leading-[1.55] text-on-dark" style={i(2)}>{askNova.intro}</p>
          <div className="rise flex flex-wrap items-center gap-3.5 pt-2" style={i(3)}>
            <Button href={site.demoHref} size="hero">{askNova.primaryCta}</Button>
            <a href="#features" className="glass-dark nav-link nav-link-dark inline-flex h-14 items-center gap-2.5 rounded-[17px] px-[22px] text-[16px] font-[450] leading-[normal] text-white">
              {askNova.secondaryCta}
              <ArrowDown aria-hidden="true" size={16} strokeWidth={1.8} />
            </a>
          </div>
        </div>
        <Layer intro={0.2} from={{ o: 0, y: 40, s: 0.94 }} className="min-w-0">
          <FeatureDial />
        </Layer>
      </div>
      <dl className="frame grid gap-x-6 gap-y-8 border-t border-white/10 pb-8 pt-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {askNova.stats.map((s, n) => (
          <Layer key={s.value} from={{ o: 0, y: 30 }} range={[n * 0.1, 1]} className="flex flex-col gap-1.5">
            <dt className="font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.03em] text-white">{s.value}</dt>
            <dd className="text-[14px] leading-[1.45] text-on-dark-muted">{s.label}</dd>
          </Layer>
        ))}
        <Layer from={{ o: 0, y: 30 }} range={[0.3, 1]} className="flex flex-col gap-1.5">
          <dt className="pt-2 font-display text-[20px] font-semibold leading-[1.25] tracking-[-0.015em] text-white">{askNova.grounded.title}</dt>
          <dd className="text-[14px] leading-[1.45] text-on-dark-muted">{askNova.grounded.body}</dd>
        </Layer>
      </dl>
    </section>
  );
}
