import Link from "next/link";
import { Layer } from "@/components/scene/Layer";
import { phases, servicesPage } from "@/content/services";
import { cn } from "@/components/ui/cn";
import { phaseStyle } from "./phaseStyle";

/** "How we engage": the three phases as a timeline with their numbered services (each links to that service). */
export function HowWeEngage() {
  return (
    <div id="how-we-engage" className="frame grid scroll-mt-28 gap-10 pb-24 pt-16 lg:grid-cols-12 lg:gap-x-6 lg:pb-[120px] lg:pt-[96px]">
      <Layer from={{ o: 0, y: 30 }} className="flex flex-col gap-5 lg:col-span-4">
        <h2 className="text-[clamp(32px,3.4vw,42px)] leading-[1.06] tracking-[-0.03em]">{servicesPage.engage.title}</h2>
        <p className="max-w-[340px] text-[17px] leading-[1.65] text-on-dark">{servicesPage.engage.body}</p>
      </Layer>
      <div className="flex flex-col gap-8 lg:col-span-8 lg:col-start-5">
        <Layer from={{ o: 0, y: 20 }} aria-hidden="true" className="relative mx-2.5 hidden h-[30px] lg:block">
          <span className="absolute inset-x-0 top-[15px] h-px bg-white/[.22]" />
          <span className="absolute left-0 top-[15px] h-[15px] w-px bg-white/[.22]" />
          <span className="absolute right-0 top-[15px] h-[15px] w-px bg-white/[.22]" />
          <span className="absolute left-1/2 top-0 flex h-[30px] -translate-x-1/2 items-center whitespace-nowrap rounded-[15px] border border-white/[.22] bg-ink px-4 text-[13px] text-[#DCE3E7]">
            {servicesPage.engage.bracket}
          </span>
        </Layer>
        <div className="relative">
          <span aria-hidden="true" className="ln absolute inset-x-2.5 top-0 hidden h-0.5 bg-[image:var(--ex-gradient)] lg:block" />
          <span aria-hidden="true" className="absolute -top-[5px] right-0.5 hidden size-3 rotate-45 border-r-2 border-t-2 border-brand-green lg:block" />
          <ol className="grid gap-8 lg:grid-cols-3 lg:gap-0">
            {phases.map((p, n) => (
              <Layer as="li" key={p.slug} from={{ o: 0, y: 40, s: 0.96 }} range={[n * 0.1, 1]} className="relative flex flex-col rounded-[24px] px-0 pb-6 pt-8 lg:px-[26px] lg:pt-10">
                <span aria-hidden="true" className={cn("absolute left-0 top-[-7px] size-3.5 rounded-full shadow-[0_0_0_5px_var(--ex-ink),0_0_18px_currentColor] lg:left-[26px]", phaseStyle[p.color].dot, phaseStyle[p.color].textOnDark)} />
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[26px] leading-[1.1] tracking-[-0.025em]">
                    <a href={`#${p.slug}`} className="hover:underline">{p.title}</a>
                  </h3>
                  <span className={cn("text-[13px]", phaseStyle[p.color].textOnDark)}>{p.services.length} services</span>
                </div>
                <p className="mt-3 min-h-[70px] text-[14.5px] leading-[1.6] text-on-dark">{p.blurb}</p>
                <ul className="mt-[22px] border-b border-white/[.08]">
                  {p.services.map((s) => (
                    <li key={s.slug} className="border-t border-white/[.08]">
                      <Link href={`/services?service=${s.slug}`} className="flex min-h-11 items-baseline gap-3.5 py-3 text-[14px] leading-[1.4] text-[#DCE3E7] hover:text-white">
                        <span className="w-5 shrink-0 text-[12px] tabular-nums text-on-dark-muted">{s.num}</span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Layer>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
