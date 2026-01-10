import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function BreedLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb Skeleton */}
          <nav className="mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-4 w-12 animate-pulse rounded" />
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-16 animate-pulse rounded" />
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            </div>
          </nav>

          {/* Image Skeleton */}
          <div className="bg-muted mb-6 aspect-video animate-pulse rounded-xl" />

          {/* Title Skeleton */}
          <div className="bg-muted mb-2 h-10 w-64 animate-pulse rounded" />
          <div className="bg-muted mb-6 h-5 w-48 animate-pulse rounded" />

          {/* Description Skeleton */}
          <div className="mb-8 space-y-2">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-card border-border rounded-xl border p-6">
              <div className="bg-muted mb-4 h-6 w-32 animate-pulse rounded" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border-border flex justify-between border-b py-2"
                  >
                    <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                    <div className="bg-muted h-4 w-20 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border-border rounded-xl border p-6">
              <div className="bg-muted mb-4 h-6 w-32 animate-pulse rounded" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border-border flex justify-between border-b py-2"
                  >
                    <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                    <div className="bg-muted h-4 w-20 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
