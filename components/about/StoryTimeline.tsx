import type { CSSProperties } from "react";
import { about } from "@/content/about";

/** "Our story": four dated steps on a gradient connector line (vertical on small screens). */
export function StoryTimeline() {
  const s = about.story;
  return (
    <section aria-labelledby="story-title" className="overflow-x-clip bg-white py-20 lg:py-[120px]">
      <div className="frame flex flex-col gap-14">
        <h2 id="story-title" className="h2 sr max-w-[820px]">{s.parts.light} <b>{s.parts.bold}</b></h2>
        <div className="relative">
          <span aria-hidden="true" className="ln absolute left-1.5 right-0 top-[42px] h-px [background-image:var(--ex-gradient)] max-sm:hidden" />
          <ol className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {s.items.map((it) => (
              <li key={it.when} className="sr flex flex-col gap-3.5 pr-3">
                <span className="h-[22px] text-[15px] font-medium leading-[22px] tracking-[-0.005em] text-heading">{it.when}</span>
                <span aria-hidden="true" className="size-[13px] rounded-full border-[3px] bg-white shadow-[0_0_0_5px_#fff]" style={{ borderColor: it.dot } as CSSProperties} />
                <h3 className="text-[20px] font-[450] leading-[1.25] tracking-[-0.015em] text-heading">{it.title}</h3>
                <p className="body-text">{it.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
