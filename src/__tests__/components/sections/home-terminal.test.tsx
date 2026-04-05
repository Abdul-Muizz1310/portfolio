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
});
