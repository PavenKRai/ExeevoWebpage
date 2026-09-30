export function PlatformHeader({ label, title, intro }: { label: string; title: string; intro: string }) {
  return (
    <header className="lab-grid relative pb-12 pt-[140px] lg:pb-16">
      <div className="frame grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <p className="rise mb-4 font-semibold text-muted" style={{ ["--i" as string]: 0 }}>
            {label}
          </p>
          <h1 className="rise text-[clamp(40px,6vw,76px)] leading-[1.02] tracking-[-0.03em] text-heading" style={{ ["--i" as string]: 1 }}>
            {title}
          </h1>
        </div>
        <p className="rise lead text-muted" style={{ ["--i" as string]: 2 }}>
          {intro}
        </p>
      </div>
    </header>
  );
}
