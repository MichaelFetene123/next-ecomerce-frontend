import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OrdersSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <Skeleton className="h-8 w-40 rounded-lg mb-6" />

      <div className="grid gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="p-6 border-border bg-card">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 mb-1">
                  <Skeleton className="h-5 w-24 rounded-md" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>

              <div className="text-left sm:text-right space-y-1">
                <Skeleton className="h-4 w-20 rounded-md sm:ml-auto" />
                <Skeleton className="h-6 w-24 rounded-md sm:ml-auto" />
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
