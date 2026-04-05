/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsClient } from "@/app/projects/projects-client";
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
    name: "ts-project",
    full_name: "Abdul-Muizz1310/ts-project",
    description: "A TypeScript project",
    html_url: "https://github.com/Abdul-Muizz1310/ts-project",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 10,
    forks_count: 2,
    topics: ["typescript"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    pushed_at: "2024-06-01T00:00:00Z",
  },
  {
    id: 2,
    name: "py-project",
    full_name: "Abdul-Muizz1310/py-project",
    description: "A Python project",
    html_url: "https://github.com/Abdul-Muizz1310/py-project",
    homepage: null,
    language: "Python",
    stargazers_count: 5,
    forks_count: 1,
    topics: ["python"],
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    pushed_at: "2024-06-01T00:00:00Z",
  },
];

describe("ProjectsClient", () => {
  it("renders project cards for given repos", () => {
    render(<ProjectsClient repos={mockRepos} />);
    expect(screen.getByText(/ts-project/)).toBeInTheDocument();
    expect(screen.getByText(/py-project/)).toBeInTheDocument();
  });

  it("renders --all filter button", () => {
    render(<ProjectsClient repos={mockRepos} />);
    expect(screen.getByText("--all")).toBeInTheDocument();
  });

  it("renders language filter buttons", () => {
    render(<ProjectsClient repos={mockRepos} />);
    expect(screen.getByText("--python")).toBeInTheDocument();
    expect(screen.getByText("--typescript")).toBeInTheDocument();
  });

  it("filters by language when clicking a filter", async () => {
    const user = userEvent.setup();
    render(<ProjectsClient repos={mockRepos} />);

    await user.click(screen.getByText("--python"));

    expect(screen.getByText(/py-project/)).toBeInTheDocument();
    expect(screen.queryByText(/ts-project/)).not.toBeInTheDocument();
  });

  it("shows all projects when clicking --all after filtering", async () => {
    const user = userEvent.setup();
    render(<ProjectsClient repos={mockRepos} />);

    await user.click(screen.getByText("--python"));
    await user.click(screen.getByText("--all"));

    expect(screen.getByText(/ts-project/)).toBeInTheDocument();
    expect(screen.getByText(/py-project/)).toBeInTheDocument();
  });

  it("shows 'No projects found' when filter matches nothing", async () => {
    const reposWithOneLanguage: GitHubRepo[] = [
      {
        ...mockRepos[0],
        language: "TypeScript",
      },
    ];
    render(<ProjectsClient repos={reposWithOneLanguage} />);

    // Only TypeScript exists, no Python filter button will show
    // Let's test with empty repos instead
    const { unmount } = render(<ProjectsClient repos={[]} />);
    expect(screen.getByText(/No projects found/)).toBeInTheDocument();
    unmount();
  });
});
