import React from 'react';
import { CheckoutHeader } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors">
      <CheckoutHeader />
      <main className="flex-1 flex flex-col pt-24 md:pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
