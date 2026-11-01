"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/auth/auth-guard';
import { useOrders } from '@/hooks/use-orders';
import { OrderDetailSkeleton } from '@/components/skeletons/order-detail-skeleton';

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Start fetching orders in parallel with the auth check (instead of after it)
  // to avoid a sequential /api/me -> /api/orders waterfall. The result is cached
  // and reused by the pages below.
  useOrders();
  const pathname = usePathname();
  const isDetail = pathname !== '/orders' && pathname.startsWith('/orders/');

  return (
    <AuthGuard
      fallback={
        <OrderDetailSkeleton variant={isDetail ? 'detail' : 'list'} />
      }
    >
      {children}
    </AuthGuard>
  );
}
