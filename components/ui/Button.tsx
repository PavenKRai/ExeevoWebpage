import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "text";
type Size = "hero" | "content" | "nav";

const sizes: Record<Size, string> = {
  hero: "btn-lg",
  content: "",
  nav: "btn-sm",
};

type Props = {
  /** primary = ink pill (one per view), secondary = glass pill, text = blue text link. */
  variant?: Variant;
  size?: Size;
  /** Kept for backwards compatibility with older call sites; the ink pill is always solid now. */
  solid?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant = "primary", size = "content", solid = false, href, className, children, ...rest }: Props) {
  void solid;
  const base = variant === "text" ? "tlink" : cn("btn", variant === "primary" ? "btn-ink" : "btn-glass", sizes[size]);
  const cls = cn(base, className);
  if (href) {
    const placeholder = href.startsWith("[");
    return placeholder ? (
      <span className={cls} title="Placeholder link">
        {children}
      </span>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
