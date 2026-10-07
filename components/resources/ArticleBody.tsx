import Image from "next/image";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { toEmbedUrl } from "@/content/resources";

type Img = { url?: string; alt?: string; caption?: string; width?: number; height?: number };
type Row = { cells?: string[] };

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: Img }) =>
      value.url ? (
        <figure>
          <Image src={value.url} alt={value.alt ?? ""} width={value.width ?? 1200} height={value.height ?? 800} sizes="(min-width: 768px) 720px, 100vw" style={{ width: "100%", height: "auto" }} unoptimized={value.url.endsWith(".gif")} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
    videoEmbed: ({ value }: { value: { url: string; title: string } }) => <iframe src={toEmbedUrl(value.url)} title={value.title} loading="lazy" allowFullScreen />,
    table: ({ value }: { value: { rows?: Row[] } }) => (
      <table>
        <tbody>
          {(value.rows ?? []).map((r, i) => (
            <tr key={i}>{(r.cells ?? []).map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      const external = /^https?:\/\//.test(href) && !/^https?:\/\/(www\.)?exeevo\.com/.test(href);
      return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
    },
  },
};

/** Article body: Portable Text from Sanity, or sanitised HTML (bundled JSON and imported legacy items). */
export function ArticleBody({ body, html }: { body?: PortableTextBlock[]; html?: string }) {
  if (html && !(body && body.length)) return <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />;
  return (
    <div className="article-body">
      <PortableText value={body ?? []} components={components} />
    </div>
  );
}
