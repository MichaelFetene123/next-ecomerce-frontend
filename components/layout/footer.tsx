'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, ShieldCheck, Lock } from 'lucide-react';

const TelegramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // You can set NEXT_PUBLIC_TELEGRAM_URL or NEXT_PUBLIC_TELEGRAM_USERNAME in .env
  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || 'StorefrontOfficial';
  const telegramUrl =
    process.env.NEXT_PUBLIC_TELEGRAM_URL ||
    `https://t.me/${telegramUsername.replace(/^@/, '')}`;

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

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/15">
                <ShieldCheck className="w-4 h-4 text-[#FDD79A]" />
                <span>Secure Payments via Chapa</span>
              </div>

              {/* Telegram Channel Link */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#229ED9]/20 hover:bg-[#229ED9]/35 text-white text-xs font-semibold border border-[#229ED9]/40 hover:border-[#229ED9] transition-all group shadow-xs"
                title={`Join ${telegramUsername} on Telegram`}
              >
                <TelegramIcon className="w-4 h-4 text-[#229ED9] group-hover:scale-110 transition-transform" />
                <span>Telegram Channel</span>
              </a>
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
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors">
                  About Storefront
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Telegram Username & Verified Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {currentYear} Storefront. All rights reserved.</p>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/75 hover:text-white transition-colors"
              title="Connect on Telegram"
            >
              <TelegramIcon className="w-3.5 h-3.5 text-[#229ED9]" />
              <span>@{telegramUsername.replace(/^@/, '')}</span>
            </a>
          </div>

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
