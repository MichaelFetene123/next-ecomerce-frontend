'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Package, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/hooks/use-cart';
import { useUser, useLogout } from '@/hooks/use-auth';
import { useCategories } from '@/hooks/use-categories';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
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
  iconClassName
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
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
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
      className="text-white hover:bg-white/10 hover:text-white rounded-full"
    >
      <Sun className="w-5 h-5 text-[#FDD79A] hidden dark:block" />
      <Moon className="w-5 h-5 block dark:hidden" />
    </Button>
  );
};

export const CheckoutHeader = () => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#012169] text-white shadow-xs">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
        <Link
          href="/"
          className="font-bold text-2xl tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          Storefront
        </Link>
        <div className="flex items-center gap-4 text-white/80">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <span className="font-geist text-sm">Secure Checkout</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItemsCount, setIsOpen } = useCartStore();

  const { data: currentUser, isLoading: isUserLoading } = useUser();
  const logoutMutation = useLogout();
  const { data: categories = [] } = useCategories();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const navLinks = [
    { label: 'Shop', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];


  return (
    <header className="sticky top-0 w-full z-40 bg-[#012169] text-white shadow-xs">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
        {/* Logo & Search */}
        <div className="flex items-center gap-4">
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white rounded-full -ml-2" />}>
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-75 sm:w-100">
                <SheetHeader>
                  <SheetTitle className="text-left text-lg font-bold">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-semibold px-4 py-2 hover:bg-accent rounded-md"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {categories.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <h3 className="font-semibold text-sm text-muted-foreground px-4 mb-2">Categories</h3>
                      <div className="flex flex-col gap-1">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/categories/${cat.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm px-4 py-2 hover:bg-accent rounded-md"
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

          <Link
            href="/"
            className="font-bold text-2xl tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            Storefront
          </Link>

          <SearchForm
            className="hidden md:flex items-center relative ml-4"
            iconClassName="w-4 h-4 text-white/70 absolute left-3"
            inputClassName="w-56 pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/50 rounded-full h-9"
          />
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
                className={`h-full flex items-center text-xs font-semibold px-2 transition-all duration-200 ${isActive
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
          <ThemeToggle />
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
            <Link
              href="/login"
              aria-label="Login"
              title="Sign In"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white hover:bg-white/10 hover:text-white rounded-full")}
            >
              <User className="w-5 h-5" />
            </Link>
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
      <div className="md:hidden bg-[#012169] border-t border-white/20 px-4 py-2">
        <SearchForm
          className="flex items-center relative w-full"
          iconClassName="w-4 h-4 text-white/70 absolute left-3"
          inputClassName="w-full pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/50 rounded-full h-9"
        />
      </div>
    </header>
  );
};
