/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import type { GitHubRepo } from "@/types/github";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "project-alpha",
    full_name: "Abdul-Muizz1310/project-alpha",
    description: "Alpha project",
    html_url: "https://github.com/Abdul-Muizz1310/project-alpha",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 50,
    forks_count: 5,
    topics: ["react"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    pushed_at: "2024-06-01T00:00:00Z",
  },
  {
    id: 2,
    name: "project-beta",
    full_name: "Abdul-Muizz1310/project-beta",
    description: "Beta project",
    html_url: "https://github.com/Abdul-Muizz1310/project-beta",
    homepage: null,
    language: "Python",
    stargazers_count: 30,
    forks_count: 3,
    topics: [],
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    pushed_at: "2024-06-01T00:00:00Z",
  },
  {
    id: 3,
    name: "project-gamma",
    full_name: "Abdul-Muizz1310/project-gamma",
    description: "Gamma project",
    html_url: "https://github.com/Abdul-Muizz1310/project-gamma",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 20,
    forks_count: 2,
    topics: [],
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    pushed_at: "2024-06-01T00:00:00Z",
  },
  {
    id: 4,
    name: "project-delta",
    full_name: "Abdul-Muizz1310/project-delta",
    description: "Delta project",
    html_url: "https://github.com/Abdul-Muizz1310/project-delta",
    homepage: null,
    language: "Rust",
    stargazers_count: 10,
    forks_count: 1,
    topics: [],
    created_at: "2024-04-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    pushed_at: "2024-06-01T00:00:00Z",
  },
];

vi.mock("@/lib/github", () => ({
  fetchGitHubRepos: vi.fn(),
}));

describe("FeaturedProjects", () => {
  it("renders section header", async () => {
    const { fetchGitHubRepos } = await import("@/lib/github");
    (fetchGitHubRepos as any).mockResolvedValue(mockRepos);

    const component = await FeaturedProjects();
    render(component);

    expect(screen.getByText("~/featured-projects")).toBeInTheDocument();
  });

  it("renders up to 3 project cards sorted by stars", async () => {
    const { fetchGitHubRepos } = await import("@/lib/github");
    (fetchGitHubRepos as any).mockResolvedValue(mockRepos);

    const component = await FeaturedProjects();
    render(component);

    // Top 3 by stars: alpha (50), beta (30), gamma (20)
    expect(screen.getByText(/project-alpha/)).toBeInTheDocument();
    expect(screen.getByText(/project-beta/)).toBeInTheDocument();
    expect(screen.getByText(/project-gamma/)).toBeInTheDocument();
    // Delta (10 stars) should not appear
    expect(screen.queryByText(/project-delta/)).not.toBeInTheDocument();
  });

  it("renders the 'cd ./projects' link", async () => {
    const { fetchGitHubRepos } = await import("@/lib/github");
    (fetchGitHubRepos as any).mockResolvedValue(mockRepos);

    const component = await FeaturedProjects();
    render(component);

    const link = screen.getByRole("link", { name: /cd \.\/projects/ });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("handles fetch errors gracefully", async () => {
    const { fetchGitHubRepos } = await import("@/lib/github");
    (fetchGitHubRepos as any).mockRejectedValue(new Error("API Error"));

    const component = await FeaturedProjects();
    render(component);

    expect(screen.getByText("~/featured-projects")).toBeInTheDocument();
    expect(
      screen.getByText(/Error fetching repositories/),
    ).toBeInTheDocument();
  });
});
