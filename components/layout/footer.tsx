'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/checkout')) {
    return (
      <footer className="w-full py-6 bg-card border-t border-border mt-auto text-center">
        <p className="text-xs text-muted-foreground">© 2025 Storefront Inc. All rights reserved.</p>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-[#012169] text-white border-t border-white/10 mt-auto">
      {/* Main Footer Links */}
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/15 flex items-center justify-center text-[#FDD79A] border border-white/20">
                <Store className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span>Storefront</span>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              Fintech-grade reliability and seamless modern commerce. Quality verified catalog with secure transactions.
            </p>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-medium">
              <li>
                <Link href="/categories/electronics" className="hover:text-white transition-colors">
                  Electronics & Devices
                </Link>
              </li>
              <li>
                <Link href="/categories/fashion" className="hover:text-white transition-colors">
                  Apparel & Footwear
                </Link>
              </li>
              <li>
                <Link href="/categories/home" className="hover:text-white transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/categories/fashion" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-medium">
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Storefront
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
