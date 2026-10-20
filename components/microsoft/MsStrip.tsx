import Image from "next/image";
import { microsoft } from "@/content/microsoft";
import { Marquee } from "./Marquee";

const pill = "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-2.5 pl-3 pr-[18px] text-[14px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]";

/** "Built natively on Microsoft": a looping strip of the Microsoft products Exeevo runs on, then the client logos. The repeated half is hidden from assistive tech. */
export function MsStrip() {
  const t = microsoft.strip;
  return (
    <section aria-label={t.label} className="relative overflow-hidden border-y border-hairline bg-white pb-[38px] pt-[34px]">
      <div className="wrap flex items-center justify-center gap-2.5 pb-5">
        <span className="text-[14px] text-muted">{t.builtOn}</span>
        <Image src="/microsoft/microsoft-wordmark.webp" alt="Microsoft" width={100} height={20} className="h-5 w-auto" />
      </div>
      <Marquee>
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
      </Marquee>
    </section>
  );
}
