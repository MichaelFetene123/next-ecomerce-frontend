import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Product } from '@/types/catalog';
import { PaginatedResponse } from '@/types/api';

export interface ProductFilters {
  page?: number;
  per_page?: number;
  category_id?: number;
  search?: string;
}

import { productsListQueryKey } from '@/components/querykeys';

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productsListQueryKey(filters),
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const response = await apiClient.get<PaginatedResponse<Product>>('/api/products', {
        params: filters,
      });
      return response.data;
    },
  });
}
