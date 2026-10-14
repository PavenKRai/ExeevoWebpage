import Link from "next/link";
import { listHref } from "@/lib/resources";
import { cn } from "../ui/cn";

/** Topic filter as real links (?category=), so every filtered list is a crawlable, shareable URL. */
export function CategoryFilter({ basePath, categories, current, label = "Filter by topic" }: { basePath: string; categories: string[]; current?: string; label?: string }) {
  if (categories.length === 0) return null;
  const chip = "inline-flex h-11 items-center rounded-full border px-[18px] text-[14px] font-[550] transition-colors";
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {["All", ...categories].map((c) => {
          const on = c === "All" ? !current : current === c;
          return (
            <li key={c}>
              <Link
                href={listHref(basePath, { category: c === "All" ? undefined : c })}
                aria-current={on ? "true" : undefined}
                className={cn(chip, on ? "border-ink bg-ink text-white" : "border-slate/[.16] bg-white/55 text-body hover:bg-white/80")}
              >
                {c}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
