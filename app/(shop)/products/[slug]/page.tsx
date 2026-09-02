"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProduct } from '@/hooks/use-product';
import { useCartStore } from '@/hooks/use-cart';
import { ProductDetailSkeleton } from '@/components/skeletons/product-detail-skeleton';
import { ImageGallery } from '@/components/catalog/image-gallery';
import { VariantMatrix } from '@/components/catalog/variant-matrix';
import { formatCurrency } from '@/lib/utils';
import { ChevronRight, Star, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductVariant } from '@/types/catalog';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const { data: product, isLoading } = useProduct(slug);
  const { addItem, setIsOpen } = useCartStore();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('specifications');

  if (isLoading || !product) {
    return (
      <div className="w-full">
        <ProductDetailSkeleton />
      </div>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : (product.variants?.[0]?.price || 0);
  const currentStock = selectedVariant ? selectedVariant.stock_quantity : (product.variants?.[0]?.stock_quantity || 0);
  const isOutOfStock = currentStock === 0;

  const handleAddToCart = () => {
    if (!selectedVariant && (product.variants?.length || 0) > 0) return;
    
    addItem(product, {
      quantity,
      color: selectedVariant?.attribute_values?.find((o: any) => o.attribute?.name === 'Color')?.value,
      size: selectedVariant?.attribute_values?.find((o: any) => o.attribute?.name === 'Size')?.value,
    });
    setIsOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-xs text-[#434655] mb-8">
        <ol className="inline-flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-[#012169] transition-colors font-medium">Home</Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-[#c4c5d8]" />
          <li>
            <Link href={`/categories/${product.category?.slug}`} className="hover:text-[#012169] transition-colors font-medium capitalize">
              {product.category?.name || 'Category'}
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-[#c4c5d8]" />
          <li className="text-[#434655] truncate max-w-50 md:max-w-none capitalize">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
        {/* Left: Image Gallery */}
        <div className="w-full">
          <ImageGallery images={product.images || []} title={product.title} />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="text-xs font-bold text-[#747687] tracking-wider mb-3">
              SKU: {selectedVariant ? selectedVariant.sku : product.variants?.[0]?.sku || 'N/A'}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#012169] mb-4 tracking-tight leading-tight">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-[#012169] fill-[#012169]' : 'text-[#c4c5d8] fill-[#c4c5d8]'}`} />
                ))}
              </div>
              <span className="text-sm text-[#434655] font-medium underline cursor-pointer hover:text-[#012169]">(24 Reviews)</span>
            </div>

            <div className="text-3xl font-bold text-[#1a1b24] mb-8">
              {formatCurrency(currentPrice)}
            </div>
          </div>

          <hr className="border-[#c4c5d8] mb-8" />

          {/* Variant Matrix */}
          {(product.variants?.length || 0) > 0 && (
            <div className="mb-8">
              <VariantMatrix 
                product={product as any} 
                onVariantSelect={setSelectedVariant as any} 
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Quantity */}
            <div className="flex items-center border border-[#c4c5d8] rounded-lg h-12 w-32 bg-white flex-shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-[#434655] hover:text-[#012169] hover:bg-[#fbf8ff] transition-colors rounded-l-lg cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="text"
                readOnly
                value={quantity}
                className="flex-1 h-full border-none text-center text-sm font-semibold text-[#1a1b24] bg-transparent p-0 focus:ring-0 outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= currentStock}
                className="w-10 h-full flex items-center justify-center text-[#434655] hover:text-[#012169] hover:bg-[#fbf8ff] transition-colors rounded-r-lg disabled:opacity-50 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex-1 flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || ((product.variants?.length || 0) > 0 && !selectedVariant)}
                className="flex-1 h-12 bg-[#FDD79A] hover:bg-[#FDD79A]/90 text-[#012169] font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || ((product.variants?.length || 0) > 0 && !selectedVariant)}
                className="flex-1 h-12 bg-[#012169] hover:bg-[#012169]/90 text-white font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Accordions */}
          <div className="border-t border-[#c4c5d8]">
            {/* Specifications */}
            <div className="border-b border-[#c4c5d8]">
              <button
                onClick={() => toggleAccordion('specifications')}
                className="w-full py-4 flex items-center justify-between font-bold text-[#012169] hover:text-[#012169]/80 transition-colors cursor-pointer"
              >
                Specifications
                {openAccordion === 'specifications' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openAccordion === 'specifications' && (
                <div className="pb-6 text-sm text-[#434655] leading-relaxed prose prose-sm max-w-none">
                  {product.description || 'Premium material and finish for high-durability and corporate use.'}
                </div>
              )}
            </div>

            {/* Shipping Info */}
            <div className="border-b border-[#c4c5d8]">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full py-4 flex items-center justify-between font-bold text-[#012169] hover:text-[#012169]/80 transition-colors cursor-pointer"
              >
                Shipping Info
                {openAccordion === 'shipping' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="pb-6 text-sm text-[#434655] leading-relaxed">
                  Delivery within 2-3 business days. Free shipping on orders over 5,000 ETB.
                  All items are securely packaged to prevent damage during transit.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
