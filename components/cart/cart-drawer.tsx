'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { CartItemRow } from './cart-item-row';
import { useCartStore } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    items,
    subtotal,
    totalItemsCount,
    updateQuantity,
    removeItem,
  } = useCartStore();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col h-full sm:max-w-md w-full p-6">
        <SheetHeader className="border-b border-[#c4c5d8] pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#012169]" />
            <SheetTitle className="text-lg font-bold text-[#012169]">
              Your Cart ({totalItemsCount})
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#434655]">
            <ShoppingBag className="w-12 h-12 stroke-[1.5] text-[#c4c5d8] mb-3" />
            <p className="font-medium text-base text-[#1a1b24]">Your cart is empty</p>
            <p className="text-xs text-[#747687] mt-1 max-w-50">
              Explore our collection and discover premium essentials.
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="mt-6 px-6 bg-[#012169] text-white hover:bg-[#012169]/90"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4 -mr-4">
              <div className="flex flex-col divide-y divide-[#c4c5d8]/40">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="border-t border-[#c4c5d8] pt-4 mt-auto flex flex-col gap-3 sm:justify-start">
              <div className="flex w-full justify-between items-center text-sm text-[#434655]">
                <span>Subtotal</span>
                <span className="font-geist text-base font-semibold text-[#1a1b24]">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="text-xs text-[#747687]">
                Shipping & taxes calculated at checkout.
              </p>
              <Button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#FDD79A] hover:bg-[#FDD79A]/90 text-[#012169] font-bold"
                size="lg"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
