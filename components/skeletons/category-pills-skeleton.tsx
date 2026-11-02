import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoryPillsSkeleton({ count = 5 }: { count?: number }) {
  const widths = ['w-24', 'w-28', 'w-20', 'w-32', 'w-24'];
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-9 ${widths[i % widths.length]} rounded-xl shrink-0 border border-border/40`}
        />
      ))}
    </div>
  );
}
