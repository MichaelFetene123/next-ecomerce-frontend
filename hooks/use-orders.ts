import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Order } from '@/types/order';
import { PaginatedResponse, ApiResponse } from '@/types/api';
import { ordersListQueryKey, orderDetailQueryKey } from '@/components/querykeys';

export function useOrders(page: number = 1) {
  return useQuery({
    queryKey: ordersListQueryKey(page),
    queryFn: async (): Promise<PaginatedResponse<Order>> => {
      const response = await apiClient.get<PaginatedResponse<Order>>('/api/orders', {
        params: { page },
      });
      return response.data;
    },
  });
}

export function useOrderDetail(orderNumber: string) {
  return useQuery({
    queryKey: orderDetailQueryKey(orderNumber),
    queryFn: async (): Promise<Order> => {
      const response = await apiClient.get<ApiResponse<Order>>(`/api/orders/${orderNumber}`);
      return response.data.data;
    },
    enabled: Boolean(orderNumber),
  });
}
