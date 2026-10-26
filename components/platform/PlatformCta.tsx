import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { platformPage } from "@/content/platform";
import { site } from "@/content/site";

/** Closing call to action on a mist ground. */
export function PlatformCta() {
  const c = platformPage.cta;
  return (
    <section aria-labelledby="platform-cta-title" className="relative overflow-hidden bg-mist pb-[120px] pt-[110px]">
      <div className="aura left-[30%] top-[20%] h-[340px] w-[560px] bg-brand-blue opacity-[.16] max-lg:hidden" aria-hidden="true" />
      <div className="aura left-[12%] top-[35%] h-[300px] w-[380px] bg-magenta opacity-10 max-lg:hidden" aria-hidden="true" />
      <div className="aura right-[12%] top-[35%] h-[300px] w-[380px] bg-brand-green opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="wrap">
        <div className="glass sr flex flex-col items-center gap-5 rounded-[36px] px-12 py-14 text-center max-sm:px-6">
          <Image src="/brand/exeevo-icon.png" alt="" width={40} height={40} />
          <h2 id="platform-cta-title" className="h2 max-w-[780px]">{c.h2.light} <b>{c.h2.bold}</b></h2>
          <p className="lead max-w-[600px]">{c.lead}</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button href={site.demoHref}>{c.primary}</Button>
            <Button href={site.demoHref} variant="secondary">{c.secondary}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
