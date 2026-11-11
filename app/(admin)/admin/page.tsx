"use client";

import React from 'react';
import Link from 'next/link';
import { useAdminDashboardMetrics } from '@/hooks/admin/use-admin-dashboard';
import { AdminStatsSkeleton } from '@/components/skeletons/admin/admin-stats-skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  FolderTree,
  CreditCard,
  ArrowUpRight,
  ExternalLink,
  Store,
  ChevronRight,
} from 'lucide-react';
import { ADMIN_NAV_ITEMS } from '@/components/admin/navigation/admin-nav-items';

export default function AdminDashboardPage() {
  const { data: metrics, isLoading } = useAdminDashboardMetrics();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time business performance, order processing, and catalog status.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      {isLoading ? (
        <AdminStatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue */}
          <Card className="p-5 border-border bg-card shadow-none rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Total Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {formatCurrency(metrics?.totalRevenue ?? 0)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{metrics?.growthRates.revenue}%</span>
              <span className="text-muted-foreground font-normal">vs previous period</span>
            </div>
          </Card>

          {/* Orders */}
          <Card className="p-5 border-border bg-card shadow-none rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Orders Placed</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {metrics?.totalOrders ?? 0}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{metrics?.growthRates.orders}%</span>
              <span className="text-muted-foreground font-normal">order velocity</span>
            </div>
          </Card>

          {/* Active Products */}
          <Card className="p-5 border-border bg-card shadow-none rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Active Catalog</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {metrics?.totalProducts ?? 0}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <span>{metrics?.totalCategories ?? 0} Categories active</span>
            </div>
          </Card>

          {/* Customers */}
          <Card className="p-5 border-border bg-card shadow-none rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Payment Gateways</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              Chapa Active
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online & Verifying</span>
            </div>
          </Card>
        </div>
      )}

      {/* Module Shortcuts Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Management Modules</h2>
          <span className="text-xs text-muted-foreground">Quick access to store operational modules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADMIN_NAV_ITEMS.filter((item) => item.href !== '/admin').map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.href}
                className="group p-5 border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all rounded-xl"
              >
                <Link href={item.href} className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* System Status Banner */}
      <Card className="p-6 border-border bg-muted/40 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-foreground">Storefront Integration</h3>
            <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-4">
              Connected
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            The customer-facing storefront is operating at <code className="text-xs bg-muted px-1.5 py-0.5 rounded">localhost:3000</code>.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'rounded-lg gap-2 text-xs font-semibold shrink-0'
          )}
        >
          <span>Open Public Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </Card>
    </div>
  );
}
