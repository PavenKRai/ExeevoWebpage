import Image from "next/image";
import { Check } from "lucide-react";
import { microsoft } from "@/content/microsoft";

const item = "inline-flex items-center gap-2 rounded-xl bg-white py-[9px] pl-2.5 pr-3.5 text-[13px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]";

/** "Built for life sciences, running on Microsoft": the purpose-built Exeevo app on top, syncing down to the Microsoft backend IT trusts. White ground. */
export function MsBuiltFor() {
  const b = microsoft.builtFor;
  return (
    <section aria-labelledby="builtfor-title" className="relative overflow-hidden bg-white py-20 lg:py-[120px]">
      <div className="aura -left-20 top-[10%] h-[380px] w-[520px] bg-magenta opacity-[.08] max-lg:hidden" aria-hidden="true" />
      <div className="aura -bottom-0 -right-20 h-[400px] w-[560px] bg-brand-blue opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-[22px] lg:col-span-5">
          <h2 id="builtfor-title" className="h2 sr">{b.h2.light} <b>{b.h2.bold}</b></h2>
          <p className="lead sr">{b.lead}</p>
        </div>
        <div className="srg flex flex-col lg:col-span-6 lg:col-start-7">
          <div className="glass relative z-[2] flex flex-col gap-4 rounded-[24px_24px_18px_18px] p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2.5 text-[16px] font-medium text-heading">
                <Image src="/brand/exeevo-icon.png" alt="" width={26} height={26} />
                {b.app.title}
              </span>
              <span className="text-[12.5px] text-muted">{b.app.note}</span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {b.app.points.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-heading">
                  <Check size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="relative flex h-11 justify-center gap-[120px] max-sm:gap-[60px]">
            <span className="sp-line" />
            <span className="sp-line" style={{ animationDelay: "-.7s" }} />
            <span className="sp-line max-sm:hidden" style={{ animationDelay: "-1.4s" }} />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-3 py-[5px] text-[12px] text-muted shadow-[0_0_0_1px_var(--ex-hairline)]">{b.syncs}</span>
          </div>
          <div className="flex flex-col gap-3.5 rounded-[18px_18px_24px_24px] bg-porcelain px-6 py-[22px] shadow-[inset_0_0_0_1px_var(--ex-hairline)]">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2.5 text-[15px] font-medium text-heading">
                <Image src="/microsoft/microsoft-wordmark.webp" alt="Microsoft" width={90} height={18} className="h-[18px] w-auto" />
                {b.backend.title}
              </span>
              <span className="text-[12.5px] text-muted">{b.backend.note}</span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {b.backend.items.map((it) => (
                <li key={it.label} className={item}>
                  <Image src={it.logo} alt="" width={20} height={20} className="size-5" />
                  {it.label}
                </li>
              ))}
              <li className="inline-flex items-center rounded-xl border border-dashed border-[#C3CDD3] px-3.5 py-[9px] text-[13px] text-muted">{b.backend.more}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
