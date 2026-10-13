import type { Phase } from "@/content/services";

/** Phase accents: dot/fill colour, text colour on dark ink, and glow colour. */
export const phaseStyle: Record<Phase["color"], { dot: string; textOnDark: string; glow: "magenta" | "blue" | "green" }> = {
  magenta: { dot: "bg-magenta", textOnDark: "text-magenta-on-dark", glow: "magenta" },
  blue: { dot: "bg-brand-blue", textOnDark: "text-link-on-dark", glow: "blue" },
  green: { dot: "bg-brand-green", textOnDark: "text-brand-green", glow: "green" },
};
