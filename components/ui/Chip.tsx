import type { ReactNode } from "react";
import { Orb } from "../glass/Orb";
import { cn } from "./cn";

type Props = { variant?: "hero" | "attribute" | "label"; children: ReactNode; className?: string };

export function Chip({ variant = "attribute", children, className }: Props) {
  if (variant === "hero")
    return (
      <span className={cn("glass-dark inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-[15px] font-medium", className)}>
        <Orb size={22} />
        {children}
      </span>
    );
  if (variant === "label")
    return (
      <span className={cn("glass-dark inline-flex rounded-full px-4 py-1.5 text-[13px] font-medium", className)}>{children}</span>
    );
  return (
    <span className={cn("inline-flex h-[34px] items-center rounded-full border border-slate/20 px-4 text-[14px] font-medium", className)}>
      {children}
    </span>
  );
}
