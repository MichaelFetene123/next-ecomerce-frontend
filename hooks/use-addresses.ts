import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Address } from '@/types/address';
import { ApiResponse } from '@/types/api';
import { addressesListQueryKey } from '@/components/querykeys';

export function useAddresses() {
  return useQuery({
    queryKey: addressesListQueryKey(),
    queryFn: async (): Promise<Address[]> => {
      const response = await apiClient.get<ApiResponse<Address[]>>('/api/user/addresses');
      return response.data.data;
    },
  });
}
