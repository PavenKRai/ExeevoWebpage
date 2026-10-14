import Image from "next/image";
import { Glow } from "@/components/glass/Glow";
import { about } from "@/content/about";
import { cn } from "@/components/ui/cn";

/** "Part of Valsoft" (logo card, three paragraphs, four figures) and "Our values" (three ruled columns). */
export function ValsoftValues() {
  const v = about.valsoft;
  const val = about.values;
  return (
    <section aria-labelledby="valsoft-title" className="relative overflow-hidden bg-mist py-20 lg:py-[120px]">
      <div className="frame relative">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="srl flex flex-col gap-5 lg:col-span-5">
            <p className="text-[15px] text-muted">{v.label}</p>
            <h2 id="valsoft-title" className="text-[clamp(32px,3.4vw,46px)] leading-[1.06] tracking-[-0.03em]">{v.title}</h2>
            <div className="relative mt-3">
              <Glow parallax color="gradient" className="-inset-6 blur-[80px]" style={{ opacity: 0.3 }} />
              <div className="glass-light relative rounded-[26px] p-4">
                <div className="rounded-[20px] bg-white px-8 py-10">
                  <Image src={v.logo.src} alt={v.logo.alt} width={1242} height={215} sizes="(min-width: 1024px) 420px, 90vw" className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="srr flex flex-col gap-5 lg:col-span-6 lg:col-start-7">
            {v.body.map((p, n) => (
              <p key={n} className={n === 0 ? "text-[18px] leading-[1.6] text-heading" : "text-[16px] leading-[1.65] text-muted"}>{p}</p>
            ))}
            <dl className="mt-3 grid grid-cols-2 border-y border-hairline lg:grid-cols-4">
              {v.stats.map((s, n) => (
                <div key={s.value} className={cn("flex flex-col gap-1.5 px-0 py-5 lg:px-4", n > 0 && "lg:border-l lg:border-hairline", n % 2 === 1 && "max-lg:pl-4")}>
                  <dt className="font-display text-[clamp(20px,1.7vw,22px)] font-semibold leading-[1.2] tracking-[-0.02em] text-heading">{s.value}</dt>
                  <dd className="text-[12.5px] leading-[1.35] text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 lg:mt-[110px]">
          <h2 className="sr text-[clamp(34px,3.6vw,48px)] leading-[1.05] tracking-[-0.03em]">{val.title}</h2>
          <ul className="stagger mt-10 grid gap-0 border-t-2 border-ink lg:grid-cols-3">
            {val.items.map((it, n) => (
              <li key={it.title} className={cn("flex flex-col gap-3 py-7 lg:px-7", n === 0 ? "lg:pl-0" : "lg:border-l lg:border-hairline", n < val.items.length - 1 && "max-lg:border-b max-lg:border-hairline")}>
                <p className="flex items-center gap-2 text-[13px] text-muted">
                  <span aria-hidden="true" className={cn("size-2 rounded-full", it.dot)} />
                  {val.label}
                </p>
                <h3 className="font-display text-[clamp(22px,2vw,28px)] leading-[1.15] tracking-[-0.02em]">{it.title}</h3>
                <p className="text-[15.5px] leading-[1.6] text-muted">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
