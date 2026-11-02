"use client";

import React, { Suspense } from 'react';
import { useUser } from '@/hooks/use-auth';
import { ProfileCard } from './components/profile-card';
import { AddressList } from './components/address-list';
import { OrderHistory } from './components/order-history';
import { Separator } from '@/components/ui/separator';
import { ProfileCardSkeleton } from '@/components/skeletons/profile-card-skeleton';
import { AddressListSkeleton } from '@/components/skeletons/address-list-skeleton';
import { RecentOrdersSkeleton } from '@/components/skeletons/recent-orders-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

function AccountWelcomeHeader() {
  const { data: user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-56 rounded-md" />
        <Skeleton className="h-4 w-96 max-w-full rounded-md" />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
        Welcome back, {user.name.split(' ')[0]}
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        Manage your account profile, appearance preferences, and security details.
      </p>
    </div>
  );
}

export default function AccountProfilePage() {
  return (
    <div className="space-y-8 sm:space-y-10 pb-10">
      <Suspense
        fallback={
          <div className="space-y-2">
            <Skeleton className="h-8 w-56 rounded-md" />
            <Skeleton className="h-4 w-96 max-w-full rounded-md" />
          </div>
        }
      >
        <AccountWelcomeHeader />
      </Suspense>

      <div className="space-y-8">
        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCard />
        </Suspense>
        
        <Separator className="bg-border/60" />
        
        <Suspense fallback={<AddressListSkeleton count={2} />}>
          <AddressList />
        </Suspense>

        <Separator className="bg-border/60" />

        <Suspense fallback={<RecentOrdersSkeleton count={2} />}>
          <OrderHistory />
        </Suspense>
      </div>
    </div>
  );
}
