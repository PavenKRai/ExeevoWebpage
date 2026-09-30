import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

type Props = { label: string; children: ReactNode } & Omit<ComponentProps<"button">, "children" | "aria-label">;

export function IconButton({ label, children, className, ...rest }: Props) {
  return (
    <button
      aria-label={label}
      className={cn("btn-primary inline-flex size-[52px] items-center justify-center rounded-btn disabled:opacity-40", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
