import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import { TerminalTyper } from "@/components/terminal-typer";

describe("TerminalTyper — edge cases", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("sets allDone when currentCommandIndex >= commands.length", () => {
    const commands = [{ command: "hi", response: "hello" }];

    render(<TerminalTyper commands={commands} typingSpeed={10} pauseBetween={10} />);

    // Type all characters of "hi" (2 chars)
    act(() => {
      vi.advanceTimersByTime(10); // char 1
    });
    act(() => {
      vi.advanceTimersByTime(10); // char 2
    });

    // Pause then show response
    act(() => {
      vi.advanceTimersByTime(10);
    });

    // Pause then move to next command (which doesn't exist)
    act(() => {
      vi.advanceTimersByTime(10);
    });

    // Now allDone should be true — shows the final cursor
    // The "$ " prompt with blinking cursor should appear at the end
    const prompts = screen.getAllByText("$");
    expect(prompts.length).toBeGreaterThanOrEqual(1);
  });

  it("handles empty commands array gracefully", () => {
    render(<TerminalTyper commands={[]} />);

    // allDone should be set immediately since currentCommandIndex (0) >= commands.length (0)
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should show the final blinking cursor
    expect(screen.getByText("$")).toBeInTheDocument();
  });
});
