import { Children } from "react";

interface CodeBlockProps {
  filename: string;
  children: React.ReactNode;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  filename,
  children,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const lineCount = getLineCount(children);

  return (
    <div
      className={`overflow-hidden rounded-lg border border-border bg-surface ${className ?? ""}`}
    >
      {/* Top bar */}
      <div className="flex h-8 items-center gap-2 border-b border-border bg-surface-hover px-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F56" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27C93F" }} />
        <span className="ml-2 font-mono text-[0.75rem] text-foreground-muted">
          {filename}
        </span>
      </div>

      {/* Content area */}
      <div className="p-4 font-mono text-[0.875rem] leading-relaxed">
        {showLineNumbers ? (
          <div className="flex">
            <div className="mr-4 flex flex-col border-r border-border pr-4 text-right text-foreground-faint select-none">
              {Array.from({ length: lineCount }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <div className="flex-1 overflow-x-auto">{children}</div>
          </div>
        ) : (
          <div className="overflow-x-auto">{children}</div>
        )}
      </div>
    </div>
  );
}

function getLineCount(children: React.ReactNode): number {
  if (typeof children === "string") {
    return children.split("\n").length;
  }

  const childCount = Children.count(children);
  return childCount > 0 ? childCount : 1;
}
