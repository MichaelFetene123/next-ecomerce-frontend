"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useOrders } from '@/hooks/use-orders';
import { AdminTableSkeleton } from '@/components/skeletons/admin/admin-table-skeleton';
import { Card } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import {
  ShoppingBag,
  Search,
  RefreshCw,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'cancelled'>('all');
  const [search, setSearch] = useState('');
  const { data: response, isLoading, refetch, isFetching } = useOrders(1);

  const rawOrders = response?.data || [];
  const orders = rawOrders.filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (search && !order.order_number.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold py-0 h-5">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] font-bold py-0 h-5">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="destructive" className="text-[10px] font-bold py-0 h-5">
            <XCircle className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[10px] font-bold py-0 h-5">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Orders Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Track customer checkout orders, fulfillment state, and payment references.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-xs font-medium rounded-xl gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border">
          {(['all', 'pending', 'paid', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order number..."
            className="pl-9 h-9 text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <AdminTableSkeleton rows={5} />
      ) : orders.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-border rounded-xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-foreground">No orders match filter</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {search ? `No orders found matching "${search}".` : 'Customer checkout orders will appear here once placed.'}
          </p>
        </Card>
      ) : (
        <Card className="border-border bg-card shadow-none rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="p-4 pl-6">Order Number</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Tx Ref</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 pl-6 font-mono font-semibold text-foreground">
                      {order.order_number}
                    </td>

                    <td className="p-4 text-muted-foreground">
                      {formatDate(order.created_at)}
                    </td>

                    <td className="p-4">
                      {getStatusBadge(order.status)}
                    </td>

                    <td className="p-4 font-bold text-foreground">
                      {formatCurrency(order.total, order.currency)}
                    </td>

                    <td className="p-4 font-mono text-[11px] text-muted-foreground truncate max-w-36">
                      {order.tx_ref || 'N/A'}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <Link
                        href={`/orders/${order.order_number}`}
                        target="_blank"
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'sm' }),
                          'h-7 text-xs rounded-lg'
                        )}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
