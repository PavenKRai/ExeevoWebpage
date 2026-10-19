import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { microsoft, type MsWhyIcon } from "@/content/microsoft";
import { site } from "@/content/site";

const ico = (d: string) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const icons: Record<MsWhyIcon, ReactNode> = {
  home: ico("M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6"),
  shield: ico("M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z M8.5 12l2.5 2.5 4.5-5"),
  refresh: ico("M4 12a8 8 0 1 0 2.3-5.6 M4 4v4h4"),
  arrow: ico("M5 19l14-14 M9 5h10v10"),
};

/** "Why a Microsoft foundation matters": four points and the closing demo bar. Mist ground. */
export function MsWhy() {
  const w = microsoft.why;
  return (
    <section aria-labelledby="ms-why-title" className="relative overflow-hidden bg-mist py-20 lg:py-[120px]">
      <div className="aura -left-24 top-[60px] h-[380px] w-[600px] bg-brand-blue opacity-[.14] max-md:hidden" aria-hidden="true" />
      <div className="aura -bottom-10 -right-14 h-[340px] w-[480px] bg-brand-green opacity-[.12] max-md:hidden" aria-hidden="true" />
      <div className="wrap flex flex-col gap-12">
        <h2 id="ms-why-title" className="h2 sr max-w-[820px]">{w.h2.light} <b>{w.h2.bold}</b></h2>
        <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {w.items.map((x) => (
            <li key={x.title} className="sr flex flex-col gap-3.5 pr-1.5 pt-1.5">
              <span className="flex size-11 items-center justify-center rounded-[14px] border border-hairline bg-white text-heading">{icons[x.icon]}</span>
              <h3 className="text-[19px] font-[450] tracking-[-0.015em] text-heading">{x.title}</h3>
              <p className="body-text">{x.body}</p>
            </li>
          ))}
        </ul>
        <div className="glass sr flex flex-wrap items-center justify-between gap-6 rounded-[28px] px-9 py-8 max-sm:px-6">
          <div className="flex items-center gap-[18px]">
            <Image src="/microsoft/microsoft-wordmark.webp" alt="Microsoft" width={130} height={26} className="h-[26px] w-auto" />
            <span aria-hidden="true" className="h-7 w-px bg-[#D3DBE0]" />
            <span className="flex items-center gap-2.5">
              <Image src="/brand/exeevo-icon.png" alt="" width={26} height={26} />
              <Image src="/brand/exeevo-wordmark-slate.png" alt="Exeevo" width={95} height={16} className="h-4 w-auto" />
            </span>
          </div>
          <Button href={site.demoHref}>{w.cta}</Button>
        </div>
      </div>
    </section>
  );
}
