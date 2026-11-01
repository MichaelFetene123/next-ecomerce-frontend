import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      {/* Page Title: Shopping Cart */}
      <Skeleton className="h-9 w-48 mb-8 rounded-lg" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 sm:p-6 bg-muted/50 border-b border-border flex justify-between items-center">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>

            <div className="divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 sm:p-6 flex items-center gap-4 py-4">
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted/40 shrink-0">
                    <Skeleton className="w-full h-full rounded-none" />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-3 w-1/3 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>

                  {/* Item Controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-7 w-20 rounded-md border border-border" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24 border-border bg-card shadow-sm space-y-4">
            <Skeleton className="h-6 w-36 mb-6 rounded-md" />

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>

              <div className="h-px bg-border my-4" />

              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-6 w-24 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-14 w-full rounded-md mt-6" />

            <div className="mt-6 flex items-center justify-center gap-2">
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
