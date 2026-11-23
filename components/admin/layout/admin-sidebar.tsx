"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ADMIN_NAV_ITEMS,
  AdminNavItem,
} from '@/components/admin/navigation/admin-nav-items';
import { cn } from '@/lib/utils';
import {
  Shield,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
  className,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: AdminNavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out shrink-0 z-30 select-none',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Brand Header */}
      <div
        className={cn(
          'h-16 border-b border-sidebar-border flex items-center shrink-0',
          isCollapsed ? 'justify-center px-2' : 'px-4'
        )}
      >
        <Link
          href="/admin"
          className={cn(
            'flex items-center overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded-lg',
            isCollapsed ? 'justify-center' : 'gap-3 min-w-0'
          )}
          title="Admin Console"
        >
          <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-secondary" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm tracking-tight text-sidebar-foreground truncate">
                Admin Console
              </span>
              <span className="text-[11px] font-medium text-sidebar-foreground/60 truncate">
                Wende Cosmetics
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
            Menu
          </div>
        )}

        {ADMIN_NAV_ITEMS.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.title : undefined}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all relative',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-xs font-semibold'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isCollapsed && 'justify-center px-2 py-3'
              )}
            >
              <Icon
                className={cn(
                  'w-4.5 h-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110',
                  active ? 'text-secondary' : 'text-sidebar-foreground/60 group-hover:text-sidebar-accent-foreground'
                )}
              />

              {!isCollapsed && (
                <>
                  <span className="truncate flex-1">{item.title}</span>
                  {item.badge !== undefined && (
                    <Badge
                      variant={active ? 'secondary' : 'outline'}
                      className="ml-auto text-[10px] px-1.5 py-0 h-5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}

              {/* Active Indicator Bar on Left */}
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-secondary rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

