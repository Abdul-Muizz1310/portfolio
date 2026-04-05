import { render, screen } from "@testing-library/react";
import { SkillsShowcase } from "@/components/sections/skills-showcase";

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("SkillsShowcase", () => {
  it('renders section header with "~/skills"', () => {
    render(<SkillsShowcase />);
    expect(screen.getByText("~/skills")).toBeInTheDocument();
  });

  it("renders all 6 skill domain cards", () => {
    render(<SkillsShowcase />);
    const domainTitles = [
      "AI & Machine Learning",
      "Frontend Engineering",
      "Backend & APIs",
      "Automation & Scraping",
      "Databases & Storage",
      "DevOps & Tooling",
    ];
    domainTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("each card has technology tags", () => {
    render(<SkillsShowcase />);
    // Spot-check a few technologies from different domains
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("Scrapy")).toBeInTheDocument();
  });
});
