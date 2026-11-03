export interface Address {
  id: number;
  user_id: number;
  full_name: string;
  line1: string;
  line2?: string | null;
  city: string;
  region?: string | null;
  postal_code?: string | null;
  country: string;
  phone?: string | null;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;

  // Legacy aliases for backward compatibility
  first_name?: string;
  last_name?: string;
  address_line_1?: string;
  address_line_2?: string | null;
  state?: string;
}
