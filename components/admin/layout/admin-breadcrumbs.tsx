"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { getAdminBreadcrumb } from '@/components/admin/navigation/admin-nav-items';
import { cn } from '@/lib/utils';

interface AdminBreadcrumbsProps {
  className?: string;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export function AdminBreadcrumbs({
  className,
  onToggleSidebar,
  isSidebarCollapsed = false,
}: AdminBreadcrumbsProps) {
  const pathname = usePathname();
  const breadcrumbs = getAdminBreadcrumb(pathname);

  return (
    <nav
      aria-label="Admin Breadcrumbs"
      className={cn('flex items-center space-x-1.5 text-xs text-muted-foreground', className)}
    >
      {onToggleSidebar ? (
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex items-center justify-center p-1 -ml-1 rounded-md hover:bg-muted/60 hover:text-foreground text-muted-foreground transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
          <span className="sr-only">
            {isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </span>
        </button>
      ) : (
        <Link
          href="/admin"
          className="flex items-center gap-1 hover:text-foreground transition-colors font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Admin Home</span>
        </Link>
      )}

      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;

        return (
          <React.Fragment key={idx}>
            {idx === 0 ? (
              <span className="text-muted-foreground/40 font-light select-none px-0.5" aria-hidden="true">
                |
              </span>
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
            )}
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

