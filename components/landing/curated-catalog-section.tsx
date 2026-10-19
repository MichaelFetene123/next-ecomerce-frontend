'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/catalog/product-card';
import { ProductCardSkeleton } from '@/components/skeletons/product-card-skeleton';
import { SHOWCASE_PRODUCTS } from '@/lib/landing-showcase';
import { Product } from '@/types/catalog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const CuratedCatalogSection: React.FC = () => {
  const router = useRouter();
  const { addItem, setIsOpen } = useCartStore();
  const { data: apiResponse, isLoading } = useProducts({ per_page: 8 });

  const products: Product[] = useMemo(() => {
    const rawLiveProducts = apiResponse?.data || [];
    const sourceList =
      rawLiveProducts.length > 0
        ? rawLiveProducts
        : SHOWCASE_PRODUCTS.map((item) => item.productData);

    // Deduplicate products strictly by product ID
    const uniqueMap = new Map<number, Product>();
    sourceList.forEach((product) => {
      if (product && product.id && !uniqueMap.has(product.id)) {
        uniqueMap.set(product.id, product);
      }
    });

    const uniqueProducts = Array.from(uniqueMap.values());

    // Sort by created_at in descending order (most recently created first)
    uniqueProducts.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });

    // Display two rows (8 products in a 4-column desktop layout)
    return uniqueProducts.slice(0, 8);
  }, [apiResponse?.data]);

  const handleSelectProduct = (product: Product) => {
    router.push(`/products/${product.slug}`);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, { quantity: 1 });
    setIsOpen(true);
    toast.success(`Added "${product.title}" to bag`);
  };

  return (
    <section id="curated-catalog" className="w-full scroll-mt-24 space-y-6 sm:space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Curated Catalog
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#002167] sm:text-3xl lg:text-4xl dark:text-foreground">
            BEST OUTFIT FOR YOUR HAPPINESS
          </h2>
        </div>

        <Link
          href="/products"
          className={cn(
            buttonVariants({ size: 'sm' }),
            'h-auto self-start rounded-lg bg-[#FDD79A] px-5 py-2.5 text-xs font-bold tracking-wider text-[#012169] uppercase shadow-xs hover:bg-[#FCD082] hover:text-[#012169] hover:shadow-md sm:self-auto'
          )}
        >
          See More
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {isLoading && products.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={handleQuickAdd}
              onSelectProduct={handleSelectProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
};
