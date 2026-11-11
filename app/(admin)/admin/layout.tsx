import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { AdminGuard } from '@/components/admin/auth/admin-guard';
import { AdminShell } from '@/components/admin/layout/admin-shell';
import { AdminPageSkeleton } from '@/components/skeletons/admin/admin-page-skeleton';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Storefront Management',
  description: 'Administrative console for NextLaravel Ecommerce storefront.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminPageSkeleton />}>
      <AdminGuard fallback={<AdminPageSkeleton />}>
        <AdminShell>{children}</AdminShell>
      </AdminGuard>
    </Suspense>
  );
}

