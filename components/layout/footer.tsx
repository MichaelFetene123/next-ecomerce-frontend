'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/checkout')) {
    return (
      <footer className="w-full py-6 bg-card border-t border-border mt-auto text-center">
        <p className="text-xs text-muted-foreground">© 2024 Storefront. All rights reserved.</p>
      </footer>
    );
  }

  return (
    <footer className="w-full py-12 bg-[#012169] text-white mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-2">
          <p className="text-xs text-white/80 max-w-sm leading-relaxed">
            Premium quality products curated for modern living.<br/>
            Expect nothing less than exceptional design and utility.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-bold text-xs font-geist uppercase text-white mb-3 tracking-wider">
            Links
          </h4>
          <ul className="space-y-2 flex flex-col text-xs text-white/80">
            <li>
              <Link href="/" className="hover:text-white transition-colors hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors hover:underline">
                Support
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors hover:underline">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1 flex flex-col justify-end">
          <div className="text-xs text-white/80 mt-6 md:mt-auto text-right">
            © 2024 Storefront. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
