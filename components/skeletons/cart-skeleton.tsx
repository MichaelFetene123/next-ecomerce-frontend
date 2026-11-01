import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <Skeleton className="h-9 w-48 mb-8 rounded-lg" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 sm:p-6 bg-muted/40 border-b border-border flex justify-between items-center">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>

            <div className="divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 sm:p-6 flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-3 w-1/3 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Skeleton className="w-8 h-8 rounded-md" />
                    <Skeleton className="h-7 w-20 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <Card className="p-6 border-border bg-card shadow-xs space-y-4">
            <Skeleton className="h-6 w-36 mb-4 rounded" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            </div>
            <div className="h-px bg-border my-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-6 w-24 rounded" />
            </div>
            <Skeleton className="h-14 w-full rounded-lg mt-4" />
          </Card>
        </div>
      </div>
    </div>
  );
}

