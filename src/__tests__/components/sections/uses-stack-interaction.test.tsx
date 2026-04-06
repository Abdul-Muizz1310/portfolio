import { render, screen } from "@testing-library/react";
import { UsesStack } from "@/components/sections/uses-stack";

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("UsesStack — tech card structure", () => {
  it("renders each tech inside a list item with an icon and label", () => {
    render(<UsesStack />);

    const reactLabel = screen.getByText("React");
    const li = reactLabel.closest("li");
    expect(li).not.toBeNull();
    expect(li?.querySelector("svg")).not.toBeNull();
  });
});
