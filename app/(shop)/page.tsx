"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import { useCartStore } from '@/hooks/use-cart';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { ProductCard } from '@/components/catalog/product-card';
import { CategoryPills } from '@/components/catalog/category-pills';
import { CategoryGridSkeleton } from '@/components/skeletons/category-grid-skeleton';
import { Product } from '@/types/catalog';

export default function ShopHomepage() {
  const router = useRouter();
  const requireAuth = useRequireAuth();
  const { addItem, setIsOpen } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Fashion');
  
  // Fetch a list of products
  const { data: response, isLoading } = useProducts({ per_page: 30 });
  const products = response?.data || [];

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

  const categoryTitles: Record<string, { title: string; desc: string }> = {
    All: { title: 'Curated Catalog', desc: 'Browse our complete range of architectural, high-fidelity essentials.' },
    Fashion: { title: 'Fashion Collection', desc: 'Discover the latest trends and timeless classics.' },
    Electronics: { title: 'Electronics & Audio', desc: 'Precision engineered hardware and studio accessories.' },
    Home: { title: 'Home & Living', desc: 'Thoughtful additions crafted for modern workspaces and homes.' },
    Sports: { title: 'Active & Sports', desc: 'Performance-driven equipment and lifestyle goods.' },
  };

  const currentInfo = categoryTitles[selectedCategory] || categoryTitles.Fashion;

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => {
        const catName = p.category?.name?.toLowerCase() || '';
        const catSlug = p.category?.slug?.toLowerCase() || '';
        const sel = selectedCategory.toLowerCase();
        return catName.includes(sel) || catSlug.includes(sel);
      });

  return (
    <div className="w-full space-y-12">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#012169] dark:text-foreground tracking-tight">
              {currentInfo.title}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              {currentInfo.desc}
            </p>
          </div>

          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        </div>

        {isLoading ? (
          <CategoryGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
    </div>
  );
}
