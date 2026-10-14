import type { CSSProperties } from "react";
import { about } from "@/content/about";

/** "Our story": sticky heading on the left, dated timeline on the right with a gradient spine. */
export function StoryTimeline() {
  const s = about.story;
  return (
    <section aria-labelledby="story-title" className="overflow-x-clip bg-mist px-0 pb-10 pt-20 lg:pt-[120px]">
      <div className="frame grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <div className="srl flex flex-col gap-4 lg:sticky lg:top-[120px]">
            <p className="text-[15px] text-muted">{s.label}</p>
            <h2 id="story-title" className="text-[clamp(32px,3.4vw,46px)] leading-[1.06] tracking-[-0.03em]">{s.title}</h2>
          </div>
        </div>
        <ol className="relative lg:col-span-7 lg:col-start-6 lg:pt-2">
          <span aria-hidden="true" className="ln-y absolute bottom-2.5 left-[6px] top-2.5 w-0.5 bg-[linear-gradient(180deg,var(--ex-magenta),var(--ex-purple),var(--ex-blue),var(--ex-green))] lg:left-[150px]" />
          {s.items.map((it) => (
            <li key={it.when} className="sr relative grid gap-2 pb-11 pl-8 lg:grid-cols-[150px_1fr] lg:gap-x-11 lg:pl-0">
              <span className="font-display text-[22px] font-semibold tracking-[-0.02em] text-heading lg:pt-0.5">{it.when}</span>
              <span aria-hidden="true" className="absolute left-0 top-2 size-3.5 rounded-full shadow-[0_0_0_5px_var(--ex-mist),0_0_0_6px_var(--dot)] lg:left-[144px]" style={{ background: it.dot, "--dot": it.dot } as CSSProperties} />
              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-[19px] font-semibold tracking-normal text-heading">{it.title}</h3>
                <p className="max-w-[640px] text-[16px] leading-[1.65] text-muted">{it.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
