"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useOrders } from '@/hooks/use-orders';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { PackageOpen } from 'lucide-react';
import { OrderStatus } from '@/types/order';
import { OrderDetailSkeleton } from '@/components/skeletons/order-detail-skeleton';
import { BackButton } from '@/components/ui/back-button';

function OrdersListContent() {
  const { data: response, isLoading } = useOrders();
  const orders = response?.data || [];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'paid': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  if (isLoading) {
    return <OrderDetailSkeleton variant="list" />;
  }

  if (orders.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-border bg-card">
        <PackageOpen className="w-16 h-16 text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          You haven&apos;t placed any orders. Browse our catalog to find what you need.
        </p>
        <Link
          href="/"
          className={buttonVariants({ variant: "default" })}
        >
          Start Shopping
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <Card key={order.id} className="p-6 border-border hover:border-foreground/40 transition-colors bg-card">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-foreground">Order #{order.id}</span>
                <Badge className={getStatusColor(order.status)} variant="secondary">
                  {order.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <div className="text-right flex sm:flex-col justify-between items-center sm:items-end">
              <span className="text-sm text-muted-foreground sm:hidden">Total:</span>
              <span className="font-bold text-lg text-foreground">{formatCurrency(order.total)}</span>
            </div>
          </div>

          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'item' : 'items'}
            </span>
            <Link
              href={`/orders/${order.id}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-semibold")}
            >
              View Order Details
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <BackButton fallbackHref="/" label="Back to Home" />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Order History</h1>
        <p className="text-sm text-muted-foreground">
          Track, review, and download invoices for all your previous purchases.
        </p>
      </div>
      
      <Suspense fallback={<OrderDetailSkeleton variant="list" />}>
        <OrdersListContent />
      </Suspense>
    </div>
  );
}
