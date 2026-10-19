import Image from "next/image";
import { Check } from "lucide-react";
import type { MsGroup as Group } from "@/content/microsoft";
import { dotStyle } from "./colors";

/** One group of Microsoft product cards (apps, platform, cloud, AI). Cards carry the ids the stack card links to. */
export function MsGroup({ group, tone, auras }: { group: Group; tone: "porcelain" | "white"; auras: string[] }) {
  return (
    <section id={group.id} aria-labelledby={`${group.id}-title`} className={`relative scroll-mt-20 overflow-hidden py-20 lg:py-[110px] ${tone === "white" ? "bg-white" : "bg-porcelain"}`}>
      {auras.map((a) => <div key={a} className={`aura max-md:hidden ${a}`} aria-hidden="true" />)}
      <div className="wrap flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 id={`${group.id}-title`} className="h2 sr max-w-[700px]"><b>{group.title}</b></h2>
          <p className="sr inline-flex items-center gap-2.5 text-[14px] text-muted">
            <span aria-hidden="true" className="dot" style={dotStyle(group.dot)} />
            {group.sub}
          </p>
        </div>
        <ul className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          {group.cards.map((c) => (
            <li key={c.id} className="flex">
              <article id={c.id} className="glass srg mscard flex w-full scroll-mt-[110px] flex-col gap-4 rounded-3xl p-[26px]">
                <span className="flex size-[46px] shrink-0 items-center justify-center rounded-[13px] bg-white shadow-[0_0_0_1px_var(--ex-hairline)]">
                  <Image src={c.logo} alt="" width={26} height={26} className="size-[26px]" />
                </span>
                <h3 className="mt-1 min-h-[50px] text-[20px] font-[450] leading-[1.25] tracking-[-0.015em] text-heading">{c.title}</h3>
                <p className="body-text">{c.desc}</p>
                <ul className="flex flex-col gap-[9px]">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-body">
                      <Check size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-green-ink" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                {c.powers.length > 0 && (
                  <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-hairline pt-4">
                    <span className="mr-0.5 text-[12.5px] text-muted">Powers</span>
                    {c.powers.map((p) => (
                      <span key={p.label} className="inline-flex items-center gap-[7px] rounded-full bg-white/85 px-[11px] py-[5px] text-[12.5px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]">
                        <span aria-hidden="true" className="dot !size-[9px]" style={dotStyle(p.color)} />
                        {p.label}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
