import { Skeleton } from '@/components/ui/skeleton';
import { ProfileCardSkeleton } from './profile-card-skeleton';

export function AccountCenterSkeleton() {
  return (
    <div className="space-y-8 sm:space-y-10 pb-10">
      <div className="space-y-2">
        <Skeleton className="h-7 sm:h-8 w-56 rounded-lg" />
        <Skeleton className="h-4 w-96 max-w-full rounded" />
      </div>

      <div className="space-y-8">
        <ProfileCardSkeleton />
        <div className="h-px bg-border/60" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-36 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
        <div className="h-px bg-border/60" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-36 rounded" />
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

