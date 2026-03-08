import { GITHUB_USERNAME } from "@/lib/constants";
import type { GitHubRepo } from "@/types/github";

const GITHUB_API = "https://api.github.com";

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos: GitHubRepo[] = await response.json();
  return repos.filter((repo) => repo.name !== GITHUB_USERNAME);
}

export async function fetchRepoReadme(
  repoName: string
): Promise<string | null> {
  const response = await fetch(
    `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) return null;

  const data = await response.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}
