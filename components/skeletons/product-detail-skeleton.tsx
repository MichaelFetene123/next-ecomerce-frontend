import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="w-full">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <Skeleton className="h-4 w-12 rounded" />
        <span className="text-muted-foreground/30 text-xs">/</span>
        <Skeleton className="h-4 w-20 rounded" />
        <span className="text-muted-foreground/30 text-xs">/</span>
        <Skeleton className="h-4 w-32 rounded" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
        {/* Left: Image Gallery Skeleton */}
        <div className="w-full flex flex-col gap-4">
          <Skeleton className="w-full aspect-square rounded-xl border border-border/40" />
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            <Skeleton className="aspect-square rounded-lg border border-border/40" />
            <Skeleton className="aspect-square rounded-lg border border-border/40" />
            <Skeleton className="aspect-square rounded-lg border border-border/40" />
            <Skeleton className="aspect-square rounded-lg border border-border/40" />
          </div>
        </div>

        {/* Right: Details Skeleton */}
        <div className="flex flex-col">
          <div className="mb-6">
            {/* SKU */}
            <Skeleton className="h-3.5 w-24 mb-3 rounded" />
            {/* Title */}
            <Skeleton className="h-9 md:h-10 w-4/5 mb-4 rounded-lg" />
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            {/* Price */}
            <Skeleton className="h-9 w-36 mb-8 rounded-md" />
          </div>

          <hr className="border-border mb-8" />

          {/* Variant Matrix Skeleton */}
          <div className="space-y-6 mb-8">
            {/* Color attribute */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-28 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>
            {/* Size attribute */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-20 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-16 rounded-lg" />
                <Skeleton className="h-9 w-16 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Actions Skeleton (Quantity + Add to Cart + Buy Now) */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Skeleton className="h-12 w-32 rounded-lg shrink-0" />
            <div className="flex-1 flex gap-3">
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 flex-1 rounded-lg" />
            </div>
          </div>

          {/* Accordions Skeleton */}
          <div className="border-t border-border">
            <div className="border-b border-border py-4 flex items-center justify-between">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
            <div className="border-b border-border py-4 flex items-center justify-between">
              <Skeleton className="h-5 w-24 rounded" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
