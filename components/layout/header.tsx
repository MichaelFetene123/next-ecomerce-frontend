'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Package, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/hooks/use-cart';
import { useUser, useLogout } from '@/hooks/use-auth';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItemsCount, setIsOpen } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: currentUser } = useUser();
  const logoutMutation = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode (hotkey: D)`}
                className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer text-white"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[#FDD79A]" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
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
            className="hidden md:flex items-center bg-white/10 rounded-full px-3 py-1.5 border border-white/20 ml-4 focus-within:border-white/50 transition-colors"
          >
            <Search className="w-4 h-4 text-white/70 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent border-none outline-none text-xs w-56 placeholder-white/70 text-white focus:ring-0"
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
            <button 
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode (hotkey: D)`}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-[#FDD79A]" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}



          {/* Account */}
          {currentUser ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="User Menu"
                title="My Account"
                className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#FDD79A] text-[#012169] flex items-center justify-center text-xs font-bold uppercase">
                  {currentUser.name?.[0] || 'U'}
                </div>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 text-sm text-gray-700 dark:text-gray-200 ring-1 ring-black/5 z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My account
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    type="button"
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                    onClick={() => {
                      setIsMenuOpen(false);
                      logoutMutation.mutate();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              aria-label="Login"
              title="Sign In"
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <User className="w-5 h-5" />
            </Link>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Shopping Cart"
            className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center relative group cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 group-active:scale-[0.98] transition-transform" />
            {totalItemsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 -mt-1 -mr-1 font-bold font-geist text-[10px] w-4 h-4 flex items-center justify-center rounded-full bg-[#FDD79A] text-[#012169]">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden flex items-center bg-[#012169] border-t border-white/20 px-4 py-2">
        <Search className="w-4 h-4 text-white/70 mr-2 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
          placeholder="Search products..."
          className="bg-transparent border-none outline-none text-xs w-full placeholder-white/70 text-white focus:ring-0"
        />
      </div>
    </header>
  );
};
