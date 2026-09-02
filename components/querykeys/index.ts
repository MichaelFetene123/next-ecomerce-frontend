export const AUTH_QUERY_KEY = ['auth', 'user'] as const;
export const CATEGORIES_QUERY_KEY = ['categories'] as const;
export const PRODUCTS_QUERY_KEY = ['products'] as const;
export const ORDERS_QUERY_KEY = ['orders'] as const;

export const productsListQueryKey = (filters: any) => [...PRODUCTS_QUERY_KEY, filters] as const;
export const productDetailQueryKey = (slug: string) => [...PRODUCTS_QUERY_KEY, 'detail', slug] as const;

export const ordersListQueryKey = (page: number) => [...ORDERS_QUERY_KEY, { page }] as const;
export const orderDetailQueryKey = (orderNumber: string) => [...ORDERS_QUERY_KEY, orderNumber] as const;
