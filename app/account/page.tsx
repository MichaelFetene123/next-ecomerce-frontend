"use client";

import React from 'react';
import { useUser } from '@/hooks/use-auth';
import { ProfileCard } from './components/profile-card';
import { AddressList } from './components/address-list';
import { OrderHistory } from './components/order-history';
import { Separator } from '@/components/ui/separator';

export default function AccountProfilePage() {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8 sm:space-y-10 pb-10">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account profile, appearance preferences, and security details.
        </p>
      </div>

      <div className="space-y-8">
        <ProfileCard />
        
        <Separator className="bg-border/60" />
        
        <AddressList />

        <Separator className="bg-border/60" />

        <OrderHistory />
      </div>
    </div>
  );
}
