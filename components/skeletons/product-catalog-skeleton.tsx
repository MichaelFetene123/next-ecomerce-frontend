import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryPillsSkeleton } from './category-pills-skeleton';
import { ProductGridSkeleton } from './product-grid-skeleton';

export function ProductCatalogSkeleton() {
  return (
    <div className="w-full space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-sm" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
          <Skeleton className="h-9 sm:h-10 w-64 rounded-lg" />
          <Skeleton className="h-4 w-96 max-w-full rounded-md" />
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>
      </div>

      {/* Filter, Category & Sort Toolbar Card Skeleton */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <CategoryPillsSkeleton count={6} />
        </div>
        <div className="h-px bg-border/60" />
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <Skeleton className="h-10 w-full max-w-md rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl self-end sm:self-auto" />
        </div>
      </div>

      {/* Product Grid */}
      <ProductGridSkeleton count={8} />
    </div>
  );
}

