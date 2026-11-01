import { Skeleton } from '@/components/ui/skeleton';
import { ProfileCardSkeleton } from './profile-card-skeleton';
import { AddressListSkeleton } from './address-list-skeleton';
import { RecentOrdersSkeleton } from './recent-orders-skeleton';

export function AccountCenterSkeleton() {
  return (
    <div className="space-y-8 sm:space-y-10 pb-10">
      <div className="space-y-1">
        <Skeleton className="h-7 sm:h-8 w-56 rounded-lg" />
        <Skeleton className="h-4 w-96 max-w-full rounded-md" />
      </div>

      <div className="space-y-8">
        <ProfileCardSkeleton />
        <div className="h-px bg-border/60" />
        <AddressListSkeleton count={2} />
        <div className="h-px bg-border/60" />
        <RecentOrdersSkeleton count={2} />
      </div>
    </div>
  );
}
