import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { CheckoutPayload, CheckoutResponse } from '@/types/order';
import { ORDERS_QUERY_KEY } from '@/components/querykeys';

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
      const response = await apiClient.post<CheckoutResponse>('/api/checkout', payload);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate customer orders list
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });

      // Automatically redirect to Chapa payment gateway
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    },
  });
}
