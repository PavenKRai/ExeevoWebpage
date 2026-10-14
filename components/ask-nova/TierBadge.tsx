import { Check } from "lucide-react";
import { askNova, type Tier } from "@/content/askNova";
import { cn } from "@/components/ui/cn";

/** "Included" (green tint), "Ask-Nova Plus" (white pill with the gradient dot) or the dashed "[Tier to confirm]" placeholder. */
export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  const base = "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-[5px] text-[13.5px] font-[450]";
  const text = askNova.tiers[tier];
  if (tier === "inc")
    return (
      <span className={cn(base, "gap-1.5 bg-[#E3F7EF] text-[#006B4B]", className)}>
        <Check aria-hidden="true" size={12} strokeWidth={2} />
        {text}
      </span>
    );
  if (tier === "plus")
    return (
      <span className={cn(base, "gap-[7px] border border-hairline bg-white text-heading", className)}>
        <span aria-hidden="true" className="dot dot-ai" />
        {text}
      </span>
    );
  return <span className={cn(base, "border border-dashed border-[#9AA7AF] text-muted", className)}>{text}</span>;
}
