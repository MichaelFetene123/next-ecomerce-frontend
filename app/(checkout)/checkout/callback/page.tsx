"use client";

import React, { Suspense, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, RotateCcw, Package, CheckCircle2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVerifyPayment } from '@/hooks/use-checkout';
import { useCartStore } from '@/hooks/use-cart';

function CheckoutCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract reference from any of the standard query parameter variants used by Chapa/gateways
  const txRefFromUrl =
    searchParams.get('tx_ref') ||
    searchParams.get('trx_ref') ||
    searchParams.get('reference') ||
    searchParams.get('ref_id') ||
    searchParams.get('ref') ||
    searchParams.get('transaction_id') ||
    undefined;

  const orderNumberFromUrl =
    searchParams.get('order_number') ||
    searchParams.get('order_id') ||
    undefined;

  const urlStatus = searchParams.get('status')?.toLowerCase();

  const { clearCart } = useCartStore();
  const { mutateAsync: verifyPayment } = useVerifyPayment();

  const [state, setState] = useState<'verifying' | 'success' | 'failed' | 'pending' | 'missing' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeTxRef, setActiveTxRef] = useState<string | undefined>(txRefFromUrl);
  const [orderNumber, setOrderNumber] = useState<string | undefined>(orderNumberFromUrl);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Retrieve fallback references from client-side sessionStorage in case the gateway stripped URL params
    const storedTxRef = typeof window !== 'undefined' ? sessionStorage.getItem('chapa_pending_tx_ref') || undefined : undefined;
    const storedOrderNumber = typeof window !== 'undefined' ? sessionStorage.getItem('chapa_pending_order_number') || undefined : undefined;

    const effectiveTxRef = txRefFromUrl || storedTxRef;
    const effectiveOrderNumber = orderNumberFromUrl || storedOrderNumber;

    setActiveTxRef(effectiveTxRef);
    setOrderNumber(effectiveOrderNumber);

    // Fast-path: Explicit cancellation reported by gateway
    if (urlStatus === 'canceled' || urlStatus === 'cancelled') {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('chapa_pending_tx_ref');
        sessionStorage.removeItem('chapa_pending_order_number');
      }
      router.replace(
        `/checkout/cancelled${effectiveTxRef ? `?tx_ref=${effectiveTxRef}` : ''}${effectiveOrderNumber ? `&order_number=${effectiveOrderNumber}` : ''}`
      );
      return;
    }

    async function runVerification() {
      try {
        // Send whatever reference context we have (tx_ref or order_number).
        // If neither is present, backend will resolve the user's latest pending order.
        const result = await verifyPayment({
          tx_ref: effectiveTxRef,
          order_number: effectiveOrderNumber,
        });

        // Always clean up pending session keys upon receiving backend verdict
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('chapa_pending_tx_ref');
          sessionStorage.removeItem('chapa_pending_order_number');
        }

        const resolvedOrdNum = result.order?.order_number || effectiveOrderNumber || '';
        const resolvedTx = result.payment?.tx_ref || result.order?.tx_ref || effectiveTxRef || '';

        setOrderNumber(resolvedOrdNum);
        setActiveTxRef(resolvedTx);

        if (result.status === 'success' || result.order?.status === 'paid' || result.order?.status === 'completed') {
          clearCart();
          setState('success');
          router.replace(
            `/checkout/success?order_number=${resolvedOrdNum}&tx_ref=${resolvedTx}`
          );
        } else if (result.status === 'failed' || result.order?.status === 'failed') {
          setState('failed');
          router.replace(
            `/checkout/failed?order_number=${resolvedOrdNum}&tx_ref=${resolvedTx}`
          );
        } else {
          // Status is still pending confirmation from Chapa
          setState('pending');
        }
      } catch (err: any) {
        if (err?.status === 404) {
          // Neither URL, session, nor DB had an active pending order for this customer
          setState('missing');
        } else {
          setState('error');
          setErrorMessage(
            err?.response?.data?.message ||
              err?.message ||
              'Unable to verify payment with the server.'
          );
        }
      }
    }

    runVerification();
  }, [txRefFromUrl, orderNumberFromUrl, urlStatus, verifyPayment, clearCart, router]);

  const handleManualRetry = async () => {
    setState('verifying');
    try {
      const result = await verifyPayment({
        tx_ref: activeTxRef,
        order_number: orderNumber,
      });

      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('chapa_pending_tx_ref');
        sessionStorage.removeItem('chapa_pending_order_number');
      }

      const resolvedOrdNum = result.order?.order_number || orderNumber || '';
      const resolvedTx = result.payment?.tx_ref || result.order?.tx_ref || activeTxRef || '';

      if (result.status === 'success' || result.order?.status === 'paid') {
        clearCart();
        router.replace(
          `/checkout/success?order_number=${resolvedOrdNum}&tx_ref=${resolvedTx}`
        );
      } else if (result.status === 'failed') {
        router.replace(
          `/checkout/failed?order_number=${resolvedOrdNum}&tx_ref=${resolvedTx}`
        );
      } else {
        setState('pending');
      }
    } catch (err: any) {
      if (err?.status === 404) {
        setState('missing');
      } else {
        setState('error');
        setErrorMessage(err?.response?.data?.message || 'Verification inquiry failed.');
      }
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
            {activeTxRef && (
              <p className="text-xs font-mono text-muted-foreground bg-muted py-1 px-2 rounded inline-block">
                Ref: {activeTxRef}
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
              Your transaction is awaiting final confirmation from Chapa. Your order status will update as soon as the gateway notifies us.
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

        {state === 'missing' && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <HelpCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">No Pending Transaction</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We could not find an active transaction reference for this session. If you recently completed a payment, please check your Order History.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/orders">
                <Button variant="default" className="w-full font-bold">
                  <Package className="w-4 h-4 mr-2" />
                  My Orders
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full border-border font-bold">
                  Return to Shop
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
            <h1 className="text-2xl font-bold text-foreground">Verification Inquiry Failed</h1>
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
