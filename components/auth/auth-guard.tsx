"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * A wrapper component that protects routes.
 * It checks if the user is authenticated. If not, it redirects them to the login page
 * with a redirect parameter pointing back to the current route.
 */
export function AuthGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirectUrl}`);
    }
  }, [user, isLoading, router, pathname, mounted]);

  if (!mounted || isLoading || !user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-72 rounded-xl" />
          <Skeleton className="lg:col-span-1 h-72 rounded-xl" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
