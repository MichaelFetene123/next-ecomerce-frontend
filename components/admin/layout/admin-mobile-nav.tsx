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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Shield, Store, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminMobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminMobileNav({ open, onOpenChange }: AdminMobileNavProps) {
  const pathname = usePathname();

  const isItemActive = (item: AdminNavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  const handleNavigate = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        {/* Header */}
        <SheetHeader className="h-16 px-6 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex flex-col text-left">
              <SheetTitle className="font-bold text-sm text-sidebar-foreground">
                Admin Console
              </SheetTitle>
              <span className="text-[11px] font-medium text-sidebar-foreground/60">
                NextLaravel Ecommerce
              </span>
            </div>
          </div>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
            Menu
          </div>

          {ADMIN_NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavigate}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all relative',
                  active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-xs'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 shrink-0',
                    active ? 'text-secondary' : 'text-sidebar-foreground/60'
                  )}
                />
                <span className="truncate flex-1">{item.title}</span>
                {item.badge !== undefined && (
                  <Badge
                    variant={active ? 'secondary' : 'outline'}
                    className="ml-auto text-xs px-2 py-0.5"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/30 space-y-2 shrink-0">
          <Link
            href="/"
            onClick={handleNavigate}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Store className="w-4 h-4 text-sidebar-foreground/60" />
              <span>View Storefront</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

