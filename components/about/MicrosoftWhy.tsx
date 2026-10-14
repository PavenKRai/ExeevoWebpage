import Image from "next/image";
import Link from "next/link";
import { Glow } from "@/components/glass/Glow";
import { about } from "@/content/about";

/** Dark band: the Microsoft partnership, then "Why life sciences chooses Exeevo" as five ruled rows. */
export function MicrosoftWhy() {
  const m = about.microsoft;
  const w = about.why;
  return (
    <section aria-labelledby="ms-title" className="on-dark relative overflow-hidden bg-ink py-20 text-[#EEF2F4] lg:py-[110px]">
      <Glow parallax color="blue" className="-left-24 bottom-0 h-[420px] w-[520px] blur-[120px] max-lg:hidden" style={{ opacity: 0.3 }} />
      <div className="frame relative">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="srl flex flex-col gap-5 lg:col-span-7">
            <p className="text-[15px] text-on-dark-muted">{m.label}</p>
            <h2 id="ms-title" className="text-[clamp(32px,3.4vw,46px)] leading-[1.06] tracking-[-0.03em]">{m.title}</h2>
            {m.body.map((p, n) => (
              <p key={n} className={n === 0 ? "max-w-[640px] text-[17px] leading-[1.65] text-on-dark" : "max-w-[640px] text-[16px] leading-[1.65] text-on-dark-muted"}>{p}</p>
            ))}
          </div>
          <div className="srr flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:pt-20">
            <div className="flex items-center justify-center rounded-3xl bg-white p-8">
              <Image src={m.badge.src} alt={m.badge.alt} width={773} height={246} sizes="300px" className="w-full max-w-[300px]" />
            </div>
            <Link href="/partners" className="inline-flex min-h-11 items-center self-start border-b-2 border-brand-blue font-semibold text-white">{m.link}</Link>
          </div>
        </div>

        <div className="mt-20 lg:mt-[110px]">
          <h2 className="sr text-[clamp(28px,2.7vw,38px)] leading-[1.1] tracking-[-0.03em]">{w.title}</h2>
          <ul className="stagger mt-10 border-b border-white/10">
            {w.items.map((it) => (
              <li key={it.title} className="grid gap-3 border-t border-white/10 py-6 lg:grid-cols-12 lg:gap-x-6 lg:py-7">
                <h3 className="font-display text-[clamp(20px,1.7vw,24px)] font-semibold leading-[1.2] tracking-[-0.02em] text-white lg:col-span-6">{it.title}</h3>
                <p className="text-[16px] leading-[1.6] text-on-dark lg:col-span-6 lg:col-start-7">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
