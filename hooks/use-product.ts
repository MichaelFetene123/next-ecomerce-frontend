import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Product } from '@/types/catalog';
import { productDetailQueryKey } from '@/components/querykeys';

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productDetailQueryKey(slug),
    queryFn: async (): Promise<Product> => {
      const response = await apiClient.get<Product>(`/api/products/${slug}`);
      return response.data;
    },
    enabled: Boolean(slug),
  });
}
