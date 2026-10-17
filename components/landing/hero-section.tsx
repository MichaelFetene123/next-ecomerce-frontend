'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart';
import { Product } from '@/types/catalog';
import { toast } from 'sonner';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onLookbookClick?: () => void;
}

// Curated Look items matching the floating cards in the design
const LOOK_ITEMS: Array<{
  id: string;
  lookNum: string;
  title: string;
  price: number;
  image: string;
  productData: Product;
}> = [
  {
    id: 'look-01',
    lookNum: 'LOOK 01',
    title: 'Silk Jumpsuit',
    price: 2850.00,
    image: '/images/landing/look-silk-jumpsuit.jpg',
    productData: {
      id: 901,
      category_id: 1,
      title: 'Silk Jumpsuit',
      slug: 'silk-jumpsuit',
      description: 'Luxurious emerald dark green tailored silk jumpsuit with structured waist belt and fluid drape.',
      is_active: true,
      meta_title: 'Silk Jumpsuit | Storefront Sartorial Suite',
      meta_description: 'Pure mulberry silk jumpsuit tailored in Addis Ababa.',
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
          id: 9011,
          product_id: 901,
          sku: 'SJ-GRN-38',
          price: 2850.00,
          compare_at_price: 3200.00,
          stock_quantity: 14,
          weight: 0.6,
          is_default: true,
          created_at: '',
          updated_at: '',
        },
      ],
      images: [
        {
          id: 90111,
          product_id: 901,
          product_variant_id: null,
          path: '/images/landing/look-silk-jumpsuit.jpg',
          sort_order: 1,
          created_at: '',
          updated_at: '',
        },
      ],
    },
  },
  {
    id: 'look-02',
    lookNum: 'LOOK 02',
    title: 'Linen Blazer',
    price: 3400.00,
    image: '/images/landing/look-linen-blazer.jpg',
    productData: {
      id: 902,
      category_id: 1,
      title: 'Linen Blazer',
      slug: 'linen-blazer',
      description: 'Double-breasted oatmeal linen blazer crafted with peak lapels and natural horn buttons.',
      is_active: true,
      meta_title: 'Linen Blazer | Tailored Craft',
      meta_description: 'Breathable artisanal linen blazer tailored with architectural precision.',
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
          id: 9021,
          product_id: 902,
          sku: 'LB-BEI-40',
          price: 3400.00,
          compare_at_price: 3800.00,
          stock_quantity: 9,
          weight: 0.75,
          is_default: true,
          created_at: '',
          updated_at: '',
        },
      ],
      images: [
        {
          id: 90211,
          product_id: 902,
          product_variant_id: null,
          path: '/images/landing/look-linen-blazer.jpg',
          sort_order: 1,
          created_at: '',
          updated_at: '',
        },
      ],
    },
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onLookbookClick,
}) => {
  const { addItem, setIsOpen } = useCartStore();

  const handleQuickAddLook = (look: (typeof LOOK_ITEMS)[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(look.productData, { quantity: 1 });
    setIsOpen(true);
    toast.success(`Added ${look.title} to your bag`);
  };

  const handleScrollDown = () => {
    const catalogEl = document.getElementById('curated-departments') || document.getElementById('curated-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#051838] shadow-2xl border border-white/10 transition-all duration-300">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Photographic background of model in camel blazer */}
        <img
          src="/images/landing/hero-model.jpg"
          alt="Discover The Art Of Dressing Up - Storefront Runway"
          className="w-full h-full object-cover object-[70%_25%] sm:object-[75%_30%] lg:object-right filter brightness-100"
        />

        {/* Sophisticated Luxury Gradients matching reference mockup */}
        {/* Desktop left-to-right fade with lightened overlay */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#03132e]/75 via-[#051838]/50 via-50% to-transparent" />
        {/* Mobile/Tablet top-to-bottom and side fade with lightened overlay */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-t from-[#03132e]/80 via-[#051838]/55 to-[#051838]/20" />
        {/* Subtle radial ambient vignette */}
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/5 to-black/20 pointer-events-none" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 w-full min-h-[620px] sm:min-h-[680px] lg:min-h-[740px] px-6 sm:px-10 md:px-14 lg:px-16 py-12 sm:py-16 lg:py-20 flex flex-col justify-between">
        {/* Top Tagline */}
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-px bg-[#FDD79A]" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#FDD79A] uppercase">
            Tailored in Ethiopia • Crafted for the World
          </span>
        </div>

        {/* Center Main Stage (Typography + CTAs + Floating Look Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto pt-6 pb-8">
          {/* Left Column: Bold Headline & Description */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-md font-heading">
              DISCOVER THE ART OF<br />
              <span className="text-white">DRESSING UP</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/90 font-medium leading-relaxed max-w-xl drop-shadow-xs">
              Curated corporate and artisanal silhouettes designed for high impact,
              supreme comfort, and architectural precision.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                size="lg"
                onClick={onExploreClick || handleScrollDown}
                className="bg-[#FDD79A] hover:bg-[#FCD082] text-[#012169] hover:text-[#012169] font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onLookbookClick || handleScrollDown}
                className="bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-white/40 backdrop-blur-md font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-6 rounded-lg transition-all duration-200 cursor-pointer"
              >
                A/W Lookbook
              </Button>
            </div>
          </div>

          {/* Right Column: Floating Look Cards */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3.5 sm:gap-4 mt-6 lg:mt-0">
            {LOOK_ITEMS.map((look) => (
              <div
                key={look.id}
                onClick={(e) => handleQuickAddLook(look, e)}
                className="group w-full sm:w-64 lg:w-72 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-white/40 dark:border-white/10 flex items-center gap-3.5 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
              >
                {/* Product Thumbnail */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-black/5">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Info & Action */}
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {look.lookNum}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#012169] dark:text-foreground truncate mt-0.5">
                    {look.title}
                  </h4>
                  <div className="text-xs font-semibold text-foreground/90 mt-0.5">
                    ETB {look.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#012169] dark:text-[#FDD79A] group-hover:underline mt-1">
                    <span>SHOP NOW</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Scroll Down Cue */}
        <div className="pt-4 flex items-center justify-between border-t border-white/10">
          <button
            onClick={handleScrollDown}
            className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Scroll Down</span>
            <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 animate-bounce" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/50 tracking-wider uppercase font-medium">
            <span>Autumn / Winter 2025</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Storefront Atelier</span>
          </div>
        </div>
      </div>
    </section>
  );
};
