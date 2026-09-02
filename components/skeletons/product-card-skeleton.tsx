import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-card border border-border/50 rounded-lg overflow-hidden p-4 gap-2">
      <Skeleton className="aspect-square rounded w-full mb-1" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/4 mt-1" />
      <div className="mt-auto pt-2 flex justify-between items-end">
        <Skeleton className="h-5 w-1/3" />
      </div>
      <Skeleton className="h-9 w-full mt-1" />
    </div>
  );
}
