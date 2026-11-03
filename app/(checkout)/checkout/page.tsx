"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/hooks/use-cart';
import { useCheckout } from '@/hooks/use-checkout';
import { useAddresses, useCreateAddress } from '@/hooks/use-addresses';
import { AddressSelector } from '@/components/checkout/address-selector';
import { PaymentMethodSelector } from '@/components/checkout/payment-methods';
import { Lock, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import { PaymentGateway, Address } from '@/types/order';
import { toast } from 'sonner';
import { AuthGuard } from '@/components/auth/auth-guard';
import { CheckoutSkeleton } from '@/components/skeletons/checkout-skeleton';
import { BackButton } from '@/components/ui/back-button';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <AuthGuard fallback={<CheckoutSkeleton />}>
        <CheckoutContent />
      </AuthGuard>
    </Suspense>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const { items, subtotal, isHydrated } = useCartStore();
  const { mutateAsync: processCheckout, isPending } = useCheckout();
  const { data: addresses = [], isLoading: isLoadingAddresses } = useAddresses();
  const { mutateAsync: createAddress, isPending: isCreatingAddress } = useCreateAddress();

  const [mounted, setMounted] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>('chapa');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    full_name: '',
    line1: '',
    line2: '',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    postal_code: '1000',
    phone: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-select first or default address when loaded
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.is_default) || addresses[0];
      if (!selectedAddressId || !addresses.some((a) => a.id === selectedAddressId)) {
        setSelectedAddressId(defaultAddr.id);
      }
    }
  }, [addresses, selectedAddressId]);

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.full_name.trim() || !newAddress.line1.trim() || !newAddress.city.trim()) {
      toast.error('Please fill in your name, address line 1, and city.');
      return;
    }

    try {
      const created = await createAddress({
        full_name: newAddress.full_name.trim(),
        line1: newAddress.line1.trim(),
        line2: newAddress.line2?.trim() || null,
        city: newAddress.city.trim(),
        region: newAddress.region?.trim() || null,
        country: newAddress.country.trim() || 'Ethiopia',
        postal_code: newAddress.postal_code?.trim() || null,
        phone: newAddress.phone?.trim() || null,
      });

      setSelectedAddressId(created.id);
      setIsAddingAddress(false);
      toast.success('Address saved successfully');
      setNewAddress({
        full_name: '',
        line1: '',
        line2: '',
        city: 'Addis Ababa',
        region: 'Addis Ababa',
        country: 'Ethiopia',
        postal_code: '1000',
        phone: '',
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to save address');
    }
  };

  const handleProceedPayment = async () => {
    setErrorMessage(null);

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Resolve variant IDs for all items in cart
    const checkoutItems = items.map((item) => {
      const variantId =
        item.selectedVariantId ||
        item.selectedVariant?.id ||
        item.product.variants?.find((v) => v.is_default)?.id ||
        item.product.variants?.[0]?.id;

      return {
        product_variant_id: Number(variantId),
        quantity: item.quantity,
      };
    });

    const invalidItem = checkoutItems.find(
      (i) => !i.product_variant_id || isNaN(i.product_variant_id) || i.product_variant_id <= 0
    );

    if (invalidItem) {
      const msg = 'One or more items in your cart has an invalid or missing product variant. Please review your cart.';
      toast.error(msg);
      setErrorMessage(msg);
      return;
    }

    // Validate address selection if user has addresses
    if (addresses.length > 0 && !selectedAddressId) {
      toast.error('Please select a shipping address');
      return;
    }

    try {
      await processCheckout({
        billing_address_id: selectedAddressId || undefined,
        return_url: `${window.location.origin}/checkout/callback`,
        items: checkoutItems,
      });
      // The hook automatically redirects to the Chapa hosted checkout URL
    } catch (err: any) {
      const responseData = err?.response?.data;
      const validationErrors = responseData?.errors;

      if (validationErrors && typeof validationErrors === 'object') {
        const errorMessages = Object.entries(validationErrors)
          .map(([_, msgs]: [string, any]) => (Array.isArray(msgs) ? msgs.join(', ') : String(msgs)))
          .join('\n');
        toast.error(errorMessages || 'Validation error. Please check your order details.');
        setErrorMessage(errorMessages);
      } else {
        const errorMsg =
          responseData?.message || err?.message || 'Payment initialization failed. Please try again.';
        toast.error(errorMsg);
        setErrorMessage(errorMsg);
      }
    }
  };

  // While mounting or hydrating the cart from storage, ONLY display its own loading skeleton
  if (!mounted || !isHydrated) {
    return <CheckoutSkeleton />;
  }

  // Once mounted and hydrated, if cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <Link href="/" className="text-primary dark:text-secondary underline">
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <BackButton fallbackHref="/cart" className="mb-3" />
        <h1 className="text-3xl font-bold text-foreground mb-1">Checkout</h1>
        <p className="text-sm text-muted-foreground">Please review your order details below.</p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1 whitespace-pre-line font-medium leading-relaxed">
            {errorMessage}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Forms */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AddressSelector
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onOpenAddModal={() => setIsAddingAddress(true)}
          />

          <PaymentMethodSelector
            selectedGateway={selectedGateway}
            onSelectGateway={setSelectedGateway}
            onSubmitPayment={handleProceedPayment}
            isProcessing={isPending}
          />
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4">
          <Card className="p-6 sticky top-24 border-border shadow-sm bg-card rounded-xl">
            <h2 className="text-[17px] font-bold text-foreground mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const price = item.selectedVariant?.price ?? item.product.variants?.[0]?.price ?? 0;
                return (
                  <div key={item.id} className="flex justify-between items-start text-[13px]">
                    <div className="flex flex-col pr-2">
                      <span className="font-semibold text-foreground line-clamp-1">
                        {item.product.title}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        Qty: {item.quantity}
                        {item.selectedColor && ` • ${item.selectedColor}`}
                        {item.selectedSize && ` • ${item.selectedSize}`}
                      </span>
                    </div>
                    <span className="font-semibold text-foreground shrink-0">
                      {formatCurrency(Number(price) * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-dashed border-border my-4" />

            <div className="space-y-3 text-[13px] mb-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-muted-foreground">Free</span>
              </div>
            </div>

            <div className="border-t border-dashed border-border my-4" />

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-[15px] text-foreground">Total</span>
              <span className="font-bold text-[17px] text-foreground">{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex items-center justify-center gap-2 bg-muted py-2 rounded border border-border">
              <Lock className="w-3.5 h-3.5 text-foreground" />
              <span className="text-[11px] font-medium text-muted-foreground">
                Payments are secure and encrypted
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Address Dialog */}
      <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleCreateAddress}>
            <DialogHeader>
              <DialogTitle>Add Shipping Address</DialogTitle>
              <DialogDescription>
                Enter your delivery address details for this order.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3.5 py-4">
              <div className="space-y-1.5">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={newAddress.full_name}
                  onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                  placeholder="e.g. Abebe Bikila"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  placeholder="e.g. +251911223344"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="line1">Address Line 1 *</Label>
                <Input
                  id="line1"
                  value={newAddress.line1}
                  onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                  placeholder="e.g. Bole Sub-City, Road 20"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                <Input
                  id="line2"
                  value={newAddress.line2}
                  onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                  placeholder="e.g. Apt 4B, Building 3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    placeholder="e.g. Addis Ababa"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="region">Region / Sub-City</Label>
                  <Input
                    id="region"
                    value={newAddress.region}
                    onChange={(e) => setNewAddress({ ...newAddress, region: e.target.value })}
                    placeholder="e.g. Bole"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    placeholder="Ethiopia"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    value={newAddress.postal_code}
                    onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                    placeholder="1000"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingAddress(false)}
                disabled={isCreatingAddress}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreatingAddress}>
                {isCreatingAddress ? 'Saving...' : 'Save Address'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
