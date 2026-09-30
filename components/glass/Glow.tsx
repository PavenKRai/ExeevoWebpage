import type { CSSProperties } from "react";
import { cn } from "../ui/cn";

const colors = {
  magenta: "rgba(223,25,149,.55)",
  blue: "rgba(7,98,200,.55)",
  green: "rgba(0,195,137,.5)",
  purple: "rgba(110,91,216,.55)",
  gradient: "",
} as const;

export function Glow({
  color = "gradient",
  className,
  style,
  parallax = false,
}: {
  color?: keyof typeof colors;
  className?: string;
  style?: CSSProperties;
  parallax?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-[70px]", parallax && "px", className)}
      style={{ background: color === "gradient" ? "var(--ex-orb)" : colors[color], opacity: 0.5, ...style }}
    />
  );
}
