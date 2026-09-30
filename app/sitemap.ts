import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const routes = ["/", "/platform", "/why-exeevo", "/industries", "/solutions-by-role", "/getting-started"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${base}${r}` }));
}
