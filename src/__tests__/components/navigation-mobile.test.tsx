/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navigation } from "@/components/navigation";
import { NAV_LINKS } from "@/lib/constants";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ children, href, onClick, ...props }: any) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("Navigation — mobile menu", () => {
  it("toggles mobile menu open on button click", async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const menuButton = screen.getByLabelText("Open menu");
    await user.click(menuButton);

    // After opening, the button label changes to "Close menu"
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();

    // Mobile nav links should now be rendered twice (desktop + mobile)
    const firstLink = NAV_LINKS[0];
    const elements = screen.getAllByText(firstLink.label);
    expect(elements.length).toBeGreaterThanOrEqual(2);
  });

  it("closes mobile menu when a nav link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    // Open menu
    const menuButton = screen.getByLabelText("Open menu");
    await user.click(menuButton);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();

    // Click a mobile link — the mobile menu uses onClick={closeMobileMenu}
    // Get all links for the first nav item, click the last one (mobile version)
    const links = screen.getAllByText(NAV_LINKS[1].label);
    const mobileLink = links[links.length - 1];
    await user.click(mobileLink);

    // Menu should be closed — button label should be "Open menu" again
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });
});
