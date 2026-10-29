import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ShotViewer } from "./ShotViewer";
import { type Capability, platformIndustries, platformPage } from "@/content/platform";

const chip = "inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[12px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]";
const panel = "rounded-[20px] bg-white/70 shadow-[0_0_0_1px_var(--ex-hairline)]";
const tag = "rounded-full bg-[#F4F8FD] px-2 py-0.5 text-[11px] font-normal text-brand-blue";

/** One capability: promise, who uses it, outcomes and a screenshot frame, then its features, the Ask-Nova AI note and device availability. */
export function CapabilitySection({ cap, index, features }: { cap: Capability; index: number; features: Capability["features"] }) {
  const p = platformPage;
  const flip = index % 2 === 1;
  const head = features.slice(0, 3);
  const more = features.slice(3);
  return (
    <section id={`cap-${cap.id}`} aria-labelledby={`cap-${cap.id}-title`} className={`relative scroll-mt-[90px] overflow-hidden py-[90px] ${flip ? "bg-white" : "bg-porcelain"}`}>
      <div className={`aura top-[10%] h-[420px] w-[520px] bg-brand-blue opacity-10 max-lg:hidden ${flip ? "-left-[120px]" : "-right-[120px]"}`} aria-hidden="true" />
      <div className="wrap flex flex-col gap-7">
        <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-x-8">
          <div className={`sr flex flex-col gap-4 lg:col-span-5 lg:row-start-1 ${flip ? "lg:col-start-8" : "lg:col-start-1"}`}>
            <ul className="flex flex-wrap gap-1.5" aria-label="Industries">
              {cap.industries.map((n) => (
                <li key={n} className={chip}>
                  <span aria-hidden="true" className="size-2 rounded-full" style={{ background: platformIndustries.find((x) => x.name === n)?.color }} />
                  {n}
                </li>
              ))}
            </ul>
            <h2 id={`cap-${cap.id}-title`} className="h2 !text-[clamp(32px,3.2vw,46px)]"><b>{cap.name}</b></h2>
            <p className="lead !text-[19px] !text-body">{cap.promise}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[13px] text-muted">{p.section.usedBy}</span>
              {cap.roles.map((r) => (
                <span key={r} className="rounded-full bg-white/70 px-[11px] py-[5px] text-[12.5px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]">{r}</span>
              ))}
            </div>
            <ul className="flex flex-col gap-[9px] pt-1.5">
              {cap.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-body">
                  <Check size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-green-ink" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
            {cap.poweredBy && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5">
                <Link href={cap.poweredBy.href} aria-label={`${cap.poweredBy.prefix} ${cap.poweredBy.name}`} className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white px-4 py-1.5 text-[13px] text-muted shadow-[0_0_0_1px_var(--ex-hairline)]">
                  {cap.poweredBy.prefix}
                  <Image src={cap.poweredBy.logo} alt="" width={48} height={16} className="h-4 w-auto translate-y-[2px]" />
                </Link>
                <Link href={cap.poweredBy.href} className="tlink !min-h-11 text-[14px]">
                  {cap.poweredBy.cta}
                  <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
          <div className={`srg lg:col-span-7 lg:row-start-1 ${flip ? "lg:col-start-1" : "lg:col-start-6"}`}>
            <div className={`${panel} p-2.5`}>
              <div className="flex items-center gap-1.5 px-1.5 pb-2.5 pt-1" aria-hidden="true">
                <span className="size-[9px] rounded-full bg-hairline" />
                <span className="size-[9px] rounded-full bg-hairline" />
                <span className="size-[9px] rounded-full bg-hairline" />
                <span className="ml-2 text-[12px] text-muted">{p.section.frame(cap.name)}</span>
              </div>
              {cap.shot ? (
                <ShotViewer src={cap.shot} alt={p.section.shotAlt(cap.name)} enlargeLabel={p.section.enlarge(cap.name)} closeLabel={p.section.closeShot} />
              ) : (
                <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-dashed border-[#B6C1C8] bg-porcelain p-5 text-center" style={{ backgroundImage: "radial-gradient(60% 60% at 20% 20%,rgba(223,25,149,.08),transparent 65%),radial-gradient(60% 60% at 85% 30%,rgba(7,98,200,.1),transparent 65%),radial-gradient(70% 60% at 50% 100%,rgba(0,195,137,.08),transparent 65%)" }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8A969E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h18v14H3z M3 15l5-5 4 4 3-3 6 6 M15.5 9.5a1.5 1.5 0 1 0 0-.01" /></svg>
                  <p className="text-[14px] font-medium text-body">{p.section.shotTitle(cap.name)}</p>
                  <p className="text-[12px] text-muted">{p.section.shotNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {head.map((f) => (
            <li key={f.title} className={`${panel} flex flex-col gap-2 p-5`}>
              <h3 className="flex flex-wrap items-center gap-2 text-[16px] font-[450] text-heading">
                {f.title}
                {f.industry && <span className={tag}>{f.industry}</span>}
              </h3>
              <p className="body-text !text-[14px]">{f.body}</p>
            </li>
          ))}
        </ul>
        <div className="grid items-start gap-3 lg:grid-cols-12">
          <div className={`${panel} flex flex-col px-5 py-1.5 lg:col-span-8`}>
            {more.length > 0 ? (
              more.map((f, j) => (
                <div key={f.title} className={`grid gap-x-4 gap-y-1 py-3.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] ${j === 0 ? "" : "border-t border-[rgba(29,38,45,.06)]"}`}>
                  <h3 className="flex flex-wrap items-center gap-2 text-[14.5px] font-[450] text-heading">
                    {f.title}
                    {f.industry && <span className={tag}>{f.industry}</span>}
                  </h3>
                  {f.link ? (
                    <div className="sm:flex sm:justify-end">
                      <Button href={f.link.href} size="nav">
                        {f.link.label}
                        <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-[14px] leading-[1.5] text-muted">{f.body}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="py-3.5 text-[14px] text-muted">{p.section.allShown}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4">
            <div className="flex flex-col gap-1.5 rounded-[20px] px-[18px] py-4 shadow-[0_0_0_1px_var(--ex-hairline)]" style={{ background: "linear-gradient(135deg,rgba(223,25,149,.08),rgba(7,98,200,.08) 55%,rgba(0,195,137,.08)),rgba(255,255,255,.72)" }}>
              <p className="inline-flex items-center gap-2 text-[13px] font-medium text-heading">
                <span aria-hidden="true" className="dot dot-ai !size-3.5" />
                {p.section.ai}
              </p>
              <p className="text-[14px] leading-[1.5] text-body">{cap.ai}</p>
            </div>
            <div className={`${panel} flex flex-col gap-2.5 px-[18px] py-3.5`}>
              <p className="text-[13px] font-medium text-heading">{p.section.availableOn}</p>
              <ul className="grid grid-cols-2 gap-1.5">
                {p.devicesList.map((d, k) => (
                  <li key={d} className={`inline-flex items-center gap-[7px] text-[13px] ${cap.avail[k] ? "text-heading" : "text-muted"}`}>
                    <span aria-hidden="true" className={`flex size-5 items-center justify-center rounded-md text-[11px] ${cap.avail[k] ? "bg-[#E3F7EF] text-green-ink" : "bg-mist text-muted"}`}>{cap.avail[k] ? "✓" : "–"}</span>
                    {d}
                    <span className="sr-only">{cap.avail[k] ? ": available" : ": not available"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
