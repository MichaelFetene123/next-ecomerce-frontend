'use client';

import { useSyncExternalStore } from 'react';
import { Product } from '@/types/catalog';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartStoreState {
  items: CartItem[];
  isOpen: boolean;
}

const CART_STORAGE_KEY = 'storefront_cart_state_v1';

let state: CartStoreState = {
  items: [],
  isOpen: false,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }
}

// Initialize from local storage on client side
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      state.items = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse cart state from local storage', e);
  }
}

export const cartStore = {
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  addItem: (product: Product, options?: { quantity?: number; color?: string; size?: string }) => {
    const color = options?.color;
    const size = options?.size;
    const qty = options?.quantity || 1;

    const existingIndex = state.items.findIndex(
      (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
    );

    if (existingIndex > -1) {
      const newItems = [...state.items];
      newItems[existingIndex].quantity += qty;
      state = { ...state, items: newItems, isOpen: true };
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
          },
        ],
        isOpen: true,
      };
    }
    notify();
  },
  updateQuantity: (itemId: string, newQty: number) => {
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
    state = { ...state, items: state.items.filter((i) => i.id !== itemId) };
    notify();
  },
  clearCart: () => {
    state = { ...state, items: [] };
    notify();
  },
  setIsOpen: (isOpen: boolean) => {
    state = { ...state, isOpen };
    notify();
  },
};

const emptyServerState: CartStoreState = { items: [], isOpen: false };

export function useCartStore() {
  const storeState = useSyncExternalStore(
    cartStore.subscribe, 
    cartStore.getState, 
    () => emptyServerState // Server side fallback
  );
  
  const totalItemsCount = storeState.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = storeState.items.reduce((sum, i) => {
    const price = i.product.variants?.[0]?.price || 0;
    return sum + Number(price) * i.quantity;
  }, 0);
  const shipping = storeState.items.length > 0 ? (subtotal > 2000 ? 0 : 150) : 0;
  const total = subtotal + shipping;

  return {
    ...storeState,
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
