import type { ResourceType } from "@/content/resources";
import { getResources } from "@/content/resources";
import { resourceConfig } from "@/content/resources/config";
import { categoriesOf, one, pageParam, paginate } from "@/lib/resources";
import { NewsletterBlock } from "./NewsletterBlock";
import { Pagination } from "./Pagination";
import { ResourceCard } from "./ResourceCard";
import { ResourcesHero } from "./ResourcesHero";
import { TopicChips } from "./TopicChips";

type SP = Record<string, string | string[] | undefined>;

/** One type: hero with the active tab, "N items" with topic chips, the card grid, pagination, newsletter. Filters and pages are URL-driven. */
export async function ResourceListPage({ type, searchParams }: { type: ResourceType; searchParams: SP }) {
  const c = resourceConfig(type);
  const all = await getResources(type);
  const categories = categoriesOf(all);
  const category = one(searchParams.category);
  const filtered = category && categories.includes(category) ? all.filter((r) => r.categories.includes(category)) : all;
  const activeCategory = filtered === all ? undefined : category;
  const { items, page, pages } = paginate(filtered, pageParam(searchParams.page), c.perPage);
  return (
    <>
      <ResourcesHero h1={c.h1} intro={c.intro} active={type} />
      <section className="bg-porcelain pb-[100px] pt-10">
        <div className="wrap flex flex-col gap-6">
          <TopicChips basePath={c.path} categories={categories} current={activeCategory} total={filtered.length} />
          <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            {items.map((r, n) => (
              <ResourceCard key={r.slug} type={type} item={r} priority={n < 3} />
            ))}
          </div>
          <Pagination basePath={c.path} page={page} pages={pages} category={activeCategory} />
        </div>
      </section>
      <NewsletterBlock />
    </>
  );
}
