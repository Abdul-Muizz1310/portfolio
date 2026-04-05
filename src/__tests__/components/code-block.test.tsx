import { render, screen } from "@testing-library/react";
import { CodeBlock } from "@/components/code-block";

describe("CodeBlock", () => {
  it("renders the filename", () => {
    render(
      <CodeBlock filename="index.ts">
        <div>const x = 1;</div>
      </CodeBlock>
    );
    expect(screen.getByText("index.ts")).toBeInTheDocument();
  });

  it("renders the traffic light dots", () => {
    const { container } = render(
      <CodeBlock filename="app.tsx">
        <div>hello</div>
      </CodeBlock>
    );
    // The three dots have specific background colors
    const dots = container.querySelectorAll("span[aria-hidden='true']");
    // There are 3 traffic light dots (the gradient bar in section-header is not present here)
    const colorDots = Array.from(dots).filter((dot) => {
      const style = (dot as HTMLElement).style;
      return style.background !== "";
    });
    expect(colorDots).toHaveLength(3);
  });

  it("renders children content", () => {
    render(
      <CodeBlock filename="test.py">
        <span>print(&quot;hello world&quot;)</span>
      </CodeBlock>
    );
    expect(screen.getByText('print("hello world")')).toBeInTheDocument();
  });
});
