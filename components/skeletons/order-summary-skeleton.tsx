import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OrderSummarySkeleton() {
  return (
    <Card className="p-6 border-border bg-card shadow-xs space-y-4">
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

      <Skeleton className="h-12 w-full rounded-lg mt-4" />
    </Card>
  );
}
