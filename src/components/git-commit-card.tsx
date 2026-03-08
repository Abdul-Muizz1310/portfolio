import type { Testimonial } from "@/types/services";

interface GitCommitCardProps {
  testimonial: Testimonial;
}

export function GitCommitCard({ testimonial }: GitCommitCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="font-mono text-[0.75rem] text-foreground-faint">
        commit {testimonial.hash}
      </div>
      <div className="font-mono text-[0.875rem]">
        Author: <span className="text-accent-cyan">{testimonial.author}</span>{" "}
        <span className="text-foreground-muted">
          &lt;{testimonial.company}&gt;
        </span>
      </div>
      <div className="font-mono text-[0.875rem] text-foreground-muted">
        Date:&nbsp;&nbsp;&nbsp;{testimonial.date}
      </div>

      <div className="mt-4 pl-4 leading-relaxed text-foreground">
        {testimonial.quote}
      </div>
      <div className="mt-2 pl-4 text-[0.875rem] text-foreground-muted">
        &mdash; {testimonial.author}, {testimonial.role}
      </div>
    </div>
  );
}
