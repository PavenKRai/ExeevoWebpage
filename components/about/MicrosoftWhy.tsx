import Image from "next/image";
import { about } from "@/content/about";
import { Button } from "@/components/ui/Button";

/** "The best of both worlds" (Microsoft partnership and badge) beside "Why life sciences chooses Exeevo" as five ruled rows. */
export function MicrosoftWhy() {
  const m = about.microsoft;
  const w = about.why;
  return (
    <section aria-labelledby="ms-title" className="overflow-x-clip bg-white pb-20 lg:pb-[120px]">
      <div className="frame grid grid-cols-1 items-start gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <h2 id="ms-title" className="h2 sr max-w-[760px]">{m.parts.light} <b>{m.parts.bold}</b></h2>
          <p className="lead sr">{m.body[0]}</p>
          <p className="body-text sr !text-[16px]">{m.body[1]}</p>
          <div className="card sr flex flex-wrap items-center justify-between gap-x-6 gap-y-3 bg-porcelain px-[26px] py-[22px]">
            <Image src={m.badge.src} alt={m.badge.alt} width={773} height={225} sizes="220px" className="h-16 w-auto mix-blend-multiply" />
            <Button href="/partners" variant="text">{m.link}</Button>
          </div>
        </div>
        <div className="flex flex-col gap-[18px] lg:col-span-5 lg:col-start-8">
          <h3 className="sr text-[28px] font-[350] leading-[1.15] tracking-[-0.025em] text-heading">{w.title}</h3>
          <ol>
            {w.items.map((it, n) => (
              <li key={it.title} className="sr grid grid-cols-[44px_minmax(0,1fr)] gap-3.5 border-t border-hairline py-5">
                <span className="num text-[13px] text-brand-blue">{String(n + 1).padStart(2, "0")}</span>
                <p className="text-[16px] leading-[1.55] text-muted"><span className="font-medium text-heading">{it.title}</span> {it.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
