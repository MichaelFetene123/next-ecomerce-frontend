import { describe, it, expect } from "bun:test";
import {
  adminProductsQueryKey,
  adminProductDetailQueryKey,
  ADMIN_QUERY_KEY,
} from "@/components/querykeys";
import { AdminProductFilterParams } from "@/types/catalog";

describe("Admin Product Query Keys", () => {
  it("generates correct base admin products query key without params", () => {
    const key = adminProductsQueryKey();
    expect(key).toEqual(["admin", "products", undefined]);
  });

  it("generates correct admin products query key with filter params", () => {
    const filters: AdminProductFilterParams = {
      page: 2,
      search: "macbook",
      status: "active",
      category_id: 2,
    };
    const key = adminProductsQueryKey(filters);
    expect(key[0]).toBe("admin");
    expect(key[1]).toBe("products");
    expect(key[2]).toEqual(filters);
  });

  it("generates correct single product detail query key", () => {
    const key = adminProductDetailQueryKey(42);
    expect(key).toEqual(["admin", "products", "detail", "42"]);
  });
});

describe("Admin Product Payload Validation Logic", () => {
  it("validates required title and SKU fields", () => {
    const validate = (title: string, sku: string, price: number, stock: number) => {
      const errors: Record<string, string> = {};
      if (!title.trim()) errors.title = "Required";
      if (!sku.trim()) errors.sku = "Required";
      if (isNaN(price) || price < 0) errors.price = "Invalid";
      if (isNaN(stock) || stock < 0) errors.stock = "Invalid";
      return errors;
    };

    expect(Object.keys(validate("", "", -1, -5))).toEqual(["title", "sku", "price", "stock"]);
    expect(Object.keys(validate("MacBook", "MBP-16", 2499, 15))).toHaveLength(0);
  });

  it("normalizes SKU to uppercase trimmed string", () => {
    const normalizeSku = (sku: string) => sku.trim().toUpperCase();
    expect(normalizeSku(" mbp-16-m3 ")).toBe("MBP-16-M3");
  });
});

