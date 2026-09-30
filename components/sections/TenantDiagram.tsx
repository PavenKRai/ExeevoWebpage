import { Glow } from "../glass/Glow";
import { GlassPanel } from "../glass/GlassPanel";
import { home } from "@/content/site";

type Diagram = { boundary: string; chips: readonly string[]; external: string };

export function TenantDiagram({ diagram = home.privacy.diagram }: { diagram?: Diagram }) {
  return (
    <div className="relative mx-auto w-full max-w-[620px] py-4">
      <div className="flex flex-col items-stretch gap-0 md:flex-row md:items-center">
        <div className="relative flex-1 rounded-block border-2 border-dashed border-brand-blue p-6 md:p-8">
          <span className="absolute -top-3.5 left-6 bg-mist px-3 text-[14px] font-semibold text-brand-blue">
            {diagram.boundary}
          </span>
          <Glow color="gradient" className="left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2" />
          <ul className="relative flex flex-col gap-3 py-2">
            {diagram.chips.map((c) => (
              <li key={c}>
                <GlassPanel tone="light" className="rounded-chip px-4 py-3 text-[15px] font-medium text-heading">
                  {c}
                </GlassPanel>
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className="flex items-center justify-center md:w-24">
          <div className="flex h-14 flex-col items-center md:h-auto md:w-full md:flex-row">
            <span className="h-full w-0 border-l-2 border-dashed border-slate md:h-0 md:w-full md:border-l-0 md:border-t-2" />
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-semibold leading-none text-white">x</span>
          </div>
        </div>
        <div className="rounded-card-s border border-hairline bg-frost px-5 py-4 text-center text-[15px] font-medium text-muted md:w-36">
          {diagram.external}
        </div>
      </div>
    </div>
  );
}
