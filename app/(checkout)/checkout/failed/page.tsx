"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, RotateCcw, Home, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CheckoutFailedContent() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get('tx_ref') || searchParams.get('trx_ref');
  const orderNumber = searchParams.get('order_number');
  const message = searchParams.get('message') || 'We could not complete your transaction. Your card or account was not charged.';

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-destructive/30">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Payment Failed
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {message}
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
                <span className="text-muted-foreground">Ref:</span>
                <span className="font-semibold text-foreground font-mono text-xs">{txRef}</span>
              </div>
            )}
          </div>
        )}

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={orderNumber ? `/orders` : `/checkout`}>
            <Button size="lg" variant="default" className="w-full sm:w-auto font-bold px-8 h-14">
              <RotateCcw className="w-5 h-5 mr-2" />
              {orderNumber ? 'View Order & Retry' : 'Try Again'}
            </Button>
          </Link>
          <Link href="/orders">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-muted font-bold px-8 h-14">
              <Package className="w-5 h-5 mr-2" />
              My Orders
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto text-muted-foreground hover:text-foreground font-bold px-6 h-14">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 animate-spin text-foreground" />
        </div>
      }
    >
      <CheckoutFailedContent />
    </Suspense>
  );
}

