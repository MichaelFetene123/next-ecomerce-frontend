"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/hooks/use-cart';
import { CartItemRow } from '@/components/cart/cart-item-row';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

import { AuthGuard } from '@/components/auth/auth-guard';

export default function CartPage() {
  const router = useRouter();
  const { items, totalItemsCount, subtotal, updateQuantity, removeItem } = useCartStore();

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <h1 className="text-3xl font-bold text-[#012169] mb-8 tracking-tight">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-[#c4c5d8] rounded-xl bg-white">
            <ShoppingBag className="w-16 h-16 text-[#c4c5d8] mb-4" />
            <h2 className="text-2xl font-bold text-[#012169] mb-2">Your cart is empty</h2>
            <p className="text-[#434655] mb-8 max-w-md">
              Looks like you haven't added any products to your cart yet. Explore our catalog to find premium corporate essentials.
            </p>
            <Button 
              size="lg" 
              onClick={() => router.push('/')}
              className="bg-[#012169] text-white hover:bg-[#012169]/90 font-bold px-8"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl border border-[#c4c5d8] overflow-hidden">
                <div className="p-4 sm:p-6 bg-[#fbf8ff] border-b border-[#c4c5d8] flex justify-between items-center">
                  <h2 className="font-bold text-[#012169]">Items ({totalItemsCount})</h2>
                  <Link href="/" className="text-sm text-[#012169] hover:underline font-medium">
                    Continue Shopping
                  </Link>
                </div>
                
                <div className="divide-y divide-[#c4c5d8]">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6 hover:bg-[#fbf8ff]/50 transition-colors">
                      <CartItemRow
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 border-[#c4c5d8] shadow-sm">
                <h2 className="text-xl font-bold text-[#012169] mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between text-[#434655]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1a1b24]">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#434655]">
                    <span>Shipping</span>
                    <span className="text-[#747687]">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-[#434655]">
                    <span>Tax</span>
                    <span className="text-[#747687]">Calculated at checkout</span>
                  </div>
                  
                  <Separator className="bg-[#c4c5d8] my-4" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base text-[#012169]">Estimated Total</span>
                    <span className="font-bold text-xl text-[#1a1b24]">{formatCurrency(subtotal)}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-[#FDD79A] text-[#012169] hover:bg-[#FDD79A]/90 font-bold text-base h-14"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#747687]">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Secure Checkout powered by Chapa</span>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
