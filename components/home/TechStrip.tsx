import Image from "next/image";
import { home } from "@/content/home";

const pill = "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-2.5 pl-3 pr-[18px] text-[14px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]";
const fade = "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)";

/** "Built entirely on Microsoft": a looping strip of the Microsoft products Exeevo runs on, then the client logos. The repeated half is hidden from assistive tech. */
export function TechStrip() {
  const t = home.tech;
  return (
    <section aria-label={t.label} className="relative overflow-hidden border-y border-hairline bg-white pb-[38px] pt-[34px]">
      <div className="hm-wrap flex items-center justify-center gap-2.5 pb-5">
        <span className="text-[14px] text-muted">{t.builtOn}</span>
        <Image src="/microsoft/microsoft-wordmark.webp" alt="Microsoft" width={100} height={20} className="h-5 w-auto" />
      </div>
      <div className="mq-wrap" style={{ WebkitMaskImage: fade, maskImage: fade }}>
        <ul className="mq flex w-max gap-3">
          {[0, 1].map((copy) =>
            t.items.map((it) => (
              <li key={`${copy}-${it.label}`} aria-hidden={copy === 1 ? "true" : undefined} className={pill}>
                <Image src={it.logo} alt="" width={22} height={22} className="size-[22px]" />
                {it.label}
              </li>
            )),
          )}
        </ul>
      </div>
      <div className="hm-wrap mt-[30px] flex flex-col items-center gap-5 border-t border-mist pt-[34px]">
        <span className="text-[14px] text-muted">{t.trusted}</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-16 gap-y-7 max-sm:gap-x-9">
          {t.clients.map((c) => (
            <li key={c.name}>
              <Image src={c.logo} alt={c.name} width={c.w} height={c.h} className="client block w-auto" style={{ height: c.h }} />
            </li>
          ))}
          <li className="text-[14px] text-muted">{t.more}</li>
        </ul>
      </div>
    </section>
  );
}
