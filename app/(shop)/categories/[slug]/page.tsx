"use client";

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { useCartStore } from '@/hooks/use-cart';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { ProductCard } from '@/components/catalog/product-card';
import { CategoryPills } from '@/components/catalog/category-pills';
import { CategoryGridSkeleton } from '@/components/skeletons/category-grid-skeleton';
import { Product } from '@/types/catalog';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const requireAuth = useRequireAuth();
  const { addItem, setIsOpen } = useCartStore();

  const { data: categories } = useCategories();
  
  const category = useMemo(() => {
    return categories?.find(c => c.slug === slug);
  }, [categories, slug]);

  const { data: response, isLoading: isLoadingProducts } = useProducts({ 
    category_id: category?.id,
  });
  
  const products = response?.data || [];
  const isLoading = isLoadingProducts || (!category && !categories);

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

  const categoryName = category ? category.name : slug.replace('-', ' ');

  return (
    <div className="w-full space-y-12">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#012169] tracking-tight capitalize">
              {categoryName} Collection
            </h1>
            <p className="text-xs md:text-sm text-[#434655] mt-1 capitalize">
              Browse our curated selection of high-grade {categoryName.toLowerCase()} essentials.
            </p>
          </div>

          <CategoryPills
            selectedCategory={categoryName}
            onSelectCategory={(cat) => {
              if (cat === 'All') router.push('/');
              else router.push(`/categories/${cat.toLowerCase()}`);
            }}
          />
        </div>

        {isLoading ? (
          <CategoryGridSkeleton />
        ) : products.length > 0 ? (
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
        ) : (
          <div className="text-center py-16 bg-white border border-[#c4c5d8] rounded-xl p-8">
            <p className="text-base text-[#434655]">No products found in this category.</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-4 py-2 bg-[#FDD79A] text-[#012169] font-bold text-xs rounded-lg cursor-pointer"
            >
              Back to All Products
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
