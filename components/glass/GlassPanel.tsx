import type { ElementType, ReactNode, CSSProperties } from "react";
import { cn } from "../ui/cn";

type Props = {
  tone: "dark" | "light";
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function GlassPanel({ tone, as: Tag = "div", className, style, children }: Props) {
  return (
    <Tag className={cn(tone === "dark" ? "glass-dark" : "glass-light", className)} style={style}>
      {children}
    </Tag>
  );
}
