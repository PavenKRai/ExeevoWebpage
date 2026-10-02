import { Layer } from "@/components/scene/Layer";

/** Full header at rest; while the explorer is pinned the title and intro shrink up to make room for the columns. */
export function PlatformHeader({ label, title, intro }: { label: string; title: string; intro: string }) {
  return (
    <header className="relative pb-12 pt-[128px] lg:pb-[70px] xl:h-[360px] xl:pt-[166px]">
      <div className="frame grid gap-8 lg:flex lg:items-end lg:justify-between">
        <Layer to={{ s: 0.52, y: -60 }} range={[0, 0.7]} className="flex origin-top-left flex-col gap-[18px]">
          <Layer to={{ o: 0 }} range={[0, 0.4]}>
            <p className="rise text-[15px] text-muted" style={{ ["--i" as string]: 0 }}>
              {label}
            </p>
          </Layer>
          <h1
            className="rise text-[clamp(38px,4.17vw,60px)] font-semibold leading-[1.04] tracking-[-0.035em] text-heading lg:whitespace-nowrap"
            style={{ ["--i" as string]: 1 }}
          >
            {title}
          </h1>
        </Layer>
        <Layer to={{ s: 0.78, y: -78 }} range={[0, 0.7]} className="origin-top-right">
          <p className="rise max-w-[430px] text-[18px] font-[350] leading-[1.55] text-muted" style={{ ["--i" as string]: 2 }}>
            {intro}
          </p>
        </Layer>
      </div>
    </header>
  );
}
