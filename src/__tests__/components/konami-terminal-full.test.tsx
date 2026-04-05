/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { KonamiTerminal } from "@/components/konami-terminal";

const mockDeactivate = vi.fn();

vi.mock("@/hooks/use-konami", () => ({
  useKonami: () => ({
    isActive: true,
    deactivate: mockDeactivate,
  }),
}));

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target: any, prop: string) =>
        ({ children, ...props }: any) => {
          const Tag = prop as any;
          return <Tag {...props}>{children}</Tag>;
        },
    },
  ),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("KonamiTerminal — additional coverage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockDeactivate.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function submitCommand(cmd: string) {
    const input = screen.getByLabelText("Terminal input");
    act(() => {
      fireEvent.change(input, { target: { value: cmd } });
    });
    const updatedInput = screen.getByLabelText("Terminal input");
    act(() => {
      fireEvent.keyDown(updatedInput, { key: "Enter", code: "Enter" });
    });
  }

  it("typing 'projects' shows projects text", () => {
    render(<KonamiTerminal />);

    act(() => {
      vi.runAllTimers();
    });

    submitCommand("projects");

    expect(screen.getByText(/Featured Projects/)).toBeInTheDocument();
    expect(screen.getByText(/\/projects page/)).toBeInTheDocument();
  });

  it("typing 'matrix' shows Entering the Matrix and MatrixRain renders", () => {
    render(<KonamiTerminal />);

    act(() => {
      vi.runAllTimers();
    });

    submitCommand("matrix");

    expect(screen.getByText(/Entering the Matrix/)).toBeInTheDocument();
    // MatrixRain renders a div with aria-hidden="true"
    expect(
      document.querySelector('[aria-hidden="true"].pointer-events-none') ||
        document.querySelector(".pointer-events-none"),
    ).toBeTruthy();
  });

  it("matrix effect clears after 3000ms and shows red pill message", () => {
    render(<KonamiTerminal />);

    act(() => {
      vi.runAllTimers();
    });

    submitCommand("matrix");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByText(/You took the red pill/),
    ).toBeInTheDocument();
  });

  it("pressing Escape calls deactivate", () => {
    render(<KonamiTerminal />);

    act(() => {
      vi.runAllTimers();
    });

    act(() => {
      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    });

    expect(mockDeactivate).toHaveBeenCalled();
  });

  it("typing 'hire-me' shows hire text", () => {
    render(<KonamiTerminal />);

    act(() => {
      vi.runAllTimers();
    });

    submitCommand("hire-me");

    expect(screen.getByText(/you probably want to hire me/)).toBeInTheDocument();
  });
});
