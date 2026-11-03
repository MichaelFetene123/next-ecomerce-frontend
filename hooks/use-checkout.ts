import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import {
  CheckoutPayload,
  CheckoutResponse,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from '@/types/order';
import { ORDERS_QUERY_KEY } from '@/components/querykeys';

/**
 * Hook to initiate checkout for items in cart, creating order and obtaining Chapa checkout URL.
 */
export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
      const returnUrl =
        payload.return_url ||
        (typeof window !== 'undefined'
          ? `${window.location.origin}/checkout/callback`
          : undefined);

      const response = await apiClient.post<CheckoutResponse>('/api/checkout', {
        ...payload,
        return_url: returnUrl,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate customer orders list
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });

      // Persist pending reference to sessionStorage as a secure client-side fallback
      if (typeof window !== 'undefined' && data.tx_ref) {
        sessionStorage.setItem('chapa_pending_tx_ref', data.tx_ref);
        if (data.order?.order_number) {
          sessionStorage.setItem('chapa_pending_order_number', data.order.order_number);
        }
      }

      // Automatically redirect browser to Chapa hosted payment gateway
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    },
  });
}

/**
 * Hook to initiate or retry Chapa payment for an existing selected order.
 */
export function useInitiateOrderPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderNumber,
      return_url,
    }: {
      orderNumber: string;
      return_url?: string;
    }): Promise<CheckoutResponse> => {
      const returnUrl =
        return_url ||
        (typeof window !== 'undefined'
          ? `${window.location.origin}/checkout/callback`
          : undefined);

      const response = await apiClient.post<CheckoutResponse>(
        `/api/orders/${orderNumber}/pay`,
        { return_url: returnUrl }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });

      if (typeof window !== 'undefined' && data.tx_ref) {
        sessionStorage.setItem('chapa_pending_tx_ref', data.tx_ref);
        if (data.order?.order_number) {
          sessionStorage.setItem('chapa_pending_order_number', data.order.order_number);
        }
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    },
  });
}

/**
 * Hook to verify transaction status and synchronize order state via Laravel backend.
 */
export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload?: VerifyPaymentPayload
    ): Promise<VerifyPaymentResponse> => {
      const response = await apiClient.post<VerifyPaymentResponse>(
        '/api/checkout/verify',
        payload || {}
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
  });
}
