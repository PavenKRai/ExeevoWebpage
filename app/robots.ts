import type { MetadataRoute } from "next";
import { aiBots } from "@/lib/seo";
import { siteUrl } from "@/lib/siteUrl";

/** Everyone, including the AI search/answer and training crawlers, may read the public site; /dev and /api are private. */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/dev/", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
