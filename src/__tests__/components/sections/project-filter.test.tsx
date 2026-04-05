import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectFilter } from "@/components/sections/project-filter";

describe("ProjectFilter", () => {
  const languages = ["TypeScript", "Python", "JavaScript"];
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it("renders '--all' button", () => {
    render(
      <ProjectFilter
        languages={languages}
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
      />,
    );
    expect(screen.getByText("--all")).toBeInTheDocument();
  });

  it("renders language buttons", () => {
    render(
      <ProjectFilter
        languages={languages}
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
      />,
    );
    expect(screen.getByText("--typescript")).toBeInTheDocument();
    expect(screen.getByText("--python")).toBeInTheDocument();
    expect(screen.getByText("--javascript")).toBeInTheDocument();
  });

  it("calls onFilterChange when clicking a language", async () => {
    const user = userEvent.setup();
    render(
      <ProjectFilter
        languages={languages}
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
      />,
    );
    await user.click(screen.getByText("--typescript"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("TypeScript");
  });

  it("calls onFilterChange with 'all' when clicking --all", async () => {
    const user = userEvent.setup();
    render(
      <ProjectFilter
        languages={languages}
        activeFilter="TypeScript"
        onFilterChange={mockOnFilterChange}
      />,
    );
    await user.click(screen.getByText("--all"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("all");
  });

  it("active filter has gradient-bg class", () => {
    render(
      <ProjectFilter
        languages={languages}
        activeFilter="TypeScript"
        onFilterChange={mockOnFilterChange}
      />,
    );
    const tsButton = screen.getByText("--typescript");
    expect(tsButton).toHaveClass("gradient-bg");

    const allButton = screen.getByText("--all");
    expect(allButton).not.toHaveClass("gradient-bg");
  });
});
