import type { CSSProperties } from "react";
import { about } from "@/content/about";

/** "Our values": three cards, each with a gradient dot in its own colour. */
export function ValuesSection() {
  const v = about.values;
  return (
    <section aria-labelledby="values-title" className="overflow-x-clip bg-white py-20 lg:py-[120px]">
      <div className="frame flex flex-col gap-12">
        <h2 id="values-title" className="h2 sr max-w-[760px]">{v.parts.light} <b>{v.parts.bold}</b></h2>
        <ul className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {v.items.map((it) => (
            <li key={it.title} className="card lift sr flex flex-col gap-3.5 p-[30px]">
              <span aria-hidden="true" className="dot !size-3" style={{ "--c": it.dot } as CSSProperties} />
              <h3 className="mt-[18px] text-[26px] font-[350] leading-[1.15] tracking-[-0.025em] text-heading lg:min-h-[60px]">{it.title}</h3>
              <p className="body-text">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
