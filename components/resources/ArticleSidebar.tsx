import { Download, Play } from "lucide-react";
import Image from "next/image";
import type { Resource, ResourceType } from "@/content/resources";
import { site } from "@/content/site";
import { formatDateTime, type Heading } from "@/lib/resources";
import { Button } from "../ui/Button";

const row = "flex flex-col gap-[3px] border-t border-[rgba(29,38,45,.06)] py-2.5";
const label = "text-[12px] text-muted";
const value = "text-[14px] text-heading";
const card = "rounded-[20px] bg-white/70 shadow-[0_0_0_1px_var(--ex-hairline)]";

/** Sticky sidebar. Details lists only the type-specific fields that have a value (so a blog post has no Details card); On this page appears when the body has headings. */
export function ArticleSidebar({ type, item, headings }: { type: ResourceType; item: Resource; headings: Heading[] }) {
  const events = type === "events";
  const hasDetails = events ? Boolean(item.startDate || item.endDate || item.location || item.registerUrl) : type === "white-papers" ? Boolean(item.pdfUrl) : type === "webinars" ? Boolean(item.videoUrl) : false;
  return (
    <aside className="flex flex-col gap-3.5 lg:sticky lg:top-[110px] lg:col-span-4 lg:col-start-9">
      {hasDetails && (
        <section aria-label="Details" className={`${card} flex flex-col px-[18px] py-4`}>
          <h2 className="pb-1.5 text-[13px] font-medium text-heading">Details</h2>
          {events && item.startDate && (
            <div className={row}><span className={label}>Starts</span><span className={value}>{formatDateTime(item.startDate)}</span></div>
          )}
          {events && item.endDate && (
            <div className={row}><span className={label}>Ends</span><span className={value}>{formatDateTime(item.endDate)}</span></div>
          )}
          {events && item.location && (
            <div className={row}><span className={label}>Location</span><span className={value}>{item.location}</span></div>
          )}
          {events && item.registerUrl && <Button href={item.registerUrl} className="mb-1 mt-2.5 !h-11">Register</Button>}
          {type === "white-papers" && item.pdfUrl && (
            <div className={row}>
              <span className={label}>PDF</span>
              <a href={item.pdfUrl} className="tlink !min-h-11 text-[14px]"><Download size={15} strokeWidth={1.7} aria-hidden="true" />Download PDF</a>
            </div>
          )}
          {type === "webinars" && item.videoUrl && (
            <div className={row}>
              <span className={label}>Recording</span>
              <a href="#recording" className="tlink !min-h-11 text-[14px]"><Play size={15} strokeWidth={1.7} aria-hidden="true" />Watch recording</a>
            </div>
          )}
        </section>
      )}
      {headings.length > 0 && (
        <nav aria-label="On this page" className={`${card} px-3 py-4`}>
          <p className="px-2.5 pb-2 text-[13px] font-medium text-heading">On this page</p>
          <ul>
            {headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="flex min-h-11 items-center px-2.5 text-[13.5px] text-body hover:text-heading">{h.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="glass flex flex-col gap-3 rounded-[22px] p-[22px]">
        <Image src="/brand/exeevo-icon.png" alt="" width={28} height={28} />
        <p className="text-[18px] font-[450] leading-[1.25] text-heading">See Exeevo for your organisation</p>
        <Button href={site.demoHref} className="!h-11">Get a demo</Button>
      </div>
    </aside>
  );
}
