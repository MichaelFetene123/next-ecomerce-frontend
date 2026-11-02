export interface Address {
  id: number;
  user_id: number;
  full_name: string;
  line1: string;
  line2: string | null;
  city: string;
  region: string | null;
  country: string;
  postal_code: string | null;
  phone: string | null;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export type PaymentGateway = 'chapa' | 'cbebirr' | 'telebirr';
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'completed' | 'cancelled';

export interface Payment {
  id: number;
  order_id: number;
  tx_ref: string;
  chapa_reference: string | null;
  amount: number;
  currency: string;
  status: 'initiated' | 'success' | 'failed';
  channel: string | null;
  webhook_payload: any | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_variant_id: number | null;
  product_title_snapshot: string;
  variant_sku_snapshot: string;
  unit_price_snapshot: number;
  quantity: number;
  line_total: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  tx_ref: string;
  status: OrderStatus;
  billing_address_id: number | null;
  subtotal: number;
  total: number;
  currency: string;
  payment_gateway?: PaymentGateway;
  transaction_id?: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  
  items?: OrderItem[];
  billing_address?: Address;
  payment?: Payment;
}

export interface CheckoutPayload {
  billing_address_id?: number | null;
  return_url?: string;
  items: Array<{
    product_variant_id: number;
    quantity: number;
  }>;
  first_name?: string;
  last_name?: string;
  email?: string;
  currency?: string;
}

export interface CheckoutResponse {
  message?: string;
  order?: Order;
  order_id?: number;
  tx_ref?: string;
  checkout_url?: string;
}

export interface VerifyPaymentPayload {
  tx_ref: string;
}

export interface VerifyPaymentResponse {
  status: 'success' | 'failed' | 'pending';
  message: string;
  order?: Order;
  payment?: Payment;
}
