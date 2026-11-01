import { ProductGridSkeleton } from '@/components/skeletons/product-grid-skeleton';

export default function Loading() {
  return (
    <div className="space-y-8">
      <ProductGridSkeleton />
    </div>
  );
}

