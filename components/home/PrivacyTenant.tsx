import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, X } from "lucide-react";
import { home } from "@/content/home";
import { LoopScope } from "./LoopScope";
import { TENANT_LOOPS } from "./loops";

const ico = (d: ReactNode) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);
const icons: Record<string, ReactNode> = {
  person: ico(
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </>,
  ),
  agent: ico(
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5L9 15M15 9l2.5-2.5" />,
  ),
  grid: ico(
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>,
  ),
};

/** "Your data stays where you put it": copy on the left, the tenant boundary diagram on the right (packets flow inside, the shared-AI packet is blocked). */
export function PrivacyTenant() {
  const p = home.privacy;
  const d = p.diagram;
  return (
    <section aria-labelledby="privacy-title" className="bg-white py-20 lg:py-[120px]">
      <div className="hm-wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col items-start gap-7 lg:col-span-5">
          <h2 id="privacy-title" className="h2 sr max-w-[760px]">
            {p.h2.light} <b>{p.h2.bold}</b>
          </h2>
          <p className="hm-lead sr">{p.body}</p>
          <Link href="/why-exeevo" className="tlink sr">
            {p.link}
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
        <LoopScope loops={TENANT_LOOPS} className="lg:col-span-6 lg:col-start-7">
          <div className="srg relative overflow-hidden rounded-[32px] border border-hairline bg-porcelain p-7">
            <div
              className="aura -right-[60px] -top-[60px] size-[300px] bg-brand-green opacity-20"
              aria-hidden="true"
            />
            <div
              className="aura -left-10 top-[120px] h-[260px] w-80 bg-brand-blue opacity-[.16]"
              aria-hidden="true"
            />
            <div
              className="aura left-[45%] top-[200px] h-[200px] w-[220px] bg-purple opacity-10"
              aria-hidden="true"
            />
            <div className="t-box relative flex flex-col gap-3 rounded-3xl border-[1.5px] border-dashed border-[#9AA7AF] p-[22px]">
              <p className="pb-1.5 label !text-heading">{d.boundary}</p>
              <ul className="relative flex flex-col gap-3 pr-[34px]">
                {d.chips.map((c) => (
                  <li
                    key={c.text}
                    className="glass relative flex items-center gap-3.5 rounded-2xl px-[18px] py-4 text-[15px] text-heading"
                  >
                    <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-white/80 text-brand-blue shadow-[0_0_0_1px_var(--ex-hairline)]">
                      {icons[c.icon]}
                    </span>
                    {c.text}
                  </li>
                ))}
                <div
                  aria-hidden="true"
                  className="absolute bottom-[34px] right-3 top-[34px] w-px"
                  style={{ background: "linear-gradient(#0762C8,#00C389)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-[30px] size-[9px] rounded-full border-[1.5px] border-brand-blue bg-white"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-[calc(50%-4px)] size-[9px] rounded-full border-[1.5px] border-[#7A3FC0] bg-white"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-[30px] right-2 size-[9px] rounded-full border-[1.5px] border-brand-green bg-white"
                />
                <span className="t-pk" aria-hidden="true" style={{ animationDelay: "0s" }} />
                <span
                  className="t-pk t-up"
                  aria-hidden="true"
                  style={{ animationDelay: "-1.2s" }}
                />
                <span className="t-pk" aria-hidden="true" style={{ animationDelay: "-2.4s" }} />
                <span
                  className="t-pk t-up"
                  aria-hidden="true"
                  style={{ animationDelay: "-3.1s" }}
                />
                <span className="t-out" aria-hidden="true" />
              </ul>
              <p className="pt-1 text-[13px] text-muted">{d.note}</p>
              <span
                className="t-tag glass absolute -bottom-[15px] right-[18px] whitespace-nowrap rounded-full px-[11px] py-1.5 text-[12px] text-[#B0127A]"
                aria-hidden="true"
              >
                {d.tag}
              </span>
            </div>
            <div className="glass relative mt-5 flex items-center gap-3.5 rounded-2xl px-[18px] py-3.5">
              <span className="t-x flex size-[34px] items-center justify-center rounded-[10px] bg-[#FBE8F3] text-[#B0127A]">
                <X size={18} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="text-[15px] text-muted line-through decoration-[#B0127A]">
                {d.external}
              </span>
            </div>
          </div>
        </LoopScope>
      </div>
    </section>
  );
}
