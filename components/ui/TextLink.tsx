import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "./cn";

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const cls = cn(
    "inline-flex min-h-11 items-center font-semibold underline decoration-brand-blue decoration-2 underline-offset-[3px]",
    className,
  );
  if (href.startsWith("[")) return <span className={cls}>{children}</span>;
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
