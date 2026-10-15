import type { CSSProperties } from "react";
import Link from "next/link";
import { CategoryDot } from "@/components/ui/CategoryDot";
import { modules, platformFigures, platformPage } from "@/content/modules";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const two = (n: number) => String(n).padStart(2, "0");

/** Intro: heading, lead and the 8 / 1 / 1 figures on the left, the module list (anchor links) in a glass panel on the right. */
export function PlatformIntro() {
  return (
    <section className="plat relative overflow-hidden bg-porcelain pb-20 pt-[128px] lg:pb-[100px] lg:pt-[160px]">
      <div className="gridbg" aria-hidden="true" />
      <div className="aura -right-[100px] top-[60px] size-[520px] bg-brand-blue opacity-15 max-lg:hidden" aria-hidden="true" />
      <div className="aura right-[320px] top-[420px] size-[380px] bg-brand-green opacity-[.13] max-lg:hidden" aria-hidden="true" />
      <div className="plat-wrap relative grid items-start gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-7 lg:sticky lg:top-[120px] lg:col-span-6">
          <h1 className="h1 rise" style={i(1)}>
            Everything <b>in one view</b>
          </h1>
          <p className="plat-lead rise max-w-[520px]" style={i(2)}>{platformPage.intro}</p>
          <dl className="rise flex gap-[18px] pt-3 max-sm:hidden" style={i(3)}>
            {platformFigures.map((f, n) => (
              <div key={f.label} className={`flex flex-col-reverse gap-1.5 ${n > 0 ? "border-l border-[#D9E0E5] pl-[18px]" : ""}`}>
                <dt className="text-[13.5px] font-[450] text-muted">{f.label}</dt>
                <dd className="text-[44px] font-[250] leading-none tracking-[-0.04em] text-heading">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <nav aria-label="Modules" className="glass fi rounded-[28px] px-3.5 pt-3.5 lg:col-span-6 lg:col-start-7">
          <div className="h-3.5" aria-hidden="true" />
          <ul>
            {modules.map((m, n) => (
              <li key={m.slug}>
                <Link href={`#${m.slug}`} className="row grid min-h-14 grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-4 border-t border-[#D9E0E5] px-3.5 py-4 sm:grid-cols-[56px_minmax(0,1fr)_auto]">
                  <span className="num text-[12px] text-muted">{two(n + 1)}</span>
                  <span className="flex items-center gap-3 text-[17px] font-[450] text-heading">
                    <CategoryDot category={m.category} className="!size-[11px]" />
                    {m.name}
                  </span>
                  <span className="text-[13.5px] font-[450] text-muted max-sm:hidden">{m.categoryLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-3.5 border-t border-[#D9E0E5]" aria-hidden="true" />
        </nav>
      </div>
    </section>
  );
}
