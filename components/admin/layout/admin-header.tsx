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
  Shield,
  Store,
  Settings,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
  onOpenMobileNav: () => void;
}

export function AdminHeader({ onOpenMobileNav }: AdminHeaderProps) {
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

        <AdminBreadcrumbs className="hidden sm:flex" />
      </div>

      {/* Right: Actions & User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick link to Storefront */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'hidden lg:inline-flex items-center gap-1.5 h-8 text-xs font-semibold rounded-lg'
          )}
        >
          <Store className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Storefront</span>
        </Link>

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
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase shrink-0">
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
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl shadow-lg border-border">
            <DropdownMenuLabel className="p-2 font-normal">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold leading-none text-foreground truncate">
                    {user?.name || 'Admin'}
                  </p>
                  <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-4">
                    {user?.role || 'admin'}
                  </Badge>
                </div>
                <p className="text-[11px] leading-none text-muted-foreground truncate">
                  {user?.email || 'admin@example.com'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => router.push('/admin/settings')}
              className="flex items-center gap-2 text-xs py-2 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Admin Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push('/account')}
              className="flex items-center gap-2 text-xs py-2 cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-muted-foreground" />
              <span>My Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2 text-xs py-2 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Open Storefront</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs py-2 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
