"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useAdminProduct } from '@/hooks/admin/products';
import { ProductForm } from '@/components/admin/products';
import { AdminPageSkeleton } from '@/components/skeletons/admin/admin-page-skeleton';
import { Card } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminProductEditPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { data: product, isLoading, error } = useAdminProduct(id);

  if (isLoading) {
    return <AdminPageSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <Card className="p-8 text-center border-border shadow-none space-y-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-foreground">Product Not Found</h2>
            <p className="text-xs text-muted-foreground">
              The requested product does not exist or has been removed from inventory.
            </p>
          </div>
          <div>
            <Link
              href="/admin/products"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs')}
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Return to Products
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProductForm initialProduct={product} mode="edit" />
    </div>
  );
}
