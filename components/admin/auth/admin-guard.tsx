"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/hooks/use-auth';
import { AdminPageSkeleton } from '@/components/skeletons/admin/admin-page-skeleton';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLogout } from '@/hooks/use-auth';

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();
  const { mutate: logout } = useLogout();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirectUrl}`);
    }
  }, [mounted, isLoading, user, router, pathname]);

  // Loading state
  if (!mounted || isLoading || !user) {
    return <>{fallback || <AdminPageSkeleton />}</>;
  }

  // Role check: if authenticated user is not an admin
  const isAdmin = user.role === 'admin';
  if (!isAdmin) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background text-foreground">
        <Card className="max-w-md w-full p-8 text-center border-border shadow-none rounded-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Access Restricted</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your account (<span className="font-semibold text-foreground">{user.email}</span>) does not have administrator privileges required to access the admin portal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 font-medium"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Storefront
            </Button>
            <Button
              variant="destructive"
              className="flex-1 font-medium"
              onClick={() => logout()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}

