import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import { Layer } from "@/components/scene/Layer";
import { gettingStarted } from "@/content/paths";
import "./scene-choreo.css";

type Path = (typeof gettingStarted.paths)[number];

function PathCard({ path, side }: { path: Path; side: "left" | "right" }) {
  const dir = side === "left" ? -1 : 1;
  return (
    <Layer
      intro={side === "left" ? 0.25 : 0.35}
      from={{ o: 0, x: dir * 60, s: 0.96 }}
      className="glass-light lift flex flex-col justify-between gap-8 rounded-[32px] p-8 lg:h-[330px] lg:p-[38px] pinned:h-auto pinned:gap-6 pinned:p-7 pinned:lg:p-[34px]"
    >
      <div className="flex flex-col gap-3.5">
        <p className="text-[14px] font-medium leading-[1.2] text-muted">{path.tag}</p>
        <h2 className="text-[clamp(26px,2.4vw,32px)] leading-[1.1] tracking-[-0.025em]">{path.title}</h2>
        <p className="max-w-[500px] text-[16px] leading-[1.55] text-muted">{path.body}</p>
      </div>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {path.chips.map((c, i) => (
          <Layer
            key={c}
            as="li"
            intro={0.7 + (side === "left" ? 0 : 0.05) + i * 0.06}
            from={{ o: 0, y: 12, s: 0.92 }}
            className="flex h-[34px] items-center rounded-[17px] border border-slate/[0.18] px-3.5 text-[13px] text-slate"
          >
            {c}
          </Layer>
        ))}
      </ul>
    </Layer>
  );
}

export function GoLivePaths({ paths, connector }: { paths: readonly Path[]; connector: string }) {
  const [a, b] = paths;
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_80px_1fr] pinned:md:grid pinned:md:grid-cols-[1fr_56px_1fr] pinned:lg:grid-cols-[1fr_80px_1fr]">
      <PathCard path={a} side="left" />
      <div className="relative h-20 lg:h-auto pinned:md:h-auto">
        <span className="ln ln-y absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-[image:linear-gradient(180deg,var(--ex-magenta),var(--ex-blue),var(--ex-green))] lg:hidden pinned:md:hidden" aria-hidden="true" />
        <span className="cz-linex absolute inset-x-0 top-1/2 -mt-px hidden h-0.5 bg-[image:linear-gradient(90deg,var(--ex-magenta),var(--ex-blue),var(--ex-green))] lg:block pinned:md:block" aria-hidden="true" />
        <span aria-hidden="true" className="cz-dot absolute inset-0 flex items-center justify-center" style={{ "--dx": "-44px" } as CSSProperties}>
          <span className="flex size-7 rotate-90 items-center justify-center rounded-full bg-ink text-white lg:rotate-0 pinned:md:rotate-0">
            <ChevronRight size={14} strokeWidth={2.4} />
          </span>
        </span>
        <span className="sr-only">{connector}</span>
      </div>
      <PathCard path={b} side="right" />
    </div>
  );
}
