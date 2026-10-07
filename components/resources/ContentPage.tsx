import type { CSSProperties } from "react";
import { getPage, pagePaths, type PageKey } from "@/content/pages";
import { formatDate } from "@/lib/resources";
import { ArticleBody } from "./ArticleBody";
import { ResourceShell } from "./ResourceShell";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Migrated standalone page: one h1, then each exported section (extra sections get their own h2). */
export async function ContentPage({ page }: { page: PageKey }) {
  const p = await getPage(page);
  const [first, ...rest] = p.sections;
  return (
    <ResourceShell>
      <header className="flex max-w-[900px] flex-col gap-4">
        <h1 className="rise text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.035em]" style={i(0)}>{p.title}</h1>
        {(page === "privacy" || page === "cookies") && <p className="rise text-[14px] text-muted" style={i(1)}>Last updated <time dateTime={p.updated}>{formatDate(p.updated)}</time></p>}
      </header>
      <div className="mt-10">
        <ArticleBody body={first.body} html={first.bodyHtml} />
      </div>
      {rest.map((s) => (
        <section key={s.slug} aria-labelledby={`sec-${s.slug}`} className="mt-16">
          <h2 id={`sec-${s.slug}`} className="text-[clamp(30px,3vw,40px)] leading-[1.1] tracking-[-0.03em]">{s.title}</h2>
          <div className="mt-6"><ArticleBody body={s.body} html={s.bodyHtml} /></div>
        </section>
      ))}
    </ResourceShell>
  );
}

export async function contentPageMetadata(page: PageKey) {
  const p = await getPage(page);
  const path = pagePaths[page];
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: "Exeevo" };
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: path },
    openGraph: { title: `${p.title} | Exeevo`, description: p.description, url: path, siteName: "Exeevo", type: "website" as const, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image" as const, title: `${p.title} | Exeevo`, description: p.description, images: ["/twitter-image"] },
  };
}
