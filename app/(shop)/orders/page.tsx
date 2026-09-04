"use client";

import React from 'react';
import Link from 'next/link';
import { useOrders } from '@/hooks/use-orders';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { PackageOpen } from 'lucide-react';
import { OrderStatus } from '@/types/order';
import { OrdersSkeleton } from '@/components/skeletons/orders-skeleton';

export default function OrdersPage() {
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
    return <OrdersSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-border bg-card">
        <PackageOpen className="w-16 h-16 text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-bold text-[#012169] dark:text-foreground mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          You haven't placed any orders. Browse our catalog to find what you need.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-[#012169] text-white hover:bg-[#012169]/90"
          )}
        >
          Start Shopping
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#012169] dark:text-foreground mb-6">Order History</h2>
      
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6 border-border hover:border-foreground/40 transition-colors bg-card">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-[#012169] dark:text-foreground">Order #{order.id}</span>
                  <Badge className={getStatusColor(order.status)} variant="secondary">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed on {formatDate(order.created_at)}
                </p>
              </div>
              
              <div className="text-left sm:text-right">
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="font-bold text-lg text-foreground">{formatCurrency(order.total)}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Link
                href={`/orders/${order.id}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-border text-foreground hover:bg-muted"
                )}
              >
                View Details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
