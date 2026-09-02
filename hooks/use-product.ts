import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Product } from '@/types/catalog';
import { ApiResponse } from '@/types/api';
import { productDetailQueryKey } from '@/components/querykeys';

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productDetailQueryKey(slug),
    queryFn: async (): Promise<Product> => {
      const response = await apiClient.get<ApiResponse<Product>>(`/api/products/${slug}`);
      return response.data.data;
    },
    enabled: Boolean(slug),
  });
}
