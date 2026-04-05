import { render, screen } from "@testing-library/react";
import { EducationTimeline } from "@/components/sections/education-timeline";
import { EDUCATION } from "@/lib/resume-data";

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("EducationTimeline", () => {
  it("renders 'branch: education' label", () => {
    render(<EducationTimeline />);
    expect(screen.getByText("branch: education")).toBeInTheDocument();
  });

  it("renders all education entries by degree", () => {
    render(<EducationTimeline />);
    for (const entry of EDUCATION) {
      expect(screen.getByText(entry.degree)).toBeInTheDocument();
    }
  });

  it("renders institution for each entry", () => {
    render(<EducationTimeline />);
    for (const entry of EDUCATION) {
      expect(screen.getByText(entry.institution)).toBeInTheDocument();
    }
  });

  it("renders location for each entry", () => {
    render(<EducationTimeline />);
    for (const entry of EDUCATION) {
      expect(screen.getByText(entry.location)).toBeInTheDocument();
    }
  });

  it("renders commit hashes", () => {
    render(<EducationTimeline />);
    for (const entry of EDUCATION) {
      expect(screen.getByText(`commit ${entry.hash}`)).toBeInTheDocument();
    }
  });
});
