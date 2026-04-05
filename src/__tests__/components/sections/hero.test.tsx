/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/hero";

vi.mock("@/components/three/particle-field", () => ({
  ParticleField: () => <div data-testid="particle-field" />,
}));

vi.mock("@/components/terminal-typer", () => ({
  TerminalTyper: () => <div data-testid="terminal-typer" />,
}));

vi.mock("@/components/code-block", () => ({
  CodeBlock: ({ children }: any) => <div data-testid="code-block">{children}</div>,
}));

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ priority: _priority, ...props }: any) => <img {...props} />,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Hero", () => {
  it("renders 'View Projects' link", () => {
    render(<Hero />);
    const link = screen.getByText("View Projects");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/projects");
  });

  it("renders 'Download Resume' link", () => {
    render(<Hero />);
    const link = screen.getByText("Download Resume");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/resume.pdf");
  });

  it("renders the avatar image", () => {
    render(<Hero />);
    const img = screen.getByAltText("Abdul-Muizz");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/avatar.jpg");
  });

  it("renders the particle field", () => {
    render(<Hero />);
    expect(screen.getByTestId("particle-field")).toBeInTheDocument();
  });

  it("renders the terminal typer", () => {
    render(<Hero />);
    expect(screen.getByTestId("terminal-typer")).toBeInTheDocument();
  });

  it("renders scroll indicator", () => {
    render(<Hero />);
    expect(screen.getByText("// scroll to continue")).toBeInTheDocument();
  });
});
