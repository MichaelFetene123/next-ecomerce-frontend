"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CheckoutCancelledContent() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get('tx_ref') || searchParams.get('trx_ref');
  const orderNumber = searchParams.get('order_number');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/30">
          <XCircle className="w-12 h-12 text-amber-600 dark:text-amber-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Payment Cancelled
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
          You cancelled your payment session on Chapa. Your order is safely preserved, and no charges were made.
        </p>

        {(orderNumber || txRef) && (
          <div className="bg-card border border-border rounded-xl p-4 max-w-md mx-auto text-sm space-y-1 text-left">
            {orderNumber && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order:</span>
                <span className="font-semibold text-foreground font-mono">{orderNumber}</span>
              </div>
            )}
            {txRef && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference:</span>
                <span className="font-semibold text-foreground font-mono text-xs">{txRef}</span>
              </div>
            )}
          </div>
        )}

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={orderNumber ? `/orders` : `/checkout`}>
            <Button size="lg" variant="default" className="w-full sm:w-auto font-bold px-8 h-14">
              <ShoppingBag className="w-5 h-5 mr-2" />
              {orderNumber ? 'View Orders to Complete' : 'Resume Checkout'}
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-muted font-bold px-8 h-14">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCancelledPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 animate-spin text-foreground" />
        </div>
      }
    >
      <CheckoutCancelledContent />
    </Suspense>
  );
}

