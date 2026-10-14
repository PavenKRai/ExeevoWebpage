import Image from "next/image";
import Link from "next/link";

const dims = {
  nav: { icon: 28, w: 95, h: 16 },
  footer: { icon: 28, w: 95, h: 16 },
} as const;

/** Brand lockup: icon plus slate wordmark (the new system is light everywhere; `tone` is kept for old call sites). */
export function Logo({ tone = "light", size = "nav" }: { tone?: "dark" | "light"; size?: keyof typeof dims }) {
  const d = dims[size];
  return (
    <Link href="/" aria-label="Exeevo home" className="inline-flex min-h-11 items-center gap-2.5">
      <Image src="/brand/exeevo-icon.png" alt="" width={64} height={64} priority={size === "nav"} style={{ width: d.icon, height: d.icon }} />
      <Image
        src={tone === "dark" ? "/brand/exeevo-wordmark-white.png" : "/brand/exeevo-wordmark-slate.png"}
        alt="Exeevo"
        width={d.w}
        height={d.h}
        priority={size === "nav"}
        style={{ width: d.w, height: d.h }}
      />
    </Link>
  );
}
