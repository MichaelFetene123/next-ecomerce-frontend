# Web Platform (Next.js) & Laravel Backend — Architecture Documentation

## High-Level Architecture Overview

This project uses a modern, decoupled headless e-commerce architecture. A centralized Laravel backend acts as the core business logic engine, data repository, Redis caching layer, queue supervisor (Laravel Horizon), and API gateway. The administrative and customer interactions operate independently, consuming the backend purely over a secure REST API.

```
                      ┌────────────────────────────────────────┐
                      │        Laravel Backend Engine          │
                      │   (REST API, Eloquent, Horizon, Redis) │
                      └────┬───────────────────────────────┬───┘
                           │                               │
    ┌──────────────────────▼──────┐               ┌────────▼──────────────────────┐
    │       Laravel Horizon       │               │     Laravel Sanctum API       │
    │    Redis Queue Supervisor   │               │    (Endpoints & Middlewares)  │
    └─────────────────────────────┘               └────────┬───────────────────────┘
                                                           │
                                                           ▼
                                              ┌─────────────────────────┐
                                              │   Next.js 15 Web Client │
                                              │  (TanStack Query +      │
                                              │   shadcn/ui + Tailwind) │
                                              └─────────────────────────┘
```

- **Backend API & Queue Layer** — Pure REST API engine powered by Laravel 13, Sanctum stateful token/cookie authentication, Redis Cache & Tagged Invalidation, and Laravel Horizon for async background jobs (stock processing, Chapa webhooks).
- **Web Storefront** — Next.js App Router (TypeScript), TanStack Query v5 with custom hooks in `@/hooks`, shadcn/ui components, and component-level skeleton loading states in `@/components/skeletons`.

---

## Web Authentication Protocol

Authentication is handled through Laravel Sanctum's **stateful cookie / Bearer token guard**, tailored for first-party Next.js client interactions.

```
                     Inbound Auth Request
                              │
                              ▼
                        Next.js Client
                              │
                   [Sanctum Stateful Guard]
                              │
                     Validates CSRF Token
                              │
                    Issues HttpOnly Cookie
                              │
                    Stored by Web Browser
```

**Mechanism:** Stateful Cookie-Based Session Authentication with Axios/Fetch credentials.

**Handshake Sequence:**
1. The client sends a GET request to the CSRF token initialization endpoint (`sanctum/csrf-cookie`).
2. The server responds by setting an encrypted Cross-Site Request Forgery (CSRF) cookie in the client's storage.
3. The client sends login credentials via a POST request (`/api/login`), automatically including the CSRF token header.
4. The server validates credentials and issues the session / access token.
5. All protected endpoints (`/api/me`, `/api/addresses`, `/api/orders`, `/api/checkout`) validate the authenticated customer.

---

## Complete Backend REST API Reference

All routes are prefixed with `/api` and return standardized JSON responses.

### Public Endpoints
- `POST /api/login` — Customer login & session token creation.
- `GET  /api/categories` — Root categories tree with active children (Cached in Redis: `catalog:categories:tree`).
- `GET  /api/products` — Paginated active products with default variant & images (`?page=1&per_page=20&category_id=X&search=Y`).
- `GET  /api/products/{slug}` — Product detail by slug with variants, attributes, and image gallery.
- `POST /api/webhooks/chapa` — Chapa payment gateway IPN webhook (signature-verified; dispatches `ProcessChapaWebhook` to Horizon).

### Protected Customer Endpoints (`auth:sanctum`)
- `POST /api/logout` — Revoke token / invalidate customer session.
- `GET  /api/me` or `GET /api/user` — Authenticated user profile and role.
- `GET  /api/addresses` — List saved customer shipping/billing addresses.
- `POST /api/addresses` — Create a new customer address (`full_name`, `line1`, `city`, `country`, `phone`, etc.).
- `GET  /api/orders` — Paginated customer order history (10 per page, latest first, includes items & payments).
- `GET  /api/orders/{orderNumber}` — Single order details with items, billing address, and payment status.
- `POST /api/checkout` — Validate stock, snapshot order items, create order/payment records, and initialize Chapa checkout URL.

---

## Next.js Frontend Architecture & Specifications

### 1. Technology Stack
- **Framework:** Next.js 15 (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling & Design System:** Tailwind CSS + **shadcn/ui**
- **Icons:** Lucide React (`lucide-react`)
- **Server State & Data Fetching:** **TanStack Query v5 (`@tanstack/react-query`)**
- **HTTP Client:** Axios / Fetch API client configured with `baseURL` and `withCredentials: true`

---

### 2. Next.js Project Directory Structure

```
nextjs-storefront/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (shop)/
│   │   │   ├── page.tsx                     # Homepage (Categories & Featured Products)
│   │   │   ├── products/
│   │   │   │   ├── page.tsx                 # Product Catalog (Search & Category filters)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx             # Product Details (Variants & Image Gallery)
│   │   │   ├── cart/
│   │   │   │   └── page.tsx                 # Shopping Cart View
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx                 # Address selector & Chapa payment trigger
│   │   │   ├── account/
│   │   │   │   ├── orders/
│   │   │   │   │   ├── page.tsx             # Customer Order History
│   │   │   │   │   └── [orderNumber]/
│   │   │   │   │       └── page.tsx         # Order Details & Status
│   │   │   │   └── addresses/
│   │   │   │       └── page.tsx             # Address Management
│   │   ├── layout.tsx                       # Root Layout (QueryClientProvider, Header, Footer)
│   │   └── globals.css                      # Tailwind & shadcn theme tokens
│   │
│   ├── components/
│   │   ├── ui/                              # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── badge.tsx
│   │   │   └── toast.tsx
│   │   │
│   │   ├── skeletons/                       # Component-level loading skeletons
│   │   │   ├── ProductCardSkeleton.tsx
│   │   │   ├── ProductGridSkeleton.tsx
│   │   │   ├── ProductDetailSkeleton.tsx
│   │   │   ├── CategoryNavSkeleton.tsx
│   │   │   ├── OrderListSkeleton.tsx
│   │   │   ├── OrderDetailSkeleton.tsx
│   │   │   └── AddressCardSkeleton.tsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── VariantSelector.tsx
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   │
│   ├── hooks/                               # Custom TanStack Query hooks (Fetch & Mutate)
│   │   ├── useAuth.ts                       # Login, Logout, Current User
│   │   ├── useCategories.ts                 # Fetch Category tree
│   │   ├── useProducts.ts                   # Fetch paginated products & filters
│   │   ├── useProductDetail.ts              # Fetch single product by slug
│   │   ├── useAddresses.ts                  # Fetch & Create customer addresses (with invalidation)
│   │   ├── useOrders.ts                     # Fetch customer order history & single order
│   │   └── useCheckout.ts                   # Initialize checkout mutation
│   │
│   ├── lib/
│   │   ├── api-client.ts                    # Axios instance with CSRF & credential defaults
│   │   ├── query-client.ts                  # TanStack QueryClient with staleTime: 0
│   │   └── utils.ts                         # shadcn cn() helper
│   │
│   └── types/
│       ├── api.ts
│       ├── catalog.ts
│       ├── order.ts
│       └── user.ts
│
├── components.json                          # shadcn/ui configuration
├── tailwind.config.ts
└── tsconfig.json
```

---

### 3. TanStack Query Configuration (`staleTime: 0` & Invalidation)

#### Global Query Client Configuration (`src/lib/query-client.ts`)
```typescript
import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // Always consider query stale for immediate real-time sync
        refetchOnWindowFocus: true,
        retry: 1,
      },
      mutations: {
        retry: false,
      },
    },
  });
}
```

---

### 4. Custom Hook Architecture (`src/hooks/`)

All API queries (`useQuery`) and mutations (`useMutation`) are encapsulated in clean, reusable hooks inside `src/hooks/`. Mutations automatically invalidate related queries upon completion.

#### Category Hooks (`src/hooks/useCategories.ts`)
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Category } from '@/types/catalog';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: async (): Promise<Category[]> => {
      const response = await apiClient.get<Category[]>('/api/categories');
      return response.data;
    },
  });
}
```

#### Product Hooks (`src/hooks/useProducts.ts`)
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { PaginatedResponse, Product } from '@/types/catalog';

export interface ProductFilters {
  page?: number;
  per_page?: number;
  category_id?: number;
  search?: string;
}

export const PRODUCTS_QUERY_KEY = ['products'] as const;

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const response = await apiClient.get<PaginatedResponse<Product>>('/api/products', {
        params: filters,
      });
      return response.data;
    },
  });
}

export function useProductDetail(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product> => {
      const response = await apiClient.get<Product>(`/api/products/${slug}`);
      return response.data;
    },
    enabled: Boolean(slug),
  });
}
```

#### Address Management Hooks (`src/hooks/useAddresses.ts`)
```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Address, CreateAddressPayload } from '@/types/user';

export const ADDRESSES_QUERY_KEY = ['addresses'] as const;

export function useAddresses() {
  return useQuery({
    queryKey: ADDRESSES_QUERY_KEY,
    queryFn: async (): Promise<Address[]> => {
      const response = await apiClient.get<Address[]>('/api/addresses');
      return response.data;
    },
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAddressPayload): Promise<Address> => {
      const response = await apiClient.post<Address>('/api/addresses', payload);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate addresses query so UI immediately refreshes
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
```

#### Customer Orders Hooks (`src/hooks/useOrders.ts`)
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Order, PaginatedResponse } from '@/types/order';

export const ORDERS_QUERY_KEY = ['orders'] as const;

export function useCustomerOrders(page: number = 1) {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, page],
    queryFn: async (): Promise<PaginatedResponse<Order>> => {
      const response = await apiClient.get<PaginatedResponse<Order>>('/api/orders', {
        params: { page },
      });
      return response.data;
    },
  });
}

export function useCustomerOrderDetail(orderNumber: string) {
  return useQuery({
    queryKey: ['order', orderNumber],
    queryFn: async (): Promise<Order> => {
      const response = await apiClient.get<Order>(`/api/orders/${orderNumber}`);
      return response.data;
    },
    enabled: Boolean(orderNumber),
  });
}
```

#### Checkout Mutation Hook (`src/hooks/useCheckout.ts`)
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { CheckoutPayload, CheckoutResponse } from '@/types/order';
import { ORDERS_QUERY_KEY } from './useOrders';

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
      const response = await apiClient.post<CheckoutResponse>('/api/checkout', payload);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate customer orders list
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });

      // Automatically redirect to Chapa payment gateway
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    },
  });
}
```

---

### 5. Component-Level Skeletons (`src/components/skeletons/`)

Using **shadcn/ui Skeleton** (`@/components/ui/skeleton`), every major component has a dedicated skeleton fallback to ensure instant, flicker-free loading states.

#### Product Card Skeleton (`src/components/skeletons/ProductCardSkeleton.tsx`)
```tsx
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border/50 bg-card">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full rounded-none" />
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}
```

#### Product Grid Skeleton (`src/components/skeletons/ProductGridSkeleton.tsx`)
```tsx
import { ProductCardSkeleton } from './ProductCardSkeleton';

interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
```

#### Product Detail Skeleton (`src/components/skeletons/ProductDetailSkeleton.tsx`)
```tsx
import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-2">
      {/* Gallery Skeleton */}
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex gap-4">
          <Skeleton className="h-20 w-20 rounded-lg" />
          <Skeleton className="h-20 w-20 rounded-lg" />
          <Skeleton className="h-20 w-20 rounded-lg" />
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}
```

#### Order List Skeleton (`src/components/skeletons/OrderListSkeleton.tsx`)
```tsx
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function OrderListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-t border-border/40 pt-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

### 6. Example Usage in Page Component (`src/app/(shop)/products/page.tsx`)

```tsx
'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductGridSkeleton } from '@/components/skeletons/ProductGridSkeleton';
import { Input } from '@/components/ui/input';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useProducts({
    search: search || undefined,
    page,
    per_page: 12,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
      </div>

      {isLoading ? (
        <ProductGridSkeleton count={12} />
      ) : isError ? (
        <div className="rounded-lg border border-destructive/50 p-6 text-center text-destructive">
          Failed to load products: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <ProductGrid products={data.data} />
      ) : (
        <p className="text-center text-muted-foreground">No products found matching your search.</p>
      )}
    </div>
  );
}
```

---

## E-Commerce Database Schema (13 Domain Tables)

The database schema as deployed in MySQL:

| Table Name | Primary Purpose | Key Foreign Keys & Rules |
|---|---|---|
| `users` | Customer & Admin Accounts | `id` PK, `email` unique, `role` enum |
| `personal_access_tokens` | Sanctum API Token Storage | Polymorphic `tokenable_id`/`tokenable_type` |
| `addresses` | Customer Shipping & Billing Addresses | `user_id` &rarr; `users.id` (CASCADE) |
| `categories` | Hierarchical Nested Catalog Tree | `parent_id` &rarr; `categories.id` (SET NULL) |
| `products` | Base Product Definition & SEO Metadata | `category_id` &rarr; `categories.id` (RESTRICT) |
| `attributes` | Variation Axes (Color, Size, Material) | `id` PK, `slug` unique |
| `attribute_values` | Concrete Values (Red, XL, Leather) | `attribute_id` &rarr; `attributes.id` (CASCADE) |
| `product_variants` | Purchasable SKUs (Price, Stock, SKU) | `product_id` &rarr; `products.id` (CASCADE) |
| `product_variant_attribute_value` | Pivot: SKU &harr; Attribute Values | Composite PK (`product_variant_id`, `attribute_value_id`) |
| `product_images` | Product & Variant Image Gallery | `product_id` (CASCADE), `product_variant_id` (SET NULL) |
| `orders` | Customer Orders & Status Lifecycle | `user_id` (RESTRICT), `billing_address_id` (SET NULL) |
| `order_items` | Historical Snapshots of Purchased SKUs | `order_id` (CASCADE), `product_variant_id` (SET NULL) |
| `payments` | Chapa Payment Attempt & Webhook Log | `order_id` (CASCADE), `tx_ref` |

---

## Chapa Payment Integration Lifecycle

```
Next.js Client                        Laravel API Backend                Chapa Gateway
      │                                       │                                │
      │ 1. useCheckout().mutate({ ... })      │                                │
      ├──────────────────────────────────────>│                                │
      │                                       │ 2. Validates stock & creates   │
      │                                       │    Order (pending) & Payment   │
      │                                       │                                │
      │                                       │ 3. POST https://api.chapa.co   │
      │                                       ├───────────────────────────────>│
      │                                       │                                │
      │                                       │ 4. Returns checkout_url        │
      │                                       │<───────────────────────────────┤
      │ 5. Returns { checkout_url }           │                                │
      │<──────────────────────────────────────┤                                │
      │                                       │                                │
      │ 6. window.location.href = checkout_url│                                │
      ├───────────────────────────────────────────────────────────────────────>│
      │                                       │                                │
      │                                       │ 7. Customer completes payment  │
      │                                       │    (Telebirr, CBE Birr, Card)  │
      │                                       │                                │
      │                                       │ 8. POST /api/webhooks/chapa    │
      │                                       │<───────────────────────────────┤
      │                                       │                                │
      │                                       │ 9. Verifies signature & queues │
      │                                       │    ProcessChapaWebhook on Redis│
```
