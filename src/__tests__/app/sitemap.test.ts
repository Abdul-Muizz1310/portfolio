import sitemap from "@/app/sitemap";
import { fetchGitHubRepos } from "@/lib/github";
import type { GitHubRepo } from "@/types/github";
import { SITE_CONFIG } from "@/lib/constants";

const BASE = SITE_CONFIG.url;

vi.mock("@/lib/github", () => ({
  fetchGitHubRepos: vi.fn(),
}));

const mockFetch = fetchGitHubRepos as ReturnType<typeof vi.fn>;

const fakeRepos: Partial<GitHubRepo>[] = [
  { name: "project-alpha", pushed_at: "2025-06-01T00:00:00Z" },
  { name: "project-beta", pushed_at: "2025-07-01T00:00:00Z" },
];

describe("sitemap", () => {
  it("exports a default function", () => {
    expect(typeof sitemap).toBe("function");
  });

  it("returns array of URLs including static pages", async () => {
    mockFetch.mockResolvedValue([]);
    const result = await sitemap();

    const urls = result.map((entry) => entry.url);
    expect(urls).toContain(BASE);
    expect(urls).toContain(`${BASE}/about`);
    expect(urls).toContain(`${BASE}/projects`);
    expect(urls).toContain(`${BASE}/resume`);
    expect(urls).toContain(`${BASE}/contact`);
  });

  it("includes dynamic project URLs from repos", async () => {
    mockFetch.mockResolvedValue(fakeRepos);
    const result = await sitemap();

    const urls = result.map((entry) => entry.url);
    expect(urls).toContain(
      `${BASE}/projects/project-alpha`,
    );
    expect(urls).toContain(
      `${BASE}/projects/project-beta`,
    );
  });

  it("handles GitHub API failure gracefully — returns static pages only", async () => {
    mockFetch.mockRejectedValue(new Error("API down"));
    const result = await sitemap();

    const urls = result.map((entry) => entry.url);
    expect(urls).toContain(BASE);
    expect(urls).toContain(`${BASE}/about`);
    // Should NOT contain any project-specific URLs
    const projectUrls = urls.filter(
      (u) =>
        u.startsWith(`${BASE}/projects/`) &&
        u !== `${BASE}/projects`,
    );
    expect(projectUrls).toHaveLength(0);
  });
});
