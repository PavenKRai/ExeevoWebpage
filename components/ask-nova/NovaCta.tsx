import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { askNova } from "@/content/askNova";
import { site } from "@/content/site";

/** Closing call to action: a centred glass block on mist. */
export function NovaCta() {
  const c = askNova.cta;
  return (
    <section className="relative overflow-hidden bg-mist py-20 lg:py-[110px]">
      <div className="aura left-[40%] top-[10%] h-[340px] w-[520px] bg-brand-blue opacity-[.16] max-lg:hidden" aria-hidden="true" />
      <div className="aura left-[20%] top-[30%] size-[340px] bg-magenta opacity-10 max-lg:hidden" aria-hidden="true" />
      <div className="frame relative">
        <div className="glass sr flex flex-col items-center gap-[22px] rounded-[36px] px-6 py-14 text-center lg:px-12 lg:py-16">
          <h2 className="h2 max-w-[760px]">{c.parts.light} <b>{c.parts.bold}</b></h2>
          <p className="lead max-w-[620px]">{c.body}</p>
          <Button href={site.demoHref}>
            {c.button}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
          </Button>
        </div>
      </div>
    </section>
  );
}
