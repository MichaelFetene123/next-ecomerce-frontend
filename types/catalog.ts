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
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;

  category?: Category;
  variants?: ProductVariant[];
  images?: ProductImage[];
}
