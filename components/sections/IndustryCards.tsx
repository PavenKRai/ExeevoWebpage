import { Layer } from "@/components/scene/Layer";
import { TextLink } from "@/components/ui/TextLink";

const dots = ["var(--ex-blue)", "var(--ex-magenta)", "var(--ex-blue)", "var(--ex-green)"];

/** Four cards; they rise in one after another on load (time-based, so they are in place at scroll 0). */
export function IndustryCards({ cards }: { cards: readonly { title: string; body: string; link: { label: string; href: string } }[] }) {
  return (
    <ul className="mx-auto grid w-full max-w-[1440px] gap-6 px-5 md:grid-cols-2 pinned:mt-auto pinned:gap-4 pinned:lg:grid-cols-4 xl:px-20 pinned:xl:gap-5" style={{ perspective: "1400px" }}>
      {cards.map((c, i) => (
        <Layer
          key={c.title}
          as="li"
          intro={0.3 + i * 0.1}
          from={{ o: 0, y: 60, s: 0.95 }}
          className="glass-light lift flex min-h-[200px] flex-col justify-between gap-6 rounded-card p-8 pinned:min-h-0 pinned:gap-4 pinned:p-6 pinned:xl:p-7"
        >
          <h2 className="flex items-center gap-3 font-sans text-[24px] font-semibold leading-tight tracking-[-0.02em] pinned:text-[21px]">
            <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ background: dots[i] }} />
            {c.title}
          </h2>
          <p className="max-w-[520px] text-[16px] leading-[1.55] text-muted pinned:text-[15px]">{c.body}</p>
          <TextLink href={c.link.href} className="text-[15px] pinned:min-h-9">{c.link.label}</TextLink>
        </Layer>
      ))}
    </ul>
  );
}
