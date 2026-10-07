import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Category } from '@/types/catalog';
import { CATEGORIES_QUERY_KEY } from '@/components/querykeys';

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: async (): Promise<Category[]> => {
      const response = await apiClient.get<{ data: Category[] } | Category[]>('/api/categories');
      const payload = response.data;
      return Array.isArray(payload) ? payload : payload?.data ?? [];
    },
  });
}
