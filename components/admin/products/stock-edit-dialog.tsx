"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/catalog';
import { useUpdateProductStock } from '@/hooks/admin/products';
import { Minus, Plus, PackageCheck } from 'lucide-react';

interface StockEditDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StockEditDialog({
  product,
  open,
  onOpenChange,
}: StockEditDialogProps) {
  const defaultVariant = product?.variants?.find((v) => v.is_default) || product?.variants?.[0];
  const [stock, setStock] = useState<number>(defaultVariant?.stock_quantity ?? 0);
  const updateStock = useUpdateProductStock();

  useEffect(() => {
    if (product) {
      const v = product.variants?.find((item) => item.is_default) || product.variants?.[0];
      setStock(v?.stock_quantity ?? 0);
    }
  }, [product]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    await updateStock.mutateAsync({
      id: product.id,
      stock_quantity: Math.max(0, stock),
    });

    onOpenChange(false);
  };

  const adjustStock = (delta: number) => {
    setStock((prev) => Math.max(0, prev + delta));
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <PackageCheck className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Quick Inventory Adjustment</span>
          </div>
          <DialogTitle className="text-base truncate">
            {product.title}
          </DialogTitle>
          <DialogDescription className="text-xs">
            SKU: <span className="font-mono font-medium text-foreground">{defaultVariant?.sku || 'N/A'}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="stock_input" className="text-xs font-semibold">
              Available Units in Stock
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustStock(-1)}
                disabled={stock <= 0}
                className="h-10 w-10 shrink-0"
              >
                <Minus className="w-4 h-4" />
              </Button>

              <Input
                id="stock_input"
                type="number"
                min="0"
                value={isNaN(stock) ? '' : stock}
                onChange={(e) => setStock(Math.max(0, parseInt(e.target.value) || 0))}
                className="text-center font-mono text-base font-bold h-10"
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustStock(1)}
                className="h-10 w-10 shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {[
                { label: '-5', delta: -5 },
                { label: '+5', delta: 5 },
                { label: '+10', delta: 10 },
                { label: '+25', delta: 25 },
                { label: '+50', delta: 50 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => adjustStock(preset.delta)}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-muted hover:bg-muted/80 text-foreground transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateStock.isPending}
              className="text-xs font-semibold bg-primary text-primary-foreground"
            >
              {updateStock.isPending ? 'Updating...' : 'Save Inventory'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

