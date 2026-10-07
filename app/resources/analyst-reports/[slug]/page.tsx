import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticle } from "@/components/resources/ResourceArticle";
import { getResource, getResources } from "@/content/resources";
import { resourceMetadata } from "@/lib/resourceSeo";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => (await getResources("analyst-reports")).map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getResource("analyst-reports", (await params).slug);
  return item ? resourceMetadata("analyst-reports", item) : {};
}

export default async function Page({ params }: Props) {
  const item = await getResource("analyst-reports", (await params).slug);
  if (!item) notFound();
  return <ResourceArticle type="analyst-reports" item={item} />;
}
