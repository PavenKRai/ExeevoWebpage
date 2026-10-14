import type { Metadata } from "next";
import { ResourceListPage } from "@/components/resources/ResourceListPage";
import { listMetadata } from "@/lib/resourceSeo";

export const metadata: Metadata = listMetadata("blog");

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ResourceListPage type="blog" searchParams={await searchParams} />;
}
