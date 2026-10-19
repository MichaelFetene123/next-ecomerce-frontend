'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Sun, Moon, Menu, Store, Lock } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/hooks/use-cart';
import { useUser, useLogout } from '@/hooks/use-auth';
import { useCategories } from '@/hooks/use-categories';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


const SearchForm = ({
  className,
  inputClassName,
  iconClassName,
}: {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className={className}>
      <Search className={iconClassName} />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products, categories..."
        className={inputClassName}
      />
    </form>
  );
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="text-white hover:bg-white/10 hover:text-white rounded-full w-9 h-9"
    >
      <Sun className="w-4 h-4 text-[#FDD79A] hidden dark:block" />
      <Moon className="w-4 h-4 block dark:hidden" />
    </Button>
  );
};

const CartButton = () => {
  const { totalItemsCount, setIsOpen } = useCartStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(true)}
      aria-label={`Shopping Cart, ${totalItemsCount} items`}
      className="text-white hover:bg-white/10 hover:text-white rounded-full relative group w-9 h-9"
    >
      <ShoppingCart className="w-4 h-4 group-active:scale-95 transition-transform" />
      <span className="absolute -top-0.5 -right-0.5 font-bold font-geist text-[9px] w-4 h-4 flex items-center justify-center rounded-full bg-[#FDD79A] text-[#012169] shadow-xs">
        {totalItemsCount > 99 ? '99+' : totalItemsCount}
      </span>
    </Button>
  );
};

export const CheckoutHeader = () => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#012169] text-white shadow-xs">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-360 mx-auto h-18 sm:h-20">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-[#FDD79A] border border-white/20">
            <Store className="w-4 h-4" />
          </div>
          <span>Storefront</span>
        </Link>
        <div className="flex items-center gap-4 text-white/80">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <span className="font-geist text-xs font-semibold tracking-wider uppercase text-white/90">
              Secure Checkout
            </span>
            <Lock className="w-4 h-4 text-[#FDD79A]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: currentUser, isLoading: isUserLoading } = useUser();
  const logoutMutation = useLogout();
  const { data: categories = [] } = useCategories();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 w-full z-40 bg-[#012169] text-white shadow-sm border-b border-white/10">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-360 mx-auto h-18 sm:h-20 gap-3">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile Sheet Trigger */}
            <div className="md:hidden flex items-center">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white rounded-full -ml-2" />}>
                  <Menu className="w-5 h-5" />
                </SheetTrigger>
                <SheetContent side="left" className="w-72 sm:w-80 bg-background text-foreground">
                  <SheetHeader>
                    <SheetTitle className="text-left text-lg font-bold flex items-center gap-2">
                      <Store className="w-5 h-5 text-[#012169] dark:text-[#FDD79A]" />
                      <span>Storefront</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    <nav className="flex flex-col gap-1">
                      {navLinks.map((link) => {
                        const isSelected =
                          link.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(link.href) ||
                              (link.href === '/products' && pathname.startsWith('/categories'));

                        return (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              'text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors',
                              isSelected
                                ? 'bg-[#012169]/10 text-[#012169] dark:bg-white/10 dark:text-[#FDD79A] font-bold'
                                : 'text-foreground/80 hover:bg-accent hover:text-foreground'
                            )}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </nav>

                    {categories.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold text-xs tracking-wider uppercase text-muted-foreground px-4 mb-2">
                          All Categories
                        </h4>
                        <div className="flex flex-col gap-1">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/categories/${cat.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-sm px-4 py-2 hover:bg-accent rounded-lg"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Storefront Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl tracking-tight text-white hover:opacity-95 transition-opacity"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/15 flex items-center justify-center text-[#FDD79A] border border-white/20 shadow-xs">
                <Store className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span>Storefront</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 h-full">
            {navLinks.map((link) => {
              const isSelected =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href) ||
                    (link.href === '/products' && pathname.startsWith('/categories'));

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200',
                    isSelected
                      ? 'bg-white/15 text-[#FDD79A] font-bold shadow-xs'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Center-Right Search Input */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm mx-2">
            <SearchForm
              className="relative w-full"
              iconClassName="w-3.5 h-3.5 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              inputClassName="w-full pl-9 pr-4 py-1.5 bg-white/10 text-white placeholder:text-white/60 border border-white/15 rounded-full text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-white/40 shadow-inner"
            />
          </div>

          {/* Actions: Theme, Cart, Account */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 text-white">
            <ThemeToggle />

            {/* Cart Button */}
            <CartButton />

            {/* Account / User */}
            {isUserLoading ? (
              <Skeleton className="w-8 h-8 rounded-full bg-white/10" />
            ) : currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white rounded-full w-9 h-9" />}>
                  <div className="w-7 h-7 rounded-full bg-[#FDD79A] text-[#012169] flex items-center justify-center text-xs font-bold uppercase shadow-xs">
                    {currentUser.name?.[0] || 'U'}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">{currentUser.name}</p>
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
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'text-white hover:bg-white/10 hover:text-white rounded-lg text-xs font-semibold px-2.5 sm:px-3 h-8 gap-1.5'
                )}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Account</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="lg:hidden bg-[#012169] border-t border-white/10 px-4 py-2">
          <SearchForm
            className="relative w-full"
            iconClassName="w-3.5 h-3.5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            inputClassName="w-full pl-9 pr-3 py-1.5 bg-white/10 text-white placeholder:text-white/60 border border-white/15 rounded-full text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-white/40"
          />
        </div>
      </header>
  );
};
