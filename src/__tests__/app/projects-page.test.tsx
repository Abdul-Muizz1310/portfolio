/* eslint-disable @typescript-eslint/no-explicit-any */

vi.mock("@/lib/github", () => ({
  fetchGitHubRepos: vi.fn().mockResolvedValue([]),
}));
vi.mock("@/components/section-header", () => ({
  SectionHeader: ({ command }: any) => <div>{command}</div>,
}));
vi.mock("@/app/projects/projects-client", () => ({
  ProjectsClient: ({ repos }: any) => (
    <div data-testid="projects-client">{repos.length} repos</div>
  ),
}));

import ProjectsPage, { metadata } from "@/app/projects/page";
import { render, screen } from "@testing-library/react";

describe("Projects page", () => {
  it("has metadata with title and description", () => {
    expect(metadata.title).toContain("Projects");
    expect(metadata.description).toBeTruthy();
  });

  it("is a callable async function", () => {
    expect(typeof ProjectsPage).toBe("function");
  });

  it("renders section header and projects client", async () => {
    const jsx = await ProjectsPage();
    render(jsx);

    expect(screen.getByText("$ ls ~/projects")).toBeInTheDocument();
    expect(screen.getByTestId("projects-client")).toBeInTheDocument();
  });
});
