import Link from "next/link";
import { listHref } from "@/lib/resources";
import { cn } from "../ui/cn";

/** "N items" and the topic filter as real links (?category=), so every filtered list is a crawlable, shareable URL. Topics come from the items. */
export function TopicChips({ basePath, categories, current, total }: { basePath: string; categories: string[]; current?: string; total: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-[14px] text-muted" aria-live="polite">{total} {total === 1 ? "item" : "items"}</p>
      {categories.length > 0 && (
        <nav aria-label="Filter by topic">
          <ul className="flex flex-wrap gap-1.5">
            {["All", ...categories].map((c) => {
              const on = c === "All" ? !current : current === c;
              return (
                <li key={c}>
                  <Link
                    href={listHref(basePath, { category: c === "All" ? undefined : c })}
                    aria-current={on ? "true" : undefined}
                    className={cn("inline-flex h-11 items-center rounded-full border px-[13px] text-[12.5px]", on ? "border-heading bg-heading text-white" : "border-[#D9E0E5] bg-white text-heading")}
                  >
                    {c === "All" ? "All topics" : c}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
