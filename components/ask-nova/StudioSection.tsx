import { Check } from "lucide-react";
import { Glow } from "@/components/glass/Glow";
import { askNova } from "@/content/askNova";
import { FitDiagram } from "./FitDiagram";
import { KeyFeatureDeck } from "./KeyFeatureDeck";

/** Ask-Nova Studio: pitch and "good fit" list on the left, the key-feature deck on the right, then the integration diagram. */
export function StudioSection() {
  const s = askNova.studio;
  return (
    <section id="studio" aria-labelledby="studio-title" className="on-dark relative overflow-hidden bg-ink py-20 text-[#EEF2F4] lg:py-[120px]">
      <Glow color="gradient" className="left-[520px] top-[120px] size-[520px] blur-[120px] max-lg:hidden" style={{ opacity: 0.3 }} />
      <div className="frame relative grid items-start gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="srl flex flex-col gap-[26px] lg:col-span-6">
          <div className="flex items-center gap-2.5">
            <span className="text-[15px] text-on-dark-muted">{s.label}</span>
            <span className="nova-ring flex h-7 items-center rounded-full px-3 text-[12.5px] font-semibold text-white">{askNova.tiers.plus}</span>
          </div>
          <h2 id="studio-title" className="text-[clamp(34px,3.4vw,48px)] leading-[1.06] tracking-[-0.03em]">{s.title}</h2>
          <p className="max-w-[560px] text-[18px] font-[350] leading-[1.6] text-on-dark">{s.body}</p>
          <div className="flex flex-col gap-3.5 pt-1.5">
            <h3 className="font-sans text-[14px] font-medium tracking-normal text-[#8FA0AA]">{s.fitTitle}</h3>
            <ul className="flex flex-col gap-3.5">
              {s.fit.map((t) => (
                <li key={t} className="flex items-start gap-3.5">
                  <span aria-hidden="true" className="flex size-[26px] shrink-0 items-center justify-center rounded-[9px] bg-white/10 text-white"><Check size={15} strokeWidth={2} /></span>
                  <span className="text-[15.5px] leading-[1.5] text-[#DCE3E7]">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="pr-1 text-[14px] text-[#8FA0AA]">{s.platformsLabel}</span>
            {s.platforms.map((p) => (
              <span key={p} className="flex h-[34px] items-center rounded-full border border-white/[.18] px-3.5 text-[13.5px] text-[#DCE3E7]">{p}</span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <KeyFeatureDeck />
        </div>
      </div>
      <div className="frame relative mt-20 lg:mt-[110px]">
        <div className="border-t border-white/10 pt-14">
          <div className="sr flex flex-col justify-between gap-4 pb-12 lg:flex-row lg:items-end lg:gap-10">
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.02em]">{askNova.fits.title}</h3>
            <p className="max-w-[520px] text-[15px] leading-[1.55] text-on-dark-muted">{askNova.fits.body}</p>
          </div>
          <FitDiagram />
        </div>
      </div>
    </section>
  );
}
