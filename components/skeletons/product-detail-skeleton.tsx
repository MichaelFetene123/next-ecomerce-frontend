import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="w-full" suppressHydrationWarning>
      {/* Breadcrumbs matching nav in page.tsx */}
      <nav className="flex items-center text-xs text-muted-foreground mb-8">
        <ol className="inline-flex items-center space-x-2">
          <li>
            <Skeleton className="h-3.5 w-10 rounded-md" />
          </li>
          <span className="text-muted-foreground/40 text-xs">/</span>
          <li>
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </li>
          <span className="text-muted-foreground/40 text-xs">/</span>
          <li>
            <Skeleton className="h-3.5 w-32 rounded-md" />
          </li>
        </ol>
      </nav>

      {/* Main Content Grid matching grid-cols-1 lg:grid-cols-[1.2fr_1fr] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
        {/* Left: Image Gallery Skeleton matching ImageGallery */}
        <div className="w-full flex flex-col gap-4">
          {/* Main image aspect-square with wishlist button */}
          <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-muted/40 border border-border">
            <Skeleton className="w-full h-full rounded-none" />
            <div className="absolute top-4 right-4">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
          {/* 3 Thumbnails matching ImageGallery grid-cols-4 */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            <Skeleton className="aspect-square rounded-lg border border-border/50" />
            <Skeleton className="aspect-square rounded-lg border border-border/50" />
            <Skeleton className="aspect-square rounded-lg border border-border/50" />
          </div>
        </div>

        {/* Right: Details Skeleton matching page.tsx */}
        <div className="flex flex-col">
          <div className="mb-6">
            {/* SKU: text-xs font-bold mb-3 */}
            <Skeleton className="h-3.5 w-24 mb-3 rounded-md" />
            {/* Title: text-3xl md:text-4xl mb-4 */}
            <Skeleton className="h-9 md:h-10 w-4/5 mb-4 rounded-lg" />
            {/* Rating: stars + review count mb-6 */}
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            {/* Price: text-3xl font-bold mb-8 */}
            <Skeleton className="h-9 w-36 mb-8 rounded-md" />
          </div>

          <hr className="border-border mb-8" />

          {/* Variant Matrix Skeleton matching VariantMatrix */}
          <div className="space-y-6 mb-8">
            {/* Color selector */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-28 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full border border-border/40" />
                <Skeleton className="w-8 h-8 rounded-full border border-border/40" />
                <Skeleton className="w-8 h-8 rounded-full border border-border/40" />
              </div>
            </div>
            {/* Size selector */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-20 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-16 rounded-lg border border-border/40" />
                <Skeleton className="h-9 w-16 rounded-lg border border-border/40" />
              </div>
            </div>
          </div>

          {/* Actions: Quantity + Add to Cart + Buy Now */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Quantity controller: h-12 w-32 rounded-lg */}
            <Skeleton className="h-12 w-32 rounded-lg shrink-0 border border-border" />
            {/* Buttons: h-12 flex-1 rounded-lg */}
            <div className="flex-1 flex gap-3">
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 flex-1 rounded-lg" />
            </div>
          </div>

          {/* Accordions Skeleton */}
          <div className="border-t border-border">
            {/* Specifications (open by default in page.tsx) */}
            <div className="border-b border-border">
              <div className="w-full py-4 flex items-center justify-between">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="w-5 h-5 rounded-md" />
              </div>
              <div className="pb-6 space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border-b border-border">
              <div className="w-full py-4 flex items-center justify-between">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="w-5 h-5 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
