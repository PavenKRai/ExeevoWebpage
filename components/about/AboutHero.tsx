import Image from "next/image";
import type { CSSProperties } from "react";
import { about } from "@/content/about";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Light hero: headline and intro, then the photo band (with the "one platform" glass note) and the five company figures. */
export function AboutHero() {
  const a = about;
  return (
    <section className="relative overflow-x-clip bg-porcelain pt-[130px] lg:pt-[150px]">
      <div className="gridbg" aria-hidden="true" />
      <div className="aura right-[-60px] top-5 size-[480px] bg-brand-blue opacity-[.14] max-lg:hidden" aria-hidden="true" />
      <div className="aura right-[360px] top-[120px] size-[340px] bg-magenta opacity-[.08] max-lg:hidden" aria-hidden="true" />
      <div className="frame grid grid-cols-1 items-end gap-x-6 gap-y-8 lg:grid-cols-12">
        <h1 className="h1 rise lg:col-span-7" style={i(1)}>
          {a.h1Parts.light} <b>{a.h1Parts.bold}</b>
        </h1>
        <div className="rise flex flex-col gap-4 lg:col-span-4 lg:col-start-9" style={i(2)}>
          <p className="body-text !text-[16px]">{a.intro}</p>
          <p className="body-text !text-[16px]">{a.body}</p>
        </div>
      </div>
      <div className="frame fi mt-10 lg:mt-14">
        <figure className="relative h-[260px] overflow-hidden rounded-[32px] bg-mist sm:h-[320px] lg:h-[380px]">
          <Image src={a.heroImage.src} alt={a.heroImage.alt} fill priority sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover object-[52%_35%]" />
          <div className="glass absolute bottom-6 right-6 hidden max-w-[340px] flex-col gap-1 rounded-[22px] px-6 py-5 sm:flex">
            {a.oneLines.map((l) => (
              <span key={l.text} className={l.strong ? "text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-heading" : "text-[22px] font-light leading-[1.2] tracking-[-0.02em] text-muted"}>{l.text}</span>
            ))}
          </div>
          <span className="label absolute left-6 top-[22px] hidden rounded-full bg-white/80 px-2.5 py-1.5 text-body sm:block">{a.heroImage.tag}</span>
        </figure>
        <dl className="mt-2 grid grid-cols-1 gap-x-5 min-[700px]:grid-cols-2 lg:grid-cols-5">
          {a.stats.map((s) => (
            <div key={s.value} className="flex flex-col gap-2 pb-7 pr-5 pt-6">
              <dt className="text-[40px] font-[250] leading-none tracking-[-0.045em] text-heading">{s.value}</dt>
              <dd className="label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="h-12 lg:h-[72px]" />
    </section>
  );
}
