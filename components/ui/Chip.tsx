import type { ReactNode } from "react";
import { Orb } from "../glass/Orb";
import { cn } from "./cn";

type Props = { variant?: "hero" | "attribute" | "label"; children: ReactNode; className?: string };

/** Pills. hero: glass chip with the orb; attribute: hairline outline; label: small glass tag. */
export function Chip({ variant = "attribute", children, className }: Props) {
  if (variant === "hero")
    return (
      <span className={cn("glass inline-flex items-center gap-3 rounded-full py-1.5 pl-2 pr-5 text-[14px] font-normal text-heading", className)}>
        <Orb size={20} />
        {children}
      </span>
    );
  if (variant === "label") return <span className={cn("glass inline-flex rounded-full px-4 py-1.5 text-[13px] font-medium", className)}>{children}</span>;
  return <span className={cn("inline-flex h-[34px] items-center rounded-full border border-hairline bg-white px-4 text-[14px] font-normal text-body", className)}>{children}</span>;
}
