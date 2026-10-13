import type { ResourceType } from "@/content/resources";
import { getResources } from "@/content/resources";
import { newsletter, resourceConfig } from "@/content/resources/config";
import { categoriesOf, one, pageParam, paginate } from "@/lib/resources";
import { CategoryFilter } from "./CategoryFilter";
import { FeaturedResource } from "./FeaturedResource";
import { NewsletterBlock } from "./NewsletterBlock";
import { Pagination } from "./Pagination";
import { ResourceCard } from "./ResourceCard";
import { ResourceShell } from "./ResourceShell";
import { ResourcesHeader } from "./ResourcesHeader";

type SP = Record<string, string | string[] | undefined>;

const featuredLabel: Partial<Record<ResourceType, string>> = { blog: "Featured", "white-papers": "Featured guide", "press-releases": "Latest announcement", "case-studies": "Featured case study", webinars: "Latest webinar", "analyst-reports": "Latest report" };
const gridTitle: Record<ResourceType, string> = { blog: "Latest articles", "white-papers": "All white papers", events: "All events", webinars: "On demand", "case-studies": "All case studies", "press-releases": "Press releases", "analyst-reports": "All reports", glossary: "Terms" };

/** Shared list page: header, lead item (first page only), topic filter, grid, pagination, newsletter. Filters and pages are URL-driven. */
export async function ResourceListPage({ type, searchParams }: { type: ResourceType; searchParams: SP }) {
  const c = resourceConfig(type);
  const all = await getResources(type);
  const categories = categoriesOf(all);
  const category = one(searchParams.category);
  const filtered = category && categories.includes(category) ? all.filter((r) => r.categories.includes(category)) : all;
  const activeCategory = filtered === all ? undefined : category;
  const requested = pageParam(searchParams.page);
  const lead = type in featuredLabel && requested === 1 && !activeCategory ? (filtered.find((r) => r.image) ?? filtered[0]) : undefined;
  const rest = lead ? filtered.filter((r) => r !== lead) : filtered;
  const { items, page, pages } = paginate(rest, requested, c.perPage);
  return (
    <ResourceShell>
      <ResourcesHeader h1={c.h1} intro={c.intro} active={type} />
      {lead && <FeaturedResource type={type} item={lead} label={featuredLabel[type]!} cta={c.cta} />}
      <div className="sr mt-16 flex flex-col gap-5 lg:mt-[72px] lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[32px] leading-[1.1] tracking-[-0.025em]">{gridTitle[type]}</h2>
        <CategoryFilter basePath={c.path} categories={categories} current={activeCategory} />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r, n) => (
          <ResourceCard key={r.slug} type={type} item={r} index={n} priority={!lead && n < 3} showRead={type !== "events" && type !== "webinars"} />
        ))}
      </div>
      <Pagination basePath={c.path} page={page} pages={pages} category={activeCategory} />
      <NewsletterBlock copy={newsletter} />
    </ResourceShell>
  );
}
