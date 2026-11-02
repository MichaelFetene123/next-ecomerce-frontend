import { Suspense } from 'react';
import { ProductCatalog } from '@/components/products/ProductCatalog';
import { ProductCatalogSkeleton } from '@/components/skeletons/product-catalog-skeleton';

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductCatalogSkeleton />}>
      <ProductCatalog />
    </Suspense>
  );
}
