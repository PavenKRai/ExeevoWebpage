import Image from "next/image";
import { about } from "@/content/about";

/** "Our leadership": the five leaders as full-width rows, the portrait alternating left and right on desktop. White ground. */
export function LeadershipSection() {
  const l = about.leadership;
  return (
    <section aria-labelledby="leadership-title" className="overflow-x-clip bg-white py-20 lg:py-[120px]">
      <div className="frame flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-3">
          <h2 id="leadership-title" className="h2 sr">{l.parts.light} <b>{l.parts.bold}</b></h2>
          <p className="lead sr max-w-[420px]">{l.lead}</p>
        </div>
        <ul className="flex flex-col">
          {l.people.map((p, k) => {
            const right = k % 2 === 1;
            return (
              <li key={p.last} className="sr grid grid-cols-1 gap-5 border-t border-hairline py-9 lg:grid-cols-12 lg:gap-x-6">
                <div className={`relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[20px] bg-mist lg:max-w-none lg:col-span-4 lg:row-start-1 ${right ? "lg:col-start-9" : "lg:col-start-1"}`}>
                  <Image src={p.photo} alt={p.alt} fill sizes="(min-width: 1024px) 400px, 320px" className="object-cover object-[50%_18%]" />
                </div>
                <div className={`flex flex-col gap-3.5 self-center lg:row-start-1 ${right ? "lg:col-span-7 lg:col-start-1" : "lg:col-span-7 lg:col-start-6"}`}>
                  <h3 className="text-[36px] font-light leading-[1.08] tracking-[-0.03em] text-soft">
                    {p.first} <b className="font-medium text-heading">{p.last}</b>
                  </h3>
                  <p className="text-[15px] text-brand-blue">{p.title}</p>
                  <div className="flex flex-col gap-2.5">
                    {p.bio.map((b) => (
                      <p key={b.slice(0, 24)} className="body-text !text-[16px]">{b}</p>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
