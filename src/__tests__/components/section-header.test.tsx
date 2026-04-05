import { render, screen } from "@testing-library/react";
import { SectionHeader } from "@/components/section-header";

describe("SectionHeader", () => {
  it("renders the command text", () => {
    render(<SectionHeader command="~/skills" />);
    expect(screen.getByText("~/skills")).toBeInTheDocument();
  });

  it("handles commands with $ prefix by splitting into prefix and rest", () => {
    const { container } = render(<SectionHeader command="$ cat about.md" />);
    expect(screen.getByText("$")).toBeInTheDocument();
    // The rest of the command is in a separate span; use container query
    const spans = container.querySelectorAll("h2 span");
    const texts = Array.from(spans).map((s) => s.textContent);
    expect(texts).toContain("$");
    expect(texts).toContain(" cat about.md");
  });

  it("renders commands without $ as a single span", () => {
    render(<SectionHeader command="~/projects" />);
    expect(screen.getByText("~/projects")).toBeInTheDocument();
    expect(screen.queryByText("$")).not.toBeInTheDocument();
  });
});
