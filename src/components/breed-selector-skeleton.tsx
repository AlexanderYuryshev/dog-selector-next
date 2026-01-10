export function BreedSelectorSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Skeleton */}
      <section className="mb-12 text-center">
        <div className="bg-muted mx-auto mb-4 h-12 w-96 max-w-full animate-pulse rounded" />
        <div className="bg-muted mx-auto h-6 w-125 max-w-full animate-pulse rounded" />
      </section>

      {/* Search Bar Skeleton */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="bg-muted h-12 flex-1 animate-pulse rounded-lg" />
        <div className="bg-muted h-12 w-32 animate-pulse rounded-lg" />
      </div>

      {/* Results Header Skeleton */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="bg-muted h-5 w-48 animate-pulse rounded" />
        <div className="flex items-center gap-3">
          <div className="bg-muted h-5 w-16 animate-pulse rounded" />
          <div className="bg-muted h-10 w-32 animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border-border overflow-hidden rounded-xl border"
          >
            <div className="bg-muted aspect-square animate-pulse" />
            <div className="space-y-3 p-4">
              <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
              <div className="space-y-2">
                <div className="bg-muted h-4 w-full animate-pulse rounded" />
                <div className="bg-muted h-4 w-full animate-pulse rounded" />
              </div>
              <div className="flex gap-2">
                <div className="bg-muted h-6 w-20 animate-pulse rounded-full" />
                <div className="bg-muted h-6 w-16 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
