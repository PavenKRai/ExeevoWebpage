import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticle } from "@/components/resources/ResourceArticle";
import { getResource, getResources } from "@/content/resources";
import { resourceMetadata } from "@/lib/resourceSeo";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => (await getResources("glossary")).map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getResource("glossary", (await params).slug);
  return item ? resourceMetadata("glossary", item) : {};
}

export default async function Page({ params }: Props) {
  const item = await getResource("glossary", (await params).slug);
  if (!item) notFound();
  return <ResourceArticle type="glossary" item={item} />;
}
