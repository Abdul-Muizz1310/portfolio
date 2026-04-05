import { render, screen, fireEvent, act } from "@testing-library/react";
import { KonamiTerminal } from "@/components/konami-terminal";

const mockDeactivate = vi.fn();

vi.mock("@/hooks/use-konami", () => ({
  useKonami: () => ({
    isActive: true,
    deactivate: mockDeactivate,
  }),
}));

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("KonamiTerminal — commands", () => {
  beforeEach(() => {
    mockDeactivate.mockClear();
    // Execute setTimeout callbacks immediately so the focus() call runs instantly
    vi.spyOn(globalThis, "setTimeout").mockImplementation(((
      fn: () => void,
    ) => {
      fn();
      return 0 as unknown as ReturnType<typeof setTimeout>;
    }) as typeof setTimeout);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function submitCommand(cmd: string) {
    const input = screen.getByLabelText("Terminal input");

    // First act: set the value and let React flush the re-render
    act(() => {
      fireEvent.change(input, { target: { value: cmd } });
    });

    // After re-render, the input element now has a new handleKeyDown that
    // closes over the updated `input` state.
    // Re-query to get the freshly rendered element
    const updatedInput = screen.getByLabelText("Terminal input");

    // Second act: fire Enter on the re-rendered input
    act(() => {
      fireEvent.keyDown(updatedInput, { key: "Enter", code: "Enter" });
    });
  }

  it("typing 'help' shows help output", () => {
    render(<KonamiTerminal />);
    submitCommand("help");

    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
    expect(screen.getByText(/Show this message/)).toBeInTheDocument();
  });

  it("typing 'about' shows about info", () => {
    render(<KonamiTerminal />);
    submitCommand("about");

    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/Islamabad, Pakistan/)).toBeInTheDocument();
  });

  it("typing 'exit' calls deactivate", () => {
    render(<KonamiTerminal />);
    submitCommand("exit");

    expect(mockDeactivate).toHaveBeenCalled();
  });

  it("typing unknown command shows 'not found' message", () => {
    render(<KonamiTerminal />);
    submitCommand("foobar");

    expect(screen.getByText(/Command not found: foobar/)).toBeInTheDocument();
  });

  it("typing 'matrix' triggers matrix effect", () => {
    render(<KonamiTerminal />);
    submitCommand("matrix");

    expect(screen.getByText(/Entering the Matrix/)).toBeInTheDocument();
  });
});
