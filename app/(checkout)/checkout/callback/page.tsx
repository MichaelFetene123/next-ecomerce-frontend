"use client";

import React, { Suspense, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, RotateCcw, Package, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVerifyPayment } from '@/hooks/use-checkout';
import { useCartStore } from '@/hooks/use-cart';

function CheckoutCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txRef = searchParams.get('trx_ref') || searchParams.get('tx_ref');
  const urlStatus = searchParams.get('status')?.toLowerCase();

  const { clearCart } = useCartStore();
  const { mutateAsync: verifyPayment } = useVerifyPayment();

  const [state, setState] = useState<'verifying' | 'success' | 'failed' | 'pending' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate triggers in React StrictMode
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Fast-path: User explicitly cancelled on Chapa
    if (urlStatus === 'canceled' || urlStatus === 'cancelled') {
      router.replace(`/checkout/cancelled${txRef ? `?tx_ref=${txRef}` : ''}`);
      return;
    }

    if (!txRef) {
      setState('error');
      setErrorMessage('No transaction reference was provided by the payment gateway.');
      return;
    }

    async function runVerification() {
      try {
        const result = await verifyPayment({ tx_ref: txRef! });

        if (result.status === 'success' || result.order?.status === 'paid' || result.order?.status === 'completed') {
          clearCart();
          const ordNum = result.order?.order_number || '';
          setOrderNumber(ordNum);
          setState('success');
          // Smooth redirect to dedicated success page
          router.replace(`/checkout/success?order_number=${ordNum}&tx_ref=${txRef}`);
        } else if (result.status === 'failed' || result.order?.status === 'failed') {
          const ordNum = result.order?.order_number || '';
          setOrderNumber(ordNum);
          setState('failed');
          router.replace(`/checkout/failed?order_number=${ordNum}&tx_ref=${txRef}`);
        } else {
          // Status is still pending confirmation
          setState('pending');
        }
      } catch (err: any) {
        setState('error');
        setErrorMessage(
          err?.response?.data?.message ||
            err?.message ||
            'Failed to verify payment with the server.'
        );
      }
    }

    runVerification();
  }, [txRef, urlStatus, verifyPayment, clearCart, router]);

  const handleManualRetry = async () => {
    if (!txRef) return;
    setState('verifying');
    try {
      const result = await verifyPayment({ tx_ref: txRef });
      if (result.status === 'success' || result.order?.status === 'paid') {
        clearCart();
        router.replace(`/checkout/success?order_number=${result.order?.order_number || ''}&tx_ref=${txRef}`);
      } else if (result.status === 'failed') {
        router.replace(`/checkout/failed?order_number=${result.order?.order_number || ''}&tx_ref=${txRef}`);
      } else {
        setState('pending');
      }
    } catch (err: any) {
      setState('error');
      setErrorMessage(err?.response?.data?.message || 'Verification inquiry failed.');
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 border border-border rounded-2xl bg-card shadow-sm">
        {state === 'verifying' && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Verifying Payment</h1>
            <p className="text-sm text-muted-foreground">
              Communicating securely with the server to confirm your Chapa transaction...
            </p>
            {txRef && (
              <p className="text-xs font-mono text-muted-foreground bg-muted py-1 px-2 rounded inline-block">
                Ref: {txRef}
              </p>
            )}
          </div>
        )}

        {state === 'success' && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Payment Confirmed!</h1>
            <p className="text-sm text-muted-foreground">
              Redirecting you to your order summary...
            </p>
          </div>
        )}

        {state === 'pending' && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Payment Processing</h1>
            <p className="text-sm text-muted-foreground">
              Your transaction is being confirmed by Chapa. Your order status will update as soon as the gateway notifies us.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Button onClick={handleManualRetry} variant="default" className="w-full font-bold">
                <RotateCcw className="w-4 h-4 mr-2" />
                Check Status Again
              </Button>
              <Link href="/orders">
                <Button variant="outline" className="w-full border-border font-bold">
                  <Package className="w-4 h-4 mr-2" />
                  View Order History
                </Button>
              </Link>
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto border border-destructive/20">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Verification Error</h1>
            <p className="text-sm text-muted-foreground">
              {errorMessage || 'Unable to verify payment status.'}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Button onClick={handleManualRetry} variant="default" className="w-full font-bold">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry Verification
              </Button>
              <Link href="/orders">
                <Button variant="outline" className="w-full border-border font-bold">
                  <Package className="w-4 h-4 mr-2" />
                  Check Orders
                </Button>
              </Link>
            </div>
          </div>
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
          <Loader2 className="w-8 h-8 animate-spin text-foreground" />
        </div>
      }
    >
      <CheckoutCallbackContent />
    </Suspense>
  );
}
