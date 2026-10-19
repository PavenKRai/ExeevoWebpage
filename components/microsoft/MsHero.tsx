import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { microsoft } from "@/content/microsoft";
import { site } from "@/content/site";
import { TenantCard } from "./TenantCard";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Porcelain hero: chip, headline, lead and two actions on the left; "Your Microsoft tenant" stack card on the right. */
export function MsHero() {
  const h = microsoft.hero;
  return (
    <section className="relative overflow-hidden bg-porcelain pb-[110px] pt-[130px] lg:pt-[150px]">
      <div className="gridbg" aria-hidden="true" />
      <div className="aura -right-20 top-10 size-[520px] bg-brand-blue opacity-[.16] max-lg:hidden" aria-hidden="true" />
      <div className="aura right-80 top-[300px] size-[380px] bg-sky opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="aura right-20 top-[520px] size-80 bg-magenta opacity-10 max-lg:hidden" aria-hidden="true" />
      <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col items-start gap-7 lg:col-span-6">
          <span className="glass rise inline-flex h-9 items-center gap-2.5 rounded-full pl-3 pr-4 text-[13px] text-body" style={i(0)}>
            <Image src="/microsoft/microsoft-square.png" alt="" width={11} height={11} />
            {h.chip}
          </span>
          <h1 className="h1 rise" style={i(1)}>
            {h.h1.light} <b>{h.h1.bold}</b>
          </h1>
          <p className="lead rise max-w-[560px]" style={i(2)}>{h.lead}</p>
          <div className="rise flex flex-wrap gap-2.5" style={i(3)}>
            <Button href={site.demoHref}>{h.primary}</Button>
            <Button href="#apps" variant="secondary">
              {h.secondary}
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="fi w-full max-w-[520px] justify-self-end lg:col-span-6">
          <TenantCard />
        </div>
      </div>
    </section>
  );
}
