"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/hooks/use-cart';
import { useCheckout } from '@/hooks/use-checkout';
import { AddressSelector } from '@/components/checkout/address-selector';
import { PaymentMethodSelector } from '@/components/checkout/payment-methods';
import { Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { PaymentGateway, Address } from '@/types/order';
import { toast } from 'sonner';

// Temporary mock for addresses since there isn't a dedicated address endpoint hooked up yet
const MOCK_ADDRESSES: Address[] = [
  {
    id: 1,
    user_id: 1,
    full_name: 'John Doe',
    line1: '123 Business Road',
    line2: 'Suite 400',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    postal_code: '1000',
    phone: '+251900000000',
    created_at: '2026-01-01',
    updated_at: '2026-01-01',
    is_default: true,
  }
];

import { AuthGuard } from '@/components/auth/auth-guard';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { mutateAsync: processCheckout, isPending } = useCheckout();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(MOCK_ADDRESSES[0].id);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>('chapa');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleProceedPayment = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    if (!selectedAddressId) {
      toast.error('Please select a shipping address');
      return;
    }

    try {
      await processCheckout({
        billing_address_id: selectedAddressId,
        items: items.map(item => ({
          product_variant_id: item.product.variants?.[0]?.id || 0,
          quantity: item.quantity,
        })),
      });
      // The hook redirects automatically to checkout_url
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Payment initialization failed');
    }
  };

  if (items.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <h1 className="text-2xl font-bold text-[#012169] mb-4">Your cart is empty</h1>
        <Link href="/" className="text-[#012169] underline">Return to shop</Link>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#012169] mb-1">Checkout</h1>
          <p className="text-sm text-[#434655]">Please review your order details below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Forms */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <AddressSelector
              addresses={MOCK_ADDRESSES}
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
            <Card className="p-6 sticky top-24 border-[#c4c5d8] shadow-sm bg-white rounded-xl">
              <h2 className="text-[17px] font-bold text-[#012169] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start text-[13px]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1a1b24] line-clamp-1">{item.product.title}</span>
                      <span className="text-[#747687]">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-semibold text-[#1a1b24] shrink-0">
                      {formatCurrency((item.product.variants?.[0]?.price || 0) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-[#c4c5d8] my-4" />
              
              <div className="space-y-3 text-[13px] mb-4">
                <div className="flex justify-between text-[#434655]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1a1b24]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#434655]">
                  <span>Shipping</span>
                  <span className="text-[#747687]">Free</span>
                </div>
              </div>
              
              <div className="border-t border-dashed border-[#c4c5d8] my-4" />
              
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-[15px] text-[#012169]">Total</span>
                <span className="font-bold text-[17px] text-[#1a1b24]">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex items-center justify-center gap-2 bg-[#f3f2ff] py-2 rounded border border-[#c4c5d8]/50">
                <Lock className="w-3.5 h-3.5 text-[#012169]" />
                <span className="text-[11px] font-medium text-[#012169]">Payments are secure and encrypted</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
