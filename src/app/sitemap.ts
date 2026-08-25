import type { MetadataRoute } from "next";
import { getDivisions, getProducts } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [divisions, products] = await Promise.all([getDivisions(), getProducts()]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, priority: 1, changeFrequency: "weekly", lastModified: now },
    ...["/about", "/divisions", "/products", "/manufacturing", "/contact"].map(
      (p) => ({
        url: `${site.url}${p}`,
        priority: p === "/contact" ? 0.9 : 0.8,
        changeFrequency: "monthly" as const,
        lastModified: now,
      }),
    ),
  ];

  return [
    ...staticRoutes,
    ...divisions.map((d) => ({
      url: `${site.url}/divisions/${d.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: now,
    })),
    ...products.map((p) => ({
      url: `${site.url}/products/${p.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
      lastModified: now,
    })),
  ];
}
