import { Product } from '@/types/catalog';
import { getImageUrl } from '@/lib/utils';

export interface ShowcaseProductItem {
  id: number;
  title: string;
  slug: string;
  categoryName: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  badge?: 'NEW IN' | 'POPULAR' | 'LIMITED' | null;
  image: string;
  productData: Product;
}

const fashionCategory = {
  id: 1,
  parent_id: null,
  name: 'Fashion',
  slug: 'fashion',
  description: null,
  image_path: null,
  is_active: true,
  sort_order: 1,
  created_at: '',
  updated_at: '',
} as const;

const SHOWCASE_TIMESTAMP = '2025-10-01T00:00:00.000Z';

export const SHOWCASE_PRODUCTS: ShowcaseProductItem[] = [
  {
    id: 101,
    title: 'Minimalist Trench Coat',
    slug: 'minimalist-trench-coat',
    categoryName: 'OUTERWEAR',
    description: 'Water-resistant technical gabardine with belted waist and storm flap.',
    price: 3750.00,
    compareAtPrice: 4250.00,
    badge: 'NEW IN',
    image: '/images/landing/prod-trench-coat.jpg',
    productData: {
      id: 101,
      category_id: 1,
      title: 'Minimalist Trench Coat',
      slug: 'minimalist-trench-coat',
      description: 'Water-resistant technical gabardine with belted waist and storm flap.',
      is_active: true,
      meta_title: 'Minimalist Trench Coat | Outerwear',
      meta_description: 'Precision tailored minimalist trench coat in water-resistant gabardine.',
      created_at: SHOWCASE_TIMESTAMP,
      updated_at: SHOWCASE_TIMESTAMP,
      category: { ...fashionCategory },
      variants: [
        {
          id: 1011,
          product_id: 101,
          sku: 'TC-IVR-M',
          price: 3750.00,
          compare_at_price: 4250.00,
          stock_quantity: 12,
          weight: 1.1,
          is_default: true,
          created_at: '',
          updated_at: '',
        },
      ],
      images: [
        {
          id: 10111,
          product_id: 101,
          product_variant_id: null,
          path: '/images/landing/prod-trench-coat.jpg',
          sort_order: 1,
          created_at: '',
          updated_at: '',
        },
      ],
    },
  },
  {
    id: 102,
    title: 'Cashmere Blend Knit',
    slug: 'cashmere-blend-knit',
    categoryName: 'KNITWEAR',
    description: 'Ultra-soft 100% fine micron wool blend in rich autumn burgundy.',
    price: 2450.00,
    compareAtPrice: null,
    badge: 'POPULAR',
    image: '/images/landing/prod-cashmere-knit.jpg',
    productData: {
      id: 102,
      category_id: 1,
      title: 'Cashmere Blend Knit',
      slug: 'cashmere-blend-knit',
      description: 'Ultra-soft 100% fine micron wool blend in rich autumn burgundy.',
      is_active: true,
      meta_title: 'Cashmere Blend Knit | Fine Knitwear',
      meta_description: 'Fine micron wool blend sweater tailored for comfort.',
      created_at: SHOWCASE_TIMESTAMP,
      updated_at: SHOWCASE_TIMESTAMP,
      category: { ...fashionCategory },
      variants: [
        {
          id: 1021,
          product_id: 102,
          sku: 'CB-BUR-L',
          price: 2450.00,
          compare_at_price: null,
          stock_quantity: 20,
          weight: 0.45,
          is_default: true,
          created_at: '',
          updated_at: '',
        },
      ],
      images: [
        {
          id: 10211,
          product_id: 102,
          product_variant_id: null,
          path: '/images/landing/prod-cashmere-knit.jpg',
          sort_order: 1,
          created_at: '',
          updated_at: '',
        },
      ],
    },
  },
  {
    id: 103,
    title: 'Oversized Utility Anorak',
    slug: 'oversized-utility-anorak',
    categoryName: 'JACKETS',
    description: 'Engineered with waterproof ventilation and storm-sealed zip closures.',
    price: 3100.00,
    compareAtPrice: null,
    badge: null,
    image: '/images/landing/prod-utility-anorak.jpg',
    productData: {
      id: 103,
      category_id: 1,
      title: 'Oversized Utility Anorak',
      slug: 'oversized-utility-anorak',
      description: 'Engineered with waterproof ventilation and storm-sealed zip closures.',
      is_active: true,
      meta_title: 'Oversized Utility Anorak | Technical Outerwear',
      meta_description: 'Engineered waterproof utility jacket.',
      created_at: SHOWCASE_TIMESTAMP,
      updated_at: SHOWCASE_TIMESTAMP,
      category: { ...fashionCategory },
      variants: [
        {
          id: 1031,
          product_id: 103,
          sku: 'UA-YEL-M',
          price: 3100.00,
          compare_at_price: null,
          stock_quantity: 8,
          weight: 0.8,
          is_default: true,
          created_at: '',
          updated_at: '',
        },
      ],
      images: [
        {
          id: 10311,
          product_id: 103,
          product_variant_id: null,
          path: '/images/landing/prod-utility-anorak.jpg',
          sort_order: 1,
          created_at: '',
          updated_at: '',
        },
      ],
    },
  },
  {
    id: 104,
    title: 'Sherpa Lined Overshirt',
    slug: 'sherpa-lined-overshirt',
    categoryName: "MEN'S CLASSIC",
    description: 'Heavyweight flannel with thermal fleece insulation and reinforced chest pockets.',
    price: 2900.00,
    compareAtPrice: null,
    badge: 'LIMITED',
    image: '/images/landing/prod-sherpa-overshirt.jpg',
    productData: {
      id: 104,
      category_id: 1,
      title: 'Sherpa Lined Overshirt',
      slug: 'sherpa-lined-overshirt',
      description: 'Heavyweight flannel with thermal fleece insulation and reinforced chest pockets.',
      is_active: true,
      meta_title: "Sherpa Lined Overshirt | Men's Classic",
      meta_description: 'Warm heavyweight flannel overshirt with shearling fleece.',
      created_at: SHOWCASE_TIMESTAMP,
      updated_at: SHOWCASE_TIMESTAMP,
      category: { ...fashionCategory },
      variants: [
        {
          id: 1041,
          product_id: 104,
          sku: 'SO-PLD-L',
          price: 2900.00,
          compare_at_price: null,
          stock_quantity: 6,
          weight: 0.9,
          is_default: true,
          created_at: '',
          updated_at: '',
        },
      ],
      images: [
        {
          id: 10411,
          product_id: 104,
          product_variant_id: null,
          path: '/images/landing/prod-sherpa-overshirt.jpg',
          sort_order: 1,
          created_at: '',
          updated_at: '',
        },
      ],
    },
  },
];

function resolveShowcaseImage(path?: string) {
  if (!path) return '/placeholder-product.jpg';
  if (path.startsWith('/images/')) return path;
  return getImageUrl(path);
}

export function mapProductToShowcase(product: Product): ShowcaseProductItem {
  const variant = product.variants?.find((item) => item.is_default) || product.variants?.[0];

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    categoryName: product.category?.name?.toUpperCase() || 'FASHION',
    description: product.description || '',
    price: variant?.price ?? 0,
    compareAtPrice: variant?.compare_at_price ?? null,
    badge: null,
    image: resolveShowcaseImage(product.images?.[0]?.path),
    productData: product,
  };
}
