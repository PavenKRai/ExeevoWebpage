import { askNova, features } from "@/content/askNova";
import { PlusGrid } from "./PlusGrid";

/** "What comes with every licence, and what Ask-Nova Plus adds": the three included features, then the nine Plus ones. */
export function LicensingSection() {
  const l = askNova.licensing;
  const included = features.filter((f) => f.tier === "inc");
  return (
    <section aria-labelledby="licensing-title" className="relative bg-mist pb-20 pt-4 lg:pb-[120px]">
      <div className="frame">
        <div className="sr flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-end lg:gap-10 lg:pb-12">
          <div className="flex max-w-[640px] flex-col gap-4">
            <p className="text-[15px] text-muted">{l.label}</p>
            <h2 id="licensing-title" className="text-[clamp(32px,3.4vw,46px)] leading-[1.08] tracking-[-0.03em]">
              {l.titleBefore}{" "}
              <span className="nova-ring inline-block whitespace-nowrap rounded-full px-[1em] pb-[.48em] pt-[.42em] align-[.18em] font-sans text-[clamp(18px,2vw,26px)] font-medium leading-none text-white shadow-[0_12px_30px_-14px_rgba(7,98,200,.5)]">
                {askNova.tiers.plus}
              </span>{" "}
              {l.titleAfter}
            </h2>
          </div>
          <p className="max-w-[420px] text-[17px] leading-[1.55] text-muted">{l.body}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="glass-light srg flex flex-col gap-7 rounded-[32px] p-8 lg:col-span-5 lg:p-[38px]">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-[15px] font-semibold tracking-normal text-heading">{l.includedTitle}</h3>
              <span className="text-[13px] text-muted">{l.includedCount}</span>
            </div>
            <ul className="border-b border-hairline">
              {included.map((f) => (
                <li key={f.slug} className="flex gap-[18px] border-t border-hairline py-5">
                  <span className="w-[26px] font-display text-[15px] font-medium text-muted">{f.num}</span>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[18px] font-semibold text-heading">{f.name}</span>
                    <span className="text-[14.5px] leading-[1.5] text-muted">{l.includedDesc[f.slug]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="on-dark srg relative overflow-hidden rounded-[32px] bg-ink p-8 text-[#EEF2F4] lg:col-span-7 lg:p-[38px]">
            <span aria-hidden="true" className="orb pointer-events-none absolute -right-[90px] -top-[110px] size-[360px] opacity-55 blur-[60px]" />
            <div className="relative flex flex-col gap-7">
              <div className="flex items-center justify-between">
                <span className="nova-ring flex h-[34px] items-center rounded-full px-[15px] text-[14px] font-semibold text-white">{askNova.tiers.plus}</span>
                <span className="text-[13px] text-on-dark-muted">{l.plusCount}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {l.plusChips.map((c) => (
                  <li key={c} className="glass-dark flex h-[34px] items-center rounded-full px-3.5 text-[13.5px] text-[#DCE3E7]">{c}</li>
                ))}
              </ul>
              <PlusGrid />
              <p className="text-[13px] leading-[1.5] text-on-dark-muted">{l.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
