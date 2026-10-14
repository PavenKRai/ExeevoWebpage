import { ArrowRight } from "lucide-react";
import { Glow } from "@/components/glass/Glow";
import { Button } from "@/components/ui/Button";
import { partnersPage } from "@/content/partners";
import { site } from "@/content/site";

/** "Become an Exeevo partner" closing block (the contact button goes to the enquiry form). */
export function BecomePartner() {
  const b = partnersPage.become;
  return (
    <section id="become" aria-labelledby="become-title" className="bg-mist py-20 lg:py-[120px]">
      <div className="frame">
        <div className="on-dark srg relative grid items-center gap-8 overflow-hidden rounded-[36px] bg-ink p-8 sm:p-12 lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:py-[60px]">
          <Glow parallax color="gradient" className="-right-20 -top-28 size-[420px] blur-[90px]" style={{ opacity: 0.4 }} />
          <div className="relative flex flex-col gap-3.5 lg:col-span-8">
            <h2 id="become-title" className="text-[clamp(30px,3.4vw,42px)] leading-[1.08] tracking-[-0.03em]">{b.title}</h2>
            <p className="max-w-[680px] text-[17px] leading-[1.6] text-on-dark">{b.body}</p>
          </div>
          <div className="relative lg:col-span-4 lg:justify-self-end">
            <Button href={site.demoHref} size="hero">
              {b.cta}
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
