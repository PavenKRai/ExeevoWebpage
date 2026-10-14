import { Check } from "lucide-react";
import { CategoryDot } from "@/components/ui/CategoryDot";
import { cn } from "@/components/ui/cn";
import { moduleHeadings, type Module } from "@/content/modules";

const aura: Record<string, string> = {
  "crm-sales": "bg-brand-blue",
  "medical-crm": "bg-magenta",
  "marketing-automation": "bg-brand-blue",
  "event-management": "bg-brand-blue",
  "content-management": "bg-brand-green",
  "customer-insights": "bg-brand-green",
  "mobile-app": "bg-brand-blue",
  "ask-nova-studio": "bg-purple",
};
const ring: Record<string, string> = { commercial: "var(--ex-blue)", medical: "var(--ex-magenta)", platform: "var(--ex-green)", ai: "var(--ex-blue)" };

/** One module: large light number, kicker, light + bold heading and lead on the left; Capabilities and "good fit" cards on the right. */
export function ModuleSection({ module: m, index }: { module: Module; index: number }) {
  const [light, bold] = moduleHeadings[m.slug] ?? [m.headline, ""];
  const odd = index % 2 === 0; // 01, 03, ...: white ground, glow top right
  return (
    <section id={m.slug} aria-labelledby={`${m.slug}-title`} className={cn("plat relative scroll-mt-20 overflow-hidden py-20 lg:py-[110px]", odd ? "bg-white" : "bg-porcelain")}>
      <div aria-hidden="true" className={cn("aura size-[440px] opacity-10 max-lg:hidden", aura[m.slug], odd ? "-right-[140px] -top-20" : "-bottom-20 -left-[140px]")} />
      <div className="plat-wrap relative grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="sr flex flex-col gap-[22px] lg:col-span-5">
          <div className="flex items-center justify-between gap-4 text-[13.5px] font-[450] text-muted">
            <span className="inline-flex items-center gap-2.5">
              <CategoryDot category={m.category} className="!size-[11px]" />
              Platform / {m.name}
            </span>
            <span>{m.categoryLabel}</span>
          </div>
          <span aria-hidden="true" className="text-[72px] font-[200] leading-[.9] tracking-[-0.06em] text-[#7F8C95] lg:text-[96px]">{String(index + 1).padStart(2, "0")}</span>
          <h2 id={`${m.slug}-title`} className="h2" style={{ fontSize: "clamp(30px,3vw,44px)" }}>
            {light} <b>{bold}</b>
          </h2>
          <p className="plat-lead">{m.lead}</p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
          <div className="glass srg rounded-[28px] px-6 pb-1.5 pt-2.5 sm:px-7">
            <h3 className="py-4 text-[13.5px] font-[450] tracking-normal text-heading" style={{ fontSize: 13.5 }}>Capabilities</h3>
            <ul>
              {m.features.map((f) => (
                <li key={f.title} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-t border-hairline py-[22px] sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4">
                  <span aria-hidden="true" className="mt-[5px] flex size-3.5 items-center justify-center rounded-full" style={{ boxShadow: `inset 0 0 0 1.5px ${ring[m.category]}` }}>
                    <span className="size-1 rounded-full" style={{ background: ring[m.category] }} />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[17px] font-[450] text-heading">{f.title}</p>
                    <p className="body-text">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card srg flex flex-col gap-4 px-7 py-[26px]">
            <h3 className="text-[13.5px] font-[450] tracking-normal text-muted" style={{ fontSize: 13.5 }}>{m.fitTitle}</h3>
            <ul className="flex flex-col gap-3">
              {m.fit.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[15px] leading-[1.5] text-body">
                  <span aria-hidden="true" className="flex pt-0.5 text-green-ink"><Check size={16} strokeWidth={1.8} /></span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
