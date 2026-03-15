"use client";

import Link from "next/link";

export default function ProjectsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8 text-center">
      <p className="font-mono text-foreground-muted mb-4">
        {"// Failed to load projects"}
      </p>
      <p className="text-[0.875rem] text-foreground-faint mb-6">
        Could not fetch repositories from GitHub. Please try again.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-accent-cyan/15 px-4 py-2 font-mono text-[0.875rem] text-accent-cyan border border-accent-cyan/30 hover:bg-accent-cyan/25 transition-colors"
        >
          Retry
        </button>
        <Link
          href="/"
          className="font-mono text-[0.875rem] text-foreground-muted hover:text-foreground transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
