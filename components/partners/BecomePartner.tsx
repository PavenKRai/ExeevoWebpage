import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { partnersPage } from "@/content/partners";
import { site } from "@/content/site";

/** "Become an Exeevo partner": a centred glass block on mist (the contact button goes to the enquiry form). */
export function BecomePartner() {
  const b = partnersPage.become;
  return (
    <section id="become" aria-labelledby="become-title" className="relative scroll-mt-20 overflow-hidden bg-mist pb-24 pt-20 lg:pb-[130px] lg:pt-[110px]">
      <span aria-hidden="true" className="aura left-[35%] top-[20%] h-[340px] w-[520px] bg-magenta opacity-10 max-lg:hidden" />
      <span aria-hidden="true" className="aura left-1/2 top-[30%] h-[340px] w-[420px] bg-brand-blue opacity-[.14] max-lg:hidden" />
      <div className="frame relative">
        <div className="glass sr flex flex-col items-center gap-[22px] rounded-[36px] px-6 py-12 text-center sm:px-12 lg:py-[60px]">
          <h2 id="become-title" className="h2">{b.titleLight} <b>{b.titleBold}</b></h2>
          <p className="text-[18px] font-[350] leading-[1.6] tracking-normal text-muted [text-wrap:pretty] max-w-[680px]">{b.body}</p>
          <Button href={site.demoHref}>
            {b.cta}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
          </Button>
        </div>
      </div>
    </section>
  );
}
