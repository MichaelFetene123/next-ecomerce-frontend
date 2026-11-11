"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/hooks/use-products';
import { AdminTableSkeleton } from '@/components/skeletons/admin/admin-table-skeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import {
  Package,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const { data: response, isLoading, refetch, isFetching } = useProducts({
    search: search.trim() || undefined,
    per_page: 15,
  });

  const products = response?.data || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Products
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your product inventory, SKU variants, and pricing catalog.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-xs font-medium rounded-xl gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button
            size="sm"
            className="text-xs font-semibold rounded-xl gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title or SKU..."
            className="pl-9 h-9 text-xs rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs rounded-xl gap-1.5 h-9">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {/* Products Table or Skeleton */}
      {isLoading ? (
        <AdminTableSkeleton rows={6} />
      ) : products.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-border rounded-xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-foreground">No products found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {search ? `No results match "${search}". Try adjusting your query.` : 'Start adding products to populate your catalog.'}
          </p>
        </Card>
      ) : (
        <Card className="border-border bg-card shadow-none rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="p-4 pl-6">Product</th>
                  <th className="p-4">SKU / Variant</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {products.map((product) => {
                  const defaultVariant = product.variants?.find((v) => v.is_default) || product.variants?.[0];
                  const price = defaultVariant?.price ?? 0;
                  const stock = defaultVariant?.stock_quantity ?? 0;
                  const image = getImageUrl(product.images?.[0]?.path);

                  return (
                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3 min-w-48">
                          <img
                            src={image}
                            alt={product.title}
                            className="w-10 h-10 rounded-lg object-cover bg-muted shrink-0 border border-border"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-foreground truncate block">
                              {product.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground truncate block">
                              /{product.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-[11px] text-muted-foreground">
                        {defaultVariant?.sku || 'N/A'}
                      </td>

                      <td className="p-4 text-muted-foreground">
                        {product.category?.name || 'Unassigned'}
                      </td>

                      <td className="p-4 font-semibold text-foreground">
                        {formatCurrency(price)}
                      </td>

                      <td className="p-4">
                        <span
                          className={`font-semibold ${
                            stock <= 0
                              ? 'text-destructive'
                              : stock <= 5
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-foreground'
                          }`}
                        >
                          {stock} in stock
                        </span>
                      </td>

                      <td className="p-4">
                        <Badge
                          variant={product.is_active ? 'secondary' : 'outline'}
                          className="text-[10px] font-bold py-0 h-5"
                        >
                          {product.is_active ? 'Active' : 'Draft'}
                        </Badge>
                      </td>

                      <td className="p-4 pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button variant="ghost" size="icon-sm" className="rounded-lg">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align="end" className="text-xs">
                            <DropdownMenuItem
                              onClick={() => window.open(`/products/${product.slug}`, '_blank', 'noopener,noreferrer')}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>View on Store</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                              Archive Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {products.length} products</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="h-8 text-xs rounded-lg">
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled className="h-8 text-xs rounded-lg">
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
