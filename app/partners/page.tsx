import type { Metadata } from "next";
import { ContentPage, contentPageMetadata } from "@/components/resources/ContentPage";

export const generateMetadata = (): Promise<Metadata> => contentPageMetadata("partners");

export default function Page() {
  return <ContentPage page="partners" />;
}
