import { render, screen } from "@testing-library/react";
import { StatusBar } from "@/components/status-bar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("StatusBar", () => {
  it('renders with "abdul-muizz.dev" text', () => {
    render(<StatusBar />);
    expect(screen.getByText(/abdul-muizz\.dev/)).toBeInTheDocument();
  });

  it("shows current path based on pathname", () => {
    render(<StatusBar />);
    // pathname is "/" which maps to "~"
    expect(screen.getByText("~")).toBeInTheDocument();
  });

  it("shows UTF-8 indicator", () => {
    render(<StatusBar />);
    expect(screen.getByText("UTF-8")).toBeInTheDocument();
  });

  it("does NOT show theme indicator", () => {
    render(<StatusBar />);
    const themeIndicator = screen.queryByText(/dark|light/i);
    expect(themeIndicator).not.toBeInTheDocument();
  });
});
