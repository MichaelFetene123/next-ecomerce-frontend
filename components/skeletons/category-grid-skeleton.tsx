import { ProductCardSkeleton } from './product-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoryGridSkeleton() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-28 rounded-full" />
        <Skeleton className="h-10 w-32 rounded-full" />
        <Skeleton className="h-10 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
