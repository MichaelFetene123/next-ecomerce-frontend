import { ProductGridSkeleton } from './product-grid-skeleton';
import { CategoryPillsSkeleton } from './category-pills-skeleton';

export function CategoryGridSkeleton() {
  return (
    <div className="w-full space-y-6">
      <CategoryPillsSkeleton />
      <ProductGridSkeleton count={8} />
    </div>
  );
}
