import Image from "next/image";
import type { Resource } from "@/content/resources";
import { cn } from "../ui/cn";

/** Card/hero image. Items without a featured image get the sphere artwork from the design (decorative). */
export function ResourceArt({ image, seed = 0, className, sizes, priority }: { image: Resource["image"]; seed?: number; className?: string; sizes: string; priority?: boolean }) {
  return (
    <div aria-hidden={image ? undefined : true} className={cn("relative overflow-hidden bg-ink", className)}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={image.src.endsWith(".gif")}
          className="object-cover"
        />
      ) : (
        <>
          <span
            className="absolute rounded-full"
            style={{
              width: 190 + (seed % 5) * 20,
              height: 190 + (seed % 5) * 20,
              left: `${12 + (seed % 7) * 8}%`,
              top: `${-10 + (seed % 4) * 12}%`,
              background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.55), rgba(255,255,255,0) 24%), conic-gradient(from ${(seed * 67) % 360}deg, var(--ex-magenta), var(--ex-blue), var(--ex-green), var(--ex-blue), var(--ex-magenta))`,
            }}
          />
          <span className="glass-dark absolute rounded-full" style={{ width: 150, height: 150, left: `${30 + (seed % 5) * 9}%`, top: `${15 + (seed % 3) * 14}%` }} />
        </>
      )}
    </div>
  );
}
