import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAgoraIssues } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const issues = await getAgoraIssues();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/calendar`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/agora`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/resources`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const issueRoutes: MetadataRoute.Sitemap = issues.map((issue) => ({
    url: `${site.url}/agora/${issue.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...issueRoutes];
}
