import sitemap from "@/app/sitemap";
import { fetchGitHubRepos } from "@/lib/github";
import type { GitHubRepo } from "@/types/github";

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
    expect(urls).toContain("https://abdul-muizz.dev");
    expect(urls).toContain("https://abdul-muizz.dev/about");
    expect(urls).toContain("https://abdul-muizz.dev/projects");
    expect(urls).toContain("https://abdul-muizz.dev/resume");
    expect(urls).toContain("https://abdul-muizz.dev/contact");
  });

  it("includes dynamic project URLs from repos", async () => {
    mockFetch.mockResolvedValue(fakeRepos);
    const result = await sitemap();

    const urls = result.map((entry) => entry.url);
    expect(urls).toContain(
      "https://abdul-muizz.dev/projects/project-alpha",
    );
    expect(urls).toContain(
      "https://abdul-muizz.dev/projects/project-beta",
    );
  });

  it("handles GitHub API failure gracefully — returns static pages only", async () => {
    mockFetch.mockRejectedValue(new Error("API down"));
    const result = await sitemap();

    const urls = result.map((entry) => entry.url);
    expect(urls).toContain("https://abdul-muizz.dev");
    expect(urls).toContain("https://abdul-muizz.dev/about");
    // Should NOT contain any project-specific URLs
    const projectUrls = urls.filter(
      (u) =>
        u.startsWith("https://abdul-muizz.dev/projects/") &&
        u !== "https://abdul-muizz.dev/projects",
    );
    expect(projectUrls).toHaveLength(0);
  });
});
