import { Glow } from "@/components/glass/Glow";
import { askNova } from "@/content/askNova";
import { NovaIcon } from "./NovaIcon";

/** Trust: four cards on what the AI uses and respects. (The design's 01-04 numerals are left out: these are not a sequence.) */
export function TrustCards() {
  const t = askNova.trust;
  return (
    <section aria-labelledby="trust-title" className="relative overflow-hidden bg-frost py-16 lg:py-20">
      <Glow parallax color="gradient" className="left-[560px] top-[280px] size-[440px] blur-[90px] max-lg:hidden" style={{ opacity: 0.38 }} />
      <div className="frame relative">
        <div className="grid items-end gap-6 pb-9 lg:grid-cols-12 lg:gap-x-6">
          <div className="srl flex flex-col gap-4 lg:col-span-7">
            <p className="text-[15px] text-muted">{t.label}</p>
            <h2 id="trust-title" className="text-[clamp(28px,2.7vw,38px)] leading-[1.1] tracking-[-0.03em]">{t.title}</h2>
          </div>
          <p className="srr text-[clamp(19px,1.55vw,22px)] font-[450] leading-[1.3] tracking-[-0.015em] text-brand-blue lg:col-span-4 lg:col-start-9">{t.lead}</p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.cards.map((c, n) => (
            <li key={c.title} className={`glass-light lift sr d${Math.min(n, 3)} flex min-h-[230px] flex-col justify-between gap-8 rounded-[26px] p-[26px] lg:h-[250px]`}>
              <span className="flex size-12 items-center justify-center rounded-[15px] bg-ink text-white"><NovaIcon d={c.icon} size={22} /></span>
              <div className="flex flex-col gap-2.5">
                <h3 className="font-sans text-[22px] font-semibold leading-[1.2] tracking-[-0.015em]">{c.title}</h3>
                <p className="text-[15px] leading-[1.55] text-muted">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
