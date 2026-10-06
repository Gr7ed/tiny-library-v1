export function BookCollectionLoading() {
  return (
    <div className="flex min-w-0 flex-col gap-7" aria-busy="true" aria-label="Loading book collection">
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface-muted p-6 sm:p-8">
        <div className="h-4 w-32 animate-pulse rounded bg-border" />
        <div className="mt-5 h-12 max-w-xl animate-pulse rounded bg-border" />
        <div className="mt-4 h-5 max-w-2xl animate-pulse rounded bg-border" />
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="aspect-4/3 animate-pulse bg-surface-muted" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-2/3 animate-pulse rounded bg-surface-muted" />
              <div className="h-6 w-5/6 animate-pulse rounded bg-surface-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
