"use client";

import React from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { User, Mail, Phone, Calendar, ShieldCheck, Palette, Settings, Package, Store } from 'lucide-react';

export default function AccountProfilePage() {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="text-base text-muted-foreground mt-1">
          Manage your account profile, appearance preferences, and security details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription className="text-base">Your registered account credentials and contact details</CardDescription>
              </div>
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border/40">
                <User className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-base font-medium text-muted-foreground">Full Name</p>
                  <p className="text-lg font-semibold truncate">{user.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border/40">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-base font-medium text-muted-foreground">Email Address</p>
                  <p className="text-lg font-semibold truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border/40">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-base font-medium text-muted-foreground">Phone Number</p>
                  <p className="text-lg font-semibold truncate">{user.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border/40">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-base font-medium text-muted-foreground">Member Since</p>
                  <p className="text-lg font-semibold truncate">
                    {user.created_at ? formatDate(user.created_at) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-base text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>
                Account status: <span className="font-semibold text-foreground">Active & Secure</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Shortcuts</CardTitle>
            <CardDescription className="text-base">Navigate to other sections</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Link href="/orders" className="block">
              <Button variant="outline" className="w-full justify-start text-base font-medium h-11 gap-3">
                <Package className="w-4 h-4 text-primary" />
                <span>View Orders (In Shop)</span>
              </Button>
            </Link>

            <Link href="/account/appearance" className="block">
              <Button variant="outline" className="w-full justify-start text-base font-medium h-11 gap-3">
                <Palette className="w-4 h-4 text-primary" />
                <span>Appearance & Themes</span>
              </Button>
            </Link>

            <Link href="/account/settings" className="block">
              <Button variant="outline" className="w-full justify-start text-base font-medium h-11 gap-3">
                <Settings className="w-4 h-4 text-primary" />
                <span>Account Settings</span>
              </Button>
            </Link>

            <Link href="/" className="block pt-2 border-t border-border/60">
              <Button variant="ghost" className="w-full justify-start text-base font-medium h-11 gap-3 text-muted-foreground hover:text-foreground">
                <Store className="w-4 h-4" />
                <span>Storefront Catalog</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
