"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminProducts } from '@/hooks/admin/products';
import { useCategories } from '@/hooks/use-categories';
import { AdminProductFilterParams, Product } from '@/types/catalog';
import {
  ProductStatsCards,
  ProductFilters,
  ProductTableRow,
  StockEditDialog,
  DeleteProductDialog,
} from '@/components/admin/products';
import { AdminTableSkeleton } from '@/components/skeletons/admin/admin-table-skeleton';
import { Card } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Package,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [filters, setFilters] = useState<AdminProductFilterParams>({
    page: 1,
    per_page: 15,
    search: '',
    category_id: undefined,
    status: 'all',
    featured: 'all',
    stock: 'all',
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  const { data: categories = [] } = useCategories();
  const { data: response, isLoading, refetch, isFetching } = useAdminProducts(filters);

  // Dialog states
  const [stockProduct, setStockProduct] = useState<Product | null>(null);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);

  const [deleteProductTarget, setDeleteProductTarget] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const products = response?.data || [];
  const stats = response?.stats;
  const currentPage = response?.current_page ?? 1;
  const lastPage = response?.last_page ?? 1;
  const total = response?.total ?? 0;
  const from = response?.from ?? 0;
  const to = response?.to ?? 0;

  const handleFilterChange = (newFilters: Partial<AdminProductFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      per_page: 15,
      search: '',
      category_id: undefined,
      status: 'all',
      featured: 'all',
      stock: 'all',
      sort_by: 'created_at',
      sort_order: 'desc',
    });
  };

  const handleOpenStockDialog = (product: Product) => {
    setStockProduct(product);
    setIsStockDialogOpen(true);
  };

  const handleOpenDeleteDialog = (product: Product) => {
    setDeleteProductTarget(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Product Inventory
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your store catalog, pricing models, stock levels, and product media.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-xs font-medium rounded-xl gap-1.5 h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Link
            href="/admin/products/new"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'text-xs font-semibold rounded-xl gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-9'
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <ProductStatsCards
        stats={stats}
        currentFilter={{
          status: filters.status,
          featured: filters.featured,
          stock: filters.stock,
        }}
        onSelectQuickFilter={(quickFilter) => {
          handleFilterChange({ ...quickFilter, page: 1 });
        }}
      />

      {/* Filter and Search Controls */}
      <ProductFilters
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Products Data Table or Loading Skeleton */}
      {isLoading ? (
        <AdminTableSkeleton rows={8} />
      ) : products.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-border rounded-xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-foreground">No matching products</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {filters.search || filters.category_id || filters.status !== 'all' || filters.stock !== 'all'
                ? 'Try clearing active filters or adjusting your search keyword.'
                : 'Your catalog is empty. Create your first product to start selling.'}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            {(filters.search || filters.category_id || filters.status !== 'all' || filters.stock !== 'all') ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs rounded-lg"
              >
                Clear Filters
              </Button>
            ) : (
              <Link
                href="/admin/products/new"
                className={cn(
                  buttonVariants({ size: 'sm' }),
                  'text-xs font-semibold rounded-lg bg-primary text-primary-foreground'
                )}
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                <span>Create First Product</span>
              </Link>
            )}
          </div>
        </Card>
      ) : (
        <Card className="border-border bg-card shadow-none rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="p-4 pl-4 w-10 text-center">★</th>
                  <th className="p-4 pl-2">Product</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {products.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    onEditStock={handleOpenStockDialog}
                    onDelete={handleOpenDeleteDialog}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>
              Showing <span className="font-semibold text-foreground">{from}</span> to{' '}
              <span className="font-semibold text-foreground">{to}</span> of{' '}
              <span className="font-semibold text-foreground">{total}</span> items
            </div>

            <div className="flex items-center gap-2">
              <select
                value={String(filters.per_page ?? 15)}
                onChange={(e) =>
                  handleFilterChange({ per_page: Number(e.target.value), page: 1 })
                }
                className="h-8 px-2 text-xs rounded-lg border border-input bg-background text-foreground"
              >
                <option value="10">10 / page</option>
                <option value="15">15 / page</option>
                <option value="25">25 / page</option>
                <option value="50">50 / page</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange({ page: Math.max(1, currentPage - 1) })}
                disabled={currentPage <= 1 || isFetching}
                className="h-8 px-2.5 text-xs rounded-lg gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </Button>

              <span className="font-mono text-xs px-2">
                Page {currentPage} of {lastPage}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange({ page: Math.min(lastPage, currentPage + 1) })}
                disabled={currentPage >= lastPage || isFetching}
                className="h-8 px-2.5 text-xs rounded-lg gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Stock Edit Modal */}
      <StockEditDialog
        product={stockProduct}
        open={isStockDialogOpen}
        onOpenChange={setIsStockDialogOpen}
      />

      {/* Delete Product Modal */}
      <DeleteProductDialog
        product={deleteProductTarget}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  );
}
