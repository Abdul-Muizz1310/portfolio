import { render, screen } from "@testing-library/react";
import Template from "@/app/template";

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("Template", () => {
  it("renders children", () => {
    render(
      <Template>
        <div data-testid="child">Hello</div>
      </Template>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
