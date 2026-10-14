import Link from "next/link";
import { listHref } from "@/lib/resources";
import { cn } from "../ui/cn";

/** Numbered pagination as links (?page=). Renders nothing for a single page. */
export function Pagination({ basePath, page, pages, category }: { basePath: string; page: number; pages: number; category?: string }) {
  if (pages <= 1) return null;
  const item = "inline-flex h-11 min-w-11 items-center justify-center rounded-[14px] px-3 text-[15px] font-[550]";
  const nums = Array.from({ length: pages }, (_, n) => n + 1).filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 1);
  return (
    <nav aria-label="Pagination" className="mt-12 flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-1.5">
        {page > 1 && (
          <li>
            <Link rel="prev" href={listHref(basePath, { category, page: page - 1 })} className={cn(item, "glass-light")}>Previous</Link>
          </li>
        )}
        {nums.map((n, idx) => (
          <li key={n} className="flex items-center gap-1.5">
            {idx > 0 && n - nums[idx - 1] > 1 && <span aria-hidden="true" className="text-muted">…</span>}
            <Link
              href={listHref(basePath, { category, page: n })}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
              className={cn(item, n === page ? "bg-ink text-white" : "glass-light")}
            >
              {n}
            </Link>
          </li>
        ))}
        {page < pages && (
          <li>
            <Link rel="next" href={listHref(basePath, { category, page: page + 1 })} className={cn(item, "glass-light")}>Next</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
