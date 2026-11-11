export interface Category {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  description: string | null;
  image_path: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  
  parent?: Category;
  children?: Category[];
}

export interface Attribute {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  
  values?: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  attribute_id: number;
  value: string;
  slug: string;
  created_at: string;
  updated_at: string;
  
  attribute?: Attribute;
}

export interface ProductImage {
  id: number;
  product_id: number;
  product_variant_id: number | null;
  path: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  weight: number | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;

  product?: Product;
  images?: ProductImage[];
  attribute_values?: AttributeValue[];
}

export interface Product {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  is_featured?: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;

  category?: Category;
  variants?: ProductVariant[];
  default_variant?: ProductVariant;
  defaultVariant?: ProductVariant;
  images?: ProductImage[];
}

export interface AdminProductStats {
  total: number;
  active: number;
  draft: number;
  featured: number;
  low_stock: number;
}

export interface AdminProductsResponse {
  data: Product[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  stats: AdminProductStats;
}

export interface AdminProductFilterParams {
  page?: number;
  per_page?: number;
  search?: string;
  category_id?: number | string;
  status?: 'all' | 'active' | 'inactive';
  featured?: 'all' | 'featured' | 'standard';
  stock?: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
  sort_by?: 'created_at' | 'title' | 'price' | 'stock';
  sort_order?: 'asc' | 'desc';
}

export interface CreateProductInput {
  title: string;
  slug?: string;
  category_id: number;
  description?: string;
  is_active?: boolean;
  is_featured?: boolean;
  meta_title?: string;
  meta_description?: string;
  sku: string;
  price: number;
  compare_at_price?: number | null;
  stock_quantity: number;
  weight?: number | null;
  image_paths?: string[];
  image_files?: File[];
  attribute_value_ids?: number[];
}

export interface UpdateProductInput {
  title?: string;
  slug?: string;
  category_id?: number;
  description?: string;
  is_active?: boolean;
  is_featured?: boolean;
  meta_title?: string;
  meta_description?: string;
  sku?: string;
  price?: number;
  compare_at_price?: number | null;
  stock_quantity?: number;
  weight?: number | null;
  attribute_value_ids?: number[];
}
