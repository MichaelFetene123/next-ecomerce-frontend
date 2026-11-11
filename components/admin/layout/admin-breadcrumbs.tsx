"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { getAdminBreadcrumb } from '@/components/admin/navigation/admin-nav-items';
import { cn } from '@/lib/utils';

interface AdminBreadcrumbsProps {
  className?: string;
}

export function AdminBreadcrumbs({ className }: AdminBreadcrumbsProps) {
  const pathname = usePathname();
  const breadcrumbs = getAdminBreadcrumb(pathname);

  return (
    <nav
      aria-label="Admin Breadcrumbs"
      className={cn('flex items-center space-x-1.5 text-xs text-muted-foreground', className)}
    >
      <Link
        href="/admin"
        className="flex items-center gap-1 hover:text-foreground transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Admin Home</span>
      </Link>

      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;

        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
            {isLast || !crumb.href ? (
              <span className="font-semibold text-foreground truncate max-w-40 sm:max-w-xs">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-foreground transition-colors truncate max-w-32"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

