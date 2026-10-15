"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { industries, type IndustrySlug } from "@/content/industries";

type Item = (typeof industries.items)[IndustrySlug];

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function Cards({ item }: { item: Item }) {
  return (
    <ul className="fi grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
      {item.cards.map((c) => (
        <li key={c.title} className="glass lift flex min-h-[260px] flex-col gap-4 rounded-3xl p-[26px]">
          <p className="flex items-center gap-2 text-[13.5px] font-[450] text-muted">
            <span aria-hidden="true" className="dot" style={{ background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.75), ${c.dot} 55%)` }} />
            {item.cardLabel}
          </p>
          <h2 className="mt-auto text-[24px] font-normal leading-[1.15] tracking-[-0.025em] text-heading">{c.title}</h2>
          <p className="body-text !text-[14px]">{c.body}</p>
          <Link href={c.link.href} className="tlink !min-h-11 !text-[14px]">{c.link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

/** Industries: Pharma / MedTech pill switch, light + bold heading, ruler row and four glass cards. ?industry= deep link kept. */
export function IndustriesPage({ industryParam = null }: { industryParam?: string | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const active: IndustrySlug = industryParam === "medtech" ? "medtech" : "pharma";
  const item = industries.items[active];
  const other = industries.items[active === "pharma" ? "medtech" : "pharma"];
  const slugs = Object.keys(industries.items) as IndustrySlug[];
  const dur = reduce ? 0 : 0.6;
  const shift = reduce ? 0 : 18;

  return (
    <section className="relative min-h-[900px] overflow-hidden bg-porcelain pb-20 pt-[128px] lg:pb-[120px] lg:pt-[150px]">
      <div className="gridbg" aria-hidden="true" />
      <div className="aura -right-24 top-14 size-[540px] bg-brand-blue opacity-[.14]" aria-hidden="true" />
      <div className="aura left-[10%] top-[560px] size-[420px] bg-magenta opacity-[.08] max-md:hidden" aria-hidden="true" />
      <div className="aura right-[18%] top-[600px] size-[380px] bg-brand-green opacity-[.12] max-md:hidden" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-5 md:px-10 lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <div role="group" aria-label="Choose an industry" className="glass rise inline-flex gap-1 rounded-full p-1" style={i(0)}>
            {slugs.map((k) => {
              const on = k === active;
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => router.replace(`${pathname}?industry=${k}`, { scroll: false })}
                  className={`h-11 min-w-11 rounded-full px-5 text-[14px] transition-colors duration-300 ${on ? "bg-heading text-white" : "bg-transparent text-body hover:bg-slate/[.06]"}`}
                >
                  {industries.items[k].label}
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="grid w-full items-end gap-6 lg:grid-cols-12"
              initial={{ opacity: 0, x: shift }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -shift }}
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="h1 rise lg:col-span-7" style={i(1)}>
                {item.heading.light} <b>{item.heading.bold}</b>
              </h1>
              <p className="rise text-[18px] font-[350] leading-[1.6] text-muted [text-wrap:pretty] lg:col-span-4 lg:col-start-9" style={i(2)}>{item.intro}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <p className="whitespace-nowrap text-[13.5px] font-[450] text-heading">{item.rulerLabel}</p>
            <div className="ruler flex-1" aria-hidden="true" />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: shift }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -shift }}
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            >
              <Cards item={item} />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* The other industry stays in the HTML (hidden) so crawlers and no-JS readers get both. */}
        <div hidden aria-hidden="true">
          <p>{other.h1}</p>
          <p>{other.intro}</p>
          <ul>
            {other.cards.map((c) => (
              <li key={c.title}>
                {c.title}: {c.body} <Link href={c.link.href}>{c.link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
