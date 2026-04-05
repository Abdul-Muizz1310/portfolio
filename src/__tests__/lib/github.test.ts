import { fetchGitHubRepos, fetchRepoReadme } from "@/lib/github";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

afterEach(() => {
  mockFetch.mockReset();
});

describe("fetchGitHubRepos", () => {
  it("calls the correct GitHub API URL", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await fetchGitHubRepos();

    const calledUrl = mockFetch.mock.calls[0][0] as URL;
    expect(calledUrl.toString()).toContain(
      "api.github.com/users/Abdul-Muizz1310/repos"
    );
    expect(calledUrl.searchParams.get("sort")).toBe("updated");
    expect(calledUrl.searchParams.get("per_page")).toBe("100");
  });

  it("returns filtered repos excluding the username-matching repo", async () => {
    const mockRepos = [
      { name: "Abdul-Muizz1310", id: 1 },
      { name: "portfolio", id: 2 },
      { name: "some-project", id: 3 },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const repos = await fetchGitHubRepos();

    expect(repos).toHaveLength(2);
    expect(repos.find((r) => r.name === "Abdul-Muizz1310")).toBeUndefined();
    expect(repos.find((r) => r.name === "portfolio")).toBeDefined();
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    await expect(fetchGitHubRepos()).rejects.toThrow("GitHub API error: 403");
  });

  it("throws on non-array response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "not an array" }),
    });

    await expect(fetchGitHubRepos()).rejects.toThrow(
      "Invalid GitHub API response: expected array"
    );
  });
});

describe("fetchRepoReadme", () => {
  it("calls the correct URL for a repo readme", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        content: Buffer.from("# Hello").toString("base64"),
      }),
    });

    await fetchRepoReadme("my-repo");

    const calledUrl = mockFetch.mock.calls[0][0] as URL;
    expect(calledUrl.toString()).toContain(
      "api.github.com/repos/Abdul-Muizz1310/my-repo/readme"
    );
  });

  it("decodes base64 content correctly", async () => {
    const readmeContent = "# My Awesome Project\n\nSome description here.";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        content: Buffer.from(readmeContent).toString("base64"),
      }),
    });

    const result = await fetchRepoReadme("my-repo");
    expect(result).toBe(readmeContent);
  });

  it("returns null on 404", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await fetchRepoReadme("nonexistent-repo");
    expect(result).toBeNull();
  });

  it("returns null on invalid data (missing content field)", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ sha: "abc123" }),
    });

    const result = await fetchRepoReadme("my-repo");
    expect(result).toBeNull();
  });
});
