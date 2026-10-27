import Image from "next/image";
import type { Resource } from "@/content/resources";
import { cn } from "../ui/cn";

/** Card and hero image. Items without a featured image get the design's two-glow artwork (decorative, no text). */
export function ResourceArt({ image, art = ["#0762C8", "#7A3FC0"], className, sizes, priority }: { image: Resource["image"]; art?: [string, string]; className?: string; sizes: string; priority?: boolean }) {
  return (
    <div
      aria-hidden={image ? undefined : true}
      className={cn("relative overflow-hidden", className)}
      style={image ? undefined : { background: `radial-gradient(70% 80% at 20% 20%,${art[0]}cc,transparent 70%),radial-gradient(70% 80% at 85% 85%,${art[1]}bb,transparent 70%),linear-gradient(135deg,#2A343B,#1D262D)` }}
    >
      {image && <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} unoptimized={image.src.endsWith(".gif")} className="object-cover" />}
    </div>
  );
}
