export function BookDetailLoading() {
  return (
    <div className="flex min-w-0 flex-col gap-8" aria-busy="true" aria-label="Loading book details">
      <div className="mb-8 h-5 w-44 animate-pulse rounded bg-surface-muted" />
      <div className="grid overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[0.8fr_1.2fr]">
        <div className="aspect-4/3 animate-pulse bg-surface-muted" />
        <div className="flex flex-col gap-6 p-6 sm:p-10">
          <div className="h-4 w-32 animate-pulse rounded bg-surface-muted" />
          <div className="h-14 max-w-xl animate-pulse rounded bg-surface-muted" />
          <div className="h-7 w-48 animate-pulse rounded bg-surface-muted" />
          <div className="h-5 w-56 animate-pulse rounded bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}
