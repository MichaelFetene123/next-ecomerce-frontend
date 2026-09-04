"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Palette, Settings, LogOut, Store } from 'lucide-react';
import { useLogout, useUser } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
        {/* Dedicated Account Topbar matching Shop Header */}
        <header className="sticky top-0 z-30 bg-[#012169] text-white shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <Link
                href="/"
                className="font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
              >
                <span className="w-8 h-8 rounded-lg bg-[#FDD79A] text-[#012169] flex items-center justify-center font-black text-base shrink-0 shadow-xs">
                  S
                </span>
                Storefront
              </Link>
              <Separator orientation="vertical" className="hidden sm:block h-4 bg-white/20 center" />
              <span className="hidden sm:inline-block text-base font-medium text-white/85 tracking-wide truncate">
                Account Center
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium px-2.5 sm:px-3 h-8 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-colors shrink-0"
            >
              <Store className="w-4 h-4 shrink-0 text-[#FDD79A]" />
              <span className="hidden sm:inline">Return to Store</span>
              <span className="sm:hidden">Store</span>
            </Link>
          </div>
        </header>

        {/* Main Layout Area with Sidebar */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-7 md:py-10">
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 shrink-0 space-y-3 sm:space-y-4 md:space-y-6 md:bg-[#012169] md:text-white md:p-5 md:rounded-2xl md:shadow-xs md:border md:border-[#012169]/20">
              {/* User Profile Card Snapshot */}
              {user && (
                <div className="p-3 sm:p-4 rounded-xl bg-[#012169] text-white flex items-center justify-between gap-3 shadow-xs md:p-0 md:bg-transparent md:shadow-none md:rounded-none md:pb-5 md:border-b md:border-white/15">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#FDD79A] text-[#012169] flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-base sm:text-lg truncate text-white">{user.name}</p>
                      <p className="text-sm sm:text-base text-white/75 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Mobile Sign Out Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden text-white/80 hover:text-white hover:bg-white/10 text-sm font-medium shrink-0 h-9 px-2.5"
                    onClick={() => logout.mutate()}
                    disabled={logout.isPending}
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4 mr-1.5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              )}

              {/* Navigation Links: Horizontal on Mobile, Vertical on Desktop */}
              <nav className="flex flex-row overflow-x-auto gap-2 pb-1 md:flex-col md:overflow-x-visible md:space-y-1.5 md:gap-0 md:pb-0 scrollbar-none">
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
                        "inline-flex items-center justify-start gap-2.5 h-10 md:h-11 text-sm sm:text-base font-medium transition-all shrink-0 md:w-full md:gap-3 px-3.5 rounded-lg",
                        isActive
                          ? "bg-[#012169] text-white shadow-xs md:bg-white/15 md:text-white md:shadow-xs"
                          : "bg-card border border-border/70 text-foreground hover:bg-[#012169]/10 hover:text-[#012169] md:bg-transparent md:border-transparent md:text-white/80 md:hover:bg-white/10 md:hover:text-white"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-[#FDD79A]" : "text-muted-foreground md:text-white/60")} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop Sign Out Action */}
              <div className="hidden md:block pt-2">
                <Separator className="bg-white/15 mb-4" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-300 hover:text-red-100 hover:bg-white/10 text-base font-medium cursor-pointer"
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
