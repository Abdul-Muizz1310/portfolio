import { render, screen } from "@testing-library/react";
import { TerminalTyper } from "@/components/terminal-typer";

describe("TerminalTyper", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders without crashing", () => {
    const commands = [
      { command: "whoami", response: "Abdul-Muizz" },
    ];
    const { container } = render(<TerminalTyper commands={commands} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows the prompt character $", () => {
    const commands = [
      { command: "hello", response: "world" },
    ];
    render(<TerminalTyper commands={commands} />);
    expect(screen.getByText("$")).toBeInTheDocument();
  });
});
