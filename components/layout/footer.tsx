'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/checkout')) {
    return (
      <footer className="w-full py-6 bg-card border-t border-border mt-auto text-center">
        <div className="max-w-360 mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {currentYear} Storefront Inc. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Lock className="w-3.5 h-3.5 text-[#012169] dark:text-[#FDD79A]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-[#012169] text-white border-t border-white/10 mt-auto">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-6 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/15 flex items-center justify-center text-[#FDD79A] border border-white/20">
                <Store className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span>Storefront</span>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
              Curated marketplace offering verified goods, premium textiles, and everyday essentials with seamless digital checkout.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/15">
              <ShieldCheck className="w-4 h-4 text-[#FDD79A]" />
              <span>Secure Transactions powered by Chapa</span>
            </div>
          </div>

          {/* Shop & Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90">
              Shop Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-medium">
              <li>
                <Link href="/products" className="hover:text-white hover:underline transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="hover:text-white hover:underline transition-colors">
                  Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="hover:text-white hover:underline transition-colors">
                  Electronics & Devices
                </Link>
              </li>
              <li>
                <Link href="/products?category=home" className="hover:text-white hover:underline transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/products?category=sports" className="hover:text-white hover:underline transition-colors">
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Account & Orders */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90">
              Account & Orders
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-medium">
              <li>
                <Link href="/orders" className="hover:text-white hover:underline transition-colors">
                  My Orders & Tracking
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white hover:underline transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white hover:underline transition-colors">
                  Account Profile
                </Link>
              </li>
              <li>
                <Link href="/account/settings" className="hover:text-white hover:underline transition-colors">
                  Account Settings
                </Link>
              </li>
              <li>
                <Link href="/account/appearance" className="hover:text-white hover:underline transition-colors">
                  Appearance & Theme
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {currentYear} Storefront. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-white/80 bg-white/10 px-2.5 py-1 rounded border border-white/10">
              Chapa Pay
            </span>
            <span className="text-[11px] font-semibold text-white/80 bg-white/10 px-2.5 py-1 rounded border border-white/10">
              Telebirr
            </span>
            <span className="text-[11px] font-semibold text-white/80 bg-white/10 px-2.5 py-1 rounded border border-white/10">
              CBE Birr
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
