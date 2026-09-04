'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Package } from 'lucide-react';
import { useCartStore } from '@/hooks/use-cart';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItemsCount, setIsOpen } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Electronics', href: '/categories/electronics' },
    { label: 'Fashion', href: '/categories/fashion' },
    { label: 'Home', href: '/categories/home' },
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
          <div className="flex items-center gap-2 text-white/80">
            <span className="font-geist text-sm">Secure Checkout</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
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
              pathname === link.href ||
              (link.label === 'Fashion' && (pathname === '/' || pathname.includes('fashion') || pathname.includes('products')));

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
          {/* Orders */}
          <Link
            href="/orders"
            aria-label="Order History"
            title="Orders"
            className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <Package className="w-5 h-5" />
          </Link>

          {/* Account */}
          <Link
            href="/account"
            aria-label="User Account"
            title="My Account"
            className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Shopping Cart"
            className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center relative group"
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
