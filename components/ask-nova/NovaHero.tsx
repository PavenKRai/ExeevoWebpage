import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { askNova } from "@/content/askNova";
import { site } from "@/content/site";
import { FeatureDial } from "./FeatureDial";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Light hero: chip, headline (light + bold phrase), lead and two actions on the left; the feature dial on the right; then the four figures. */
export function NovaHero() {
  return (
    <section className="relative overflow-hidden bg-porcelain pt-[130px] lg:pt-[150px]">
      <div className="gridbg" aria-hidden="true" />
      <div className="aura right-0 top-10 size-[520px] bg-[#7A3FC0] opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="aura right-[220px] top-[280px] size-[420px] bg-brand-blue opacity-[.14] max-lg:hidden" aria-hidden="true" />
      <div className="aura right-10 top-[420px] size-[300px] bg-magenta opacity-10 max-lg:hidden" aria-hidden="true" />
      <div className="frame grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
        <div className="flex flex-col items-start gap-7 lg:col-span-6">
          <span className="glass rise inline-flex h-9 items-center gap-2.5 rounded-full pl-3 pr-4 text-[13px] text-body" style={i(0)}>
            <span aria-hidden="true" className="dot dot-ai" />
            {askNova.label}
          </span>
          <h1 className="h1 rise" style={i(1)}>
            {askNova.h1Parts.light} <b>{askNova.h1Parts.bold}</b>
          </h1>
          <p className="lead rise max-w-[540px]" style={i(2)}>{askNova.intro}</p>
          <div className="rise flex flex-wrap gap-2.5" style={i(3)}>
            <Button href={site.demoHref}>{askNova.primaryCta}</Button>
            <Button href="#features" variant="secondary">
              {askNova.secondaryCta}
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
            </Button>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <FeatureDial />
        </div>
      </div>
      <div className="frame relative mt-12 lg:mt-16">
        <dl className="grid gap-x-6 border-t border-[#D9E0E5] sm:grid-cols-2 lg:grid-cols-4">
          {askNova.stats.map((s) => (
            <div key={s.value} className="sr flex flex-col gap-2.5 pb-7 pr-6 pt-[26px]">
              <dt className="text-[48px] font-[250] leading-none tracking-[-0.045em] text-heading">{s.value}</dt>
              <dd className="max-w-[220px] text-[14px] leading-[1.45] text-muted">{s.label}</dd>
            </div>
          ))}
          <div className="sr flex flex-col gap-2.5 pb-7 pt-[26px]">
            <dt className="text-[20px] font-normal leading-[1.25] tracking-[-0.015em] text-heading">{askNova.grounded.title}</dt>
            <dd className="text-[14px] leading-[1.45] text-muted">{askNova.grounded.body}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
