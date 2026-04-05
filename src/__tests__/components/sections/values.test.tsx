import { render, screen } from "@testing-library/react";
import { Values } from "@/components/sections/values";
import { VALUES } from "@/lib/resume-data";

describe("Values", () => {
  it("renders all VALUES entries keys", () => {
    render(<Values />);
    for (const v of VALUES) {
      expect(screen.getByText(v.key)).toBeInTheDocument();
    }
  });

  it("renders all VALUES entries values", () => {
    render(<Values />);
    for (const v of VALUES) {
      expect(screen.getByText(v.value)).toBeInTheDocument();
    }
  });

  it("renders the equals sign separator", () => {
    render(<Values />);
    const separators = screen.getAllByText("=");
    expect(separators.length).toBe(VALUES.length);
  });
});
