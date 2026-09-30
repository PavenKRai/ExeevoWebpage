import Link from "next/link";
import { Orb } from "../glass/Orb";

/** Placeholder lockup until the brand PNG/SVG files are dropped into public/brand. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" aria-label="Exeevo home" className="inline-flex min-h-11 items-center gap-2.5">
      <Orb size={30} />
      <span className={`font-display text-[22px] font-semibold tracking-[-0.03em] ${tone === "dark" ? "text-white" : "text-heading"}`}>
        Exeevo
      </span>
    </Link>
  );
}
