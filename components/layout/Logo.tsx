import Image from "next/image";
import Link from "next/link";

const dims = {
  nav: { icon: 32, w: 101, h: 17 },
  footer: { icon: 34, w: 107, h: 18 },
} as const;

/** Brand lockup: icon plus wordmark (white on dark grounds, slate on light). */
export function Logo({ tone = "dark", size = "nav" }: { tone?: "dark" | "light"; size?: keyof typeof dims }) {
  const d = dims[size];
  return (
    <Link href="/" aria-label="Exeevo home" className="inline-flex min-h-11 items-center gap-[11px]">
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
