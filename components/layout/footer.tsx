'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    <footer className="w-full bg-[#001744] text-white border-t border-white/10 mt-auto">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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

      {/* Bottom Bar: Copyright & Security Badges */}
      <div className="border-t border-white/10 bg-[#001235]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © 2025 Storefront Inc. All rights reserved.
          </div>

          {/* Trust Badges matching design */}
          <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-[11px] font-semibold text-white/80">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              <CreditCard className="w-3.5 h-3.5 text-[#FDD79A]" />
              <span>Card Payments</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit Encrypted</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>PCI Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
