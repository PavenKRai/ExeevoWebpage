import type { Category } from "@/content/modules";
import { cn } from "./cn";

const bg: Record<Category, string> = {
  commercial: "bg-brand-blue",
  medical: "bg-magenta",
  platform: "bg-brand-green",
  ai: "bg-[image:var(--ex-gradient)]",
};

export function CategoryDot({ category, className }: { category: Category; className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block size-2.5 shrink-0 rounded-full", bg[category], className)} />;
}
