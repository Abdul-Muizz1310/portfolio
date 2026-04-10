"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            darkMode: true,
            background: "#12121a",
            primaryColor: "#22d3ee",
            primaryTextColor: "#f5f5f5",
            primaryBorderColor: "#3b82f6",
            secondaryColor: "#8b5cf6",
            secondaryTextColor: "#f5f5f5",
            secondaryBorderColor: "#8b5cf6",
            tertiaryColor: "#1a1a25",
            lineColor: "#8a8aa3",
            textColor: "#f5f5f5",
            mainBkg: "#1a1a25",
            nodeBorder: "#3b82f6",
            clusterBkg: "#1a1a25",
            titleColor: "#22d3ee",
            edgeLabelBackground: "#12121a",
            nodeTextColor: "#f5f5f5",
          },
          fontFamily: "var(--font-geist-mono), monospace",
          flowchart: { curve: "basis" },
        });

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await mermaid.render(id, chart.trim());

        if (!cancelled) {
          setSvg(rendered);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render diagram",
          );
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-3 rounded-md border border-error/30 bg-error/5 p-4">
        <p className="mb-2 font-mono text-[0.75rem] text-error">
          {"// Failed to render mermaid diagram"}
        </p>
        <pre className="overflow-x-auto font-mono text-[0.8125rem] text-foreground-muted">
          {chart}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-3 flex items-center justify-center rounded-md border border-border bg-surface-hover p-8">
        <span className="font-mono text-[0.8125rem] text-foreground-faint">
          {"// rendering diagram..."}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram my-3 flex justify-center overflow-x-auto rounded-md border border-border bg-surface-hover p-4 [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
