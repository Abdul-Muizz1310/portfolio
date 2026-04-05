/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { Navigation } from "@/components/navigation";
import { NAV_LINKS } from "@/lib/constants";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("Navigation", () => {
  it("renders the Home link", () => {
    render(<Navigation />);
    expect(screen.getByLabelText("Home")).toBeInTheDocument();
  });

  it("renders all nav links from NAV_LINKS", () => {
    render(<Navigation />);
    NAV_LINKS.forEach((link) => {
      const elements = screen.getAllByText(link.label);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("has mobile menu button with md:hidden class", () => {
    render(<Navigation />);
    const menuButton = screen.getByLabelText("Open menu");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.className).toContain("md:hidden");
  });

  it("does NOT render a theme toggle button", () => {
    render(<Navigation />);
    const themeToggle = screen.queryByLabelText(/toggle theme/i);
    expect(themeToggle).not.toBeInTheDocument();
  });
});
