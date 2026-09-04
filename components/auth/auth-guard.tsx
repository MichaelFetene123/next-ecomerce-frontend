"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

/**
 * A wrapper component that protects routes.
 * It checks if the user is authenticated. If not, it redirects them to the login page
 * with a redirect parameter pointing back to the current route.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
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
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-[#012169] dark:text-primary animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
