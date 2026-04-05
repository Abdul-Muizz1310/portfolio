import { render } from "@testing-library/react";
import { CustomCursor } from "@/components/custom-cursor";

vi.mock("@/hooks/use-cursor", () => ({
  useCursor: () => ({
    dotRef: { current: null },
    ringRef: { current: null },
  }),
}));

describe("CustomCursor", () => {
  it("renders two elements (dot and ring)", () => {
    const { container } = render(<CustomCursor />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBe(2);
  });

  it("both elements have aria-hidden='true'", () => {
    const { container } = render(<CustomCursor />);
    const divs = container.querySelectorAll("div");
    divs.forEach((div) => {
      expect(div).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("renders the dot element with correct classes", () => {
    const { container } = render(<CustomCursor />);
    const dot = container.querySelector("div");
    expect(dot).toHaveClass("fixed");
    expect(dot).toHaveClass("rounded-full");
  });
});
