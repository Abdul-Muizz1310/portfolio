import type { MetadataRoute } from "next";
import { fetchGitHubRepos } from "@/lib/github";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectPages: MetadataRoute.Sitemap = [];

  try {
    const repos = await fetchGitHubRepos();
    projectPages = repos.map((repo) => ({
      url: `https://abdul-muizz.dev/projects/${repo.name}`,
      lastModified: new Date(repo.pushed_at),
    }));
  } catch {
    // If GitHub API fails, proceed without project pages
  }

  return [
    { url: "https://abdul-muizz.dev", lastModified: new Date() },
    { url: "https://abdul-muizz.dev/about", lastModified: new Date() },
    { url: "https://abdul-muizz.dev/projects", lastModified: new Date() },
    ...projectPages,
    { url: "https://abdul-muizz.dev/services", lastModified: new Date() },
    { url: "https://abdul-muizz.dev/blog", lastModified: new Date() },
    { url: "https://abdul-muizz.dev/lab", lastModified: new Date() },
    { url: "https://abdul-muizz.dev/resume", lastModified: new Date() },
    { url: "https://abdul-muizz.dev/contact", lastModified: new Date() },
  ];
}
