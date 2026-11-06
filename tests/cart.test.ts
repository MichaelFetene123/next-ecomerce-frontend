import { beforeEach, describe, expect, it } from 'bun:test';
import { cartStore } from '@/hooks/use-cart';
import { Product } from '@/types/catalog';

const mockProduct: Product = {
  id: 1,
  category_id: 1,
  title: 'Test Running Shoes',
  slug: 'test-running-shoes',
  description: 'High performance sneakers',
  is_active: true,
  meta_title: null,
  meta_description: null,
  created_at: '2026-01-01',
  updated_at: '2026-01-01',
  variants: [
    {
      id: 101,
      product_id: 1,
      sku: 'SHOE-RED-42',
      price: 2500,
      compare_at_price: null,
      stock_quantity: 10,
      weight: null,
      is_default: true,
      created_at: '2026-01-01',
      updated_at: '2026-01-01',
    },
    {
      id: 102,
      product_id: 1,
      sku: 'SHOE-BLU-43',
      price: 2700,
      compare_at_price: null,
      stock_quantity: 5,
      weight: null,
      is_default: false,
      created_at: '2026-01-01',
      updated_at: '2026-01-01',
    },
  ],
};

describe('Cart Store (hooks/use-cart.ts)', () => {
  beforeEach(() => {
    cartStore.clearCart();
  });

  it('initializes with empty items array', () => {
    const state = cartStore.getState();
    expect(state.items).toEqual([]);
  });

  it('adds a product and automatically resolves default variant', () => {
    cartStore.addItem(mockProduct, { quantity: 1 });
    const state = cartStore.getState();

    expect(state.items.length).toBe(1);
    expect(state.items[0].product.id).toBe(mockProduct.id);
    expect(state.items[0].quantity).toBe(1);
    expect(state.items[0].selectedVariantId).toBe(101);
  });

  it('supports adding a specific variant', () => {
    cartStore.addItem(mockProduct, {
      quantity: 2,
      variantId: 102,
      variant: mockProduct.variants![1],
    });
    const state = cartStore.getState();

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.items[0].selectedVariantId).toBe(102);
  });

  it('increments quantity when the same variant is added again', () => {
    cartStore.addItem(mockProduct, { quantity: 1, variantId: 101 });
    cartStore.addItem(mockProduct, { quantity: 2, variantId: 101 });
    const state = cartStore.getState();

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it('creates separate cart items for different variants of the same product', () => {
    cartStore.addItem(mockProduct, { quantity: 1, variantId: 101 });
    cartStore.addItem(mockProduct, { quantity: 1, variantId: 102 });
    const state = cartStore.getState();

    expect(state.items.length).toBe(2);
    expect(state.items[0].selectedVariantId).toBe(101);
    expect(state.items[1].selectedVariantId).toBe(102);
  });

  it('updates quantity of an existing item', () => {
    cartStore.addItem(mockProduct, { quantity: 1 });
    const itemId = cartStore.getState().items[0].id;

    cartStore.updateQuantity(itemId, 5);
    expect(cartStore.getState().items[0].quantity).toBe(5);
  });

  it('removes item when quantity is set to 0 or less', () => {
    cartStore.addItem(mockProduct, { quantity: 1 });
    const itemId = cartStore.getState().items[0].id;

    cartStore.updateQuantity(itemId, 0);
    expect(cartStore.getState().items.length).toBe(0);
  });

  it('removes item explicitly by id', () => {
    cartStore.addItem(mockProduct, { quantity: 1 });
    const itemId = cartStore.getState().items[0].id;

    cartStore.removeItem(itemId);
    expect(cartStore.getState().items.length).toBe(0);
  });

  it('clears all items in the cart', () => {
    cartStore.addItem(mockProduct, { quantity: 1, variantId: 101 });
    cartStore.addItem(mockProduct, { quantity: 1, variantId: 102 });
    expect(cartStore.getState().items.length).toBe(2);

    cartStore.clearCart();
    expect(cartStore.getState().items.length).toBe(0);
  });

  it('controls drawer open/close state', () => {
    expect(cartStore.getState().isOpen).toBe(false);
    cartStore.setIsOpen(true);
    expect(cartStore.getState().isOpen).toBe(true);
    cartStore.setIsOpen(false);
    expect(cartStore.getState().isOpen).toBe(false);
  });
});

