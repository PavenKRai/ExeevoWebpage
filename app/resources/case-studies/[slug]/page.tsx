import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticle } from "@/components/resources/ResourceArticle";
import { getResource, getResources } from "@/content/resources";
import { resourceMetadata } from "@/lib/resourceSeo";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => (await getResources("case-studies")).map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getResource("case-studies", (await params).slug);
  return item ? resourceMetadata("case-studies", item) : {};
}

export default async function Page({ params }: Props) {
  const item = await getResource("case-studies", (await params).slug);
  if (!item) notFound();
  return <ResourceArticle type="case-studies" item={item} />;
}
