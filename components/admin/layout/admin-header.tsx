"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, useLogout } from '@/hooks/use-auth';
import { useTheme } from 'next-themes';
import { AdminBreadcrumbs } from './admin-breadcrumbs';
import {
  Menu,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Store,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface AdminHeaderProps {
  onOpenMobileNav: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export function AdminHeader({
  onOpenMobileNav,
  onToggleSidebar,
  isSidebarCollapsed = false,
}: AdminHeaderProps) {
  const router = useRouter();
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <header className="h-16 px-4 md:px-8 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between shrink-0 transition-colors">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onOpenMobileNav}
          className="md:hidden shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <AdminBreadcrumbs
          className="hidden sm:flex"
          onToggleSidebar={onToggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Right: Actions & User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleToggleTheme}
          className="rounded-lg text-muted-foreground hover:text-foreground"
          aria-label="Toggle color theme"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </Button>

        {/* User Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary dark:bg-blue-500/15 dark:border-blue-400/30 dark:text-blue-400 flex items-center justify-center font-bold text-xs uppercase shrink-0">
              {user?.name ? user.name.slice(0, 2) : <UserIcon className="w-4 h-4" />}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-foreground leading-none truncate max-w-28">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight truncate max-w-28 mt-0.5">
                {user?.role === 'admin' ? 'Super Admin' : 'Admin Staff'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60 p-1.5 rounded-xl shadow-lg border-border bg-card text-card-foreground">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-2.5 font-normal">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold leading-none text-foreground truncate">
                      {user?.name || 'Admin'}
                    </p>
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-4">
                      {user?.role === 'admin' ? 'Super Admin' : (user?.role || 'Admin')}
                    </Badge>
                  </div>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              render={<Link href="/account" />}
              className="flex items-center gap-2.5 py-2 px-2.5 text-xs font-medium cursor-pointer"
            >
              <UserIcon className="w-4 h-4 text-muted-foreground" />
              <span>My account</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              render={<Link href="/account/settings" />}
              className="flex items-center gap-2.5 py-2 px-2.5 text-xs font-medium cursor-pointer"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span>Account Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              render={<Link href="/admin/settings" />}
              className="flex items-center gap-2.5 py-2 px-2.5 text-xs font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span>Store Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              render={<Link href="/" target="_blank" rel="noopener noreferrer" />}
              className="flex items-center gap-2.5 py-2 px-2.5 text-xs font-medium cursor-pointer"
            >
              <Store className="w-4 h-4 text-muted-foreground" />
              <span>View Wende Cosmetics</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2.5 py-2 px-2.5 text-xs font-medium text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 dark:text-red-400 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
