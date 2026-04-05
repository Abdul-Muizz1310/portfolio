import { render, screen } from "@testing-library/react";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { EXPERIENCE } from "@/lib/resume-data";

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("ExperienceTimeline", () => {
  it("renders all experience entries by role name", () => {
    render(<ExperienceTimeline />);
    for (const entry of EXPERIENCE) {
      expect(screen.getByText(entry.role)).toBeInTheDocument();
    }
  });

  it("shows company for each entry", () => {
    render(<ExperienceTimeline />);
    for (const entry of EXPERIENCE) {
      expect(screen.getByText(entry.company)).toBeInTheDocument();
    }
  });

  it("shows location for each entry", () => {
    render(<ExperienceTimeline />);
    // Some locations repeat (e.g. "Islamabad, PK"), so use getAllByText
    const uniqueLocations = [...new Set(EXPERIENCE.map((e) => e.location))];
    for (const location of uniqueLocations) {
      const elements = screen.getAllByText(location);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it("renders commit hashes", () => {
    render(<ExperienceTimeline />);
    for (const entry of EXPERIENCE) {
      expect(screen.getByText(`commit ${entry.hash}`)).toBeInTheDocument();
    }
  });
});
