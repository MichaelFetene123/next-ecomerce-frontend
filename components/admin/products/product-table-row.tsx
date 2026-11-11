"use client";

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/catalog';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useToggleProductStatus,
  useToggleProductFeatured,
} from '@/hooks/admin/products';
import {
  MoreVertical,
  ExternalLink,
  Edit3,
  Trash2,
  Star,
  Package,
  Layers,
  ArrowUpDown,
} from 'lucide-react';

interface ProductTableRowProps {
  product: Product;
  onEditStock: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductTableRow({
  product,
  onEditStock,
  onDelete,
}: ProductTableRowProps) {
  const toggleStatus = useToggleProductStatus();
  const toggleFeatured = useToggleProductFeatured();

  const defaultVariant = product.variants?.find((v) => v.is_default) || product.variants?.[0];
  const price = defaultVariant?.price ?? 0;
  const compareAtPrice = defaultVariant?.compare_at_price;
  const stock = defaultVariant?.stock_quantity ?? 0;
  const image = getImageUrl(product.images?.[0]?.path);

  const isTogglingStatus = toggleStatus.isPending && toggleStatus.variables === product.id;
  const isTogglingFeatured = toggleFeatured.isPending && toggleFeatured.variables === product.id;

  return (
    <tr className="hover:bg-muted/30 transition-colors group">
      {/* Featured Star */}
      <td className="p-4 pl-4 w-10 text-center">
        <button
          type="button"
          onClick={() => toggleFeatured.mutate(product.id)}
          disabled={isTogglingFeatured}
          title={product.is_featured ? 'Featured item (click to remove)' : 'Mark as featured'}
          className={`p-1 rounded-md transition-colors ${
            product.is_featured
              ? 'text-amber-500 hover:text-amber-600 bg-amber-500/10'
              : 'text-muted-foreground/40 hover:text-amber-500 hover:bg-muted'
          }`}
        >
          <Star
            className={`w-4 h-4 ${product.is_featured ? 'fill-current' : ''} ${
              isTogglingFeatured ? 'animate-pulse' : ''
            }`}
          />
        </button>
      </td>

      {/* Product Image & Title */}
      <td className="p-4 pl-2">
        <div className="flex items-center gap-3 min-w-56">
          <Link
            href={`/admin/products/${product.id}`}
            className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0 border border-border group-hover:border-primary/40 transition-colors"
          >
            <img
              src={image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="min-w-0">
            <Link
              href={`/admin/products/${product.id}`}
              className="font-semibold text-foreground truncate block hover:text-primary transition-colors text-xs"
            >
              {product.title}
            </Link>
            <span className="text-[11px] text-muted-foreground truncate block font-mono">
              /{product.slug}
            </span>
          </div>
        </div>
      </td>

      {/* SKU */}
      <td className="p-4 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
        {defaultVariant?.sku || 'N/A'}
      </td>

      {/* Category */}
      <td className="p-4 text-xs text-muted-foreground whitespace-nowrap">
        <Badge variant="outline" className="text-[10px] font-medium py-0 h-5">
          {product.category?.name || 'Unassigned'}
        </Badge>
      </td>

      {/* Price */}
      <td className="p-4 text-xs whitespace-nowrap">
        <div className="flex items-baseline gap-1.5">
          <span className="font-semibold text-foreground">
            {formatCurrency(price)}
          </span>
          {compareAtPrice && Number(compareAtPrice) > Number(price) && (
            <span className="text-[10px] text-muted-foreground line-through">
              {formatCurrency(compareAtPrice)}
            </span>
          )}
        </div>
      </td>

      {/* Stock Quantity (Interactive) */}
      <td className="p-4 whitespace-nowrap">
        <button
          type="button"
          onClick={() => onEditStock(product)}
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
            stock <= 0
              ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
              : stock <= 5
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
          }`}
          title="Click to adjust stock"
        >
          <span>{stock} units</span>
          <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
        </button>
      </td>

      {/* Status (Clickable Quick Toggle) */}
      <td className="p-4 whitespace-nowrap">
        <button
          type="button"
          onClick={() => toggleStatus.mutate(product.id)}
          disabled={isTogglingStatus}
          className="cursor-pointer"
          title="Click to toggle publish status"
        >
          <Badge
            variant={product.is_active ? 'secondary' : 'outline'}
            className={`text-[10px] font-bold py-0 h-5 transition-opacity ${
              isTogglingStatus ? 'opacity-50' : 'hover:opacity-80'
            }`}
          >
            {product.is_active ? 'Active' : 'Draft'}
          </Badge>
        </button>
      </td>

      {/* Actions */}
      <td className="p-4 pr-6 text-right whitespace-nowrap">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-lg h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="text-xs w-44">
            <DropdownMenuItem
              onClick={() => window.open(`/admin/products/${product.id}`, '_self')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Edit Details</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onEditStock(product)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Adjust Inventory</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => window.open(`/products/${product.slug}`, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              <span>View on Store</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(product)}
              className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Product</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

