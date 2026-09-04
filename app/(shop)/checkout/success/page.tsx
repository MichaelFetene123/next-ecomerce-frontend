"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore();

  // Clear cart on mount of success page
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="w-24 h-24 bg-[#FDD79A]/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#FDD79A]/40">
          <CheckCircle2 className="w-12 h-12 text-[#012169] dark:text-[#FDD79A]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-[#012169] dark:text-foreground tracking-tight">
          Order Confirmed!
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Thank you for your purchase. Your order has been received and is currently being processed. You will receive an email confirmation shortly.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/orders">
            <Button size="lg" className="w-full sm:w-auto bg-[#012169] text-white hover:bg-[#012169]/90 font-bold px-8 h-14">
              <Package className="w-5 h-5 mr-2" />
              View Order History
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-muted font-bold px-8 h-14">
              Continue Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
