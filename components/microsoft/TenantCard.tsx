import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { microsoft } from "@/content/microsoft";

const item = "es-i flex items-center gap-2 rounded-[11px] bg-white px-[9px] py-[7px] shadow-[0_0_0_1px_#E8EDF0]";

/** "Your Microsoft tenant": three columns of products, the Entra ID bar and three check lines. Every item jumps to its card below. */
export function TenantCard() {
  const t = microsoft.tenant;
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative rounded-[22px] bg-white p-3.5 shadow-[0_0_0_1px_#D3DBE0]">
        <div className="flex items-center justify-between px-1 pb-3.5">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-heading">
            <Image src="/microsoft/microsoft-wordmark.webp" alt="Microsoft" width={70} height={14} className="h-3.5 w-auto" />
            {t.title}
          </span>
          <span className="text-[11.5px] text-muted">{t.note}</span>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-[1fr_1.15fr_1fr]">
          {t.columns.map((c) => (
            <div key={c.title} className={`flex flex-col gap-1.5 rounded-[14px] p-[11px] ${c.highlight ? "bg-[#F4F8FD] shadow-[0_0_0_1.5px_var(--ex-blue),0_18px_30px_-24px_rgba(7,98,200,.45)]" : "bg-porcelain shadow-[inset_0_0_0_1px_var(--ex-hairline)]"}`}>
              <div className="flex items-center gap-2 px-0.5 pb-1 text-[11.5px] font-medium text-muted">
                {c.highlight && <Image src="/brand/exeevo-icon.png" alt="" width={14} height={14} />}
                {c.title}
              </div>
              {c.items.map((it) => (
                <Link key={it.label} href={it.href} className={item}>
                  <Image src={it.logo} alt="" width={18} height={18} className="size-[18px]" />
                  <span className="whitespace-nowrap text-[12px] text-heading">{it.label}</span>
                </Link>
              ))}
              <Link href={c.moreHref} className="es-m mt-auto flex items-center justify-center gap-1.5 rounded-[11px] border border-dashed border-[#C3CDD3] px-[9px] py-1.5 text-[11.5px] text-muted">{t.more}</Link>
            </div>
          ))}
        </div>
        <Link href={t.entra.href} className="es-i mt-2.5 flex items-center gap-2.5 rounded-xl bg-porcelain px-3 py-[9px] shadow-[inset_0_0_0_1px_var(--ex-hairline)]">
          <Image src={t.entra.logo} alt="" width={17} height={17} className="size-[17px]" />
          <span className="text-[12px] text-heading"><b className="font-medium">{t.entra.label}</b>{t.entra.rest}</span>
        </Link>
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 px-1">
        {t.checks.map((c) => (
          <li key={c} className="inline-flex items-center gap-2 text-[12.5px] text-body">
            <Check size={16} strokeWidth={1.8} className="text-green-ink" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
