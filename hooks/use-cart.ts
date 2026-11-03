'use client';

import { useSyncExternalStore, useEffect } from 'react';
import { Product, ProductVariant } from '@/types/catalog';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedVariantId?: number;
  selectedVariant?: ProductVariant;
}

interface CartStoreState {
  items: CartItem[];
  isOpen: boolean;
  isHydrated: boolean;
}

const CART_STORAGE_KEY = 'storefront_cart_state_v1';

let state: CartStoreState = {
  items: [],
  isOpen: false,
  isHydrated: false,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }
}

let isInitialized = false;

function initFromStorage() {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;
  isInitialized = true;
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state = { ...state, items: parsed, isHydrated: true };
        notify();
        return;
      }
    }
  } catch (e) {
    console.error('Failed to parse cart state from local storage', e);
  }
  state = { ...state, isHydrated: true };
  notify();
}

export const cartStore = {
  init: () => initFromStorage(),
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  addItem: (
    product: Product,
    options?: {
      quantity?: number;
      color?: string;
      size?: string;
      variantId?: number;
      variant?: ProductVariant;
      openCart?: boolean;
    }
  ) => {
    initFromStorage();
    const color = options?.color;
    const size = options?.size;
    const qty = options?.quantity || 1;
    const openCart = options?.openCart ?? false;

    // Resolve variant
    let variant = options?.variant;
    let variantId = options?.variantId;
    if (!variantId && variant?.id) {
      variantId = variant.id;
    }
    if (!variantId && product.variants && product.variants.length > 0) {
      const defaultVariant = product.variants.find((v) => v.is_default) || product.variants[0];
      variant = defaultVariant;
      variantId = defaultVariant.id;
    }

    const existingIndex = state.items.findIndex((i) => {
      if (i.product.id !== product.id) return false;
      if (variantId && i.selectedVariantId) {
        return i.selectedVariantId === variantId;
      }
      return i.selectedColor === color && i.selectedSize === size;
    });

    if (existingIndex > -1) {
      const newItems = [...state.items];
      newItems[existingIndex].quantity += qty;
      if (variantId && !newItems[existingIndex].selectedVariantId) {
        newItems[existingIndex].selectedVariantId = variantId;
        newItems[existingIndex].selectedVariant = variant;
      }
      state = { ...state, items: newItems, ...(openCart ? { isOpen: true } : {}) };
    } else {
      state = {
        ...state,
        items: [
          ...state.items,
          {
            id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            product,
            quantity: qty,
            selectedColor: color,
            selectedSize: size,
            selectedVariantId: variantId,
            selectedVariant: variant,
          },
        ],
        ...(openCart ? { isOpen: true } : {}),
      };
    }
    notify();
  },
  updateQuantity: (itemId: string, newQty: number) => {
    initFromStorage();
    if (newQty <= 0) {
      cartStore.removeItem(itemId);
      return;
    }
    state = {
      ...state,
      items: state.items.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i)),
    };
    notify();
  },
  removeItem: (itemId: string) => {
    initFromStorage();
    state = { ...state, items: state.items.filter((i) => i.id !== itemId) };
    notify();
  },
  clearCart: () => {
    initFromStorage();
    state = { ...state, items: [] };
    notify();
  },
  setIsOpen: (isOpen: boolean) => {
    state = { ...state, isOpen };
    notify();
  },
};

const emptyServerState: CartStoreState = { items: [], isOpen: false, isHydrated: false };

export function useCartStore() {
  const storeState = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getState,
    () => emptyServerState // Server side fallback
  );

  useEffect(() => {
    initFromStorage();
  }, []);

  const totalItemsCount = storeState.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = storeState.items.reduce((sum, i) => {
    const price = i.selectedVariant?.price ?? i.product.variants?.[0]?.price ?? 0;
    return sum + Number(price) * i.quantity;
  }, 0);
  const shipping = storeState.items.length > 0 ? (subtotal > 2000 ? 0 : 150) : 0;
  const total = subtotal + shipping;

  return {
    ...storeState,
    isHydrated: storeState.isHydrated,
    addItem: cartStore.addItem,
    updateQuantity: cartStore.updateQuantity,
    removeItem: cartStore.removeItem,
    clearCart: cartStore.clearCart,
    setIsOpen: cartStore.setIsOpen,
    totalItemsCount,
    subtotal,
    shipping,
    total,
  };
}
