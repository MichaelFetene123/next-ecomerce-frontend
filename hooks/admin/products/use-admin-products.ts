"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import {
  adminProductsQueryKey,
  adminProductDetailQueryKey,
  adminStatsQueryKey,
  PRODUCTS_QUERY_KEY,
} from '@/components/querykeys';
import {
  Product,
  ProductImage,
  AdminProductsResponse,
  AdminProductFilterParams,
  CreateProductInput,
  UpdateProductInput,
} from '@/types/catalog';
import { toast } from 'sonner';

/**
 * Fetch paginated products list for administrative dashboard with filters & sorting.
 * Configured with staleTime: 0 for immediate fresh view of inventory.
 */
export function useAdminProducts(params: AdminProductFilterParams = {}) {
  return useQuery({
    queryKey: adminProductsQueryKey(params),
    queryFn: async (): Promise<AdminProductsResponse> => {
      const searchParams = new URLSearchParams();

      if (params.page) searchParams.set('page', String(params.page));
      if (params.per_page) searchParams.set('per_page', String(params.per_page));
      if (params.search?.trim()) searchParams.set('search', params.search.trim());
      if (params.category_id && params.category_id !== 'all') {
        searchParams.set('category_id', String(params.category_id));
      }
      if (params.status && params.status !== 'all') {
        searchParams.set('status', params.status);
      }
      if (params.featured && params.featured !== 'all') {
        searchParams.set('featured', params.featured);
      }
      if (params.stock && params.stock !== 'all') {
        searchParams.set('stock', params.stock);
      }
      if (params.sort_by) searchParams.set('sort_by', params.sort_by);
      if (params.sort_order) searchParams.set('sort_order', params.sort_order);

      const qs = searchParams.toString();
      const endpoint = `/api/admin/products${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<AdminProductsResponse>(endpoint);
      return response.data;
    },
    staleTime: 0,
  });
}

/**
 * Fetch a single product by ID for administrative editing/inspection.
 */
export function useAdminProduct(id: number | string | undefined) {
  return useQuery({
    queryKey: adminProductDetailQueryKey(id ?? 0),
    queryFn: async (): Promise<Product> => {
      if (!id) throw new Error('Product ID is required.');
      const response = await apiClient.get<{ data: Product }>(`/api/admin/products/${id}`);
      return response.data.data;
    },
    enabled: Boolean(id),
    staleTime: 0,
  });
}

/**
 * Mutation to create a new product.
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateProductInput): Promise<Product> => {
      // If image_files are present, submit as FormData
      if (input.image_files && input.image_files.length > 0) {
        const formData = new FormData();
        formData.append('title', input.title);
        if (input.slug) formData.append('slug', input.slug);
        formData.append('category_id', String(input.category_id));
        if (input.description) formData.append('description', input.description);
        formData.append('is_active', input.is_active ? '1' : '0');
        formData.append('is_featured', input.is_featured ? '1' : '0');
        if (input.meta_title) formData.append('meta_title', input.meta_title);
        if (input.meta_description) formData.append('meta_description', input.meta_description);

        formData.append('sku', input.sku);
        formData.append('price', String(input.price));
        if (input.compare_at_price != null) {
          formData.append('compare_at_price', String(input.compare_at_price));
        }
        formData.append('stock_quantity', String(input.stock_quantity));
        if (input.weight != null) formData.append('weight', String(input.weight));

        input.image_files.forEach((file) => {
          formData.append('image_files[]', file);
        });

        if (input.image_paths && input.image_paths.length > 0) {
          input.image_paths.forEach((path) => {
            formData.append('image_paths[]', path);
          });
        }

        const response = await apiClient.post<{ data: Product; message: string }>(
          '/api/admin/products',
          formData
        );
        return response.data.data;
      }

      // JSON payload
      const response = await apiClient.post<{ data: Product; message: string }>(
        '/api/admin/products',
        input
      );
      return response.data.data;
    },
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: adminStatsQueryKey() });
      toast.success(`Product "${newProduct.title}" created successfully.`);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to create product.';
      toast.error(msg);
    },
  });
}

/**
 * Mutation to update an existing product.
 */
export function useUpdateProduct(id: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateProductInput): Promise<Product> => {
      const response = await apiClient.put<{ data: Product; message: string }>(
        `/api/admin/products/${id}`,
        input
      );
      return response.data.data;
    },
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: adminProductDetailQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: adminStatsQueryKey() });
      toast.success(`Product "${updatedProduct.title}" updated successfully.`);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to update product.';
      toast.error(msg);
    },
  });
}

/**
 * Mutation to delete an existing product.
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string): Promise<void> => {
      await apiClient.delete(`/api/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: adminStatsQueryKey() });
      toast.success('Product deleted successfully.');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to delete product.';
      toast.error(msg);
    },
  });
}

/**
 * Quick inline toggle active/draft status.
 */
export function useToggleProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string): Promise<{ id: number; is_active: boolean }> => {
      const response = await apiClient.patch<{
        message: string;
        data: { id: number; is_active: boolean };
      }>(`/api/admin/products/${id}/status`);
      return response.data.data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: adminProductDetailQueryKey(res.id) });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: adminStatsQueryKey() });
      toast.success(res.is_active ? 'Product published to store.' : 'Product set to draft.');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to change status.';
      toast.error(msg);
    },
  });
}

/**
 * Quick inline toggle featured status.
 */
export function useToggleProductFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string): Promise<{ id: number; is_featured: boolean }> => {
      const response = await apiClient.patch<{
        message: string;
        data: { id: number; is_featured: boolean };
      }>(`/api/admin/products/${id}/featured`);
      return response.data.data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: adminProductDetailQueryKey(res.id) });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      toast.success(res.is_featured ? 'Marked as featured product.' : 'Removed from featured.');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to toggle featured status.';
      toast.error(msg);
    },
  });
}

/**
 * Quick inline update for stock inventory.
 */
export function useUpdateProductStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      stock_quantity,
    }: {
      id: number | string;
      stock_quantity: number;
    }): Promise<{ product_id: number; stock_quantity: number }> => {
      const response = await apiClient.patch<{
        message: string;
        data: { product_id: number; stock_quantity: number };
      }>(`/api/admin/products/${id}/stock`, { stock_quantity });
      return response.data.data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: adminProductDetailQueryKey(res.product_id) });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      toast.success(`Inventory updated to ${res.stock_quantity} units.`);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to update stock quantity.';
      toast.error(msg);
    },
  });
}

/**
 * Upload additional images for an existing product.
 */
export function useUploadProductImages(productId: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: File[]): Promise<ProductImage[]> => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images[]', file);
      });

      const response = await apiClient.post<{ message: string; data: ProductImage[] }>(
        `/api/admin/products/${productId}/images`,
        formData
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminProductDetailQueryKey(productId) });
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      toast.success('Images uploaded successfully.');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Image upload failed.';
      toast.error(msg);
    },
  });
}

/**
 * Delete a product image.
 */
export function useDeleteProductImage(productId: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: number): Promise<void> => {
      await apiClient.delete(`/api/admin/products/${productId}/images/${imageId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminProductDetailQueryKey(productId) });
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      toast.success('Image removed.');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to delete image.';
      toast.error(msg);
    },
  });
}

/**
 * Reorder product images.
 */
export function useReorderProductImages(productId: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageIds: number[]): Promise<void> => {
      await apiClient.patch(`/api/admin/products/${productId}/images/reorder`, {
        image_ids: imageIds,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminProductDetailQueryKey(productId) });
      toast.success('Images order updated.');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to reorder images.';
      toast.error(msg);
    },
  });
}

