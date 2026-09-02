# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
frontend/
├── src/
│   ├── app/                                # Next.js App Router
│   │   ├── (auth)/                         # Auth route group (login, register, forgot-password)
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (shop)/                         # Customer storefront route group
│   │   │   ├── layout.tsx                  # Persistent storefront navigation & cart drawer
│   │   │   ├── page.tsx                    # Landing / featured categories & products
│   │   │   ├── categories/[slug]/page.tsx  # Category catalog & nested filtering
│   │   │   ├── products/[slug]/page.tsx    # Product detail & variant selector
│   │   │   ├── cart/page.tsx               # Cart review & summary
│   │   │   └── checkout/
│   │   │       ├── page.tsx                # Address, delivery & Chapa trigger
│   │   │       ├── callback/page.tsx       # Chapa redirect callback handler
│   │   │       └── success/page.tsx        # Payment verified confirmation
│   │   ├── (account)/                      # Protected user dashboard
│   │   │   ├── profile/page.tsx
│   │   │   └── orders/
│   │   │       ├── page.tsx                # Historical orders list
│   │   │       └── [id]/page.tsx           # Order details & tracking status
│   │   ├── api/                            # Next.js BFF routes (if proxying is required)
│   │   └── layout.tsx                      # Root layout with QueryClientProvider & Toaster
│   ├── components/
│   │   ├── ui/                             # shadcn/ui base primitives (button, input, dialog, etc.)
│   │   ├── skeletons/                      # Component-level loading skeletons
│   │   │   ├── product-card-skeleton.tsx
│   │   │   ├── product-detail-skeleton.tsx
│   │   │   ├── category-grid-skeleton.tsx
│   │   │   └── order-summary-skeleton.tsx
│   │   ├── catalog/                        # Product cards, variant selectors, price tags
│   │   ├── cart/                           # Cart sheet, line-item controls, quantity counter
│   │   └── checkout/                       # Payment gateway selectors, billing forms
│   ├── hooks/                              # TanStack Query & Application custom hooks
│   │   ├── use-auth.ts                     # Sanctum session & CSRF handshake
│   │   ├── use-categories.ts               # Category trees & navigation
│   │   ├── use-products.ts                 # Product listing, pagination, filters
│   │   ├── use-product.ts                  # Single product with SKU/variant resolution
│   │   ├── use-cart.ts                     # Cart store & mutations
│   │   └── use-checkout.ts                 # Order creation & Chapa payment initialization
│   ├── lib/
│   │   ├── api-client.ts                   # Axios client with `withCredentials: true` & CSRF
│   │   ├── query-client.ts                 # TanStack Query client with `staleTime: 0`
│   │   └── utils.ts                        # Currency formatters (ETB / USD), cn helper
│   └── types/                              # Strict TypeScript interfaces
│       ├── api.ts                          # Standard Laravel JSON envelope & pagination
│       ├── auth.ts                         # User, credentials, session types
│       ├── catalog.ts                      # Category, Product, ProductVariant, Attribute
│       └── order.ts                        # Order, OrderItem, ChapaPayload, Transaction




![alt text](<design/Corporate Order History.png>)
![alt text](<design/Corporate Product Catalog.png>)
![alt text](<design/Corporate Product Details.png>)
![alt text](<design/Corporate Secure Checkout.png>)