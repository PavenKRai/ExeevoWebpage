import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "text";
type Size = "hero" | "content" | "nav";

const sizes: Record<Size, string> = {
  hero: "min-h-14 px-7 text-[16px]",
  content: "min-h-[52px] px-6 text-[15px]",
  nav: "min-h-12 px-5 text-[15px]",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant = "primary", size = "content", href, className, children, ...rest }: Props) {
  const base =
    variant === "primary"
      ? cn("btn-primary inline-flex items-center justify-center gap-2 rounded-btn font-semibold", sizes[size])
      : variant === "secondary"
        ? cn("glass-dark inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-6 font-semibold", "min-h-14")
        : "inline-flex min-h-11 items-center font-semibold underline decoration-brand-blue decoration-2 underline-offset-[3px]";
  const cls = cn(base, className);
  if (href) {
    const external = href.startsWith("[");
    return external ? (
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
