import { render } from "@testing-library/react";

vi.mock("next/dynamic", () => ({
  default: () => {
    const Stub = () => <div data-testid="particle-field-stub" />;
    return Stub;
  },
}));

import { ParticleBackground } from "@/components/three/particle-background";

describe("ParticleBackground", () => {
  it("renders a fixed, pointer-events-none, aria-hidden wrapper", () => {
    const { container } = render(<ParticleBackground />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper.getAttribute("aria-hidden")).toBe("true");
    expect(wrapper.className).toContain("pointer-events-none");
    expect(wrapper.className).toContain("fixed");
    expect(wrapper.className).toContain("-z-10");
  });

  it("dynamically loads the particle field (client-only)", () => {
    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("particle-field-stub")).toBeInTheDocument();
  });
});
