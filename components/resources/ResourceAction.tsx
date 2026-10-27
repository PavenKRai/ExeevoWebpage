import { ArrowRight, Download, Play } from "lucide-react";
import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { Button } from "../ui/Button";
import { resourceHref } from "@/lib/resources";

/** The one action on a card: the field that exists decides it (PDF, recording, registration link), otherwise Read. */
export function ResourceAction({ type, item }: { type: ResourceType; item: Resource }) {
  const href = resourceHref(type, item.slug);
  if (type === "events" && item.registerUrl)
    return (
      <Button href={item.registerUrl} size="nav" className="relative z-[2] !h-11 !px-4 !text-[12.5px]">Register</Button>
    );
  if (type === "white-papers" && item.pdfUrl)
    return (
      <a href={item.pdfUrl} className="tlink relative z-[2] !min-h-11 text-[13px]"><Download size={15} strokeWidth={1.7} aria-hidden="true" />Download PDF</a>
    );
  if (type === "webinars" && item.videoUrl)
    return (
      <Link href={href} className="tlink relative z-[2] !min-h-11 text-[13px]"><Play size={15} strokeWidth={1.7} aria-hidden="true" />Watch recording</Link>
    );
  return (
    <Link href={href} className="tlink relative z-[2] !min-h-11 text-[13px]">Read<ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" /></Link>
  );
}
