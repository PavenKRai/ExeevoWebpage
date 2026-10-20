import { Check } from "lucide-react";
import { home } from "@/content/home";
import { AdoptionPhone } from "./AdoptionPhone";

/** "Adoption, not resistance": three reasons reps use the CRM, beside an animated phone (call brief, offline voice note, sync, Teams follow-up). White ground. */
export function Adoption() {
  const a = home.adoption;
  return (
    <section aria-labelledby="adoption-title" className="relative overflow-hidden bg-white py-20 lg:py-[120px]">
      <div className="aura right-[6%] top-[12%] h-[460px] w-[520px] bg-magenta opacity-10 max-lg:hidden" aria-hidden="true" />
      <div className="aura -right-[60px] top-[35%] h-[460px] w-[520px] bg-brand-blue opacity-[.14] max-lg:hidden" aria-hidden="true" />
      <div className="hm-wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-[22px] lg:col-span-6">
          <h2 id="adoption-title" className="h2 sr">{a.h2.light} <b>{a.h2.bold}</b></h2>
          <p className="lead sr max-w-[540px]">{a.lead}</p>
          <ul className="flex flex-col border-b border-hairline">
            {a.items.map((it) => (
              <li key={it.title} className="sr grid grid-cols-[36px_minmax(0,1fr)] gap-3.5 border-t border-hairline py-[18px]">
                <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-[10px] bg-[#E3F7EF] text-green-ink">
                  <Check size={16} strokeWidth={1.8} />
                </span>
                <div className="flex flex-col gap-[5px]">
                  <h3 className="text-[17px] font-[450] text-heading">{it.title}</h3>
                  <p className="body-text">{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="srg flex justify-center lg:col-span-5 lg:col-start-8">
          <AdoptionPhone label={a.label} pause={a.pause} play={a.play} />
        </div>
      </div>
    </section>
  );
}
