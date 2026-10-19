'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { useCartStore } from '@/hooks/use-cart';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { ProductCard } from '@/components/catalog/product-card';
import { CategoryPills } from '@/components/catalog/category-pills';
import { CategoryGridSkeleton } from '@/components/skeletons/category-grid-skeleton';
import { Product } from '@/types/catalog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CatalogViewProps {
  slug?: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ slug }) => {
  const router = useRouter();
  const requireAuth = useRequireAuth();
  const { addItem, setIsOpen } = useCartStore();
  const [currentPage, setCurrentPage] = useState(1);

  const isAll = !slug || slug.toLowerCase() === 'all';

  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  const category = useMemo(() => {
    if (isAll) return null;
    return categories.find(
      (c) =>
        c.slug.toLowerCase() === slug.toLowerCase() ||
        c.name.toLowerCase().startsWith(slug.toLowerCase())
    );
  }, [categories, slug, isAll]);

  const { data: response, isLoading: isLoadingProducts, isFetching } = useProducts({
    category_id: isAll ? undefined : category?.id,
    page: currentPage,
    per_page: 24,
  });

  const products = response?.data || [];
  const isLoading = isLoadingProducts || (!isAll && !category && isLoadingCategories);

  const categoryName = isAll ? 'All' : category ? category.name : slug?.replace('-', ' ') || 'Collection';
  const displayTitle = isAll ? 'All Products' : `${categoryName} Collection`;
  const displaySubtitle = isAll
    ? 'Browse our complete catalog of verified goods, premium textiles, and everyday essentials.'
    : `Browse our curated selection of high-grade ${categoryName.toLowerCase()} essentials.`;

  const handleSelectProduct = (product: Product) => {
    router.push(`/products/${product.slug}`);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth(() => {
      addItem(product, { quantity: 1 });
      setIsOpen(true);
    });
  };

  const pagination = {
    currentPage: response?.current_page || 1,
    lastPage: response?.last_page || 1,
    total: response?.total ?? products.length,
  };

  return (
    <div className="w-full space-y-12">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#012169] dark:text-foreground tracking-tight capitalize">
              {displayTitle}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              {displaySubtitle}
            </p>
          </div>

          <CategoryPills
            selectedCategory={categoryName}
            onSelectCategory={(cat) => {
              setCurrentPage(1);
              if (cat.toLowerCase() === 'all') {
                router.push('/categories');
              } else {
                router.push(`/categories/${cat.toLowerCase()}`);
              }
            }}
          />
        </div>

        {isLoading ? (
          <CategoryGridSkeleton />
        ) : products.length > 0 ? (
          <div className="space-y-8">
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

            {pagination.lastPage > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage <= 1 || isFetching}
                  className="gap-1 text-xs font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <span className="text-xs font-medium text-muted-foreground px-3">
                  Page {currentPage} of {pagination.lastPage}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, pagination.lastPage))}
                  disabled={currentPage >= pagination.lastPage || isFetching}
                  className="gap-1 text-xs font-semibold"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-xl p-8">
            <p className="text-base text-muted-foreground">
              {isAll ? 'No products found in the catalog.' : 'No products found in this category.'}
            </p>
            {!isAll && (
              <button
                onClick={() => router.push('/categories')}
                className="mt-4 px-4 py-2 bg-[#FDD79A] text-[#012169] font-bold text-xs rounded-lg cursor-pointer hover:bg-[#FDD79A]/90 transition-colors"
              >
                Back to All Products
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
