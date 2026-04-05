/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { EducationTimeline } from "@/components/sections/education-timeline";
import { EDUCATION } from "@/lib/resume-data";

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target: any, prop: string) =>
        ({ children, ...props }: any) => {
          const Tag = prop as any;
          return <Tag {...props}>{children}</Tag>;
        },
    },
  ),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

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
