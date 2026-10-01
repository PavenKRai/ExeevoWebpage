import { Lock, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { home } from "@/content/site";

const icons: Record<string, LucideIcon> = { shield: ShieldCheck, sparkles: Sparkles, lock: Lock };

/** The three-column trust strip at the foot of the hero. */
export function HeroTrust() {
  return (
    <div className="hs-trust glass-dark rise grid rounded-[28px] md:grid-cols-3" style={{ "--i": 4 } as CSSProperties}>
      {home.trust.map((t, i) => {
        const Icon = icons[t.icon] ?? ShieldCheck;
        return (
          <div key={t.title} className={`flex gap-4 px-[30px] py-7 ${i > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}>
            <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-white/[.08] text-white">
              <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
            </span>
            <div className="flex flex-col gap-1.5">
              <h2 className="font-sans text-[16px] font-semibold leading-[normal] tracking-normal text-white">{t.title}</h2>
              <p className="text-[14px] leading-[1.5] text-on-dark-muted">{t.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
