import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Category } from '@/types/catalog';
import { CATEGORIES_QUERY_KEY } from '@/components/querykeys';

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: async (): Promise<Category[]> => {
      const response = await apiClient.get<{ data: Category[] }>('/api/categories');
      return response.data.data;
    },
  });
}
