import { Suspense } from 'react';
import { ProductDetailSkeleton } from '@/components/skeletons/product-detail-skeleton';
import { ProductDetailClient } from './product-detail-client';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailClient params={params} />
    </Suspense>
  );
}
