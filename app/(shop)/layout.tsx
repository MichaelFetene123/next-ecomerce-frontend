'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] dark:bg-background text-foreground transition-colors">
      <Header />
      <main
        className={cn(
          'flex-1 flex flex-col w-full',
          !isHome && 'py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
