"use client";
import { features } from "@/content/askNova";
import { useNova } from "./NovaProvider";

/** The nine Ask-Nova Plus features as buttons: each opens that feature in the carousel above. */
export function PlusGrid() {
  const { openFeature } = useNova();
  return (
    <ul className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {features
        .map((f, i) => ({ f, i }))
        .filter(({ f }) => f.tier === "plus")
        .map(({ f, i }) => (
          <li key={f.slug}>
            <button type="button" onClick={() => openFeature(i)} className="glass-dark lift flex h-[78px] w-full flex-col justify-between rounded-[18px] px-4 py-3 text-left text-white">
              <span className="font-display text-[13px] text-on-dark-muted">{f.num}</span>
              <span className="text-[16px] font-semibold tracking-[-0.01em]">{f.name}</span>
            </button>
          </li>
        ))}
    </ul>
  );
}
