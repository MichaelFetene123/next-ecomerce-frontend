'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Plus, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart';
import { useProducts } from '@/hooks/use-products';
import { Product } from '@/types/catalog';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { toast } from 'sonner';

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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: {
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
      },
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: {
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
      },
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: {
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
      },
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: {
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
      },
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

export const CuratedCatalogSection: React.FC = () => {
  const router = useRouter();
  const { addItem, setIsOpen } = useCartStore();
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  // Query API products from backend to integrate live catalog when available
  const { data: apiResponse } = useProducts({ per_page: 8 });
  const apiProducts = apiResponse?.data || [];

  const handleToggleWishlist = (id: number, title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !wishlist[id];
    setWishlist((prev) => ({ ...prev, [id]: nextState }));
    if (nextState) {
      toast.success(`Saved "${title}" to your wishlist`);
    } else {
      toast.info(`Removed "${title}" from your wishlist`);
    }
  };

  const handleQuickAdd = (item: ShowcaseProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item.productData, { quantity: 1 });
    setIsOpen(true);
    toast.success(`Added ${item.title} to bag`);
  };

  const handleCardClick = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <section id="curated-catalog" className="w-full space-y-6 sm:space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Curated Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002167] dark:text-foreground tracking-tight">
            BEST OUTFIT FOR YOUR HAPPINESS
          </h2>
        </div>

        <Link
          href="/categories/fashion"
          className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-[#FDD79A] hover:bg-[#FCD082] text-[#012169] font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-lg shadow-xs hover:shadow-md transition-all duration-200"
        >
          <span>See More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Cards Grid matching the design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SHOWCASE_PRODUCTS.map((item) => {
          const isWishlisted = !!wishlist[item.id];

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.slug)}
              className="group cursor-pointer bg-white dark:bg-card rounded-2xl border border-border/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Product Image Container */}
              <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Badge (NEW IN / POPULAR / LIMITED) */}
                {item.badge && (
                  <div
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase shadow-xs ${
                      item.badge === 'LIMITED'
                        ? 'bg-slate-900 text-white'
                        : 'bg-[#FDD79A] text-[#012169]'
                    }`}
                  >
                    {item.badge}
                  </div>
                )}

                {/* Wishlist Heart Icon */}
                <button
                  type="button"
                  aria-label="Save to wishlist"
                  onClick={(e) => handleToggleWishlist(item.id, item.title, e)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isWishlisted
                      ? 'bg-red-50 text-red-500 shadow-sm'
                      : 'bg-white/90 dark:bg-card/90 text-foreground/70 hover:text-red-500 hover:scale-110 shadow-xs'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      isWishlisted ? 'fill-red-500 scale-110' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Card Body & Details */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block">
                    {item.categoryName}
                  </span>
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#012169] dark:text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </p>
                </div>

                {/* Price and + Add Button */}
                <div className="pt-2 flex items-end justify-between gap-2 border-t border-border/40">
                  <div className="space-y-0.5">
                    {item.compareAtPrice && (
                      <span className="block text-[11px] text-muted-foreground line-through font-medium">
                        ETB {item.compareAtPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                    <div className="text-sm sm:text-base font-bold text-[#012169] dark:text-foreground font-geist">
                      ETB {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="bg-[#FDD79A] hover:bg-[#FCD082] text-[#012169] hover:text-[#012169] font-bold text-xs px-3.5 py-1.5 h-8 rounded-lg shadow-none cursor-pointer flex items-center gap-1 shrink-0 transition-transform active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-3" />
                    <span>Add</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
