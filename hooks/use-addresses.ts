import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Address } from '@/types/address';
import { addressesListQueryKey } from '@/components/querykeys';

export function useAddresses() {
  return useQuery({
    queryKey: addressesListQueryKey(),
    queryFn: async (): Promise<Address[]> => {
      const response = await apiClient.get<Address[] | { data: Address[] }>('/api/addresses');
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      }
      if (data && Array.isArray((data as any).data)) {
        return (data as any).data;
      }
      return [];
    },
  });
}

export interface CreateAddressPayload {
  full_name: string;
  line1: string;
  line2?: string | null;
  city: string;
  region?: string | null;
  country: string;
  postal_code?: string | null;
  phone?: string | null;
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAddressPayload): Promise<Address> => {
      const response = await apiClient.post<Address>('/api/addresses', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressesListQueryKey() });
    },
  });
}
