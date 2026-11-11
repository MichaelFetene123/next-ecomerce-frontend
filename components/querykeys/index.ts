export const AUTH_QUERY_KEY = ['auth', 'user'] as const;
export const CATEGORIES_QUERY_KEY = ['categories'] as const;
export const PRODUCTS_QUERY_KEY = ['products'] as const;
export const ORDERS_QUERY_KEY = ['orders'] as const;

export const productsListQueryKey = (filters: any) => [...PRODUCTS_QUERY_KEY, filters] as const;
export const productDetailQueryKey = (slug: string) => [...PRODUCTS_QUERY_KEY, 'detail', slug] as const;

export const ordersListQueryKey = (page: number) => [...ORDERS_QUERY_KEY, { page }] as const;
export const orderDetailQueryKey = (orderNumber: string) => [...ORDERS_QUERY_KEY, orderNumber] as const;

export const ADDRESSES_QUERY_KEY = ['addresses'] as const;
export const addressesListQueryKey = () => [...ADDRESSES_QUERY_KEY] as const;

export const ADMIN_QUERY_KEY = ['admin'] as const;
export const adminStatsQueryKey = () => [...ADMIN_QUERY_KEY, 'stats'] as const;
export const adminProductsQueryKey = (params?: any) => [...ADMIN_QUERY_KEY, 'products', params] as const;
export const adminProductDetailQueryKey = (id: number | string) => [...ADMIN_QUERY_KEY, 'products', 'detail', String(id)] as const;
export const adminCategoriesQueryKey = () => [...ADMIN_QUERY_KEY, 'categories'] as const;
export const adminOrdersQueryKey = (params?: any) => [...ADMIN_QUERY_KEY, 'orders', params] as const;
export const adminCustomersQueryKey = (params?: any) => [...ADMIN_QUERY_KEY, 'customers', params] as const;
export const adminPaymentsQueryKey = (params?: any) => [...ADMIN_QUERY_KEY, 'payments', params] as const;
