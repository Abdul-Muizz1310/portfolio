import { render, screen } from "@testing-library/react";

vi.mock("@/components/sections/hero", () => ({
  Hero: () => <div data-testid="mock-hero" />,
}));
vi.mock("@/components/sections/uses-stack", () => ({
  UsesStack: () => <div data-testid="mock-uses-stack" />,
}));
vi.mock("@/components/sections/skills-showcase", () => ({
  SkillsShowcase: () => <div data-testid="mock-skills-showcase" />,
}));
vi.mock("@/components/sections/featured-projects", () => ({
  FeaturedProjects: () => <div data-testid="mock-featured-projects" />,
}));
vi.mock("@/components/sections/home-terminal", () => ({
  HomeTerminal: () => <div data-testid="mock-home-terminal" />,
}));
vi.mock("@/components/sections/home-cta", () => ({
  HomeCta: () => <div data-testid="mock-home-cta" />,
}));

import Home from "@/app/page";

describe("Home page", () => {
  it("is a function", () => {
    expect(typeof Home).toBe("function");
  });

  it("returns non-null JSX", () => {
    const result = Home();
    expect(result).not.toBeNull();
  });

  it("renders all six sections", () => {
    render(<Home />);

    expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
    expect(screen.getByTestId("mock-uses-stack")).toBeInTheDocument();
    expect(screen.getByTestId("mock-skills-showcase")).toBeInTheDocument();
    expect(screen.getByTestId("mock-featured-projects")).toBeInTheDocument();
    expect(screen.getByTestId("mock-home-terminal")).toBeInTheDocument();
    expect(screen.getByTestId("mock-home-cta")).toBeInTheDocument();
  });
});
