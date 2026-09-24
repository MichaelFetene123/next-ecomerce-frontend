"use client";

import React from 'react';
import { useAddresses } from '@/hooks/use-addresses';
import { AddressListSkeleton } from '@/components/skeletons/address-list-skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export function AddressList() {
  const { data: addresses, isLoading, error } = useAddresses();

  if (isLoading) {
    return <AddressListSkeleton count={2} />;
  }

  if (error || !addresses || addresses.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Saved Addresses</CardTitle>
          <CardDescription>You have not saved any addresses yet.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">Saved Addresses</CardTitle>
        <CardDescription className="text-sm sm:text-base mt-0.5">
          Manage your shipping and billing addresses
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className="bg-muted/40 border border-border/40">
              <CardContent className="p-4 flex gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold truncate">
                      {address.first_name} {address.last_name}
                    </p>
                    {address.is_default && (
                      <Badge variant="secondary" className="text-xs">Default</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{address.phone}</p>
                  <p className="text-sm text-muted-foreground truncate">{address.address_line_1}</p>
                  {address.address_line_2 && (
                    <p className="text-sm text-muted-foreground truncate">{address.address_line_2}</p>
                  )}
                  <p className="text-sm text-muted-foreground truncate">
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{address.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
