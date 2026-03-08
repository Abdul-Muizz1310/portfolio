import { VALUES } from "@/lib/resume-data";

export function Values() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="font-mono text-[0.875rem]">
        {VALUES.map((v) => (
          <div key={v.key}>
            <span className="text-foreground-muted">{v.key}</span>
            <span className="text-foreground-faint">=</span>
            <span className="text-accent-cyan">{v.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
