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
  created_at: string;
  updated_at: string;
}

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
  status: 'pending' | 'paid' | 'failed' | 'completed' | 'cancelled';
  billing_address_id: number | null;
  subtotal: number;
  total: number;
  currency: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  
  items?: OrderItem[];
  billing_address?: Address;
  payment?: Payment;
}

export interface CheckoutPayload {
  billing_address_id: number;
  items: Array<{
    product_variant_id: number;
    quantity: number;
  }>;
}

export interface CheckoutResponse {
  message?: string;
  order_id?: number;
  checkout_url?: string;
}
