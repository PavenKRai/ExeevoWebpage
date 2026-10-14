import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { about } from "@/content/about";
import { site } from "@/content/site";

/** Two closing cards: meet the partners (light), talk to the team (ink). */
export function ClosingCards() {
  const c = about.closing;
  return (
    <section className="overflow-x-clip bg-porcelain pb-20 lg:pb-[120px]">
      <div className="frame grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link href="/partners" className="card lift sr flex min-h-[220px] flex-col gap-3.5 p-8">
          <span className="label inline-flex items-center gap-2.5">
            <span aria-hidden="true" className="dot" style={{ "--c": c.partners.dot } as CSSProperties} />
            {c.partners.label}
          </span>
          <span className="text-[28px] font-[350] leading-[1.15] tracking-[-0.025em] text-heading">{c.partners.title}</span>
          <span className="tlink mt-auto">
            {c.partners.cta}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
          </span>
        </Link>
        <Link href={site.demoHref} className="card lift sr flex min-h-[220px] flex-col gap-3.5 border-heading bg-heading p-8">
          <span className="label inline-flex items-center gap-2.5 !text-[#B6C1C8]">
            <span aria-hidden="true" className="dot" style={{ "--c": c.contact.dot } as CSSProperties} />
            {c.contact.label}
          </span>
          <span className="text-[28px] font-[350] leading-[1.15] tracking-[-0.025em] text-white">{c.contact.title}</span>
          <span className="mt-auto inline-flex min-h-11 items-center gap-2 text-[15px] text-[#8EC2FF]">
            {c.contact.cta}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
          </span>
        </Link>
      </div>
    </section>
  );
}
