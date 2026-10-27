import type { PartnerCategory } from "@/content/partners";

/** Gradient-dot colour (set as --c) for each partner type. */
export const catColor: Record<PartnerCategory, string> = {
  tech: "var(--ex-blue)",
  impl: "var(--ex-magenta)",
  sol: "var(--ex-violet)",
  data: "var(--ex-green)",
  comp: "var(--ex-muted)",
};
