"use client";

import React from 'react';
import { AuthGuard } from '@/components/auth/auth-guard';

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
