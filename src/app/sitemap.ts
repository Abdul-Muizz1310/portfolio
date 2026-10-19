import type { MetadataRoute } from "next";
import { fetchGitHubRepos } from "@/lib/github";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let projectPages: MetadataRoute.Sitemap = [];

  try {
    const repos = await fetchGitHubRepos();
    projectPages = repos.map((repo) => ({
      url: absoluteUrl(`/projects/${repo.name}`),
      lastModified: new Date(repo.pushed_at),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // If GitHub API fails, proceed without project pages
  }

  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/projects"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...projectPages,
    { url: absoluteUrl("/resume"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
