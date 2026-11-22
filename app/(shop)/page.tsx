'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesBar } from '@/components/landing/features-bar';
import { DepartmentsSection } from '@/components/landing/departments-section';
import { CuratedCatalogSection } from '@/components/landing/curated-catalog-section';
import { LookbookBanner } from '@/components/landing/lookbook-banner';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { useProducts } from '@/hooks/use-products';
import { useCartStore } from '@/hooks/use-cart';
import { ProductCard } from '@/components/catalog/product-card';
import { ProductGridSkeleton } from '@/components/skeletons/product-grid-skeleton';
import { Product } from '@/types/catalog';
import { ArrowLeft, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function StorefrontLandingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { addItem } = useCartStore();

  // Search results query when search param is active
  const { data: searchResponse, isLoading: isSearchLoading } = useProducts({
    search: searchQuery || undefined,
    per_page: 24,
  });
  const searchResults = searchResponse?.data || [];

  const handleSelectProduct = (product: Product) => {
    router.push(`/products/${product.slug}`);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, { quantity: 1 });
    toast.success(`Added "${product.title}" to Bag`);
  };

  // If a search is active in the URL, display dedicated search results view
  if (searchQuery) {
    return (
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Search className="w-3.5 h-3.5" />
              <span>Search Results</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              &ldquo;{searchQuery}&rdquo;
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {searchResults.length} {searchResults.length === 1 ? 'essential' : 'essentials'} found
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/')}
            className="self-start sm:self-auto text-xs font-bold gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Button>
        </div>

        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          {isSearchLoading ? (
            <ProductGridSkeleton count={8} />
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleQuickAdd}
                  onSelectProduct={handleSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-card rounded-xl border border-dashed border-border p-8">
              <Search className="w-12 h-12 text-muted-foreground/40 mx-auto" />
              <h3 className="text-lg font-bold text-foreground">No beauty essentials found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                We couldn&apos;t find any beauty, perfume, or intimate essentials matching &ldquo;{searchQuery}&rdquo;. Try checking the spelling or exploring our skincare and fragrance departments.
              </p>
              <Button
                onClick={() => router.push('/')}
                className="text-xs font-bold px-6"
              >
                Explore Beauty Catalog
              </Button>
            </div>
          )}
        </Suspense>
      </div>
    );
  }

  return (
    <div className="w-full space-y-16 sm:space-y-20 lg:space-y-24 pb-12">
      <HeroSection />
      <FeaturesBar />
      <DepartmentsSection />
      <CuratedCatalogSection />
      <LookbookBanner />
      <TestimonialsSection />
    </div>
  );
}

export default function StorefrontLandingPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton count={8} />}>
      <StorefrontLandingContent />
    </Suspense>
  );
}
