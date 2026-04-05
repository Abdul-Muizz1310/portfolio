/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";

vi.mock("@/components/section-header", () => ({
  SectionHeader: ({ command }: any) => <div>{command}</div>,
}));
vi.mock("@/components/sections/experience-timeline", () => ({
  ExperienceTimeline: () => <div data-testid="exp" />,
}));
vi.mock("@/components/sections/education-timeline", () => ({
  EducationTimeline: () => <div data-testid="edu" />,
}));
vi.mock("@/components/sections/volunteer-timeline", () => ({
  VolunteerTimeline: () => <div data-testid="vol" />,
}));
vi.mock("@/components/sections/values", () => ({
  Values: () => <div data-testid="val" />,
}));

import AboutPage from "@/app/about/page";

describe("About page", () => {
  it("renders all sections", () => {
    render(<AboutPage />);

    expect(screen.getByTestId("exp")).toBeInTheDocument();
    expect(screen.getByTestId("edu")).toBeInTheDocument();
    expect(screen.getByTestId("vol")).toBeInTheDocument();
    expect(screen.getByTestId("val")).toBeInTheDocument();
  });

  it("renders section header commands", () => {
    render(<AboutPage />);

    expect(screen.getByText("$ cat about.md")).toBeInTheDocument();
    expect(screen.getByText("$ git log --oneline")).toBeInTheDocument();
    expect(screen.getByText("$ git branch -a")).toBeInTheDocument();
    expect(screen.getByText("$ printenv")).toBeInTheDocument();
  });

  it("renders intro paragraphs", () => {
    render(<AboutPage />);

    expect(screen.getByText(/full-stack developer/)).toBeInTheDocument();
    expect(screen.getByText(/chess or Dota 2/)).toBeInTheDocument();
  });
});
