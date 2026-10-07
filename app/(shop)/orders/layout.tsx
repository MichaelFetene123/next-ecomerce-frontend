"use client";

import React from 'react';
import { AuthGuard } from '@/components/auth/auth-guard';
import { useOrders } from '@/hooks/use-orders';

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Start fetching orders in parallel with the auth check (instead of after it)
  // to avoid a sequential /api/me -> /api/orders waterfall. The result is cached
  // and reused by the pages below.
  useOrders();

  return <AuthGuard>{children}</AuthGuard>;
}
