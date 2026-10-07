import type { Metadata } from "next";
import { ContentPage, contentPageMetadata } from "@/components/resources/ContentPage";

export const generateMetadata = (): Promise<Metadata> => contentPageMetadata("careers");

export default function Page() {
  return <ContentPage page="careers" />;
}
