import Link from "next/link";
import { Button } from "../ui/Button";
import { CategoryDot } from "../ui/CategoryDot";
import { Glow } from "../glass/Glow";
import { home } from "@/content/site";
import { modules } from "@/content/modules";

export function PlatformBoard() {
  const t = home.platformTeaser;
  return (
    <section className="on-dark section relative overflow-hidden bg-ink">
      <div className="frame grid items-center gap-14 lg:grid-cols-[5fr_7fr]">
        <div>
          <h2 className="sr">{t.title}</h2>
          <p className="body-lg sr mt-5 text-on-dark">{t.body}</p>
          <ul className="sr mt-8 space-y-3">
            {t.legend.map((l) => (
              <li key={l.category} className="flex items-start gap-3 text-[16px] text-on-dark">
                <CategoryDot category={l.category} className="mt-2" />
                <span>
                  <strong className="font-semibold text-white">{l.label}</strong>: {l.text}
                </span>
              </li>
            ))}
          </ul>
          <Button variant="primary" size="content" href="/platform" className="mt-10">
            {t.cta}
          </Button>
        </div>

        <div className="relative md:py-16">
          <Glow color="gradient" className="left-1/4 top-1/4 size-[60%]" parallax />
          <div className="relative md:[perspective:1600px]">
            <ul className="srt grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 md:[transform-style:preserve-3d] md:[transform:rotateX(46deg)_rotateZ(-22deg)]">
              {modules.map((m) => (
                <li key={m.slug} className="md:[transform-style:preserve-3d]">
                  <Link
                    href={`/platform?module=${m.slug}`}
                    className={`${m.category === "ai" ? "btn-primary" : "glass-dark"} block h-full min-h-[132px] rounded-card-s p-4 transition-transform duration-[600ms] [transition-timing-function:var(--ex-ease-soft)] md:min-h-[150px] md:hover:[transform:translateZ(34px)]`}
                  >
                    <CategoryDot category={m.category} />
                    <span className="mt-3 block font-display text-[16px] font-semibold text-white">{m.name}</span>
                    <span className="mt-1 block text-[13px] leading-snug text-on-dark">{m.menuBlurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
