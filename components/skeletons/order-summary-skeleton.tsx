import { Skeleton } from '@/components/ui/skeleton';

export function OrderSummarySkeleton() {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col gap-4">
      <Skeleton className="h-6 w-1/2 mb-2" />
      <div className="flex gap-4">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <div className="h-px bg-border/50 my-2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full pt-2" />
      </div>
    </div>
  );
}
