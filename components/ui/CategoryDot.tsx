import type { Category } from "@/content/modules";
import { cn } from "./cn";

const cls: Record<Category, string> = {
  commercial: "dot dot-commercial",
  medical: "dot dot-medical",
  platform: "dot dot-platform",
  ai: "dot dot-ai",
};

/** Gradient dot (no ring): use only where the colour carries meaning (category, phase, stage). */
export function CategoryDot({ category, className }: { category: Category; className?: string }) {
  return <span aria-hidden="true" className={cn(cls[category], className)} />;
}
