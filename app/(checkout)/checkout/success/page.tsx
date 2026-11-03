"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart';

function CheckoutSuccessContent() {
  const { clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order_number');
  const txRef = searchParams.get('tx_ref');

  // Clear cart on mount of success page
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Payment Successful!
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Thank you for your purchase. Your payment via Chapa has been confirmed and your order is currently being processed.
        </p>

        {(orderNumber || txRef) && (
          <div className="bg-card border border-border rounded-xl p-4 max-w-md mx-auto text-sm space-y-1 text-left">
            {orderNumber && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-semibold text-foreground font-mono">{orderNumber}</span>
              </div>
            )}
            {txRef && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction Ref:</span>
                <span className="font-semibold text-foreground font-mono text-xs">{txRef}</span>
              </div>
            )}
          </div>
        )}

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/orders">
            <Button size="lg" variant="default" className="w-full sm:w-auto font-bold px-8 h-14">
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 animate-spin text-foreground" />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
