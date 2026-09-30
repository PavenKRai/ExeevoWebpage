"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { Glow } from "@/components/glass/Glow";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/Button";
import { industries, type IndustrySlug } from "@/content/industries";
import { PharmaCapsule } from "./PharmaCapsule";
import { MedtechDevice } from "./MedtechDevice";

const glowColors = ["blue", "magenta", "green", "purple"] as const;

export function IndustrySwitcher() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const initial: IndustrySlug = params.get("industry") === "medtech" ? "medtech" : "pharma";
  const [active, setActive] = useState<IndustrySlug>(initial);
  const item = industries.items[active];
  const options = (Object.keys(industries.items) as IndustrySlug[]).map((k) => ({ value: k, label: industries.items[k].label }));

  const change = (v: string) => {
    const slug = v as IndustrySlug;
    setActive(slug);
    router.replace(`${pathname}?industry=${slug}`, { scroll: false });
  };

  const dur = reduce ? 0 : 0.6;
  return (
    <>
      <section className="lab-grid relative overflow-hidden pb-[var(--ex-section-y)] pt-[140px]">
        <Glow color="gradient" className="right-[8%] top-24 h-80 w-80" />
        <div className="frame">
          <SegmentedControl label="Industry" options={options} value={active} onChange={change} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -18 }}
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h1>{item.h1}</h1>
                  <p className="body-lg mt-6">{item.intro}</p>
                </div>
                {active === "pharma" ? <PharmaCapsule /> : <MedtechDevice />}
              </div>
              <ul className="mt-16 grid gap-6 sm:grid-cols-2">
                {item.cards.map((c, i) => (
                  <li key={c.title} className="relative">
                    <Glow color={glowColors[i]} className="-bottom-6 -right-4 h-32 w-32" />
                    <GlassPanel tone="light" className="relative h-full rounded-card p-8">
                      <h2 className="mb-3 text-[clamp(22px,1.4vw+12px,28px)] leading-tight">{c.title}</h2>
                      <p className="text-[17px]">{c.body}</p>
                    </GlassPanel>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <section className="pb-[var(--ex-section-y)]">
        <div className="frame flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="lead text-heading">{industries.closing.line}</p>
          <Button href={industries.closing.href} size="hero">
            {industries.closing.cta}
          </Button>
        </div>
      </section>
    </>
  );
}
