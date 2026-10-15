"use client";
import { features } from "@/content/askNova";
import { useNova } from "./NovaProvider";

/** The Ask-Nova Plus features as buttons: each scrolls to that feature in the list below and highlights it. */
export function PlusGrid() {
  const { openFeature } = useNova();
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {features
        .map((f, i) => ({ f, i }))
        .filter(({ f }) => f.tier === "plus")
        .map(({ f, i }) => (
          <li key={f.slug}>
            <button type="button" onClick={() => openFeature(i)} className="row flex min-h-11 w-full items-center gap-2.5 rounded-[14px] border border-hairline bg-white/60 px-3.5 py-3 text-left text-[14px] text-heading">
              <span className="num text-[12px] text-muted">{f.num}</span>
              {f.name}
            </button>
          </li>
        ))}
    </ul>
  );
}
