import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { phaseRange, phases, servicesPage } from "@/content/services";
import { cn } from "@/components/ui/cn";
import { phaseStyle } from "./phaseStyle";

const bracket = "relative h-3 border-x border-[#8A969E] after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-[#8A969E] after:content-['']";

/** "How we engage": the three phases in one hairline-bordered card; each service links to `?service=<slug>`. */
export function HowWeEngage() {
  const e = servicesPage.engage;
  return (
    <section id="engage" aria-labelledby="engage-title" className="scroll-mt-20 bg-white py-20 lg:py-[120px]">
      <div className="frame flex flex-col gap-14">
        <div className="sr flex max-w-[760px] flex-col gap-5">
          <h2 id="engage-title" className="h2">{e.titleLight} <b>{e.titleBold}</b></h2>
          <p className="text-[18px] font-[350] leading-[1.6] tracking-normal text-muted [text-wrap:pretty] max-w-[640px]">{e.body}</p>
        </div>
        <div className="sr overflow-hidden rounded-[28px] border border-hairline bg-white">
          <ol className="grid lg:grid-cols-3">
            {phases.map((p, n) => (
              <li key={p.slug} className={cn("flex flex-col gap-5 px-7 pb-7 pt-[30px]", n > 0 && "max-lg:border-t border-hairline lg:border-l")}>
                <div className="flex flex-col gap-2.5">
                  <p className="flex items-center gap-[9px] text-[13.5px] font-medium text-heading">
                    <span aria-hidden="true" className={cn("dot", phaseStyle[p.color].dot)} />
                    {servicesPage.phaseWord} {n + 1}
                  </p>
                  <div aria-hidden="true" className={bracket} />
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[34px] font-normal leading-none tracking-[-0.03em] text-heading">
                    <a href={`#${p.slug}`} className="hover:underline">{p.title}</a>
                  </h3>
                  <span aria-hidden="true" className="num text-[13px] text-[#6A777F]">{phaseRange(p)}</span>
                </div>
                <p className="body-text min-h-12">{p.blurb}</p>
                <ul className="mt-1 flex flex-col">
                  {p.services.map((s) => (
                    <li key={s.slug} className="border-t border-dashed border-[#D9E0E5]">
                      <Link href={`/services?service=${s.slug}`} className="grid min-h-11 grid-cols-[30px_minmax(0,1fr)] gap-2.5 py-3 text-[14px] leading-[1.4] text-body hover:text-heading">
                        <span className="num pt-px text-[12px] text-muted">{s.num}</span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <a href={`#${p.slug}`} className="tlink mt-auto pt-2 text-[14px]">
                  {servicesPage.engage_cta(p.title)}
                  <ArrowRight aria-hidden="true" size={15} strokeWidth={1.6} />
                </a>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-2.5 border-t border-hairline bg-porcelain px-7 pb-6 pt-[18px]">
            <div aria-hidden="true" className={bracket} />
            <p className="self-center text-[13.5px] font-medium text-muted">{e.bracket}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
