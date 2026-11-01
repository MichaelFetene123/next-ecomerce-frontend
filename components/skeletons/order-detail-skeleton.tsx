import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export interface OrderDetailSkeletonProps {
  /**
   * Layout variant to render:
   * - 'detail': Full two-column order detail skeleton matching /orders/[id]
   * - 'list': Order list skeleton with cards matching /orders
   * @default 'detail'
   */
  variant?: 'detail' | 'list';
  /**
   * Number of items/cards to render in list mode
   * @default 3
   */
  count?: number;
}

export function OrderDetailSkeleton({
  variant = 'detail',
  count = 3,
}: OrderDetailSkeletonProps = {}) {
  if (variant === 'list') {
    return (
      <div className="space-y-6">
        {/* Title */}
        <Skeleton className="h-8 w-40 rounded-lg mb-6" />

        <div className="grid gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <Card key={index} className="p-6 border-border bg-card">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 mb-1">
                    <Skeleton className="h-5 w-24 rounded-md" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-36 rounded-md" />
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <Skeleton className="h-4 w-20 rounded-md sm:ml-auto" />
                  <Skeleton className="h-6 w-24 rounded-md sm:ml-auto" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <Skeleton className="h-9 w-28 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <Skeleton className="h-5 w-28 rounded-md" />
        <Skeleton className="h-9 w-36 rounded-md" />
      </div>

      {/* Order Title Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Skeleton className="h-8 md:h-9 w-48 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-36 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-11 w-36 rounded-lg" />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items */}
        <div className="lg:col-span-8">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-none">
            <div className="p-5 border-b border-border bg-muted/50">
              <Skeleton className="h-5 w-32 rounded-md" />
            </div>

            <div className="divide-y divide-border">
              {[1, 2].map((i) => (
                <div key={i} className="p-5 flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted/40 rounded-lg border border-border overflow-hidden shrink-0">
                    <Skeleton className="w-full h-full rounded-none" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <Skeleton className="h-4 w-48 rounded-md" />
                    <Skeleton className="h-3.5 w-16 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-20 rounded-md shrink-0" />
                </div>
              ))}
            </div>

            {/* Totals Summary Footer */}
            <div className="p-6 bg-card border-t border-border flex flex-col items-end gap-3">
              <div className="flex justify-between w-full max-w-60">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              <div className="flex justify-between w-full max-w-60">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
              <div className="flex justify-between w-full max-w-60">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
              <div className="w-full max-w-60 border-t border-dashed border-border my-1" />
              <div className="flex justify-between w-full max-w-60">
                <Skeleton className="h-5 w-14 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Info Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Delivery Address Card */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-none space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-md shrink-0" />
              <Skeleton className="h-5 w-32 rounded-md" />
            </div>
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <Skeleton className="h-3.5 w-36 rounded-md" />
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-none space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-md shrink-0" />
              <Skeleton className="h-5 w-32 rounded-md" />
            </div>
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-3.5 w-48 rounded-md" />
            </div>
          </div>

          {/* Tracking Timeline Card */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-none space-y-4">
            <Skeleton className="h-5 w-36 rounded-md mb-4" />
            <div className="border-l border-border ml-2 pl-4 space-y-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="relative space-y-1">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const OrdersSkeleton = (props: { count?: number }) => (
  <OrderDetailSkeleton variant="list" {...props} />
);

export const OrderListSkeleton = OrdersSkeleton;
