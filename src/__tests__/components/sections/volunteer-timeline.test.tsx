/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { VolunteerTimeline } from "@/components/sections/volunteer-timeline";
import { EXTRACURRICULARS } from "@/lib/resume-data";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("VolunteerTimeline", () => {
  it('renders "branch: community" label', () => {
    render(<VolunteerTimeline />);
    expect(screen.getByText("branch: community")).toBeInTheDocument();
  });

  it("renders all extracurricular entries", () => {
    render(<VolunteerTimeline />);
    EXTRACURRICULARS.forEach((entry) => {
      expect(screen.getByText(entry.role)).toBeInTheDocument();
      expect(screen.getByText(entry.organization)).toBeInTheDocument();
    });
  });

  it("shows role and organization for each entry", () => {
    render(<VolunteerTimeline />);
    expect(screen.getByText("General Secretary")).toBeInTheDocument();
    expect(screen.getByText("Hack Club NUST")).toBeInTheDocument();
    expect(screen.getByText("Director Social Events")).toBeInTheDocument();
    expect(screen.getByText("NUST Literary Circle")).toBeInTheDocument();
  });
});
