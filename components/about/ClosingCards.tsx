import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Glow } from "@/components/glass/Glow";
import { about } from "@/content/about";
import { site } from "@/content/site";

/** Two closing cards: meet the partners, talk to the team. */
export function ClosingCards() {
  const c = about.closing;
  return (
    <section className="overflow-x-clip bg-mist py-16 lg:py-[120px]">
      <div className="frame grid gap-6 lg:grid-cols-2">
        <div className="glass-light srl relative flex min-h-[220px] flex-col justify-between gap-8 overflow-hidden rounded-[32px] p-8 lg:p-10">
          <Glow color="magenta" className="-right-12 -top-16 size-[260px] blur-[70px]" style={{ opacity: 0.3 }} />
          <div className="relative flex flex-col gap-3.5">
            <p className="text-[15px] text-muted">{c.partners.label}</p>
            <h2 className="max-w-[460px] text-[clamp(26px,2.4vw,32px)] leading-[1.12] tracking-[-0.025em]">{c.partners.title}</h2>
          </div>
          <Link href="/partners" className="relative inline-flex min-h-11 items-center gap-2 self-start font-semibold text-brand-blue">
            {c.partners.cta}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </Link>
        </div>
        <div className="on-dark srr relative flex min-h-[220px] flex-col justify-between gap-8 overflow-hidden rounded-[32px] bg-ink p-8 lg:p-10">
          <Glow color="green" className="-right-12 -top-16 size-[300px] blur-[80px]" style={{ opacity: 0.4 }} />
          <div className="relative flex flex-col gap-3.5">
            <p className="text-[15px] text-on-dark-muted">{c.contact.label}</p>
            <h2 className="text-[clamp(26px,2.4vw,32px)] leading-[1.12] tracking-[-0.025em]">{c.contact.title}</h2>
          </div>
          <Link href={site.demoHref} className="relative inline-flex min-h-11 items-center gap-2 self-start font-semibold text-link-on-dark">
            {c.contact.cta}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
}
