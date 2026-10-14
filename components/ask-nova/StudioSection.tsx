import { Check } from "lucide-react";
import { askNova, keyFeatures } from "@/content/askNova";
import { FitDiagram } from "./FitDiagram";
import { NovaIcon } from "./NovaIcon";

/** Ask-Nova Studio: pitch, "good fit" and platforms cards, the four key features, then the animated "how it fits together" diagram. */
export function StudioSection() {
  const s = askNova.studio;
  return (
    <section id="studio" aria-labelledby="studio-title" className="relative overflow-hidden bg-white py-20 lg:py-[120px]">
      <div className="aura -left-40 top-10 size-[560px] bg-[#7A3FC0] opacity-10 max-lg:hidden" aria-hidden="true" />
      <div className="frame relative flex flex-col gap-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="sr flex flex-wrap gap-2">
              <span className="glass inline-flex h-8 items-center gap-2 rounded-full px-3 text-[13px] text-heading"><span aria-hidden="true" className="dot dot-ai" />{s.label}</span>
              <span className="inline-flex h-8 items-center rounded-full border border-hairline px-3 text-[13px] text-muted">{askNova.tiers.plus}</span>
            </div>
            <h2 id="studio-title" className="h2 sr">{s.parts.light} <b>{s.parts.bold}</b></h2>
            <p className="lead sr">{s.body}</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
            <div className="card sr flex flex-col gap-3.5 p-6">
              <h3 className="label !font-normal">{s.fitTitle}</h3>
              <ul className="flex flex-col gap-3">
                {s.fit.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] leading-[1.5] text-body">
                    <span aria-hidden="true" className="flex pt-0.5 text-green-ink"><Check size={16} strokeWidth={1.8} /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card sr flex flex-col gap-3 px-6 py-5">
              <p className="label">{s.platformsLabel}</p>
              <ul className="flex flex-wrap gap-1.5">
                {s.platforms.map((p) => (
                  <li key={p} className="rounded-full border border-hairline bg-porcelain px-3 py-[7px] text-[13px] text-heading">{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="sr label !text-heading">{s.deckLabel}</h3>
          <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {keyFeatures.map((k) => (
              <li key={k.t} className="glass srg flex flex-col gap-3.5 rounded-[22px] p-6">
                <span className="flex size-10 items-center justify-center rounded-xl border border-hairline bg-white text-heading"><NovaIcon d={k.icon} size={20} /></span>
                <h4 className="text-[17px] font-[450] leading-[1.3] text-heading">{k.t}</h4>
                <p className="body-text !text-[14px]">{k.d}</p>
              </li>
            ))}
          </ul>
        </div>

        <FitDiagram />
      </div>
    </section>
  );
}
