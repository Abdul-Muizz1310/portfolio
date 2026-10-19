/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import type { GitHubRepo } from "@/types/github";

vi.mock("next/og", () => ({
  ImageResponse: vi.fn(function (this: any, element: ReactElement, options: unknown) {
    this.element = element;
    this.options = options;
  }),
}));

const mockFetchGitHubRepos = vi.fn();
vi.mock("@/lib/github", () => ({
  fetchGitHubRepos: (...args: any[]) => mockFetchGitHubRepos(...args),
}));

import Image, {
  alt,
  contentType,
  generateStaticParams,
  size,
} from "@/app/projects/[slug]/opengraph-image";
import { PERSONAL_INFO } from "@/lib/resume-data";

const REPO: GitHubRepo = {
  id: 1,
  name: "test-repo",
  full_name: "user/test-repo",
  description: "A test repo",
  html_url: "https://github.com/user/test-repo",
  homepage: null,
  language: "TypeScript",
  stargazers_count: 1,
  forks_count: 4,
  topics: ["nextjs", "ai"],
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-06-01T00:00:00Z",
  pushed_at: "2024-06-02T00:00:00Z",
};

async function renderCard(slug: string) {
  const response = (await Image({ params: Promise.resolve({ slug }) })) as any;
  render(response.element);
  return response;
}

describe("project opengraph-image", () => {
  beforeEach(() => {
    mockFetchGitHubRepos.mockResolvedValue([REPO]);
  });

  it("exports image metadata", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt).toBe(`Project by ${PERSONAL_INFO.name}`);
  });

  it("prerenders one image per repo", async () => {
    expect(await generateStaticParams()).toEqual([{ slug: "test-repo" }]);
  });

  it("renders repo name, description, topics, language and stats", async () => {
    const response = await renderCard("test-repo");

    expect(response.options.fonts).toHaveLength(3);
    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("A test repo")).toBeInTheDocument();
    expect(screen.getByText("nextjs")).toBeInTheDocument();
    expect(screen.getByText("ai")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("1 star · 4 forks")).toBeInTheDocument();
  });

  it("hides zero stats, missing language and empty topics", async () => {
    mockFetchGitHubRepos.mockResolvedValue([
      { ...REPO, language: null, stargazers_count: 0, forks_count: 0, topics: [] },
    ]);
    await renderCard("test-repo");

    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
    expect(screen.queryByText(/star|fork/)).not.toBeInTheDocument();
    expect(screen.queryByText("nextjs")).not.toBeInTheDocument();
  });

  it("falls back to an unknown language colour", async () => {
    mockFetchGitHubRepos.mockResolvedValue([{ ...REPO, language: "Elixir" }]);
    await renderCard("test-repo");

    expect(screen.getByText("Elixir")).toBeInTheDocument();
  });

  it("uses a smaller headline for long repo names", async () => {
    const name = "a-really-long-repository-name-here";
    mockFetchGitHubRepos.mockResolvedValue([{ ...REPO, name }]);
    await renderCard(name);

    expect(screen.getByText(name)).toHaveStyle({ fontSize: "56px" });
  });

  it("still renders a card for an unknown slug", async () => {
    await renderCard("ghost-repo");

    expect(screen.getByText("ghost-repo")).toBeInTheDocument();
    expect(screen.getByText(`A project by ${PERSONAL_INFO.name}`)).toBeInTheDocument();
  });
});
