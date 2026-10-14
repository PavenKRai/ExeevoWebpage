import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Glow } from "@/components/glass/Glow";
import { Button } from "@/components/ui/Button";
import { about } from "@/content/about";

/** "What we do": the six capability blocks and a product collage (monitor, tablet, phone). */
export function WhatWeDo() {
  const w = about.whatWeDo;
  return (
    <section aria-labelledby="whatwedo-title" className="overflow-x-clip bg-mist pb-20 pt-[90px] lg:pb-[120px]">
      <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col gap-[18px] lg:col-span-6">
          <p className="sr text-[15px] text-muted">{w.label}</p>
          <h2 id="whatwedo-title" className="sr text-[clamp(32px,3.4vw,46px)] leading-[1.06] tracking-[-0.03em]">{w.title}</h2>
          <p className="sr mb-3.5 max-w-[560px] text-[17px] leading-[1.6] text-muted">{w.body}</p>
          <ul className="stagger border-b border-hairline">
            {w.items.map((it) => (
              <li key={it.title} className="flex gap-4 border-t border-hairline py-[22px]">
                <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-ink text-white"><Check size={14} strokeWidth={2.2} /></span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-sans text-[18px] font-semibold tracking-normal text-heading">{it.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted">{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button href="/platform" solid className="mt-3 self-start">
            {w.cta}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </Button>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="srg relative mx-auto aspect-square w-full max-w-[620px] lg:sticky lg:top-[110px]">
            <Glow parallax color="gradient" className="left-[8%] top-[12%] h-[76%] w-[84%] blur-[100px]" style={{ opacity: 0.35 }} />
            <div className="glass-light absolute inset-0 rounded-[36px]" aria-hidden="true" />
            <Image src={w.images.monitor.src} alt={w.images.monitor.alt} width={575} height={440} sizes="(min-width: 1024px) 330px, 55vw" className="absolute right-[5.8%] top-[6.5%] w-[53%] rounded-xl" />
            <Image src={w.images.tablet.src} alt={w.images.tablet.alt} width={840} height={560} sizes="(min-width: 1024px) 420px, 70vw" className="absolute left-[6.5%] top-[40%] w-[68%] drop-shadow-[0_30px_40px_rgba(24,32,38,.35)]" />
            <Image src={w.images.phone.src} alt={w.images.phone.alt} width={300} height={600} sizes="(min-width: 1024px) 150px, 25vw" className="absolute right-[11%] top-[48%] w-[24%] drop-shadow-[0_30px_40px_rgba(24,32,38,.4)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
