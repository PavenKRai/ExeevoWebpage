import type { CSSProperties } from "react";
import { cn } from "../ui/cn";

export function Orb({ size = 48, className, spin = true }: { size?: number | string; className?: string; spin?: boolean }) {
  return (
    <span
      aria-hidden="true"
      data-orb
      className={cn("orb-fixed inline-block shrink-0", className)}
      style={{ width: size, height: size, ...(spin ? {} : ({ "--no-spin": 1 } as CSSProperties)) }}
    />
  );
}
