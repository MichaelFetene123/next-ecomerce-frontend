import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fbf8ff] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link href="/" className="flex flex-col items-center justify-center text-[#012169]">
          <div className="w-12 h-12 rounded-lg bg-[#012169] text-white flex items-center justify-center font-black text-2xl mb-4 shadow-sm">
            E
          </div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            CorporateStore
          </h2>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>
    </div>
  );
}
