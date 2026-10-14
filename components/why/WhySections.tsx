import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Check, LayoutGrid, Plus, ShieldCheck, X } from "lucide-react";
import { compliance, whyExeevo } from "@/content/compliance";
import { comparison } from "@/content/comparison";
import { why } from "@/content/why";
import { TenantDiagram } from "./TenantDiagram";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const wrap = "relative mx-auto flex w-full max-w-[1280px] flex-col px-5 md:px-10";
const dotCss = (c: string) => ({ background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.75), ${c} 55%)` }) as CSSProperties;
const regionDot: Record<string, string> = { FDA: "var(--ex-blue)", EU: "#7A3FC0", China: "var(--ex-magenta)", US: "var(--ex-green)" };
const lead = "text-[18px] font-[350] leading-[1.6] text-muted [text-wrap:pretty]";

function Heading({ h, className = "" }: { h: { light: string; bold: string }; className?: string }) {
  return (
    <h2 className={`h2 ${className}`}>
      {h.light} <b>{h.bold}</b>
    </h2>
  );
}

function RulerLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <p className="whitespace-nowrap text-[13.5px] font-[450] text-heading">{children}</p>
      <div className="ruler flex-1" aria-hidden="true" />
    </div>
  );
}

/** Hero + the four regulatory tiles (anchor #compliance). */
export function WhyHero() {
  return (
    <section className="relative overflow-hidden bg-porcelain pb-20 pt-[128px] lg:pb-[110px] lg:pt-[160px]">
      <div className="gridbg" aria-hidden="true" />
      <div className="aura -right-20 top-5 size-[520px] bg-brand-blue opacity-[.14]" aria-hidden="true" />
      <div className="aura left-[20%] top-[520px] size-[420px] bg-[#7A3FC0] opacity-10 max-md:hidden" aria-hidden="true" />
      <div className="aura right-[15%] top-[600px] size-[360px] bg-brand-green opacity-[.12] max-md:hidden" aria-hidden="true" />
      <div className={`${wrap} gap-14 lg:gap-[72px]`}>
        <div className="grid items-end gap-7 lg:grid-cols-12 lg:gap-x-6">
          <h1 className="h1 rise lg:col-span-7" style={i(1)}>
            {why.heading.light} <b>{why.heading.bold}</b>
          </h1>
          <p className={`${lead} rise lg:col-span-4 lg:col-start-9`} style={i(2)}>{whyExeevo.intro}</p>
        </div>
        <div id="compliance" className="flex scroll-mt-28 flex-col gap-5">
          <RulerLabel>{why.complianceLabel}</RulerLabel>
          <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {compliance.map((c) => (
              <li key={c.name} className="glass lift srg relative flex min-h-[280px] flex-col gap-[18px] overflow-hidden rounded-3xl p-6">
                <p className="flex items-center gap-2 text-[13.5px] font-[450] text-body">
                  <span aria-hidden="true" className="dot" style={dotCss(regionDot[c.region] ?? "var(--ex-blue)")} />
                  {c.region}
                </p>
                <span className="flex size-11 items-center justify-center rounded-[14px] border border-hairline bg-white text-heading" aria-hidden="true">
                  <ShieldCheck size={20} strokeWidth={1.5} />
                </span>
                <h3 className="mt-auto text-[24px] font-normal leading-[1.1] tracking-[-0.025em] text-heading">{c.name}</h3>
                <p className="body-text !text-[14px]">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** "The best of both worlds" + the five reasons. White ground. */
export function BestOfBoth() {
  const b = why.bestOfBoth;
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-[120px]">
      <div className="aura -left-20 top-[180px] h-[420px] w-[520px] bg-brand-blue opacity-[.14] max-md:hidden" aria-hidden="true" />
      <div className="aura -right-14 top-[220px] h-[380px] w-[460px] bg-brand-green opacity-[.12] max-md:hidden" aria-hidden="true" />
      <div className={`${wrap} gap-12`}>
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-x-6">
          <Heading h={b.heading} className="sr lg:col-span-5" />
          <p className={`${lead} sr !text-[17px] lg:col-span-6 lg:col-start-7`}>{b.body}</p>
        </div>
        <div className="srg flex flex-col gap-3.5">
          <div className="relative grid gap-3.5 md:grid-cols-2">
            <div className="glass flex min-h-[220px] flex-col gap-[26px] rounded-[28px] p-8">
              <div className="flex h-8 items-center"><Image src="/why/i0.webp" alt="Microsoft" width={355} height={76} className="h-7 w-auto" /></div>
              <p className="mt-auto max-w-[420px] text-[24px] font-[350] leading-[1.2] tracking-[-0.022em] text-heading">{b.left}</p>
            </div>
            <div className="glass flex min-h-[220px] flex-col gap-[26px] rounded-[28px] p-8">
              <div className="flex h-8 items-center gap-3">
                <Image src="/brand/exeevo-icon.png" alt="" width={30} height={30} />
                <Image src="/brand/exeevo-wordmark-slate.png" alt="Exeevo" width={101} height={17} style={{ width: 101, height: 17 }} />
              </div>
              <p className="mt-auto max-w-[420px] text-[24px] font-[350] leading-[1.2] tracking-[-0.022em] text-heading">{b.right}</p>
            </div>
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 hidden size-[42px] -translate-x-1/2 -translate-y-1/2 rounded-full p-px md:block" style={{ background: "var(--ex-gradient)" }}>
              <span className="flex size-full items-center justify-center rounded-full bg-white/90 text-body backdrop-blur-md"><Plus size={14} strokeWidth={1.4} /></span>
            </span>
          </div>
          <div className="glass flex items-center gap-4 rounded-[20px] px-[26px] py-5">
            <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-white/85 text-brand-blue shadow-[0_0_0_1px_var(--ex-hairline)]"><LayoutGrid size={18} strokeWidth={1.6} /></span>
            <p className="body-text !text-[15px]">{b.note}</p>
          </div>
        </div>
        <div className="flex flex-col gap-[22px] pt-6">
          <h3 className="sr text-[28px] font-[350] leading-[1.15] tracking-[-0.025em] text-heading">{why.reasons.title}</h3>
          <ol className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {why.reasons.items.map((r, n) => (
              <li key={r.title} className="glass lift srg flex flex-col gap-3 rounded-[22px] px-[22px] py-6">
                <span className="num text-[12px] text-muted">{String(n + 1).padStart(2, "0")}</span>
                <h4 className="mt-1.5 min-h-11 text-[18px] font-[450] leading-[1.22] tracking-[-0.015em] text-heading">{r.title}</h4>
                <p className="body-text !text-[14px]">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** "One configurable platform, no bolt-ons": numbered list left, product collage right. */
export function ConfigPlatform() {
  const p = why.platform;
  return (
    <section className="relative overflow-hidden bg-porcelain py-20 lg:py-[120px]">
      <div className="aura -right-28 top-[120px] size-[560px] bg-brand-blue opacity-[.14] max-md:hidden" aria-hidden="true" />
      <div className="aura right-[300px] top-[460px] size-[360px] bg-brand-green opacity-[.12] max-md:hidden" aria-hidden="true" />
      <div className={`${wrap} grid items-start gap-12 lg:grid-cols-12 lg:gap-x-6`}>
        <div className="flex flex-col gap-7 lg:col-span-6">
          <div className="sr flex max-w-[760px] flex-col gap-5">
            <Heading h={p.heading} />
            <p className={`${lead} max-w-[640px]`}>{p.body}</p>
          </div>
          <ol className="grid sm:grid-cols-2 sm:gap-x-6">
            {p.items.map((it, n) => (
              <li key={it.title} className="row sr grid grid-cols-[44px_minmax(0,1fr)] gap-3.5 border-t border-[#D9E0E5] py-[22px] pr-3">
                <span className="num text-[13px] text-muted">{String(n + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[17px] font-[450] leading-[1.3] tracking-normal text-heading">{it.title}</h3>
                  <p className="body-text !text-[14px]">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/platform" className="btn btn-ink sr self-start">
            {p.cta}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
          </Link>
        </div>
        <div className="srg relative min-h-[420px] sm:min-h-[560px] lg:sticky lg:top-[120px] lg:col-span-5 lg:col-start-8">
          <div className="glass absolute inset-0 rounded-[36px]" aria-hidden="true" />
          <Image src={p.images.monitor.src} alt={p.images.monitor.alt} width={568} height={430} sizes="(min-width: 1024px) 330px, 55vw" className="absolute right-7 top-16 w-[62%] mix-blend-multiply" />
          <Image src={p.images.tablet.src} alt={p.images.tablet.alt} width={541} height={325} sizes="(min-width: 1024px) 400px, 70vw" className="absolute left-6 top-[270px] w-[74%] mix-blend-multiply drop-shadow-[0_30px_30px_rgba(29,38,45,.18)] max-sm:top-[190px]" />
          <Image src={p.images.phone.src} alt={p.images.phone.alt} width={162} height={325} sizes="140px" className="absolute bottom-6 right-[30px] w-[26%] drop-shadow-[0_24px_30px_rgba(29,38,45,.25)]" />
        </div>
      </div>
    </section>
  );
}

/** Comparison: a real <table> from 768px, stacked cards below. */
export function CompareTable() {
  const c = comparison;
  const th = "px-5 py-[22px] text-left text-[13.5px] font-[450] text-muted";
  const td = "border-t border-hairline px-5 py-[22px] align-top text-[15px] leading-[1.45] text-muted";
  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className={`${wrap} gap-12`}>
        <Heading h={why.compare.heading} className="sr max-w-[760px]" />
        <div className="sr hidden overflow-x-auto rounded-3xl border border-hairline bg-porcelain md:block">
          <table className="w-full min-w-[860px] border-collapse">
            <caption className="sr-only">{c.title}</caption>
            <thead>
              <tr>
                <th scope="col" className={`${th} w-[28%]`}>{c.columns[0]}</th>
                <th scope="col" className="w-[26%] border-x border-hairline px-5 py-[18px] text-left" style={{ background: "linear-gradient(90deg,#DF1995,#0762C8 55%,#00C389) top / 100% 3px no-repeat, #fff" }}>
                  <span className="flex items-center gap-2.5">
                    <Image src="/brand/exeevo-icon.png" alt="" width={22} height={22} />
                    <Image src="/brand/exeevo-wordmark-slate.png" alt="Exeevo" width={83} height={14} style={{ width: 83, height: 14 }} />
                  </span>
                </th>
                <th scope="col" className={th}>{c.columns[2]}</th>
                <th scope="col" className={th}>{c.columns[3]}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.capability}>
                  <th scope="row" className="border-t border-hairline px-5 py-[22px] text-left align-top text-[15px] font-[450] leading-[1.45] text-heading">{r.capability}</th>
                  <td className="border-x border-t border-hairline bg-white/90 px-5 py-[22px] align-top text-[15px] font-[450] leading-[1.45] text-heading">
                    <span className="flex items-start gap-2.5"><Check aria-hidden="true" size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-green-ink" />{r.exeevo}</span>
                  </td>
                  <td className={td}>{r.generic}</td>
                  <td className={td}>{r.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="grid gap-3.5 md:hidden">
          {c.rows.map((r) => (
            <li key={r.capability} className="card flex flex-col gap-3 p-5">
              <h3 className="text-[16px] font-[450] leading-[1.3] text-heading">{r.capability}</h3>
              <p className="flex items-start gap-2.5 text-[15px] font-[450] text-heading"><Check aria-hidden="true" size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-green-ink" /><span><span className="block text-[13px] font-normal text-muted">{c.columns[1]}</span>{r.exeevo}</span></p>
              <p className="text-[15px] text-muted"><span className="block text-[13px]">{c.columns[2]}</span>{r.generic}</p>
              <p className="text-[15px] text-muted"><span className="block text-[13px]">{c.columns[3]}</span>{r.point}</p>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-muted">{c.footnote}</p>
      </div>
    </section>
  );
}

/** "Your data stays where you put it": copy and the concentric tenant diagram. */
export function TenantSection() {
  const t = why.tenant;
  const w = whyExeevo.tenant;
  return (
    <section className="relative overflow-hidden bg-porcelain pb-24 pt-20 lg:pb-[130px] lg:pt-[120px]">
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12 lg:gap-x-6`}>
        <div className="flex flex-col gap-[26px] lg:col-span-6">
          <Heading h={t.heading} className="sr max-w-[760px]" />
          <p className={`${lead} sr`}>{w.body}</p>
          <div className="relative">
            <div className="aura left-[6%] top-[10%] h-[180px] w-[260px] bg-brand-blue opacity-[.16]" aria-hidden="true" />
            <div className="aura bottom-0 right-[8%] h-40 w-[220px] bg-brand-green opacity-[.14]" aria-hidden="true" />
            <div className="glass sr relative grid grid-cols-[44px_minmax(0,1fr)] gap-4 rounded-[20px] px-[26px] py-6">
              <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-[14px] border border-hairline bg-white/80 text-brand-blue"><LayoutGrid size={20} strokeWidth={1.5} /></span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[17px] font-[450] tracking-normal text-heading">{w.cardTitle}</h3>
                <p className="body-text">{w.cardBody}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:col-span-5 lg:col-start-8">
          <div className="relative w-full max-w-[520px] justify-self-center" role="img" aria-label={t.diagramLabel}>
            <div className="aura left-[20%] top-[20%] size-3/5 bg-brand-green opacity-[.18]" aria-hidden="true" />
            <div className="aura left-[10%] top-[10%] size-2/5 bg-brand-blue opacity-[.12]" aria-hidden="true" />
            <div className="srg relative">
              <TenantDiagram />
              <div className="glass absolute left-1/2 top-1/2 flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full text-center" style={{ background: "linear-gradient(160deg,rgba(255,255,255,.95),rgba(255,255,255,.75))" }}>
                <span aria-hidden="true" className="size-4 rounded-full" style={{ background: "var(--ex-orb)" }} />
                <span className="max-w-[110px] text-[15px] font-medium leading-[1.2] text-heading">{t.core}</span>
              </div>
              {t.chips.map((c) => (
                <span key={c.label} className="glass absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-[7px] text-[12.5px] text-heading max-sm:text-[11px]" style={{ left: c.left, top: c.top }}>{c.label}</span>
              ))}
              <span className="absolute -bottom-[2%] -right-[4%] inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[13.5px] font-[450] text-muted shadow-[0_0_0_1px_var(--ex-hairline)]">
                <span aria-hidden="true" className="flex size-4 items-center justify-center rounded-[5px] bg-[#FBE8F3] text-[#B0127A]"><X size={10} strokeWidth={2} /></span>
                <span className="line-through decoration-[#B0127A]">{t.never}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
