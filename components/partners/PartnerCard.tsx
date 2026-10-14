import Image from "next/image";
import { catNames, partnersPage, type Partner } from "@/content/partners";
import { cn } from "@/components/ui/cn";

export const catDot: Record<string, string> = { tech: "bg-brand-blue", impl: "bg-magenta", data: "bg-brand-green", comp: "bg-muted" };

/** One partner: logo, name, specialty, regions and the opening paragraph; "Read more" opens the full profile (see PartnerDialog). */
export function PartnerCard({ partner, onOpen }: { partner: Partner; onOpen: () => void }) {
  return (
    <article className="glass-light srg relative flex flex-col gap-3.5 rounded-[28px] p-4">
      <div className="relative h-[150px] rounded-[20px] bg-white">
        <Image src={partner.image} alt="" fill sizes="380px" className="object-contain p-7" />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-2 pb-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[clamp(22px,1.9vw,26px)] font-semibold leading-[1.15] tracking-[-0.02em]">{partner.name}</h3>
          <span className="mt-1.5 flex shrink-0 items-center gap-1.5 text-[12.5px] text-muted">
            <span aria-hidden="true" className={cn("size-[7px] rounded-full", catDot[partner.cat])} />
            {catNames[partner.cat]}
          </span>
        </div>
        <p className="text-[15px] font-medium leading-[1.4] text-heading">{partner.spec}</p>
        {partner.regions.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {partner.regions.map((r) => (
              <li key={r} className="flex h-8 items-center rounded-full bg-white/70 px-3 text-[12.5px] text-body">{r}</li>
            ))}
          </ul>
        )}
        <p className="text-[15px] leading-[1.6] text-muted">{partner.body[0]}</p>
        <button type="button" onClick={onOpen} aria-haspopup="dialog" className="mt-auto inline-flex min-h-11 items-center self-start text-[15px] font-semibold text-brand-blue">
          {partnersPage.modal.readMore}<span className="sr-only">: {partner.name}</span>
        </button>
      </div>
    </article>
  );
}
