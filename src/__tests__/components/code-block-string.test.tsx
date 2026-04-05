import { render, screen } from "@testing-library/react";
import { CodeBlock } from "@/components/code-block";

describe("CodeBlock — string children branch", () => {
  it("renders correct number of line numbers for string children", () => {
    render(
      <CodeBlock filename="test.txt">{"line1\nline2\nline3"}</CodeBlock>,
    );

    // Should render line numbers 1, 2, 3
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not render line numbers when showLineNumbers is false", () => {
    const { container } = render(
      <CodeBlock filename="test.txt" showLineNumbers={false}>
        {"line1\nline2\nline3"}
      </CodeBlock>,
    );

    // The line number column should not be present
    // When showLineNumbers is false, only a simple div wraps children
    const selectNone = container.querySelector(".select-none");
    expect(selectNone).toBeNull();
  });

  it("renders the filename", () => {
    render(
      <CodeBlock filename="example.py">{"print('hello')"}</CodeBlock>,
    );

    expect(screen.getByText("example.py")).toBeInTheDocument();
  });
});
