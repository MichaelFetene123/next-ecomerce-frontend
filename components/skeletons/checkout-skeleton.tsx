import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CheckoutSkeleton() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 space-y-1">
        <Skeleton className="h-8 w-36 rounded-lg" />
        <Skeleton className="h-4 w-60 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Forms */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Address Card */}
          <Card className="p-6 border-border bg-card shadow-xs space-y-4">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-6 w-36 rounded-md" />
              <Skeleton className="h-9 w-32 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4.5 w-28 rounded-md" />
                  <Skeleton className="h-4 w-14 rounded-full" />
                </div>
                <Skeleton className="h-3.5 w-3/4 rounded-md" />
                <Skeleton className="h-3.5 w-1/2 rounded-md" />
                <Skeleton className="h-3.5 w-2/5 rounded-md" />
              </div>
            </div>
          </Card>

          {/* Payment Card */}
          <Card className="p-6 border-border bg-card shadow-xs space-y-4">
            <Skeleton className="h-6 w-36 rounded-md mb-2" />
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4.5 w-24 rounded-md" />
                </div>
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
              <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4.5 w-28 rounded-md" />
                </div>
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4">
          <Card className="p-6 border-border bg-card shadow-xs sticky top-24 space-y-4">
            <Skeleton className="h-6 w-36 mb-6 rounded-md" />

            {/* Items preview */}
            <div className="space-y-4 mb-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-6 rounded-md" />
                    <Skeleton className="h-4 w-36 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-16 rounded-md" />
                </div>
              ))}
            </div>

            <div className="h-px bg-border my-4" />

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
            </div>

            <div className="h-px bg-border my-4" />

            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>

            <Skeleton className="h-12 w-full rounded-lg" />
          </Card>
        </div>
      </div>
    </div>
  );
}
