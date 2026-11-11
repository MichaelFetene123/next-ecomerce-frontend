# Web Platform (Next.js 16) & Laravel Backend — Architecture Documentation

---

## 1. High-Level Architecture Overview

This platform implements a decoupled, headless e-commerce architecture. A centralized Laravel backend serves as the core business logic engine, data repository, Redis caching system, and asynchronous queue supervisor (Laravel Horizon). Administrative and customer-facing interactions consume the backend through a secure, standardized REST API.

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
                                              │  Next.js 16 Web Client  │
                                              │ (Turbopack, TanStack v5,│
                                              │  Base UI, Tailwind v4)  │
                                              └─────────────────────────┘
```

### Core Architecture Pillars

- **Backend API & Queue Layer**: Pure REST API engine powered by Laravel 13.x on PHP 8.3, utilizing Laravel Sanctum for stateful cookie/token authentication, Redis tagged cache invalidation via `CatalogCacheService`, and Laravel Horizon managing asynchronous background tasks (such as inventory deduction jobs).
- **Web Storefront Client**: Next.js 16.2.6 App Router running on Turbopack, React 19.2.4, TanStack Query v5 with centralized query keys in `@/components/querykeys`, shadcn / `@base-ui/react` primitives, Tailwind CSS v4 with OKLCH theme tokens, and custom 1:1 skeleton loading states in `@/components/skeletons`.

---

## 2. Web Authentication Protocol

Authentication utilizes Laravel Sanctum's **stateful cookie and Bearer token guard**, optimized for first-party Next.js client sessions without exposing tokens to client-side JavaScript storage.

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

### Handshake Sequence & Security Notes

> [!NOTE]
> Authentication requests use credentials inclusion (`credentials: "include"`) with automatic CSRF token exchange, ensuring session cookies are HttpOnly and protected against Cross-Site Scripting (XSS).

1. **CSRF Initialization**: The client issues a `GET` request to `/sanctum/csrf-cookie`.
2. **Encrypted Token Issuance**: The backend responds by setting an encrypted `XSRF-TOKEN` cookie in the client browser.
3. **Header Attachment**: The centralized client (`@/lib/api-client`) extracts the decoded `XSRF-TOKEN` cookie value and appends it as the `X-XSRF-TOKEN` header on all mutation requests (`POST`, `PUT`, `PATCH`, `DELETE`).
4. **Credential Verification**: The customer submits credentials to `POST /api/login`. Upon validation, Laravel Sanctum sets the authenticated session cookie.
5. **Guard Enforcement**: Protected endpoints (`/api/me`, `/api/addresses`, `/api/orders`, `/api/checkout`) verify the active session through the `auth:sanctum` middleware pipeline.

---

## 3. Backend REST API Reference

All backend routes are prefixed with `/api` and return uniform JSON response envelopes.

### Public Endpoints

| Method | Endpoint | Description | Cache / Execution Characteristics |
|---|---|---|---|
| `POST` | `/api/register` | Customer account registration | Validates input, hashes password, creates user |
| `POST` | `/api/login` | Customer login & session creation | Validates credentials, issues Sanctum session |
| `GET` | `/api/categories` | Hierarchical root category tree with children | Cached via Redis: `catalog:categories:tree` (24h TTL) |
| `GET` | `/api/products` | Paginated product listing with filters | Supports `page`, `per_page`, `category_id`, `search`, `sort` |
| `GET` | `/api/products/{slug}` | Detailed product by slug with variants & gallery | Cached per product slug (1h TTL) |
| `POST` | `/api/webhooks/chapa` | Chapa IPN payment webhook callback | HMAC SHA-256 verified, dispatches `ProcessPaidOrder` |

### Protected Customer Endpoints (`auth:sanctum`)

| Method | Endpoint | Description | Key Payload / Response |
|---|---|---|---|
| `POST` | `/api/logout` | Revokes current session & tokens | Clears session cookie |
| `GET` | `/api/me`, `/api/user` | Authenticated user profile and role | Returns user ID, name, email, role, phone |
| `GET` | `/api/addresses`, `/api/user/addresses` | Customer shipping & billing addresses | Array of validated address models |
| `POST` | `/api/addresses`, `/api/user/addresses` | Create a new customer address | Validates line items, phone, postal code |
| `GET` | `/api/orders` | Customer order history | Paginated list sorted by `created_at` descending |
| `GET` | `/api/orders/{orderNumber}` | Single order details with items & payments | Returns snapshot items, billing address, payments |
| `POST` | `/api/checkout` | Stock validation, order snapshot & payment URL | Returns generated `checkout_url` from Chapa |

---

## 4. Next.js Frontend Architecture & Specifications

### Technology Stack Overview

- **Framework**: Next.js 16.2.6 (App Router, Turbopack, Cache Components enabled)
- **Runtime Library**: React 19.2.4
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) with unified OKLCH theme variables
- **UI Primitives**: shadcn UI alongside `@base-ui/react` primitives
- **Icons**: Lucide React (`lucide-react`)
- **Server State & Data Fetching**: TanStack Query v5 (`@tanstack/react-query`) with DevTools
- **Client State**: Persistent external store via `useSyncExternalStore` for Cart state (`@/hooks/use-cart`)
- **Theme Management**: `next-themes` with custom hotkey listener (`d` key) and hydration warning filters
- **Notifications**: Sonner (`sonner`) with toast feedback on cart and auth mutations

---

### Frontend Project Directory Structure

```
next_frontend/
├── public/
│   └── images/landing/                          # Static editorial photography & lookbook imagery
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                           # Centered authentication shell
│   │   ├── login/page.tsx                       # Customer Login view
│   │   └── register/page.tsx                    # Customer Registration view
│   ├── (checkout)/
│   │   ├── layout.tsx                           # Minimalist checkout layout (distraction-free)
│   │   └── checkout/
│   │       ├── page.tsx                         # Protected Checkout (Address & Payment selection)
│   │       ├── loading.tsx                      # Route-level Checkout skeleton
│   │       ├── callback/page.tsx                # Payment gateway redirect handler
│   │       └── success/page.tsx                 # Post-purchase confirmation screen
│   ├── (shop)/
│   │   ├── layout.tsx                           # Global storefront layout (Header, Container, Footer)
│   │   ├── page.tsx                             # Home page (Hero, Badges, Departments, Catalog)
│   │   ├── about/page.tsx                       # Brand story & atelier information
│   │   ├── not-found.tsx                        # Custom 404 handler for shop routes
│   │   ├── cart/
│   │   │   ├── page.tsx                         # Full-page shopping cart with quantity controls
│   │   │   └── loading.tsx                      # Route-level Cart skeleton
│   │   ├── categories/
│   │   │   ├── page.tsx                         # Category index redirect
│   │   │   └── [slug]/page.tsx                  # Filtered category page
│   │   ├── products/
│   │   │   ├── page.tsx                         # Search, filter, and sort catalog grid
│   │   │   ├── loading.tsx                      # Full catalog page skeleton
│   │   │   └── [slug]/
│   │   │       ├── page.tsx                     # Server Component (Async params & Suspense)
│   │   │       ├── product-detail-client.tsx    # Client Component (Gallery, Variants, Steppers)
│   │   │       └── loading.tsx                  # Route-level Product Detail skeleton
│   │   └── orders/
│   │       ├── page.tsx                         # Order history list view
│   │       ├── loading.tsx                      # Route-level Order List skeleton
│   │       └── [id]/
│   │           ├── page.tsx                     # Server Component (Async params & Suspense)
│   │           ├── order-detail-client.tsx      # Client Component (Invoice, Timeline, Items)
│   │           └── loading.tsx                  # Route-level Order Detail skeleton
│   ├── account/
│   │   ├── layout.tsx                           # Account dashboard navigation tabs
│   │   ├── page.tsx                             # Account Overview with independent Suspense zones
│   │   ├── loading.tsx                          # Full account center skeleton
│   │   ├── appearance/page.tsx                  # Theme and appearance controls
│   │   ├── settings/page.tsx                    # Security and credentials management
│   │   └── components/
│   │       ├── address-list.tsx                 # Customer addresses grid
│   │       ├── order-history.tsx                # Recent orders preview
│   │       └── profile-card.tsx                 # User identity & contact card
│   ├── globals.css                              # Tailwind v4 theme configuration & color tokens
│   ├── layout.tsx                               # Root Layout (Providers, CartDrawer, ThemeProvider)
│   └── not-found.tsx                            # Root-level 404 display
│
├── components/
│   ├── auth/
│   │   └── auth-guard.tsx                       # Higher-order auth requirement wrapper
│   ├── cart/
│   │   ├── cart-drawer.tsx                      # Slide-over flyout cart panel
│   │   └── cart-item-row.tsx                    # Cart line item with thumbnail & steppers
│   ├── catalog/
│   │   ├── category-pills.tsx                   # Filter pills for catalog navigation
│   │   ├── image-gallery.tsx                    # High-res viewer with thumbnails & wishlist toggle
│   │   ├── product-card.tsx                     # Product card (aspect 4:3, stock badge, quick-add)
│   │   └── variant-matrix.tsx                   # Color swatches and size button matrix
│   ├── checkout/
│   │   ├── address-selector.tsx                 # Shipping/billing address selector
│   │   └── payment-methods.tsx                  # Gateway options (Chapa, Telebirr, CBE)
│   ├── landing/
│   │   ├── curated-catalog-section.tsx          # Live storefront catalog section
│   │   ├── departments-section.tsx              # Visual department categories
│   │   ├── features-bar.tsx                     # Service value guarantee cards
│   │   ├── hero-section.tsx                     # Editorial hero banner
│   │   ├── lookbook-banner.tsx                  # Fashion motion story banner
│   │   ├── newsletter-section.tsx               # Customer subscription form
│   │   └── testimonials-section.tsx             # Verified client review cards
│   ├── layout/
│   │   ├── footer.tsx                           # Brand footer with dynamic year in Suspense
│   │   ├── header.tsx                           # Sticky navigation, search input, user dropdown
│   │   └── not-found-view.tsx                   # Structured empty state display
│   ├── products/
│   │   └── ProductCatalog.tsx                   # Interactive catalog client (search, sort, pills)
│   ├── querykeys/
│   │   └── index.ts                             # Central query key factory
│   ├── skeletons/                               # 1:1 Parity Component Loading Skeletons
│   │   ├── account-skeleton.tsx
│   │   ├── address-list-skeleton.tsx
│   │   ├── cart-skeleton.tsx
│   │   ├── category-grid-skeleton.tsx
│   │   ├── category-pills-skeleton.tsx
│   │   ├── checkout-skeleton.tsx
│   │   ├── index.ts                             # Barrel exports for all skeletons
│   │   ├── order-detail-skeleton.tsx
│   │   ├── order-summary-skeleton.tsx
│   │   ├── orders-skeleton.tsx
│   │   ├── product-card-skeleton.tsx
│   │   ├── product-catalog-skeleton.tsx
│   │   ├── product-detail-skeleton.tsx
│   │   ├── product-grid-skeleton.tsx
│   │   ├── profile-card-skeleton.tsx
│   │   └── recent-orders-skeleton.tsx
│   ├── ui/                                      # Reusable base UI components
│   │   ├── back-button.tsx                      # Smart history-aware navigation button
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── radio-group.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx                         # Animated pulse primitive
│   │   ├── sonner.tsx
│   │   ├── toggle-group.tsx
│   │   └── toggle.tsx
│   ├── providers.tsx                            # QueryClient & Theme providers wrapper
│   └── theme-provider.tsx                       # Theme wrapper with hotkeys & extension error filter
│
├── hooks/
│   ├── use-addresses.ts                         # Saved addresses query hook
│   ├── use-auth.ts                              # Auth state, login, register, and logout hooks
│   ├── use-cart.ts                              # Persistent cart store using useSyncExternalStore
│   ├── use-categories.ts                        # Category tree query hook
│   ├── use-checkout.ts                          # Chapa checkout initialization mutation
│   ├── use-orders.ts                            # Order history and order detail queries
│   ├── use-product.ts                           # Single product detail query by slug
│   ├── use-products.ts                          # Filtered and paginated product list query
│   └── use-require-auth.ts                      # Action-level auth gate
│
├── lib/
│   ├── api-client.ts                            # Centralized fetch wrapper with CSRF injection
│   ├── landing-showcase.ts                      # Fallback editorial product items
│   ├── query-client.ts                          # TanStack QueryClient instantiation
│   └── utils.ts                                 # Currency, date, image URL, and classname helpers
│
└── types/
    ├── address.ts                               # Customer address interfaces
    ├── api.ts                                   # Standard API response and pagination types
    ├── auth.ts                                  # User, credentials, and session types
    ├── catalog.ts                               # Category, product, variant, and image types
    ├── index.ts                                 # Re-exports of common domain types
    └── order.ts                                 # Order, order item, and payment gateway types
```

---

## 5. Instant Shell & Component-Level Skeleton Architecture

To ensure fast perceived performance and zero cumulative layout shift (CLS), the frontend enforces an **Instant Layout Shell** architecture. Instead of generic spinners or arbitrary rectangular boxes, every skeleton matches its target component.

### Structural Parity Rules

> [!IMPORTANT]
> Generic placeholder blocks and full-screen spinners are prohibited. Skeletons must mirror their active component counterpart in dimensions, aspect ratio, padding, and border radius.

| Skeleton Component | Target Component / View | Layout & Dimension Parity Specifications |
|---|---|---|
| `ProductCardSkeleton` | `ProductCard` | `aspect-4/3` image container, `top-3 right-3` category tag (`h-5 w-16`), `p-4 pb-0` content padding, `text-[15px]` title (`h-4 w-3/4 mb-1.5`), `text-[10px]` stock pill (`h-4.5 w-18 rounded-full`), price (`h-5 w-20`), `h-9 w-full rounded-md` button |
| `ProductDetailSkeleton` | `ProductDetailPage` | Breadcrumb hierarchy, `aspect-square` gallery image with top-right wishlist button (`w-10 h-10 rounded-full`), 3 thumbnail squares, SKU badge, title (`h-9 md:h-10 w-4/5`), stars row, price, color swatches (`w-8 h-8 rounded-full`), size pills (`h-9 w-16`), quantity stepper (`h-12 w-32 rounded-lg`), action buttons (`h-12`), open specifications accordion |
| `ProductCatalogSkeleton` | `ProductCatalog` (`/products`) | Store catalog banner with icon and count pill, search bar (`h-10 w-full max-w-md rounded-xl`), sort dropdown (`h-9 w-36 rounded-xl`), category pills row, and 8-item product card grid |
| `CartSkeleton` | `CartPage` (`/cart`) | Header title (`h-9 w-48`), items card with header, 3 item rows (`w-16 h-16 rounded-lg` thumbnail, title, options, price, delete icon, `h-7 w-20` stepper), sticky order summary card with subtotal/shipping/tax/total and `h-14` checkout button |
| `CheckoutSkeleton` | `CheckoutPage` (`/checkout`) | Header title and subtitle, address selection card with 2-column address boxes, payment selection card with radio buttons, and sticky order summary with item list and `h-12` payment button |
| `OrdersSkeleton` | `OrdersPage` (`/orders`) | Page title (`h-8 w-40`), order cards with order ID, status pill (`h-5 w-16 rounded-full`), placed date, formatted amount, and `h-9 w-28` "View Details" button |
| `OrderDetailSkeleton` | `OrderDetailsPage` (`/orders/[id]`) | Top back-link & invoice download button, title area with order badge and transaction reference, items breakdown card with image thumbnails, price totals, and right-hand delivery/payment/timeline cards |
| `CategoryPillsSkeleton` | `CategoryPills` | Horizontal scrollable row of pills with exact `h-[30px]` height, `rounded-full` border radius, and varying pill widths (`w-20` to `w-32`) |
| `ProfileCardSkeleton` | `ProfileCard` | Card header with title, description, role badge (`h-6 w-20 rounded-full`), and 4 credential grid boxes (`p-3.5 rounded-lg bg-muted/30`) with icon placeholders |
| `AddressListSkeleton` | `AddressList` | Card header with title and description, containing a 2-column grid of address cards with map pin icon, name, default badge, and address lines |
| `RecentOrdersSkeleton` | `OrderHistory` | Compact account orders list with package icon, order number, status badge, and line item counts |
| `AccountCenterSkeleton` | `AccountProfilePage` (`/account`) | Composite view combining `AccountWelcomeHeader`, `ProfileCardSkeleton`, `AddressListSkeleton`, and `RecentOrdersSkeleton` separated by dividers |

---

### Suspense Boundary Strategies

The application separates static layouts, route loading boundaries, and dynamic interactive client components across distinct tiers:

1. **Route-Level Streaming (`loading.tsx`)**:
   - Each route directory (`cart`, `products`, `products/[slug]`, `orders`, `orders/[id]`, `checkout`, `account`) supplies a `loading.tsx` file exporting its dedicated skeleton.
   - Next.js streams this layout skeleton during route transitions before the segment's data loads.

2. **Dynamic Route Server/Client Separation**:
   - In dynamic route segments (`/products/[slug]` and `/orders/[id]`), the `page.tsx` entry point is an asynchronous Server Component that receives `params: Promise<{ slug: string }>` or `params: Promise<{ id: string }>`.
   - The Server Component wraps the Client Component in a `<Suspense fallback={<MatchingSkeleton />}>` boundary, satisfying Next.js Cache Components and preventing Blocking Route warnings.

3. **Granular Component-Level Suspense**:
   - Inside composite pages (such as `/account`), individual sections are independently wrapped in `<Suspense>`.
   - If the user's order history query takes longer than the profile query, the profile card displays immediately while the recent orders section continues displaying its `RecentOrdersSkeleton`.

---

## 6. Server State Management & Custom Hooks

Data fetching and caching are managed centrally through TanStack Query v5. Network calls are routed through `@/lib/api-client`, which automatically injects credentials and CSRF tokens.

### Global Query Client Configuration (`lib/query-client.ts`)

- **Stale Time**: Configured to `0` by default, ensuring components fetch fresh network data on mount while maintaining instant cached responses across subsequent re-renders.
- **Window Focus Refetching**: Disabled (`refetchOnWindowFocus: false`) to prevent unexpected UI shifts while customers switch tabs.
- **Retry Logic**: Configured to bypass retries on client errors (HTTP 400–499) and attempt at most 1 retry on network or 5xx server failures.

---

### Centralized Query Key Factory (`components/querykeys/index.ts`)

| Domain | Base Key Pattern | Dynamic Key Helpers | Consumers |
|---|---|---|---|
| Authentication | `['auth', 'user']` | `AUTH_QUERY_KEY` | `useUser`, `useLogin`, `useLogout` |
| Categories | `['categories']` | `CATEGORIES_QUERY_KEY` | `useCategories` |
| Products | `['products']` | `productsListQueryKey(filters)`, `productDetailQueryKey(slug)` | `useProducts`, `useProduct`, `ProductCatalog` |
| Orders | `['orders']` | `ordersListQueryKey(page)`, `orderDetailQueryKey(orderNumber)` | `useOrders`, `useOrderDetail`, `useCheckout` |
| Addresses | `['addresses']` | `addressesListQueryKey()` | `useAddresses`, `AddressSelector` |

---

### Custom Hooks Reference (`hooks/`)

| Hook Name | Endpoint & Method | Purpose & Parameters | Query Key | Cache & Invalidation Behavior |
|---|---|---|---|---|
| `useProducts` | `GET /api/products` | Paginated product listing. Accepts `page`, `per_page`, `category_id`, `search`. | `productsListQueryKey(filters)` | `staleTime: 0`. Fresh network data on filter change. |
| `useProduct` | `GET /api/products/{slug}` | Full product details with variants, attributes, and gallery. Accepts `slug`. | `productDetailQueryKey(slug)` | Enabled only when slug is present. |
| `useCategories` | `GET /api/categories` | Hierarchical category tree for navigation and catalog filter pills. | `CATEGORIES_QUERY_KEY` | `staleTime: 10 * 60 * 1000` (10 minutes). |
| `useOrders` | `GET /api/orders` | Customer order history listing. Accepts `page` (defaults to 1). | `ordersListQueryKey(page)` | `staleTime: 60 * 1000` (1 minute). |
| `useOrderDetail` | `GET /api/orders/{orderNumber}` | Single order details by order number or ID. | `orderDetailQueryKey(orderNumber)` | Enabled only when `orderNumber` is defined. |
| `useAddresses` | `GET /api/user/addresses` | List of customer shipping/billing addresses. | `addressesListQueryKey()` | Shared across checkout and account dashboard. |
| `useUser` | `GET /api/me` | Current authenticated customer profile and role. | `AUTH_QUERY_KEY` | `retry: false`, `staleTime: 5 * 60 * 1000`. |
| `useLogin` | `POST /api/login` | Authenticates customer credentials. | N/A (Mutation) | On success: invalidates `AUTH_QUERY_KEY`. |
| `useRegister` | `POST /api/register` | Registers customer account. | N/A (Mutation) | On success: invalidates `AUTH_QUERY_KEY`. |
| `useLogout` | `POST /api/logout` | Terminates active session. | N/A (Mutation) | On success: clears query cache and redirects. |
| `useCheckout` | `POST /api/checkout` | Submits cart items and billing address for payment. | N/A (Mutation) | On success: invalidates `ORDERS_QUERY_KEY` and redirects to `checkout_url`. |
| `useRequireAuth` | Client Guard | High-order callback guard. Triggers an action only if authenticated; otherwise redirects to login. | N/A | Used on "Add to Cart" and "Buy Now" buttons. |
| `useCartStore` | Client Store | Reactive shopping cart state synchronized across tabs via `useSyncExternalStore`. | Local Storage | Persists items, quantities, selected variants, and totals. |

---

## 7. Design System, Dark Mode & Theme Specifications

The application uses **Tailwind CSS v4** with OKLCH color spaces declared as CSS variables in `@/app/globals.css`.

### Brand Color Palette (OKLCH Tokens)

- **Primary Brand Color (Navy Blue)**:
  - Light Mode Primary: `oklch(0.28 0.105 262)` (Deep Midnight Navy)
  - Dark Mode Primary: `oklch(0.93 0.034 82)` (Warm Alabaster Light)
- **Secondary Accent (Warm Gold)**:
  - Accent Color: `oklch(0.887 0.088 78.5)` (Warm Gold `#FDD79A`)
  - Accent Foreground: `oklch(0.28 0.105 262)` (Navy text on gold background)
- **Surface & Background**:
  - Light Background: `oklch(1 0 0)` / Off-white page fill `oklch(0.98 0 0)`
  - Dark Background: `oklch(0.145 0 0)` (Deep Obsidian)
  - Card & Popover: `oklch(1 0 0)` (light) / `oklch(0.205 0 0)` (dark)
  - Muted Surface: `oklch(0.97 0 0)` (light) / `oklch(0.269 0 0)` (dark)

---

### Theme Features & Controls

1. **NextThemesProvider Integration**:
   - Configured with `attribute="class"` and `defaultTheme="system"` to synchronize automatically with system preferences.
2. **Keyboard Theme Toggle**:
   - Registered global hotkey: pressing `d` (outside active text inputs, textareas, and selects) toggles between light and dark modes.
3. **Browser Extension False-Positive Filter**:
   - `components/theme-provider.tsx` includes a client-side interceptor in development that filters false-positive hydration warnings caused by password manager extensions (e.g., Bitwarden injecting `bis_skin_checked="1"`). Real application warnings and hydration issues remain unaffected.
4. **Smart History Navigation (`BackButton`)**:
   - The reusable `@/components/ui/back-button` evaluates browser history depth (`window.history.state.idx > 0`) and document referrers. When direct links or external entries are detected, it falls back to a configured fallback route (`/products`, `/orders`, etc.) instead of navigating away from the application.

---

## 8. E-Commerce Database Schema (13 Domain Tables)

The database schema as implemented in MySQL:

| Table Name | Primary Purpose | Key Foreign Keys & Constraints |
|---|---|---|
| `users` | Customer and administrator credentials | `id` PK, `email` unique, `role` enum (`customer`, `admin`) |
| `personal_access_tokens` | Sanctum API Token Storage | Polymorphic `tokenable_id`/`tokenable_type` |
| `addresses` | Customer shipping & billing addresses | `user_id` &rarr; `users.id` (`CASCADE`) |
| `categories` | Hierarchical catalog taxonomy | `parent_id` &rarr; `categories.id` (`SET NULL`), `slug` unique |
| `products` | Base product definition and metadata | `category_id` &rarr; `categories.id` (`RESTRICT`), `slug` unique |
| `attributes` | Product variation axes (Color, Size, Material) | `id` PK, `slug` unique, `name` |
| `attribute_values` | Concrete attribute options (Black, XL, Linen) | `attribute_id` &rarr; `attributes.id` (`CASCADE`) |
| `product_variants` | Purchasable SKU items (price, stock, SKU) | `product_id` &rarr; `products.id` (`CASCADE`), `sku` unique |
| `product_variant_attribute_value` | Pivot table mapping SKUs to attribute values | Composite PK (`product_variant_id`, `attribute_value_id`) |
| `product_images` | High-res gallery and thumbnail images | `product_id` (`CASCADE`), `product_variant_id` (`SET NULL`) |
| `orders` | Customer order records and lifecycle state | `user_id` (`RESTRICT`), `billing_address_id` (`SET NULL`), `order_number` unique |
| `order_items` | Historical line-item snapshots at time of sale | `order_id` (`CASCADE`), `product_variant_id` (`SET NULL`) |
| `payments` | Payment gateway transaction records | `order_id` (`CASCADE`), `tx_ref` unique, `gateway` |

---

### Transaction Domain

The transaction domain acts as the immutable source of financial and fulfillment truth:

- **Orders**: Connects a specific user record to a final financial event. It acts as the immutable record for tracking current transactional states, billing addresses, calculated delivery surcharges, final checkout calculations, and the internal payment tracking key (`tx_ref`).
- **Order Items**: A snapshot collection table capturing historical line-item statuses at the exact second a purchase completes (preserving historical prices, titles, and variant configurations even if the main product configuration changes later).
- **Payments**: Transactional attempt audit log binding the internal order to external gateway references (`tx_ref`), transaction amounts, gateway response statuses, and raw payload data.

---

## 9. Backend Architecture & Service Layer

The Laravel backend implements targeted service classes to encapsulate caching, payment processing, and queue handling.

### Catalog Cache Layer (`CatalogCacheService`)

`App\Services\CatalogCacheService` manages Redis cache keys with granular tagging to prevent slow catalog queries:

- **Cache TTL Policies**:
  - Categories & Attributes: 86,400 seconds (24 hours)
  - Products & Variants: 3,600 seconds (1 hour)
- **Tag Namespaces**:
  - `catalog`, `categories`, `products`, `attributes`, `variants`
- **Invalidation Strategy**:
  - Updating a product automatically flushes the `products` and `variants` cache tags.
  - Adding or modifying a category triggers an invalidation of the `categories` tag, refreshing `catalog:categories:tree` on the subsequent request.

---

### Asynchronous Queue Processing (`ProcessPaidOrder`)

- **Supervisor**: Laravel Horizon running on Redis.
- **Trigger**: Dispatched upon receipt of a verified payment webhook from Chapa.
- **Responsibilities**:
  - Decrements `stock_quantity` on corresponding `product_variants` in atomic database transactions.
  - Transitions order status to `paid` or `processing`.
  - Records payment logs with gateway transaction identifiers (`tx_ref`).

---

## 10. Chapa Payment Integration Workflow

To safeguard transaction totals, payment processing follows a strict server-to-server pattern. The Next.js storefront client is never permitted to communicate directly with Chapa's initialization or validation gateways.

```
Next.js Web Client                    Laravel API Backend                Chapa Gateway
          │                                   │                                │
          │ 1. Initiates checkout request     │                                │
          ├──────────────────────────────────>│                                │
          │                                   │ 2. Generates unique text reference
          │                                   │    Marks order as pending      │
          │                                   │                                │
          │                                   │ 3. Issues HTTP call to gateway │
          │                                   ├───────────────────────────────>│
          │                                   │                                │
          │                                   │ 4. Responds with payment url   │
          │                                   │<───────────────────────────────┤
          │ 5. Returns payment URL to client  │                                │
          │<──────────────────────────────────┤                                │
          │                                   │                                │
          │ 6. Redirects user to checkout     │                                │
          ├───────────────────────────────────────────────────────────────────>│
          │                                   │                                │
          │                                   │ 7. Customer completes payment  │
          │                                   │    (Telebirr, CBE Birr, Card)  │
          │                                   │                                │
          │                                   │ 8. Asymmetric Webhook callback │
          │                                   │<───────────────────────────────┤
          │                                   │                                │
          │                                   │ 9. Verifies signature & status │
          │                                   │    Transitions status to paid  │
```

---

### Detailed Operational Phases

#### Phase 1: Request & Locking
The client clicks the payment button, transmitting the target order details and selected billing address to the secure backend (`POST /api/checkout`). Laravel fetches the order details, computes the final total, generates a completely unique text reference key (`tx_ref`), snapshots line items, and locks the order status to `pending`.

#### Phase 2: Gateway Handshake
Laravel makes a secure server-to-server request (`POST https://api.chapa.co/v1/transaction/initialize`) to Chapa's API endpoint, passing:
- Generated reference string (`tx_ref`)
- Transaction total amount and currency (`ETB`)
- Customer details (email, first name, last name)
- Explicit frontend fallback URL (`return_url`)
- Immutable webhook callback path pointing to your Laravel API (`callback_url: /api/webhooks/chapa`)

#### Phase 3: UI Redirection
Chapa responds with a transaction object containing a secure `checkout_url`. Laravel forwards this URL to the Next.js web client, which performs a direct browser location redirect (`window.location.href = data.checkout_url`) to send the customer to Chapa's hosted checkout screen.

#### Phase 4: Verification & Webhook Execution
1. **Customer Authorization**: The user authorizes the transaction on Chapa's hosted portal using their selected payment method (e.g., Telebirr, CBE Birr, or a credit card).
2. **Asymmetric Webhook Dispatch**: Once the funds are collected, Chapa issues an asynchronous server-to-server webhook callback request to `POST /api/webhooks/chapa`.
3. **Signature Authentication**: The incoming request payload contains an authorization header signature value (`x-chapa-signature`). Laravel interceptors match this string against the system configuration (`hash_hmac('sha256', $payload, $secret)`) to authenticate the request's origin.
4. **Fulfillment & Stock Deduction**: Once verified, the order status transitions to `paid`. Laravel dispatches `ProcessPaidOrder` to Horizon, automatically triggering localized stock deductions, transactional order confirmations, and shipping readiness.


### DASHboard for ADMIN
1. Proposed project structure
NextLaravelEcommerce/
├── app/
│   ├── (auth)/
│   │   └── admin-login/
│   │       └── page.tsx
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── products/
│   │       │   └── page.tsx
│   │       ├── categories/
│   │       │   └── page.tsx
│   │       ├── orders/
│   │       │   └── page.tsx
│   │       ├── customers/
│   │       │   └── page.tsx
│   │       ├── payments/
│   │       │   └── page.tsx
│   │       └── settings/
│   │           └── page.tsx
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── admin/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   └── navigation/
│   ├── skeletons/
│   └── ui/
│
├── hooks/
│   ├── products/
│   ├── categories/
│   ├── orders/
│   ├── customers/
│   └── payments/
│
├── lib/
│   ├── api/
│   ├── query-client.ts
│   └── utils.ts
│
├── providers/
│   └── query-provider.tsx
│
├── types/
│   ├── product.ts
│   ├── category.ts
│   ├── order.ts
│   └── customer.ts
│
├── public/
├── package.json
└── bun.lock

These are proposed modules, not confirmation that all corresponding backend endpoints already exist.

### 2. Initial implementation prompt

Act as a senior Next.js frontend architect. Create the foundational Admin Dashboard structure for my NextLaravelEcommerce project.

Technology stack:
- Next.js App Router + TypeScript
- Bun package manager
- Tailwind CSS + shadcn/ui
- TanStack Query v5
- Laravel REST API backend
Requirements:
1. Create a separate admin route group with a dedicated admin layout.
2. Build a responsive admin shell with a collapsible sidebar, header, navigation, and breadcrumbs.
3. Prepare placeholder pages for Dashboard, Products, Categories, Orders, Customers, Payments, and Settings.
4. Organize reusable admin components separately from shared UI components.
5. Keep API queries and mutations inside domain-specific hooks in hooks/.
6. Use staleTime: 0, invalidate relevant query keys after successful mutations, and use component-level shadcn Skeleton loading states.
7. Reuse the existing theme, CSS variables, shadcn components, authentication setup, and project conventions.
Constraints:
- Inspect the existing project before making changes.
- Do not duplicate existing providers, components, or configurations.
- Do not implement backend functionality or invent API endpoints.
- Do not modify the customer-facing storefront.
- Do not introduce unnecessary dependencies.
First establish the folder structure, admin layout, sidebar navigation, header, and placeholder pages. Ensure the project builds successfully with Bun.




### 3. Implementation order
I recommend building in this order:
1. Admin layout and responsive sidebar.
2. Admin authentication and route protection.
3. Dashboard overview.
4. Products and categories.
5. Orders and payments.
6. Customers and settings.
One architectural decision: Keep the admin dashboard under /admin and the customer-facing storefront separate. This gives us a clear boundary between administrative and customer experiences.

We can add, remove, or rename modules after reviewing the generated structure.