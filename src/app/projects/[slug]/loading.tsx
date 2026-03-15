export default function ProjectDetailLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-surface-hover" />
      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="animate-pulse space-y-4 rounded-lg border border-border bg-surface p-6">
          <div className="h-6 w-1/2 rounded bg-surface-hover" />
          <div className="h-4 w-full rounded bg-surface-hover" />
          <div className="h-4 w-full rounded bg-surface-hover" />
          <div className="h-4 w-3/4 rounded bg-surface-hover" />
          <div className="h-4 w-full rounded bg-surface-hover" />
          <div className="h-4 w-5/6 rounded bg-surface-hover" />
        </div>
        <aside className="animate-pulse space-y-4">
          <div className="h-6 w-3/4 rounded bg-surface-hover" />
          <div className="h-4 w-full rounded bg-surface-hover" />
          <div className="h-4 w-1/2 rounded bg-surface-hover" />
        </aside>
      </div>
    </div>
  );
}
