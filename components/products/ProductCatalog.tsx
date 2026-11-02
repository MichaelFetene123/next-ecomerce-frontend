'use client';

import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { useCartStore } from '@/hooks/use-cart';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { ProductCard } from '@/components/catalog/product-card';
import { CategoryPillsSkeleton } from '@/components/skeletons/category-pills-skeleton';
import { ProductGridSkeleton } from '@/components/skeletons/product-grid-skeleton';
import { Product } from '@/types/catalog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  SlidersHorizontal,
  X,
  ShoppingBag,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured / Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Alphabetical (A - Z)' },
];

function ProductCatalogInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requireAuth = useRequireAuth();
  const { addItem } = useCartStore();

  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = (searchParams.get('sort') as SortOption) || 'featured';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(searchParam);

  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  // Helper to update URL search parameters while keeping state persistent
  const updateParams = (newParams: Record<string, string | number | undefined | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === undefined || val === null || val === '') {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  // Find active root category or active child category
  const { activeCategory, activeParentCategory, isChildActive } = useMemo(() => {
    if (!categoryParam) {
      return { activeCategory: null, activeParentCategory: null, isChildActive: false };
    }

    const lowerSlug = categoryParam.toLowerCase();

    // 1. Direct match on root category
    const root = categories.find((c) => c.slug.toLowerCase() === lowerSlug);
    if (root) {
      return { activeCategory: root, activeParentCategory: root, isChildActive: false };
    }

    // 2. Match on child category
    for (const parent of categories) {
      if (parent.children) {
        const child = parent.children.find((ch) => ch.slug.toLowerCase() === lowerSlug);
        if (child) {
          return { activeCategory: child, activeParentCategory: parent, isChildActive: true };
        }
      }
    }

    return { activeCategory: null, activeParentCategory: null, isChildActive: false };
  }, [categories, categoryParam]);

  const {
    data: productsResponse,
    isLoading: isLoadingProducts,
    isFetching,
  } = useProducts({
    category_id: activeCategory?.id,
    search: searchParam.trim() || undefined,
    page: pageParam,
    per_page: 24,
  });

  const rawProducts = productsResponse?.data || [];
  const pagination = {
    currentPage: productsResponse?.current_page || 1,
    lastPage: productsResponse?.last_page || 1,
    total: productsResponse?.total ?? rawProducts.length,
  };

  // Sort products client-side for immediate responsive sorting
  const sortedProducts = useMemo(() => {
    const list = [...rawProducts];
    if (sortParam === 'price-asc') {
      return list.sort((a, b) => {
        const priceA = a.variants?.[0]?.price ?? 0;
        const priceB = b.variants?.[0]?.price ?? 0;
        return priceA - priceB;
      });
    }
    if (sortParam === 'price-desc') {
      return list.sort((a, b) => {
        const priceA = a.variants?.[0]?.price ?? 0;
        const priceB = b.variants?.[0]?.price ?? 0;
        return priceB - priceA;
      });
    }
    if (sortParam === 'name-asc') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [rawProducts, sortParam]);

  const handleSelectProduct = (product: Product) => {
    router.push(`/products/${product.slug}`);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth(() => {
      addItem(product, { quantity: 1 });
      toast.success(`Added "${product.title}" to Cart`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchInput.trim(), page: undefined });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateParams({ search: undefined, page: undefined });
  };

  const handleSortSelect = (nextSort: SortOption) => {
    updateParams({ sort: nextSort === 'featured' ? undefined : nextSort });
  };

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortParam)?.label || 'Featured / Default';

  const handleSelectRootCategory = (slug: string) => {
    updateParams({ category: slug || undefined, page: undefined });
  };

  const handleSelectChildCategory = (slug: string) => {
    updateParams({ category: slug || undefined, page: undefined });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(searchParam.trim() || categoryParam || sortParam !== 'featured');

  // Headings
  const displayTitle = activeCategory
    ? `${activeCategory.name} Collection`
    : 'All Products';

  const displaySubtitle = activeCategory?.description
    ? activeCategory.description
    : activeCategory
    ? `Browse our curated selection of high-grade ${activeCategory.name.toLowerCase()} essentials.`
    : 'Explore our curated inventory of verified goods, premium textiles, and everyday essentials.';

  return (
    <div className="w-full space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span>Store Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {displayTitle}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
            {displaySubtitle}
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground bg-accent/60 px-3.5 py-1.5 rounded-full border border-border/50">
            {isLoadingProducts
              ? 'Loading products...'
              : `${pagination.total} ${pagination.total === 1 ? 'Product' : 'Products'}`}
          </span>
        </div>
      </div>

      {/* Redesigned Clean & Modern Filter / Category / Sort Panel */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Tier: Primary Category Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Categories
            </span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1 sm:hidden cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </Button>
            )}
          </div>

          {isLoadingCategories ? (
            <CategoryPillsSkeleton count={5} />
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-0.5">
              <button
                type="button"
                onClick={() => handleSelectRootCategory('')}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border shrink-0',
                  !categoryParam
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                )}
              >
                All Products
              </button>

              {categories.map((cat) => {
                const isFamilyActive = activeParentCategory?.id === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectRootCategory(cat.slug)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border shrink-0',
                      isFamilyActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                    )}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Subcategories Refinement Strip (Shown when active parent category has children) */}
          {activeParentCategory &&
            activeParentCategory.children &&
            activeParentCategory.children.length > 0 && (
              <div className="bg-muted/40 dark:bg-muted/20 border border-border/60 rounded-xl p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 transition-all">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0 pl-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                  <span>Subcategories:</span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-1">
                  <button
                    type="button"
                    onClick={() => handleSelectChildCategory(activeParentCategory.slug)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border shrink-0',
                      !isChildActive
                        ? 'bg-secondary text-secondary-foreground border-secondary font-bold shadow-xs'
                        : 'bg-background text-muted-foreground border-border/80 hover:text-foreground hover:border-foreground/30'
                    )}
                  >
                    All {activeParentCategory.name}
                  </button>

                  {activeParentCategory.children.map((child) => {
                    const isChildSelected =
                      categoryParam.toLowerCase() === child.slug.toLowerCase();

                    return (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => handleSelectChildCategory(child.slug)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border shrink-0',
                          isChildSelected
                            ? 'bg-secondary text-secondary-foreground border-secondary font-bold shadow-xs'
                            : 'bg-background text-muted-foreground border-border/80 hover:text-foreground hover:border-foreground/30'
                        )}
                      >
                        {child.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
        </div>

        <Separator className="bg-border/60" />

        {/* Bottom Tier: Search, Sort & Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products by title or description..."
              className="w-full pl-9.5 pr-9 py-2 bg-background text-foreground placeholder:text-muted-foreground border border-border rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-xs h-10"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded-md transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Sort Selector & Reset */}
          <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 gap-2 px-3.5 text-xs font-medium rounded-xl border-border bg-background hover:bg-muted/60 shadow-xs cursor-pointer"
                  />
                }
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-muted-foreground hidden sm:inline">Sort:</span>
                <span className="font-semibold text-foreground">{currentSortLabel}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card text-card-foreground">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground font-medium px-2 py-1.5">
                    Sort products
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = sortParam === opt.value;
                    return (
                      <DropdownMenuItem
                        key={opt.value}
                        onClick={() => handleSortSelect(opt.value)}
                        className={cn(
                          'flex items-center justify-between text-xs cursor-pointer px-2.5 py-2 rounded-md transition-colors',
                          isSelected && 'font-bold text-primary dark:text-secondary'
                        )}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-primary dark:text-secondary" />}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="h-10 px-3 text-xs font-medium rounded-xl text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10 gap-1.5 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            )}
          </div>
        </div>

        {/* Active Filter Chips Strip */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/40 text-xs">
            <span className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wider mr-1">
              Active Filters:
            </span>
            {categoryParam && (
              <Badge
                variant="secondary"
                className="gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg"
              >
                <span>Category: {activeCategory?.name || categoryParam}</span>
                <button
                  type="button"
                  onClick={() => handleSelectRootCategory('')}
                  className="hover:opacity-70 cursor-pointer"
                  aria-label="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {searchParam && (
              <Badge
                variant="secondary"
                className="gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg"
              >
                <span>Search: &ldquo;{searchParam}&rdquo;</span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="hover:opacity-70 cursor-pointer"
                  aria-label="Remove search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {sortParam !== 'featured' && (
              <Badge
                variant="secondary"
                className="gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg"
              >
                <span>Sort: {currentSortLabel}</span>
                <button
                  type="button"
                  onClick={() => handleSortSelect('featured')}
                  className="hover:opacity-70 cursor-pointer"
                  aria-label="Reset sort"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1 cursor-pointer font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Products Grid */}
      {isLoadingProducts ? (
        <ProductGridSkeleton />
      ) : sortedProducts.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={handleQuickAdd}
                onSelectProduct={handleSelectProduct}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.lastPage > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateParams({ page: Math.max(pageParam - 1, 1) })}
                disabled={pageParam <= 1 || isFetching}
                className="gap-1 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <span className="text-xs font-medium text-muted-foreground px-3">
                Page {pageParam} of {pagination.lastPage}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => updateParams({ page: Math.min(pageParam + 1, pagination.lastPage) })}
                disabled={pageParam >= pagination.lastPage || isFetching}
                className="gap-1 text-xs font-semibold"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center space-y-4 bg-card rounded-2xl border border-dashed border-border p-8">
          <div className="w-12 h-12 rounded-full bg-accent/60 flex items-center justify-center mx-auto text-muted-foreground">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No matching products</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {hasActiveFilters
              ? "We couldn't find any products matching your search or active filter criteria."
              : 'There are currently no products available in the catalog.'}
          </p>
          {hasActiveFilters && (
            <Button
              onClick={handleResetFilters}
              className="text-xs font-bold px-6 rounded-lg cursor-pointer"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export function ProductCatalog() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductCatalogInner />
    </Suspense>
  );
}
