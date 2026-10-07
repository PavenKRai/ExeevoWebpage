import { createClient } from "next-sanity";

/** Content comes from Sanity when a project is configured; otherwise the bundled JSON is used (local dev, tests, CI). */
export const sanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const client = sanityConfigured
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2025-10-01",
      useCdn: false, // revalidation is on-demand (webhook), so read fresh data rather than the lagging CDN
    })
  : null;

/** Every Sanity read carries the `sanity` tag; the publish webhook revalidates it (app/api/revalidate/route.ts). */
export const SANITY_TAG = "sanity";

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!client) throw new Error("Sanity is not configured (NEXT_PUBLIC_SANITY_PROJECT_ID is missing).");
  return client.fetch<T>(query, params, { cache: "force-cache", next: { tags: [SANITY_TAG] } });
}
