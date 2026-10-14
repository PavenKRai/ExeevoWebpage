import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@/components/ui/cn";
import { partnersPage, type Partner } from "@/content/partners";

/** One partner: logo, name, specialty, regions and opening paragraph; the plus button expands the rest in place (all text stays in the HTML). */
export function PartnerRow({ partner, first, open, onToggle }: { partner: Partner; first: boolean; open: boolean; onToggle: () => void }) {
  const [lead, ...more] = partner.body;
  const t = partnersPage.rowToggle;
  const hasMore = more.length > 0;
  return (
    <article className={cn("flex flex-col gap-4 py-[26px]", !first && "border-t border-[rgba(29,38,45,.1)]")}>
      <div className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-4 sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:gap-[22px]">
        <div className="relative h-[72px] rounded-2xl bg-white shadow-[0_0_0_1px_#E1E6EA]">
          <Image src={partner.image} alt={`${partner.name} logo`} fill sizes="150px" className="object-contain px-[18px] py-[14px]" />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="text-[21px] font-[450] leading-[1.2] tracking-[-0.015em] text-heading">{partner.name}</h3>
          <p className="text-[14px] text-muted">{partner.spec}</p>
          {partner.regions.length > 0 && (
            <ul className="flex flex-wrap gap-[5px]">
              {partner.regions.map((r) => (
                <li key={r} className="rounded-full bg-white/75 px-2.5 py-1 text-[12px] text-body shadow-[0_0_0_1px_#E1E6EA]">{r}</li>
              ))}
            </ul>
          )}
        </div>
        {hasMore && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`partner-more-${partner.id}`}
            aria-label={`${open ? t.open : t.closed} about ${partner.name}`}
            className="btn btn-glass size-11 !p-0"
          >
            <Plus size={18} strokeWidth={1.6} className={cn("transition-transform duration-[400ms]", open && "rotate-45")} aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="body-text max-w-[640px]">{lead}</p>
      {hasMore && (
        <div id={`partner-more-${partner.id}`} hidden={!open} className="fi flex max-w-[640px] flex-col gap-3">
          {more.map((b, n) => (
            <p key={n} className="body-text">{b}</p>
          ))}
        </div>
      )}
    </article>
  );
}
