import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OrdersSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-44 mb-6" />

      <div className="grid gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="p-6 border-border bg-card">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-36" />
              </div>

              <div className="flex flex-col sm:items-end space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const OrderListSkeleton = OrdersSkeleton;
