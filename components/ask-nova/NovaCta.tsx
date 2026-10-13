import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { askNova } from "@/content/askNova";
import { site } from "@/content/site";

/** Closing call to action on a dark block (the page's one primary action at this point of the scroll). */
export function NovaCta() {
  const c = askNova.cta;
  return (
    <section className="bg-frost pb-16 lg:pb-20">
      <div className="frame">
        <div className="on-dark srg relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[36px] bg-ink p-8 sm:p-10 lg:flex-row lg:items-center lg:px-14 lg:py-12">
          <span aria-hidden="true" className="orb pointer-events-none absolute -right-24 -top-32 size-[420px] opacity-30 blur-[70px]" />
          <div className="relative flex max-w-[680px] flex-col gap-3.5">
            <h2 className="text-[clamp(30px,3.4vw,44px)] leading-[1.08] tracking-[-0.03em]">{c.title}</h2>
            <p className="text-[17px] leading-[1.55] text-on-dark">{c.body}</p>
          </div>
          <Button href={site.demoHref} size="hero" className="relative">
            {c.button}
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
          </Button>
        </div>
      </div>
    </section>
  );
}
