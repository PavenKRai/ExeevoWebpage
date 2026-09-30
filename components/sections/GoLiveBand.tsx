import { Button } from "../ui/Button";
import { GlassPanel } from "../glass/GlassPanel";
import { Glow } from "../glass/Glow";
import { home, site } from "@/content/site";
import { gettingStarted } from "@/content/paths";

export function GoLiveBand() {
  const g = home.goLive;
  return (
    <section className="on-dark section relative overflow-hidden bg-ink">
      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="sr">{g.title}</h2>
            <p className="body-lg sr mt-4 text-on-dark">{g.body}</p>
          </div>
          <Button variant="primary" size="content" href={site.demoHref}>
            {g.cta}
          </Button>
        </div>

        <div className="relative mt-14 grid items-center md:grid-cols-[1fr_minmax(120px,0.4fr)_1fr]">
          <Glow color="gradient" className="left-1/3 top-0 size-64" parallax />
          {gettingStarted.paths.map((p, i) => (
            <GlassPanel
              key={p.slug}
              tone="dark"
              className={`relative rounded-panel p-7 md:p-9 ${i === 0 ? "srl md:col-start-1" : "srr md:col-start-3"} md:row-start-1`}
            >
              <p className="text-[14px] font-semibold text-link-on-dark">{p.tag}</p>
              <h3 className="mt-3">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-on-dark">{p.body}</p>
            </GlassPanel>
          ))}
          <div className="relative order-none flex h-24 items-center justify-center md:col-start-2 md:row-start-1 md:h-auto">
            <span aria-hidden="true" className="ln hidden h-0.5 w-full bg-[image:var(--ex-gradient)] md:block" />
            <span aria-hidden="true" className="ln-y h-full w-0.5 bg-[image:var(--ex-gradient)] md:hidden" />
            <GlassPanel tone="dark" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium">
              {g.connector}
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
