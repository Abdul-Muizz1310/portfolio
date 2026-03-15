import { SectionHeader } from "@/components/section-header";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader command="$ ls ~/blog" />
      <div className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={`skeleton-${i}`} className="animate-pulse p-5">
            <div className="mb-2 h-4 w-3/4 rounded bg-surface-hover" />
            <div className="mb-2 h-3 w-full rounded bg-surface-hover" />
            <div className="h-3 w-1/3 rounded bg-surface-hover" />
          </div>
        ))}
      </div>
    </div>
  );
}
