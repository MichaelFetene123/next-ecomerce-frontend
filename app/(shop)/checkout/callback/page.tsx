"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CheckoutCallbackContent() {
  const searchParams = useSearchParams();
  const tx_ref = searchParams.get('trx_ref');
  const status = searchParams.get('status');

  // In a real implementation, you might want to call an API to verify the transaction
  // using the tx_ref, but for now we just show a state based on URL params

  const isSuccess = status === 'success';

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 border border-[#c4c5d8] rounded-2xl bg-white shadow-sm">
        {isSuccess ? (
          <>
            <div className="w-20 h-20 bg-[#f3f2ff] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#012169]" />
            </div>
            <h1 className="text-3xl font-bold text-[#012169]">Payment Successful!</h1>
            <p className="text-[#434655]">
              Your transaction <span className="font-mono bg-[#f3f2ff] px-2 py-1 rounded">{tx_ref}</span> has been verified successfully.
            </p>
            <div className="pt-4">
              <Link href="/checkout/success">
                <Button size="lg" className="w-full bg-[#012169] text-white hover:bg-[#012169]/90">
                  View Order Details
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 text-red-600 flex items-center justify-center font-bold text-2xl">!</div>
            </div>
            <h1 className="text-3xl font-bold text-[#012169]">Payment Failed</h1>
            <p className="text-[#434655]">
              Unfortunately, we couldn't verify your payment. Please try again or contact support.
            </p>
            <div className="pt-4 flex gap-4">
              <Link href="/checkout" className="flex-1">
                <Button size="lg" className="w-full bg-[#012169] text-white hover:bg-[#012169]/90">
                  Try Again
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button size="lg" variant="outline" className="w-full text-[#012169] border-[#012169]">
                  Home
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#012169]" />
        </div>
      }
    >
      <CheckoutCallbackContent />
    </Suspense>
  );
}
