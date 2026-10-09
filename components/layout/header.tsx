'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Package, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/hooks/use-cart';
import { useUser, useLogout } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItemsCount, setIsOpen } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: currentUser, isLoading: isUserLoading } = useUser();
  const logoutMutation = useLogout();

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '/' },
    { label: 'Orders', href: '/orders' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (pathname?.startsWith('/checkout')) {
    return (
      <header className="fixed top-0 w-full z-40 bg-[#012169] text-white shadow-xs">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-20">
          <Link
            href="/"
            className="font-bold text-2xl tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            Storefront
          </Link>
          <div className="flex items-center gap-4 text-white/80">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode (hotkey: D)`}
                className="text-white hover:bg-white/10 hover:text-white rounded-full"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[#FDD79A]" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            )}
            <div className="flex items-center gap-2">
              <span className="font-geist text-sm">Secure Checkout</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-40 bg-[#012169] text-white shadow-xs">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
        {/* Logo & Search */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-bold text-2xl tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            Storefront
          </Link>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative ml-4"
          >
            <Search className="w-4 h-4 text-white/70 absolute left-3" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-56 pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/50 rounded-full h-9"
            />
          </form>
        </div>

        {/* Nav Categories */}
        <nav className="hidden md:flex items-center gap-6 h-full">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/' || pathname?.startsWith('/categories') || pathname?.startsWith('/products')
                : pathname === link.href || pathname?.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`h-full flex items-center text-xs font-semibold px-2 transition-all duration-200 ${
                  isActive
                    ? 'text-[#FDD79A] border-b-2 border-[#FDD79A]'
                    : 'text-white/75 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Icons / Actions */}
        <div className="flex items-center gap-2 md:gap-4 text-white">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode (hotkey: D)`}
              className="text-white hover:bg-white/10 hover:text-white rounded-full"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-[#FDD79A]" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          )}



          {/* Account */}
          {isUserLoading ? (
            <Skeleton className="w-10 h-10 rounded-full bg-white/10" />
          ) : currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white rounded-full" />}>
                <div className="w-6 h-6 rounded-full bg-[#FDD79A] text-[#012169] flex items-center justify-center text-xs font-bold uppercase">
                  {currentUser.name?.[0] || 'U'}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/account" />}>
                  My account
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/orders" />}>
                  Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer"
                  onClick={() => logoutMutation.mutate()}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              render={<Link href="/login" aria-label="Login" title="Sign In" />}
              className="text-white hover:bg-white/10 hover:text-white rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
          )}

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            aria-label="Shopping Cart"
            className="text-white hover:bg-white/10 hover:text-white rounded-full relative group"
          >
            <ShoppingCart className="w-5 h-5 group-active:scale-[0.98] transition-transform" />
            {totalItemsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 font-bold font-geist text-[10px] w-4 h-4 flex items-center justify-center rounded-full bg-[#FDD79A] text-[#012169]">
                {totalItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden flex items-center bg-[#012169] border-t border-white/20 px-4 py-2 relative">
        <Search className="w-4 h-4 text-white/70 absolute left-6" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
          placeholder="Search products..."
          className="w-full pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/50 rounded-full h-9"
        />
      </div>
    </header>
  );
};
