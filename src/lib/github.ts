import { GITHUB_USERNAME } from "@/lib/constants";
import type { GitHubRepo } from "@/types/github";

const GITHUB_API = "https://api.github.com";
const FETCH_TIMEOUT = 10_000;

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const url = new URL(`/users/${GITHUB_USERNAME}/repos`, GITHUB_API);
  url.searchParams.set("sort", "updated");
  url.searchParams.set("per_page", "100");

  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid GitHub API response: expected array");
  }

  const repos = data as GitHubRepo[];
  return repos.filter((repo) => repo.name !== GITHUB_USERNAME);
}

export async function fetchRepoReadme(
  repoName: string
): Promise<string | null> {
  const url = new URL(
    `/repos/${GITHUB_USERNAME}/${repoName}/readme`,
    GITHUB_API
  );

  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;

  const data: unknown = await response.json();
  if (
    !data ||
    typeof data !== "object" ||
    !("content" in data) ||
    typeof (data as { content: unknown }).content !== "string"
  ) {
    return null;
  }

  return Buffer.from((data as { content: string }).content, "base64").toString(
    "utf-8"
  );
}
