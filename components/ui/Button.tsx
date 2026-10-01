import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "text";
type Size = "hero" | "content" | "nav";

const sizes: Record<Size, string> = {
  hero: "h-14 min-h-14 rounded-[17px] px-7 text-[16px]",
  content: "h-[52px] min-h-[52px] rounded-[16px] px-6 text-[15px]",
  nav: "h-12 min-h-12 rounded-[15px] px-[22px] text-[15px]",
};

type Props = {
  variant?: Variant;
  size?: Size;
  /** Primary only: solid ink fill with a 2px ring (nav on light pages). */
  solid?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant = "primary", size = "content", solid = false, href, className, children, ...rest }: Props) {
  const base =
    variant === "primary"
      ? cn("btn-primary inline-flex items-center whitespace-nowrap justify-center gap-2.5 font-semibold leading-[normal]", solid && "btn-primary-solid", sizes[size])
      : variant === "secondary"
        ? cn("glass-dark nav-link nav-link-dark inline-flex h-14 items-center gap-3 leading-[normal] rounded-[17px] pl-2.5 pr-[22px] text-[16px] font-[450]")
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
