'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/catalog/product-card';
import { SHOWCASE_PRODUCTS } from '@/lib/landing-showcase';
import { Product } from '@/types/catalog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const CuratedCatalogSection: React.FC = () => {
  const router = useRouter();
  const { addItem, setIsOpen } = useCartStore();
  const { data: apiResponse } = useProducts({ per_page: 8 });

  const products: Product[] = useMemo(() => {
    const liveProducts = apiResponse?.data || [];
    if (liveProducts.length >= 4) {
      return liveProducts.slice(0, 4);
    }
    if (liveProducts.length > 0) {
      return liveProducts;
    }
    return SHOWCASE_PRODUCTS.map((item) => item.productData);
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
          href="/categories/fashion"
          className={cn(
            buttonVariants({ size: 'sm' }),
            'h-auto self-start rounded-lg bg-[#FDD79A] px-5 py-2.5 text-xs font-bold tracking-wider text-[#012169] uppercase shadow-xs hover:bg-[#FCD082] hover:text-[#012169] hover:shadow-md sm:self-auto'
          )}
        >
          See More
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

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
    </section>
  );
};
