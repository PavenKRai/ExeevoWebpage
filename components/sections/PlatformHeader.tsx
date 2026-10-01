export function PlatformHeader({ label, title, intro }: { label: string; title: string; intro: string }) {
  return (
    <header className="relative pb-12 pt-[128px] lg:pb-[70px] xl:h-[360px] xl:pt-[166px]">
      <div className="frame grid gap-8 lg:flex lg:items-end lg:justify-between">
        <div className="flex flex-col gap-[18px]">
          <p className="rise text-[15px] text-muted" style={{ ["--i" as string]: 0 }}>
            {label}
          </p>
          <h1
            className="rise text-[clamp(38px,4.17vw,60px)] font-semibold leading-[1.04] tracking-[-0.035em] text-heading lg:whitespace-nowrap"
            style={{ ["--i" as string]: 1 }}
          >
            {title}
          </h1>
        </div>
        <p className="rise max-w-[430px] text-[18px] font-[350] leading-[1.55] text-muted" style={{ ["--i" as string]: 2 }}>
          {intro}
        </p>
      </div>
    </header>
  );
}
