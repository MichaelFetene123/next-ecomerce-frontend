'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Store } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function NotFoundView() {
  return (
    <div className="w-full flex-1 flex items-center justify-center py-12 sm:py-20 px-4">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Visual Badge & 404 Graphic */}
        <div className="relative inline-flex flex-col items-center">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FDD79A]/30 dark:bg-[#FDD79A]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#012169]/20 dark:bg-[#012169]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#012169]/10 dark:bg-white/10 border border-[#012169]/20 dark:border-white/15 flex items-center justify-center text-[#012169] dark:text-[#FDD79A] shadow-inner mb-4">
            <Store className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="font-extrabold text-7xl sm:text-8xl md:text-9xl tracking-tighter text-[#012169] dark:text-[#FDD79A] leading-none select-none">
            404
          </div>

          <span className="mt-2 text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground bg-accent/60 px-3.5 py-1 rounded-full border border-border/50">
            Page Not Found
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            We Couldn&apos;t Find That Page
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center justify-center pt-2">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: 'default' }),
              'h-11 px-8 rounded-xl bg-[#012169] text-white hover:bg-[#012169]/90 dark:bg-[#FDD79A] dark:text-[#012169] font-bold text-xs sm:text-sm shadow-md gap-2 active:scale-95 transition-all'
            )}
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
