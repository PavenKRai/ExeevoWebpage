import type { Phase } from "@/content/services";

/** Phase accents: gradient dot class, glow colour (for the aura behind glass) and the check colour on light grounds. */
export const phaseStyle: Record<Phase["color"], { dot: string; glow: string; check: string }> = {
  magenta: { dot: "dot-medical", glow: "#DF1995", check: "text-[#B0127A]" },
  blue: { dot: "dot-commercial", glow: "#0762C8", check: "text-brand-blue" },
  green: { dot: "dot-platform", glow: "#00C389", check: "text-green-ink" },
};
