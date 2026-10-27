import Link from "next/link";
import type { CSSProperties } from "react";
import { getResources, type ResourceType } from "@/content/resources";
import { resourceTypes, resourcesHub } from "@/content/resources/config";
import { cn } from "../ui/cn";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const tab = "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] transition-all duration-300";

/** Resources header on every Resources page: `h1`, lead and the tab row (All + the types with their counts). Counts come from the content. */
export async function ResourcesHero({ h1 = resourcesHub.h1, intro = resourcesHub.intro, active }: { h1?: string; intro?: string; active?: ResourceType | "all" }) {
  const types = resourceTypes;
  const counts = await Promise.all(types.map(async (t) => (await getResources(t.type)).length));
  return (
    <section className="relative overflow-hidden bg-porcelain pb-[60px] pt-[128px] lg:pt-[160px]">
      <div className="gridbg" aria-hidden="true" />
      <div className="aura -right-20 top-10 h-[480px] w-[540px] bg-brand-blue opacity-[.15] max-lg:hidden" aria-hidden="true" />
      <div className="aura right-[340px] top-[260px] h-[340px] w-[380px] bg-magenta opacity-[.08] max-lg:hidden" aria-hidden="true" />
      <div className="wrap flex flex-col gap-[30px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="h1 rise" style={i(1)}>{h1}</h1>
          <p className="lead rise max-w-[480px]" style={i(2)}>{intro}</p>
        </div>
        <nav aria-label="Resource types" className="rise -mb-1 flex gap-1.5 overflow-x-auto pb-1" style={i(3)}>
          <Link href="/resources" aria-current={active === "all" ? "page" : undefined} className={cn(tab, active === "all" ? "border-heading bg-heading text-white" : "border-[#D9E0E5] bg-white text-heading")}>All</Link>
          {types.map((t, n) => (
            <Link key={t.type} href={t.path} aria-current={active === t.type ? "page" : undefined} className={cn(tab, active === t.type ? "border-heading bg-heading text-white" : "border-[#D9E0E5] bg-white text-heading")}>
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: t.color }} />
              {t.label}
              <span className={cn("text-[12px]", active === t.type ? "text-white/80" : "text-muted")}>{counts[n]}</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
