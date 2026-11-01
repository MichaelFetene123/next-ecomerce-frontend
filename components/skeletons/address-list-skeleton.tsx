import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AddressListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <Skeleton className="h-6 w-40 rounded-md mb-1" />
        <Skeleton className="h-4 w-72 max-w-full rounded-md" />
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <Card key={index} className="bg-muted/40 border border-border/40">
              <CardContent className="p-4 flex gap-3">
                <Skeleton className="w-5 h-5 rounded-md shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-4.5 w-28 rounded-md" />
                    <Skeleton className="h-4 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-3.5 w-32 rounded-md" />
                  <Skeleton className="h-3.5 w-44 rounded-md" />
                  <Skeleton className="h-3.5 w-36 rounded-md" />
                  <Skeleton className="h-3.5 w-20 rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
