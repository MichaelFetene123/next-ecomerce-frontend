import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentOrdersSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-36 rounded-md" />
      </div>

      <div className="grid gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="p-4 sm:p-6 border-border bg-card">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded-md shrink-0" />
                  <Skeleton className="h-4.5 w-32 rounded-md" />
                  <Skeleton className="h-5 w-20 rounded-full ml-2" />
                </div>
                <Skeleton className="h-3.5 w-40 rounded-md" />
              </div>

              <div className="flex flex-col sm:items-end gap-1">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-3.5 w-16 rounded-md" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

