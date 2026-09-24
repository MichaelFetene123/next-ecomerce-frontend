"use client";

import React from 'react';
import { useOrders } from '@/hooks/use-orders';
import { OrdersSkeleton } from '@/components/skeletons/orders-skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronRight } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function OrderHistory() {
  // Just fetch the first page for the recent order preview
  const { data: response, isLoading, error } = useOrders(1);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Recent Orders</h2>
        <OrdersSkeleton count={2} />
      </div>
    );
  }

  const orders = response?.data || [];

  if (error || orders.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Orders</CardTitle>
          <CardDescription>You haven't placed any orders yet.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Recent Orders</h2>
      </div>

      <div className="grid gap-4">
        {orders.slice(0, 3).map((order) => (
          <Card key={order.id} className="p-4 sm:p-6 border-border bg-card hover:bg-muted/40 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">Order #{order.order_number}</span>
                  <Badge variant={order.status === 'completed' ? 'default' : 'secondary'} className="capitalize ml-2">
                    {order.status.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed on {formatDate(order.created_at)}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1">
                <p className="font-semibold text-base sm:text-lg">{formatCurrency(order.total)}</p>
                <p className="text-sm text-muted-foreground">{order.items?.length || 0} item(s)</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
