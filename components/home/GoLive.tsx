import { Button } from "@/components/ui/Button";
import { home } from "@/content/home";
import { gettingStarted } from "@/content/services";
import { site } from "@/content/site";

/** "Two paths to go live": Core and Enterprise as glass cards (the first two chips, as in the design). */
export function GoLive() {
  const g = home.goLive;
  return (
    <section
      aria-labelledby="golive-title"
      className="relative overflow-hidden bg-porcelain pb-24 pt-20 lg:pb-[140px] lg:pt-[120px]"
    >
      <div
        className="aura left-[30%] top-[46%] h-[420px] w-[640px] bg-brand-blue opacity-[.12] max-lg:hidden"
        aria-hidden="true"
      />
      <div className="hm-wrap flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="sr flex max-w-[760px] flex-col gap-5">
            <h2 id="golive-title" className="h2">
              {g.h2.light} <b>{g.h2.bold}</b>
            </h2>
            <p className="hm-lead max-w-[640px]">{g.body}</p>
          </div>
          <Button href={site.demoHref} className="sr">
            {g.cta}
          </Button>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {gettingStarted.paths.map((p) => (
            <li
              key={p.slug}
              className="glass srg flex min-h-[300px] flex-col gap-[18px] rounded-[28px] p-8 lg:p-9"
            >
              <p className="label">{p.tag}</p>
              <h3 className="text-[clamp(26px,2.4vw,32px)] font-[350] leading-[1.1] tracking-[-0.03em] text-heading">
                {p.title}
              </h3>
              <p className="body-text !text-[16px]">{p.body}</p>
              <ul className="mt-auto flex flex-wrap gap-2">
                {p.chips.slice(0, 2).map((c) => (
                  <li
                    key={c}
                    className="label rounded-full border border-hairline bg-white px-3 py-2 !text-body"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
