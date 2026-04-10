import { render, screen } from "@testing-library/react";

vi.mock("mermaid", () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({
      svg: '<svg data-testid="mermaid-svg"><text>diagram</text></svg>',
    }),
  },
}));

import { MermaidDiagram } from "@/components/mermaid-diagram";

describe("MermaidDiagram", () => {
  it("renders loading state initially", () => {
    render(<MermaidDiagram chart="graph TD; A-->B" />);
    expect(
      screen.getByText("// rendering diagram..."),
    ).toBeInTheDocument();
  });

  it("renders SVG after mermaid processes the chart", async () => {
    render(<MermaidDiagram chart="graph TD; A-->B" />);
    const diagram = await screen.findByText("diagram");
    expect(diagram).toBeInTheDocument();
  });

  it("renders error state when mermaid fails", async () => {
    const mermaid = (await import("mermaid")).default;
    vi.mocked(mermaid.render).mockRejectedValueOnce(
      new Error("Invalid syntax"),
    );

    render(<MermaidDiagram chart="invalid diagram" />);
    const errorMsg = await screen.findByText(
      "// Failed to render mermaid diagram",
    );
    expect(errorMsg).toBeInTheDocument();
    expect(screen.getByText("invalid diagram")).toBeInTheDocument();
  });
});
