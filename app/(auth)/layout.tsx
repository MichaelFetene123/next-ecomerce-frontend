import React from 'react';
import Link from 'next/link';
import { Store } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link href="/" className="flex flex-col items-center justify-center text-foreground group">
          <div className="w-12 h-12 rounded-xl bg-primary text-secondary flex items-center justify-center mb-4 shadow-sm group-hover:opacity-95 transition-opacity">
            <Store className="w-6 h-6" />
          </div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            Storefront
          </h2>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>
    </div>
  );
}
