import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { home } from "@/content/home";

/** Closing call to action on a mist ground: Exeevo + Microsoft, a light and bold headline and two buttons. */
export function ClosingCta() {
  const c = home.closing;
  return (
    <section
      aria-labelledby="closing-title"
      className="relative overflow-hidden bg-mist py-[88px] lg:py-[110px]"
    >
      <div
        className="aura left-[30%] top-[20%] h-[340px] w-[560px] bg-brand-blue opacity-[.16] max-lg:hidden"
        aria-hidden="true"
      />
      <div
        className="aura left-[15%] top-[35%] h-[300px] w-[380px] bg-magenta opacity-10 max-lg:hidden"
        aria-hidden="true"
      />
      <div
        className="aura right-[12%] top-[35%] h-[300px] w-[380px] bg-brand-green opacity-[.12] max-lg:hidden"
        aria-hidden="true"
      />
      <div className="hm-wrap">
        <div className="glass sr flex flex-col items-center gap-[22px] rounded-[36px] px-12 py-14 text-center max-sm:px-6">
          <div className="flex items-center gap-4">
            <Image src="/brand/exeevo-icon.png" alt="" width={34} height={34} />
            <span aria-hidden="true" className="text-[22px] text-[#9AA7AF]">
              +
            </span>
            <Image
              src="/microsoft/microsoft-wordmark.webp"
              alt="Microsoft"
              width={120}
              height={24}
              className="h-6 w-auto"
            />
          </div>
          <h2 id="closing-title" className="h2 max-w-[780px]">
            {c.h2.light} <b>{c.h2.bold}</b>
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button href="/platform">{c.primary}</Button>
            <Button href="/microsoft" variant="secondary">
              {c.secondary}
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
