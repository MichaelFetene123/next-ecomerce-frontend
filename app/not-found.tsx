import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NotFoundView } from '@/components/layout/not-found-view';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Storefront',
  description: 'The requested page could not be found. Return to Home or browse products.',
};

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] dark:bg-background text-foreground transition-colors">
      <Header />
      <main className="flex-1 flex flex-col w-full py-8 px-4 sm:px-6 lg:px-8 max-w-360 mx-auto">
        <NotFoundView />
      </main>
      <Footer />
    </div>
  );
}
