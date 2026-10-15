import { askNova, features } from "@/content/askNova";
import { PlusGrid } from "./PlusGrid";

/** "What comes with every licence, and what Ask-Nova Plus adds": the included features, then the Plus ones. */
export function LicensingSection() {
  const l = askNova.licensing;
  const included = features.filter((f) => f.tier === "inc");
  return (
    <section aria-labelledby="licensing-title" className="relative overflow-hidden bg-white py-20 lg:py-[120px]">
      <div className="aura -right-24 top-40 size-[520px] bg-brand-blue opacity-[.13] max-lg:hidden" aria-hidden="true" />
      <div className="frame relative flex flex-col gap-14">
        <div className="sr flex max-w-[860px] flex-col gap-5">
          <h2 id="licensing-title" className="h2">{l.parts.light} <b>{l.parts.bold}</b></h2>
          <p className="lead max-w-[640px]">{l.body}</p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          <div className="card srg flex flex-col gap-2 p-[30px] lg:col-span-5">
            <div className="flex justify-between pb-3.5">
              <h3 className="label !font-normal !text-heading">{l.includedTitle}</h3>
              <span className="label">{l.includedCount}</span>
            </div>
            <ul>
              {included.map((f) => (
                <li key={f.slug} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 border-t border-hairline py-[18px]">
                  <span className="num text-[13px] text-[#006B4B]">{f.num}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[17px] font-[450] text-heading">{f.name}</span>
                    <span className="body-text !text-[14px]">{l.includedDesc[f.slug]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass srg flex flex-col gap-5 rounded-[20px] p-[30px] lg:col-span-7">
            <div className="flex justify-between">
              <span className="label inline-flex items-center gap-2 !font-normal !text-heading"><span className="dot dot-ai" aria-hidden="true" />{askNova.tiers.plus}</span>
              <span className="label">{l.plusCount}</span>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {l.plusChips.map((c) => (
                <li key={c} className="label rounded-full border border-hairline bg-white/80 px-[11px] py-[7px] !font-normal !text-body">{c}</li>
              ))}
            </ul>
            <PlusGrid />
            <p className="mt-auto text-[13px] text-muted">{l.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
