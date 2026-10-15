import Link from "next/link";
import { ArrowDown } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { catNames, partners, partnersPage, type PartnerCategory } from "@/content/partners";
import { catColor } from "./catColor";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function Chip({ cat, label }: { cat: PartnerCategory; label: string }) {
  return (
    <li className="glass inline-flex h-[34px] items-center gap-2 rounded-full px-3.5 text-[13px] text-body">
      <span aria-hidden="true" className="dot" style={{ "--c": catColor[cat] } as CSSProperties} />
      {label}
    </li>
  );
}

/** Light hero: category chips, display heading (light + bold), two paragraphs, two pills, and four glass tiles with the partner counts. */
export function PartnersHero() {
  const p = partnersPage;
  const counts: Record<string, number> = { tech: 1 };
  for (const x of partners) counts[x.cat] = (counts[x.cat] ?? 0) + 1;
  return (
    <section className="relative overflow-hidden bg-porcelain pb-[110px] pt-[140px] lg:pt-[150px]">
      <div className="gridbg" aria-hidden="true" />
      <span className="aura right-[60px] top-[60px] size-[420px] bg-magenta opacity-10 max-lg:hidden" aria-hidden="true" />
      <span className="aura -right-20 top-[300px] size-[460px] bg-brand-blue opacity-[.14] max-lg:hidden" aria-hidden="true" />
      <span className="aura right-[360px] top-[380px] size-80 bg-brand-green opacity-[.13] max-lg:hidden" aria-hidden="true" />
      <div className="frame relative grid items-center gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col items-start gap-[26px] lg:col-span-7">
          <ul className="rise flex flex-wrap gap-2" style={i(0)}>
            <Chip cat="comp" label="Compliance" />
            <Chip cat="data" label="Data" />
            <Chip cat="impl" label="Implementation" />
            <Chip cat="tech" label="Technology" />
          </ul>
          <h1 className="h1 rise" style={i(1)}>{p.h1Light} <b>{p.h1Bold}</b></h1>
          <p className="text-[18px] font-[350] leading-[1.6] tracking-normal text-muted [text-wrap:pretty] rise max-w-[620px]" style={i(2)}>{p.intro}</p>
          <p className="body-text rise max-w-[620px] !text-[16px]" style={i(3)}>{p.body}</p>
          <div className="rise flex flex-wrap gap-2.5" style={i(4)}>
            <Button href="#browse">{p.browse}</Button>
            <Button href="#become" variant="secondary">{p.becomeLabel}</Button>
          </div>
        </div>
        <ul className="fi grid grid-cols-2 gap-3 lg:col-span-4 lg:col-start-9">
          {p.heroTiles.map((t) => (
            <li key={t.cat}>
              <Link href={t.href} className="glass lift flex min-h-[170px] flex-col justify-between rounded-[24px] p-[22px]">
                <span className="flex items-center justify-between text-[13.5px] font-medium text-body">
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true" className="dot" style={{ "--c": catColor[t.cat] } as CSSProperties} />
                    {catNames[t.cat]}
                  </span>
                  <ArrowDown aria-hidden="true" size={15} strokeWidth={1.6} />
                </span>
                <span className="num text-[56px] font-extralight leading-none tracking-[-0.05em] text-heading">{String(counts[t.cat]).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
