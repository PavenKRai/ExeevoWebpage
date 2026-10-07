"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "../ui/cn";

type Term = { slug: string; title: string; summary: string };
const LETTERS = ["#", ...Array.from({ length: 26 }, (_, n) => String.fromCharCode(65 + n))];
const letterOf = (t: string) => {
  const c = t.trim().charAt(0).toUpperCase();
  return c >= "A" && c <= "Z" ? c : "#";
};

/** Every term is in the server HTML; search and the A-Z buttons only hide what does not match. */
export function GlossaryIndex({ terms }: { terms: Term[] }) {
  const [q, setQ] = useState("");
  const [letter, setLetter] = useState<string | null>(null);
  const present = useMemo(() => new Set(terms.map((t) => letterOf(t.title))), [terms]);
  const needle = q.trim().toLowerCase();
  const hits = terms.filter((t) => (!needle || `${t.title} ${t.summary}`.toLowerCase().includes(needle)) && (!letter || letterOf(t.title) === letter));
  const groups = LETTERS.map((L) => ({ L, items: hits.filter((t) => letterOf(t.title) === L) })).filter((g) => g.items.length);
  const chip = "inline-flex h-11 min-w-11 items-center justify-center rounded-[14px] px-3 text-[15px] font-[550] disabled:opacity-30";
  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="glass-light flex flex-col gap-5 rounded-[28px] p-5 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-[420px]">
            <label htmlFor="glossary-search" className="sr-only">Search terms</label>
            <Search aria-hidden="true" size={18} strokeWidth={1.8} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="glossary-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search terms"
              className="h-12 w-full rounded-[14px] border border-slate/[.16] bg-white/70 pl-11 pr-4 text-[15px]"
            />
          </div>
          <p role="status" className="text-[14px] text-muted">{hits.length} {hits.length === 1 ? "term" : "terms"}</p>
        </div>
        <div role="group" aria-label="Filter by letter" className="flex flex-wrap gap-1">
          <button type="button" aria-pressed={!letter} onClick={() => setLetter(null)} className={cn(chip, !letter ? "bg-ink text-white" : "text-body")}>All</button>
          {LETTERS.filter((L) => present.has(L)).map((L) => (
            <button key={L} type="button" aria-pressed={letter === L} onClick={() => setLetter(letter === L ? null : L)} className={cn(chip, letter === L ? "bg-ink text-white" : "text-body")}>{L}</button>
          ))}
        </div>
      </div>
      {groups.length === 0 ? (
        <p role="status" className="text-[16px] text-muted">No terms match “{q}”. Try a shorter search or pick a letter.</p>
      ) : (
        groups.map((g) => (
          <section key={g.L} aria-labelledby={`g-${g.L === "#" ? "num" : g.L}`}>
            <h2 id={`g-${g.L === "#" ? "num" : g.L}`} className="text-[32px] leading-[1.1]">{g.L}</h2>
            <dl className="mt-4 grid gap-4 md:grid-cols-2">
              {g.items.map((t) => (
                <div key={t.slug} className="glass-light lift relative rounded-[24px] p-6">
                  <dt className="font-display text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-heading">
                    <Link href={`/glossary/${t.slug}`} className="after:absolute after:inset-0 after:rounded-[24px]">{t.title}</Link>
                  </dt>
                  <dd className="mt-2 line-clamp-4 text-[15px] leading-[1.55] text-muted">{t.summary}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))
      )}
    </div>
  );
}
