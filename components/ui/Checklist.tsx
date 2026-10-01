import { Check } from "lucide-react";
import { cn } from "./cn";

type Item = { title: string; body?: string };

export function Checklist({ items, tone = "light", className }: { items: Item[]; tone?: "light" | "dark"; className?: string }) {
  return (
    <ul className={cn("stagger grid gap-4", className)}>
      {items.map((it) => (
        <li key={it.title} className="flex gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-[9px]",
              tone === "light" ? "bg-ink text-white" : "bg-white text-ink",
            )}
          >
            <Check size={16} strokeWidth={1.8} />
          </span>
          <span>
            <span className={cn("block font-semibold", tone === "light" ? "text-heading" : "text-white")}>{it.title}</span>
            {it.body && <span className={cn("block", tone === "light" ? "text-muted" : "text-on-dark")}>{it.body}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
