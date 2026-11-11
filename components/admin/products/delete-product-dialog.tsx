"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/catalog';
import { useDeleteProduct } from '@/hooks/admin/products';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteProductDialog({
  product,
  open,
  onOpenChange,
  onSuccess,
}: DeleteProductDialogProps) {
  const deleteProduct = useDeleteProduct();

  if (!product) return null;

  const handleDelete = async () => {
    await deleteProduct.mutateAsync(product.id);
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-2">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-base">
            Delete &quot;{product.title}&quot;?
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            This will permanently delete this product, all its SKU variants, and remove its uploaded media from disk. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteProduct.isPending}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteProduct.isPending}
            className="text-xs font-semibold gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{deleteProduct.isPending ? 'Deleting...' : 'Delete Product'}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

