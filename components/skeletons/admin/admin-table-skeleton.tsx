import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Card className="border-border bg-card shadow-none rounded-xl overflow-hidden">
      {/* Table Toolbar Skeleton */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/60">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton className="h-4 w-48 rounded-md" />
                <Skeleton className="h-3 w-32 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-4 w-20 rounded-md hidden md:block" />
            <Skeleton className="h-4 w-24 rounded-md hidden sm:block" />
            <Skeleton className="h-6 w-16 rounded-full shrink-0" />
            <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <Skeleton className="h-4 w-32 rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </Card>
  );
}

