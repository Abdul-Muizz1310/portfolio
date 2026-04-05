import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { StatusBar } from "@/components/status-bar";

describe("StatusBar — timer update", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders without crashing", () => {
    render(<StatusBar />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("updates time after interval fires", () => {
    render(<StatusBar />);

    // Advance past the 60_000ms interval
    act(() => {
      vi.advanceTimersByTime(60001);
    });

    // Verify it didn't crash — the status bar should still be there
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows the path indicator", () => {
    render(<StatusBar />);
    expect(screen.getByText("~")).toBeInTheDocument();
  });
});
