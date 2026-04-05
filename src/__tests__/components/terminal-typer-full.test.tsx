import { render, screen, act } from "@testing-library/react";
import { TerminalTyper } from "@/components/terminal-typer";

const commands = [
  { command: "whoami", response: "Abdul-Muizz" },
  { command: "role", response: "Software Engineer" },
];

describe("TerminalTyper (full)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts typing the first command", () => {
    render(<TerminalTyper commands={commands} typingSpeed={60} pauseBetween={300} />);
    // Should show the $ prompt
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("types characters as timers advance", () => {
    render(<TerminalTyper commands={commands} typingSpeed={60} pauseBetween={300} />);

    // Advance through typing "whoami" (6 chars x 60ms = 360ms)
    act(() => {
      vi.advanceTimersByTime(60); // 'w'
    });

    // At least partial text should appear
    expect(screen.getByText(/w/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(60); // 'h'
    });

    expect(screen.getByText(/wh/)).toBeInTheDocument();
  });

  it("shows response after command is fully typed", () => {
    render(<TerminalTyper commands={commands} typingSpeed={60} pauseBetween={300} />);

    // Each char fires a separate timeout, advance one at a time for all 6 chars
    for (let i = 0; i < 6; i++) {
      act(() => {
        vi.advanceTimersByTime(60);
      });
    }

    // Wait for pauseBetween to show response: 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText("Abdul-Muizz")).toBeInTheDocument();
  });

  it("completed commands show responses and moves to next command", () => {
    render(<TerminalTyper commands={commands} typingSpeed={60} pauseBetween={300} />);

    // Type "whoami" (6 chars) one timer at a time
    for (let i = 0; i < 6; i++) {
      act(() => {
        vi.advanceTimersByTime(60);
      });
    }

    // Pause before showing response
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Pause before moving to next command
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // "whoami" response should be in completed section
    expect(screen.getByText("Abdul-Muizz")).toBeInTheDocument();

    // Now typing "role" (4 chars)
    for (let i = 0; i < 4; i++) {
      act(() => {
        vi.advanceTimersByTime(60);
      });
    }

    // Pause before showing response
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });
});
