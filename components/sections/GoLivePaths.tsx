import { ArrowRight } from "lucide-react";
import { gettingStarted } from "@/content/paths";
import { GlassPanel } from "../glass/GlassPanel";
import { Chip } from "../ui/Chip";

type Path = (typeof gettingStarted.paths)[number];

function PathCard({ path, delay }: { path: Path; delay: "d1" | "d2" }) {
  return (
    <GlassPanel tone="light" className={`srg ${delay} flex flex-col gap-5 rounded-card p-8 md:p-10`}>
      <p className="text-[15px] font-semibold text-muted">{path.tag}</p>
      <h2 className="font-display text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.15] tracking-tight text-heading">{path.title}</h2>
      <p className="body-lg text-body">{path.body}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {path.chips.map((c) => (
          <li key={c}>
            <Chip>{c}</Chip>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}

export function GoLivePaths({ paths, connector }: { paths: readonly Path[]; connector: string }) {
  const [a, b] = paths;
  return (
    <div className="grid items-stretch gap-0 md:grid-cols-[1fr_minmax(200px,240px)_1fr]">
      <PathCard path={a} delay="d1" />
      <div aria-hidden="true" className="relative flex min-h-[120px] flex-col items-center justify-center md:min-h-0">
        <span className="ln ln-y absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-[image:var(--ex-gradient)] md:hidden" />
        <span className="ln absolute inset-x-0 top-1/2 hidden h-[3px] -translate-y-1/2 rounded-full bg-[image:var(--ex-gradient)] md:block" />
        <span className="glass-light relative z-10 mx-auto max-w-[150px] rounded-2xl px-4 py-1.5 text-center text-[13px] font-medium text-heading">{connector}</span>
        <span className="relative z-10 mt-3 flex size-11 items-center justify-center rounded-full bg-ink text-white md:absolute md:right-0 md:top-1/2 md:mt-0 md:-translate-y-1/2">
          <ArrowRight size={18} strokeWidth={1.8} className="rotate-90 md:rotate-0" />
        </span>
      </div>
      <PathCard path={b} delay="d2" />
    </div>
  );
}
