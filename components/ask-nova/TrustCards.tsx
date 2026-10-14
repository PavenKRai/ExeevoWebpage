import { askNova } from "@/content/askNova";

/** Trust: four ruled items. (Numbered 01-04 as in the design.) */
export function TrustCards() {
  const t = askNova.trust;
  return (
    <section aria-labelledby="trust-title" className="bg-porcelain py-20 lg:py-[120px]">
      <div className="frame flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="trust-title" className="h2 sr max-w-[760px]">{t.parts.light} <b>{t.parts.bold}</b></h2>
          <p className="lead sr max-w-[360px]">{t.lead}</p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.cards.map((c, n) => (
            <li key={c.title} className="sr flex flex-col gap-3 border-t border-[#C3CDD3] pr-6 pt-[26px]">
              <span className="num text-[13px] text-brand-blue">{String(n + 1).padStart(2, "0")}</span>
              <h3 className="text-[19px] font-[450] leading-[1.3] tracking-[-0.01em] text-heading">{c.title}</h3>
              <p className="body-text">{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
