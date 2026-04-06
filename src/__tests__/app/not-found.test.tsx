import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

vi.mock("next/link", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("NotFound (404 page)", () => {
  it("renders the 404 ASCII heading region", () => {
    render(<NotFound />);
    expect(screen.getByText(/fatal_error\.sh/)).toBeInTheDocument();
  });

  it("renders the bash error line", () => {
    render(<NotFound />);
    expect(
      screen.getByText(/No such file or directory/i),
    ).toBeInTheDocument();
  });

  it("renders all safe-place navigation links", () => {
    render(<NotFound />);
    expect(screen.getByText("./home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("./projects").closest("a")).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByText("./about").closest("a")).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByText("./contact").closest("a")).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("renders a cd command line", () => {
    const { container } = render(<NotFound />);
    expect(container.textContent).toMatch(/cd \//);
  });
});
