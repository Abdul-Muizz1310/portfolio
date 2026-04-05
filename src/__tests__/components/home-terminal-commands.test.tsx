/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeTerminal } from "@/components/sections/home-terminal";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("HomeTerminal — all commands", () => {
  async function typeCommand(
    user: ReturnType<typeof userEvent.setup>,
    cmd: string,
  ) {
    const input = screen.getByLabelText("Terminal input");
    await user.clear(input);
    await user.type(input, `${cmd}{Enter}`);
  }

  it("help command shows available commands", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await typeCommand(user, "help");
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });

  it("about command shows bio", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await typeCommand(user, "about");
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/Islamabad, Pakistan/)).toBeInTheDocument();
  });

  it("projects command shows project list", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await typeCommand(user, "projects");
    expect(screen.getByText(/Visit \/projects for more details/)).toBeInTheDocument();
  });

  it("skills command shows skill list", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await typeCommand(user, "skills");
    expect(screen.getByText(/Python, TypeScript/)).toBeInTheDocument();
  });

  it("contact command shows contact info", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await typeCommand(user, "contact");
    expect(screen.getByText(/abdulmuizz1310@outlook.com/)).toBeInTheDocument();
  });

  it("sudo hire-me command shows humorous output", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await typeCommand(user, "sudo hire-me");
    expect(screen.getByText(/Permission granted/)).toBeInTheDocument();
  });

  it("coffee command shows ascii art", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await typeCommand(user, "coffee");
    expect(screen.getByText(/Here's your coffee/)).toBeInTheDocument();
  });

  it("clear command clears terminal output", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);

    // Type something first to ensure there is output
    await typeCommand(user, "help");
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();

    // Clear
    await typeCommand(user, "clear");
    expect(screen.queryByText(/Available commands/)).not.toBeInTheDocument();
  });

  it("unknown command shows error message", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    await typeCommand(user, "nonexistent");
    expect(
      screen.getByText(/Command not found: nonexistent/),
    ).toBeInTheDocument();
  });

  it("ArrowUp navigates command history", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input");

    // Submit two commands
    await user.type(input, "help{Enter}");
    await user.type(input, "about{Enter}");

    // ArrowUp should recall last command
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("about");

    // ArrowUp again should recall first command
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("help");
  });

  it("ArrowDown navigates forward in command history", async () => {
    const user = userEvent.setup();
    render(<HomeTerminal />);
    const input = screen.getByLabelText("Terminal input");

    await user.type(input, "help{Enter}");
    await user.type(input, "about{Enter}");

    // Go up twice
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("help");

    // Go down once
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveValue("about");

    // Go down past the end clears input
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveValue("");
  });
});
