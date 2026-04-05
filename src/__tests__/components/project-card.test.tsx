/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/project-card";
import type { GitHubRepo } from "@/types/github";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockRepo: GitHubRepo = {
  id: 1,
  name: "my-awesome-project",
  full_name: "Abdul-Muizz1310/my-awesome-project",
  description: "A really cool project",
  html_url: "https://github.com/Abdul-Muizz1310/my-awesome-project",
  homepage: null,
  language: "TypeScript",
  stargazers_count: 42,
  forks_count: 7,
  topics: ["react", "nextjs", "typescript"],
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-06-01T00:00:00Z",
  pushed_at: "2024-06-01T00:00:00Z",
};

describe("ProjectCard", () => {
  it("renders the repo name", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText(/my-awesome-project/)).toBeInTheDocument();
  });

  it("renders the repo description", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText(/A really cool project/)).toBeInTheDocument();
  });

  it("renders the language", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders the star count", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders the fork count", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("links to /projects/{repo.name}", () => {
    render(<ProjectCard repo={mockRepo} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects/my-awesome-project");
  });

  it("renders topics as tags", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("nextjs")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("handles repo with no description", () => {
    const repoNoDesc = { ...mockRepo, description: null };
    render(<ProjectCard repo={repoNoDesc} />);
    expect(screen.getByText(/No description provided/)).toBeInTheDocument();
  });

  it("handles repo with no topics", () => {
    const repoNoTopics = { ...mockRepo, topics: [] };
    const { container } = render(<ProjectCard repo={repoNoTopics} />);
    expect(container.querySelector(".flex.flex-wrap.gap-1\\.5")).not.toBeInTheDocument();
  });
});
