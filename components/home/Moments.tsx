import Image from "next/image";
import { Check, X } from "lucide-react";
import { home } from "@/content/home";

/** "Purpose-built shows up in the moments that matter": four everyday situations, a generic CRM beside Exeevo. */
export function Moments() {
  const m = home.moments;
  return (
    <section
      aria-labelledby="moments-title"
      className="relative overflow-hidden py-20 lg:py-[120px]"
      style={{
        background:
          "radial-gradient(60% 55% at 0% 0%,rgba(223,25,149,.14),transparent 62%),radial-gradient(55% 60% at 100% 20%,rgba(7,98,200,.2),transparent 62%),radial-gradient(60% 50% at 70% 100%,rgba(0,195,137,.18),transparent 62%),radial-gradient(40% 40% at 35% 60%,rgba(122,63,192,.08),transparent 70%),var(--ex-porcelain)",
      }}
    >
      <div
        className="aura -right-20 top-[20%] h-[420px] w-[560px] bg-brand-blue opacity-[.18] max-lg:hidden"
        aria-hidden="true"
      />
      <div
        className="aura bottom-[-60px] right-[20%] h-[340px] w-[420px] bg-brand-green opacity-[.18] max-lg:hidden"
        aria-hidden="true"
      />
      <div
        className="aura -left-20 top-[10%] h-[340px] w-[420px] bg-magenta opacity-10 max-lg:hidden"
        aria-hidden="true"
      />
      <div className="hm-wrap flex flex-col gap-11">
        <div className="sr mx-auto flex max-w-[820px] flex-col items-center gap-4 text-center">
          <h2 id="moments-title" className="h2">
            {m.h2.light} <b>{m.h2.bold}</b>
          </h2>
          <p className="lead max-w-[640px]">{m.lead}</p>
        </div>
        <ol className="flex flex-col">
          {m.rows.map((r, n) => (
            <li
              key={r.title}
              className="sr grid items-stretch gap-3 border-t border-[#D9E0E5] py-[22px] lg:grid-cols-12 lg:gap-x-5"
            >
              <div className="flex flex-col gap-1.5 pt-1.5 lg:col-span-3">
                <span className="text-[13px] text-muted">{String(n + 1).padStart(2, "0")}</span>
                <h3 className="text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-heading">
                  {r.title}
                </h3>
              </div>
              <div className="flex items-start gap-3 rounded-[18px] bg-white/45 px-5 py-[18px] shadow-[inset_0_0_0_1px_rgba(29,38,45,.08)] lg:col-span-4 lg:col-start-4">
                <span
                  aria-hidden="true"
                  className="flex size-[26px] shrink-0 items-center justify-center rounded-lg bg-[#ECEFF1] text-muted"
                >
                  <X size={14} strokeWidth={2} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12.5px] text-muted">{m.generic}</p>
                  <p className="text-[15px] leading-[1.5] text-muted">{r.generic}</p>
                </div>
              </div>
              <div className="glass flex items-start gap-3 rounded-[18px] px-5 py-[18px] lg:col-span-5 lg:col-start-8">
                <span
                  aria-hidden="true"
                  className="flex size-[26px] shrink-0 items-center justify-center rounded-lg bg-[#E3F7EF] text-green-ink"
                >
                  <Check size={14} strokeWidth={1.8} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className="inline-flex items-center gap-[7px] text-[12.5px] font-medium text-heading">
                    <Image src="/brand/exeevo-icon.png" alt="" width={14} height={14} />
                    {m.exeevo}
                  </p>
                  <p className="text-[15px] leading-[1.5] text-heading">{r.exeevo}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
