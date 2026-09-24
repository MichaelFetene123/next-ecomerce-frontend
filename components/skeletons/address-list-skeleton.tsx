import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AddressListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-44 mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="p-6 border-border bg-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="pt-4 flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
