import { render, screen } from "@testing-library/react";
import { UsesStack } from "@/components/sections/uses-stack";

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("UsesStack", () => {
  it("renders section header with ~/uses", () => {
    render(<UsesStack />);
    expect(screen.getByText("~/uses")).toBeInTheDocument();
  });

  it("renders all category labels", () => {
    render(<UsesStack />);
    for (const label of [
      "// languages",
      "// ai / ml",
      "// frontend",
      "// backend",
      "// databases",
      "// tools",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("renders core tech names", () => {
    render(<UsesStack />);
    for (const tech of [
      "TypeScript",
      "JavaScript",
      "Python",
      "React",
      "Next.js",
      "Tailwind CSS",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "AWS",
      "Redis",
    ]) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it("renders an icon for each tech entry", () => {
    const { container } = render(<UsesStack />);
    // react-icons render as <svg role="img">
    const icons = container.querySelectorAll('svg[role="img"]');
    expect(icons.length).toBeGreaterThanOrEqual(13);
  });
});
