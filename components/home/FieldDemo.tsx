import Image from "next/image";
import { home } from "@/content/home";

const d = home.demo;
const rows = [
  { w1: "70%", w2: "45%" },
  { w1: "58%", w2: "52%" },
  { w1: "64%", w2: "38%" },
  { w1: "50%", w2: "42%" },
];
const grad = "conic-gradient(from 200deg,#DF1995,#0762C8,#00C389,#0762C8,#DF1995)";
const typed = d.ask.typed.split("");

/** The animated field-view product demo (pure CSS, 15s loop; the end state shows under reduced motion). Decorative: described by `aria-label`. */
export function FieldDemo() {
  return (
    <div className="glass relative ml-[4%] mt-6 overflow-hidden rounded-[32px] p-[18px]">
      <div className="flex items-center justify-between px-1.5 pb-3 pt-0.5">
        <span className="label">{d.title}</span>
        <span className="d-live size-[7px] rounded-full bg-brand-green" aria-hidden="true" />
      </div>
      <div role="img" aria-label={d.label} data-orb="" className="relative h-[480px] overflow-hidden rounded-[18px] bg-white shadow-[0_0_0_1px_var(--ex-hairline)]">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="flex h-[46px] items-center gap-2.5 border-b border-mist px-3.5" style={{ background: "linear-gradient(90deg,rgba(223,25,149,.05),rgba(7,98,200,.06) 55%,rgba(0,195,137,.05))" }}>
            <Image src="/brand/exeevo-icon.png" alt="" width={36} height={36} className="size-[18px]" />
            <span className="text-[13px] font-medium text-heading">{d.app}</span>
            <span className="ml-auto h-[26px] w-[34%] rounded-full border border-hairline bg-porcelain" />
            <span className="size-6 rounded-full bg-[#D3DBE0]" />
          </div>
          <div className="absolute bottom-0 left-0 top-[46px] w-[42%] border-r border-mist">
            <div className="flex h-[34px] items-center justify-between px-3.5 text-[10px] text-muted"><span>{d.list}</span><span>{d.count}</span></div>
            {rows.map((r, i) => (
              <div key={i} className={`flex h-[60px] items-center gap-2.5 border-b border-mist px-3.5 ${i === 0 ? "d-row1" : ""}`}>
                <span className="size-[30px] shrink-0 rounded-full" style={{ background: "linear-gradient(145deg,#E6EBEE,#D3DBE0)" }} />
                <span className="flex flex-1 flex-col gap-1.5">
                  <span className="block h-2 rounded bg-[#D3DBE0]" style={{ width: r.w1 }} />
                  <span className="block h-[7px] rounded bg-[#E6EBEE]" style={{ width: r.w2 }} />
                </span>
                <span className="rounded-full border border-hairline px-[7px] py-[3px] text-[10px] text-muted">{d.tiers[i]}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-[42%] right-0 top-[46px] p-4">
            <div className="d-skel flex flex-col gap-3">
              <span className="block h-3 w-[46%] rounded bg-hairline" />
              <span className="block h-[7px] w-[70%] rounded bg-[#E6EBEE]" />
              <span className="block h-[7px] w-[62%] rounded bg-[#E6EBEE]" />
              <span className="mt-1.5 h-[90px] rounded-xl bg-porcelain" />
            </div>
            <div className="d-detail absolute inset-x-4 top-4 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="size-9 rounded-full" style={{ background: "linear-gradient(145deg,#E6EBEE,#C3CDD3)" }} />
                <span className="flex flex-col gap-[3px]"><span className="text-[14px] font-medium text-heading">{d.hcp.name}</span><span className="text-[10px] text-muted">{d.hcp.meta}</span></span>
              </div>
              <div className="d-alert flex flex-col gap-[5px] rounded-xl bg-[#EEF4FC] px-3.5 py-3">
                <span className="text-[13px] font-medium text-heading">{d.alert.title}</span>
                <span className="text-[12px] leading-[1.45] text-muted">{d.alert.body}</span>
              </div>
              <div className="flex flex-col gap-[7px] pt-0.5"><span className="block h-[7px] w-[80%] rounded bg-[#E6EBEE]" /><span className="block h-[7px] w-[64%] rounded bg-[#E6EBEE]" /></div>
            </div>
            <span className="d-btn absolute left-4 top-[206px] inline-flex h-8 items-center gap-1.5 rounded-full bg-heading px-3.5 text-[12px] text-white">{d.add}</span>
            <span className="d-chip absolute left-4 top-[250px] inline-flex h-7 items-center gap-1.5 rounded-full bg-[#E3F7EF] px-3 text-[12px] text-[#006B4B]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              {d.added}
            </span>
          </div>
          <div className="d-resp glass absolute bottom-[68px] left-[44%] right-3 flex flex-col gap-[5px] rounded-[14px] px-3.5 py-3">
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-heading"><span className="size-3.5 shrink-0 rounded-full" style={{ background: grad }} />{d.reply.title}</span>
            <span className="text-[12px] leading-[1.45] text-muted">{d.reply.body}</span>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex h-[46px] items-center gap-2.5 rounded-full border border-hairline bg-porcelain pl-3.5 pr-2">
            <span className="size-3.5 shrink-0 rounded-full" style={{ background: grad }} />
            <span className="relative flex h-5 flex-1 items-center">
              <span className="d-ph absolute left-0 text-[13px] text-[#56636C]">{d.ask.placeholder}</span>
              <span className="d-type inline-flex items-center whitespace-nowrap text-[13px] tracking-[-.005em] text-heading">
                {typed.map((c, i) => (
                  <span key={i} className="d-ch" style={{ animationDelay: `${(i * 0.09).toFixed(2)}s`, ...(c === " " ? { display: "inline-block", width: ".28em" } : {}) }}>{c === " " ? "" : c}</span>
                ))}
              </span>
              <span className="d-caret ml-px h-4 w-[1.5px] bg-brand-blue" />
            </span>
            <span className="d-send flex size-[30px] items-center justify-center rounded-full bg-heading text-white"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg></span>
          </div>
          <div className="d-toast glass absolute right-3 top-14 flex w-[58%] items-center gap-2.5 rounded-[14px] px-3.5 py-[11px]">
            <span className="flex size-[26px] items-center justify-center rounded-lg bg-[#E3F7EF] text-green-ink"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
            <span className="flex flex-1 flex-col gap-0.5"><span className="text-[12px] font-medium text-heading">{d.toast.title}</span><span className="text-[11px] text-muted">{d.toast.body}</span></span>
          </div>
          <div className="d-cur">
            <span className="d-rip absolute -left-3.5 -top-3.5 size-7 rounded-full bg-brand-blue/35" />
            <svg width="22" height="22" viewBox="0 0 24 24" className="relative drop-shadow-[0_3px_4px_rgba(29,38,45,.35)]"><path d="M4 2.5l15 8.2-6.6 1.7L9.8 19z" fill="#1D262D" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
