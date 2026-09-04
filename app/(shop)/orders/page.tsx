"use client";

import React from 'react';
import Link from 'next/link';
import { useOrders } from '@/hooks/use-orders';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
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
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-[#c4c5d8]">
        <PackageOpen className="w-16 h-16 text-[#c4c5d8] mb-4" />
        <h2 className="text-xl font-bold text-[#012169] mb-2">No orders yet</h2>
        <p className="text-[#434655] mb-6 max-w-md">
          You haven't placed any orders. Browse our catalog to find what you need.
        </p>
        <Link href="/">
          <Button className="bg-[#012169] text-white hover:bg-[#012169]/90">
            Start Shopping
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#012169] mb-6">Order History</h2>
      
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6 border-[#c4c5d8] hover:border-[#012169] transition-colors">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-[#012169]">Order #{order.id}</span>
                  <Badge className={getStatusColor(order.status)} variant="secondary">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-[#747687]">
                  Placed on {formatDate(order.created_at)}
                </p>
              </div>
              
              <div className="text-left sm:text-right">
                <p className="text-sm text-[#747687] mb-1">Total Amount</p>
                <p className="font-bold text-lg text-[#1a1b24]">{formatCurrency(order.total)}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#f3f2ff]">
              <Link href={`/orders/${order.id}`}>
                <Button variant="outline" className="border-[#012169] text-[#012169] hover:bg-[#fbf8ff]">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
