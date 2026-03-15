import { SectionHeader } from "@/components/section-header";

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader command="$ ls ~/projects" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`skeleton-${i}`}
            className="animate-pulse rounded-lg border border-border bg-surface p-5"
          >
            <div className="mb-3 h-4 w-2/3 rounded bg-surface-hover" />
            <div className="mb-2 h-3 w-full rounded bg-surface-hover" />
            <div className="h-3 w-4/5 rounded bg-surface-hover" />
          </div>
        ))}
      </div>
    </div>
  );
}
