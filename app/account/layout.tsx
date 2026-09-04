"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Palette, Settings, LogOut, ArrowLeft, Store } from 'lucide-react';
import { useLogout, useUser } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/components/auth/auth-guard';

const navItems = [
  { name: 'Profile', href: '/account', icon: User, exact: true },
  { name: 'Appearance', href: '/account/appearance', icon: Palette, exact: false },
  { name: 'Settings', href: '/account/settings', icon: Settings, exact: false },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const logout = useLogout();
  const { data: user } = useUser();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Dedicated Account Topbar */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="font-bold text-xl tracking-tight text-primary flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-base">
                  S
                </span>
                Storefront
              </Link>
              <span className="hidden sm:inline-block text-border">/</span>
              <span className="hidden sm:inline-block text-base font-semibold text-muted-foreground tracking-wide">
                Account Center
              </span>
            </div>

            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 text-base font-medium">
                <Store className="w-4 h-4" />
                <span>Return to Store</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Layout Area with Sidebar */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 shrink-0 space-y-6">
              {/* User Profile Card Snapshot */}
              {user && (
                <div className="p-4 rounded-xl bg-card border border-border/70 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-lg truncate">{user.name}</p>
                    <p className="text-base text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Sign Out Action */}
              <div className="pt-4 border-t border-border/60">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 text-base font-medium cursor-pointer"
                  onClick={() => logout.mutate()}
                  disabled={logout.isPending}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {logout.isPending ? 'Signing out...' : 'Sign Out'}
                </Button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
