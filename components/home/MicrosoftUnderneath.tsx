import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { home } from "@/content/home";
import { ScaleVisual, TrustVisual, UpdatesVisual } from "./UnderneathVisuals";

const visuals: Record<string, ReactNode> = { trust: <TrustVisual />, scale: <ScaleVisual />, updates: <UpdatesVisual /> };
const chip = "inline-flex items-center gap-[7px] rounded-full bg-white/85 px-[11px] py-1.5 text-[12.5px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]";

/** "Microsoft underneath, so your CRM is trusted, tested and always current": three glass cards, each with a looping visual. */
export function MicrosoftUnderneath() {
  const u = home.underneath;
  return (
    <section aria-labelledby="underneath-title" className="relative overflow-hidden bg-porcelain py-20 lg:py-[120px]">
      <div className="aura -left-[120px] top-[20%] h-[400px] w-[600px] bg-brand-blue opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="aura -right-[100px] top-[35%] h-[380px] w-[520px] bg-brand-green opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="hm-wrap flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="underneath-title" className="h2 sr max-w-[780px]">{u.h2.light} <b>{u.h2.bold}</b></h2>
          <Button href="/microsoft" variant="secondary" className="sr">
            {u.cta}
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Button>
        </div>
        <ul className="grid gap-5 lg:grid-cols-3">
          {u.cards.map((c) => (
            <li key={c.visual} className="glass srg relative flex flex-col overflow-hidden rounded-[28px] p-3.5">
              <div aria-hidden="true" className="leading-[normal]">{visuals[c.visual]}</div>
              <div className="flex flex-1 flex-col gap-2.5 px-3.5 pb-4 pt-6">
                <h3 className="text-[30px] font-[350] leading-[1.05] tracking-[-0.03em] text-soft">{c.title.light} <b className="font-medium text-heading">{c.title.bold}</b></h3>
                <p className="body-text">{c.body}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3.5">
                  {"chips" in c && c.chips.map((x) => (
                    <span key={x.label} className={chip}>
                      <Image src={x.logo} alt="" width={15} height={15} className="size-[15px]" />
                      {x.label}
                    </span>
                  ))}
                  {"note" in c && <span className="text-[12px] text-muted">{c.note}</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
