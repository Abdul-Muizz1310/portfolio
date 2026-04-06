import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeTerminal } from "@/components/sections/home-terminal";

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("HomeTerminal", () => {
  it("renders the welcome message", () => {
    render(<HomeTerminal />);
    expect(
      screen.getByText(/Welcome to Abdul-Muizz's terminal/i)
    ).toBeInTheDocument();
  });

  it("renders the terminal prompt", () => {
    render(<HomeTerminal />);
    const prompts = screen.getAllByText(/visitor@abdul-muizz:\~\$/);
    expect(prompts.length).toBeGreaterThan(0);
  });

  it("has an input field", () => {
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  it("allows user to type and submit a help command", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);

    const input = screen.getByLabelText("Terminal input");
    await user.type(input, "help{Enter}");

    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });

  it("runs a command when a suggestion chip is clicked", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await user.click(screen.getByRole("button", { name: "$ about" }));
    expect(
      screen.getByText(/Specializing in AI\/ML/i),
    ).toBeInTheDocument();
  });

  it("runs the socials command", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await user.click(screen.getByRole("button", { name: "$ socials" }));
    expect(screen.getByText(/linkedin\.com/)).toBeInTheDocument();
  });

  it("clears output when clear is run", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input");
    await user.type(input, "clear{Enter}");
    expect(
      screen.queryByText(/Welcome to Abdul-Muizz's terminal/i),
    ).not.toBeInTheDocument();
  });

  it("shows command-not-found for unknown commands", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input");
    await user.type(input, "nonsense{Enter}");
    expect(screen.getByText(/Command not found: nonsense/)).toBeInTheDocument();
  });

  it("autocompletes a partial command on Tab", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input") as HTMLInputElement;
    await user.type(input, "pro");
    await user.keyboard("{Tab}");
    expect(input.value).toBe("projects");
  });

  it("does nothing on Tab when input is empty", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input") as HTMLInputElement;
    input.focus();
    await user.keyboard("{Tab}");
    expect(input.value).toBe("");
  });

  it("navigates command history with arrow keys", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input") as HTMLInputElement;
    await user.type(input, "about{Enter}");
    await user.type(input, "skills{Enter}");
    await user.keyboard("{ArrowUp}");
    expect(input.value).toBe("skills");
    await user.keyboard("{ArrowUp}");
    expect(input.value).toBe("about");
    await user.keyboard("{ArrowDown}");
    expect(input.value).toBe("skills");
    await user.keyboard("{ArrowDown}");
    expect(input.value).toBe("");
  });

  it("ignores ArrowUp when history is empty", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input") as HTMLInputElement;
    input.focus();
    await user.keyboard("{ArrowUp}");
    expect(input.value).toBe("");
  });

  it("focuses the terminal on Ctrl+/ shortcut", async () => {
    // jsdom doesn't implement scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input");
    const event = new KeyboardEvent("keydown", { key: "/", ctrlKey: true });
    window.dispatchEvent(event);
    expect(document.activeElement).toBe(input);
  });

  it("ignores empty form submissions", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input");
    await user.type(input, "{Enter}");
    // Welcome message still the only output
    expect(
      screen.getByText(/Welcome to Abdul-Muizz's terminal/i),
    ).toBeInTheDocument();
  });

  it("renders interactive scroll rail and jumps on click when content overflows", async () => {
    // Force overflow by stubbing scroll metrics + scrollTo
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get: () => 1000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      get: () => 400,
    });
    const scrollToMock = vi.fn();
    HTMLElement.prototype.scrollTo = scrollToMock as unknown as typeof HTMLElement.prototype.scrollTo;

    const user = userEvent.setup();
    render(<HomeTerminal />);
    // Trigger an output update so scroll state recalculates
    await user.click(screen.getByRole("button", { name: "$ help" }));

    const rail = screen.getByRole("button", { name: "Scroll terminal" });
    await user.click(rail);
    expect(scrollToMock).toHaveBeenCalled();

    // Cleanup overrides
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get: () => 0,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      get: () => 0,
    });
  });

  it("focuses input when terminal body is clicked", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input");
    const log = screen.getByRole("log");
    await user.click(log);
    expect(document.activeElement).toBe(input);
  });
});
