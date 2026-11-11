"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Category, AdminProductFilterParams } from '@/types/catalog';
import { Search, X, RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  categories: Category[];
  filters: AdminProductFilterParams;
  onFilterChange: (newFilters: Partial<AdminProductFilterParams>) => void;
  onReset: () => void;
}

export function ProductFilters({
  categories,
  filters,
  onFilterChange,
  onReset,
}: ProductFiltersProps) {
  const hasActiveFilters = Boolean(
    filters.search ||
    (filters.category_id && filters.category_id !== 'all') ||
    (filters.status && filters.status !== 'all') ||
    (filters.featured && filters.featured !== 'all') ||
    (filters.stock && filters.stock !== 'all') ||
    (filters.sort_by && filters.sort_by !== 'created_at')
  );

  return (
    <div className="space-y-3 bg-card p-4 rounded-xl border border-border">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            value={filters.search ?? ''}
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
            placeholder="Search by title, description, or SKU..."
            className="pl-9 pr-8 h-9 text-xs rounded-lg"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ search: '', page: 1 })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={String(filters.category_id ?? 'all')}
            onChange={(e) =>
              onFilterChange({
                category_id: e.target.value === 'all' ? undefined : Number(e.target.value),
                page: 1,
              })
            }
            className="h-9 px-2.5 py-1 text-xs font-medium rounded-lg border border-input bg-background text-foreground shadow-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={filters.status ?? 'all'}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value as AdminProductFilterParams['status'],
                page: 1,
              })
            }
            className="h-9 px-2.5 py-1 text-xs font-medium rounded-lg border border-input bg-background text-foreground shadow-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
          >
            <option value="all">Status: All</option>
            <option value="active">Active (Published)</option>
            <option value="inactive">Draft / Hidden</option>
          </select>

          {/* Featured Dropdown */}
          <select
            value={filters.featured ?? 'all'}
            onChange={(e) =>
              onFilterChange({
                featured: e.target.value as AdminProductFilterParams['featured'],
                page: 1,
              })
            }
            className="h-9 px-2.5 py-1 text-xs font-medium rounded-lg border border-input bg-background text-foreground shadow-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
          >
            <option value="all">Featured: All</option>
            <option value="featured">Featured Only</option>
            <option value="standard">Standard Only</option>
          </select>

          {/* Stock Dropdown */}
          <select
            value={filters.stock ?? 'all'}
            onChange={(e) =>
              onFilterChange({
                stock: e.target.value as AdminProductFilterParams['stock'],
                page: 1,
              })
            }
            className="h-9 px-2.5 py-1 text-xs font-medium rounded-lg border border-input bg-background text-foreground shadow-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
          >
            <option value="all">Stock: All</option>
            <option value="in_stock">In Stock (&gt; 0)</option>
            <option value="low_stock">Low Stock (≤ 5)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>

          {/* Sort Selector */}
          <select
            value={`${filters.sort_by ?? 'created_at'}:${filters.sort_order ?? 'desc'}`}
            onChange={(e) => {
              const [sort_by, sort_order] = e.target.value.split(':');
              onFilterChange({
                sort_by: sort_by as AdminProductFilterParams['sort_by'],
                sort_order: sort_order as 'asc' | 'desc',
                page: 1,
              });
            }}
            className="h-9 px-2.5 py-1 text-xs font-medium rounded-lg border border-input bg-background text-foreground shadow-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
          >
            <option value="created_at:desc">Newest First</option>
            <option value="created_at:asc">Oldest First</option>
            <option value="title:asc">Title (A to Z)</option>
            <option value="title:desc">Title (Z to A)</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="stock:asc">Stock: Low to High</option>
            <option value="stock:desc">Stock: High to Low</option>
          </select>

          {/* Reset Action */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

