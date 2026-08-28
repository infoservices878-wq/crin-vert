/** Placeholders de chargement (pulse) */

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-hunter-800/10 ${className}`}
      aria-hidden="true"
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="border border-hunter-800/10 bg-oat-50">
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="mt-3 h-6 w-1/4" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Chargement des produits"
    >
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6" aria-busy="true">
      <div className="grid gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-6 h-10 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}
