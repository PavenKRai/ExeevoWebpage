import { Check } from "lucide-react";
import { askNova, type Tier } from "@/content/askNova";
import { cn } from "@/components/ui/cn";

/** "Included" / "Ask-Nova Plus" / "[Tier to confirm]" badge, for light or dark grounds. */
export function TierBadge({ tier, onDark = false, size = "md", className }: { tier: Tier; onDark?: boolean; size?: "sm" | "md"; className?: string }) {
  const base = cn("flex items-center whitespace-nowrap rounded-full font-semibold", size === "md" ? "h-[30px] px-[13px] text-[13px]" : "h-7 px-3 text-[12.5px]", className);
  const text = askNova.tiers[tier];
  if (tier === "inc")
    return (
      <span className={cn(base, "gap-[7px]", onDark ? "bg-white text-ink" : "bg-ink text-white")}>
        <Check aria-hidden="true" size={13} strokeWidth={2.2} />
        {text}
      </span>
    );
  if (tier === "plus") return <span className={cn(base, onDark ? "nova-ring text-white" : "nova-ring-light text-heading")}>{text}</span>;
  return <span className={cn(base, "border border-dashed font-medium", onDark ? "border-white/40 text-[#DCE3E7]" : "border-slate/40 text-body")}>{text}</span>;
}
