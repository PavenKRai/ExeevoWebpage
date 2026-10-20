import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Play, ShieldCheck, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { RecordDemo } from "./RecordDemo";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const iconBox =
  "inline-flex size-[26px] items-center justify-center rounded-lg bg-white shadow-[0_0_0_1px_var(--ex-hairline)]";
const sparkle =
  "M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5L9 15M15 9l2.5-2.5";
const icons: Record<string, ReactNode> = {
  shield: (
    <ShieldCheck size={14} strokeWidth={1.8} aria-hidden="true" className="text-brand-blue" />
  ),
  sparkles: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B0127A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={sparkle} />
    </svg>
  ),
  lock: <LockKeyhole size={14} strokeWidth={1.8} aria-hidden="true" className="text-green-ink" />,
};

/** Hero: chip, light + bold headline, lead and actions on the left; the animated field-view demo on the right; three trust items below. */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-porcelain pt-[128px] lg:pt-[148px]">
      <div className="gridbg" aria-hidden="true" />
      <div
        className="aura right-[-120px] top-10 size-[520px] bg-brand-blue opacity-[.16]"
        aria-hidden="true"
      />
      <div
        className="aura right-[280px] top-[360px] size-[360px] bg-magenta opacity-[.12] max-lg:hidden"
        aria-hidden="true"
      />
      <div
        className="aura right-[60px] top-[520px] size-[300px] bg-brand-green opacity-[.14] max-lg:hidden"
        aria-hidden="true"
      />
      <div className="hm-wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col items-start gap-7 lg:col-span-6">
          <span
            className="glass rise inline-flex min-h-[46px] items-center gap-3 rounded-full py-1.5 pl-3.5 pr-[22px] text-[15px] text-body max-sm:gap-2 max-sm:pr-4 max-sm:text-[13px]"
            style={i(0)}
          >
            <span
              aria-hidden="true"
              className="size-[18px] rounded-full bg-[image:var(--ex-orb)]"
            />
            {home.chip}
            <Image
              src="/microsoft/microsoft-wordmark.webp"
              alt={home.chipBrand}
              width={100}
              height={20}
              className="block h-5 w-auto"
            />
          </span>
          <h1 className="h1 rise" style={i(1)}>
            {home.h1.light} <b>{home.h1.bold}</b>
          </h1>
          <p className="hm-lead rise max-w-[560px]" style={i(2)}>
            {home.paragraph}
          </p>
          <div className="rise flex flex-wrap gap-2.5" style={i(3)}>
            <Button href={site.demoHref}>{home.primaryCta}</Button>
            <Button href="/microsoft" variant="secondary">
              <Play size={16} strokeWidth={1.6} aria-hidden="true" />
              {home.secondaryCta}
            </Button>
          </div>
        </div>
        <div className="fi relative min-w-0 lg:col-span-6">
          <div className="max-sm:[zoom:.55]">
            <RecordDemo label={home.recordLabel} />
          </div>
        </div>
      </div>
      <div className="hm-wrap mt-16 lg:mt-[72px]">
        <ul className="grid border-t border-[#D9E0E5] md:grid-cols-3">
          {home.trust.map((t, n) => (
            <li
              key={t.title}
              className={`sr flex flex-col gap-2.5 py-7 pb-10 md:px-7 ${n === 0 ? "md:pl-0" : ""} ${n === 2 ? "md:pr-0" : "md:border-r md:border-hairline"} max-md:border-b max-md:border-hairline`}
            >
              <h2 className="label inline-flex items-center gap-2.5 !text-heading">
                <span className={iconBox}>{icons[t.icon]}</span>
                {t.title}
              </h2>
              <p className="body-text">{t.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
