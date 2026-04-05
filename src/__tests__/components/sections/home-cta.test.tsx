/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { HomeCta } from "@/components/sections/home-cta";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HomeCta", () => {
  it('renders "Get in Touch" link', () => {
    render(<HomeCta />);
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
  });

  it("links to /contact", () => {
    render(<HomeCta />);
    const link = screen.getByText("Get in Touch");
    expect(link.closest("a")).toHaveAttribute("href", "/contact");
  });
});
