import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CheckoutSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-8 space-y-1">
        <Skeleton className="h-8 w-36 rounded-lg" />
        <Skeleton className="h-4 w-60 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Forms Skeleton */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Address Card Skeleton */}
          <Card className="p-6 border-border bg-card space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-36 rounded" />
              <Skeleton className="h-8 w-28 rounded-md" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-28 rounded" />
                  <Skeleton className="h-4 w-14 rounded-full" />
                </div>
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            </div>
          </Card>

          {/* Payment Card Skeleton */}
          <Card className="p-6 border-border bg-card space-y-4">
            <Skeleton className="h-6 w-36 rounded mb-2" />
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>
                <Skeleton className="h-6 w-16 rounded" />
              </div>
              <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-5 w-28 rounded" />
                </div>
                <Skeleton className="h-6 w-16 rounded" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Summary Skeleton */}
        <div className="lg:col-span-4">
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
            </div>
            <div className="h-px bg-border my-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-6 w-24 rounded" />
            </div>
            <Skeleton className="h-12 w-full rounded-lg mt-4" />
          </Card>
        </div>
      </div>
    </div>
  );
}

