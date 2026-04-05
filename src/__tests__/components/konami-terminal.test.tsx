/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { KonamiTerminal } from "@/components/konami-terminal";

const mockDeactivate = vi.fn();
let mockIsActive = false;

vi.mock("@/hooks/use-konami", () => ({
  useKonami: () => ({
    isActive: mockIsActive,
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

describe("KonamiTerminal", () => {
  beforeEach(() => {
    mockIsActive = false;
    mockDeactivate.mockClear();
  });

  it("renders nothing when inactive", () => {
    mockIsActive = false;
    const { container } = render(<KonamiTerminal />);
    expect(container.innerHTML).toBe("");
  });

  it("renders terminal when active", () => {
    mockIsActive = true;
    render(<KonamiTerminal />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Secret terminal")).toBeInTheDocument();
  });

  it("renders close button when active", () => {
    mockIsActive = true;
    render(<KonamiTerminal />);
    expect(screen.getByLabelText("Close terminal")).toBeInTheDocument();
  });

  it("renders terminal input when active", () => {
    mockIsActive = true;
    render(<KonamiTerminal />);
    expect(screen.getByLabelText("Terminal input")).toBeInTheDocument();
  });

  it("shows 'Secret Terminal Unlocked' header when active", () => {
    mockIsActive = true;
    render(<KonamiTerminal />);
    expect(screen.getByText("Secret Terminal Unlocked")).toBeInTheDocument();
  });
});
