import Image from "next/image";
import { about } from "@/content/about";

/** "A partner that is here to stay": three paragraphs beside a glass card with the Valsoft logo and four figures. */
export function ValsoftSection() {
  const v = about.valsoft;
  return (
    <section aria-labelledby="valsoft-title" className="relative overflow-x-clip bg-mist py-20 lg:py-[120px]">
      <div className="aura -left-[140px] top-[60px] size-[520px] bg-brand-green opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="frame grid grid-cols-1 items-start gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <h2 id="valsoft-title" className="h2 sr max-w-[760px]">{v.parts.light} <b>{v.parts.bold}</b></h2>
          <p className="lead sr">{v.body[0]}</p>
          <p className="body-text sr !text-[16px]">{v.body[1]}</p>
          <p className="body-text sr !text-[16px]">{v.body[2]}</p>
        </div>
        <div className="glass srg flex flex-col gap-[18px] rounded-[28px] p-7 lg:col-span-4 lg:col-start-9">
          <div className="flex items-center justify-center rounded-[18px] bg-white p-[22px]">
            <Image src={v.logo.src} alt={v.logo.alt} width={1253} height={211} sizes="(min-width: 1024px) 380px, 90vw" className="h-auto w-full" />
          </div>
          <dl className="grid grid-cols-1 gap-x-[18px] min-[420px]:grid-cols-2">
            {v.stats.map((s) => (
              <div key={s.value} className="flex flex-col gap-2 border-t border-[#D9E0E5] py-5">
                <dt className="text-[30px] font-light leading-[1.05] tracking-[-0.035em] text-heading">{s.value}</dt>
                <dd className="label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
