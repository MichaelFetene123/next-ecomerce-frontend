"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProduct } from '@/hooks/use-product';
import { useCartStore } from '@/hooks/use-cart';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { ProductDetailSkeleton } from '@/components/skeletons/product-detail-skeleton';
import { ImageGallery } from '@/components/catalog/image-gallery';
import { VariantMatrix } from '@/components/catalog/variant-matrix';
import { formatCurrency } from '@/lib/utils';
import { ChevronRight, Star, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductVariant } from '@/types/catalog';
import { toast } from 'sonner';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const { data: product, isLoading } = useProduct(slug);
  const { addItem, updateQuantity, items } = useCartStore();
  
  const requireAuth = useRequireAuth();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('specifications');

  const activeVariant = selectedVariant || product?.variants?.find((v) => v.is_default) || product?.variants?.[0] || null;

  const currentPrice = activeVariant ? activeVariant.price : (product?.variants?.[0]?.price || 0);
  const currentStock = activeVariant ? Number(activeVariant.stock_quantity) : Number(product?.variants?.[0]?.stock_quantity || 0);
  const isOutOfStock = currentStock <= 0;

  const selectedColor = activeVariant?.attribute_values?.find(
    (o: any) => o.attribute?.name?.toLowerCase() === 'color' || o.attribute?.slug?.toLowerCase() === 'color'
  )?.value;
  const selectedSize = activeVariant?.attribute_values?.find(
    (o: any) => o.attribute?.name?.toLowerCase() === 'size' || o.attribute?.slug?.toLowerCase() === 'size'
  )?.value;

  const existingCartItem = items.find((item) => {
    if (!product || item.product.id !== product.id) return false;
    const itemColor = item.selectedColor || undefined;
    const itemSize = item.selectedSize || undefined;
    return itemColor === (selectedColor || undefined) && itemSize === (selectedSize || undefined);
  });

  useEffect(() => {
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [existingCartItem?.id, existingCartItem?.quantity, activeVariant?.id]);

  const handleQuantityChange = (newQty: number) => {
    const maxStock = currentStock > 0 ? currentStock : 99;
    const validQty = Math.max(1, Math.min(newQty, maxStock));
    setQuantity(validQty);
    if (existingCartItem) {
      updateQuantity(existingCartItem.id, validQty);
    }
  };

  const handleAddToCart = () => {
    requireAuth(() => {
      if (!product) return;
      if ((product.variants?.length || 0) > 0 && !activeVariant) return;
      
      if (existingCartItem) {
        updateQuantity(existingCartItem.id, quantity);
        toast.success(`Updated "${product.title}" quantity in Cart`);
      } else {
        addItem(product, {
          quantity,
          color: selectedColor,
          size: selectedSize,
        });
        toast.success(`Added "${product.title}" to Cart`);
      }
    });
  };

  const handleBuyNow = () => {
    requireAuth(() => {
      if (!product) return;
      if ((product.variants?.length || 0) > 0 && !activeVariant) return;
      
      if (existingCartItem) {
        updateQuantity(existingCartItem.id, quantity);
      } else {
        addItem(product, {
          quantity,
          color: selectedColor,
          size: selectedSize,
        });
      }
      router.push('/checkout');
    });
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  if (isLoading || !product) {
    return (
      <div className="w-full">
        <ProductDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-xs text-muted-foreground mb-8">
        <ol className="inline-flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors font-medium">Home</Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
          <li>
            <Link href={`/categories/${product.category?.slug}`} className="hover:text-foreground transition-colors font-medium capitalize">
              {product.category?.name || 'Category'}
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
          <li className="text-foreground truncate max-w-50 md:max-w-none capitalize font-medium">
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
            <div className="text-xs font-bold text-muted-foreground tracking-wider mb-3">
              SKU: {activeVariant ? activeVariant.sku : 'N/A'}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#012169] dark:text-foreground mb-4 tracking-tight leading-tight">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-500 fill-amber-500' : 'text-muted fill-muted'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium underline cursor-pointer hover:text-foreground">(24 Reviews)</span>
            </div>

            <div className="text-3xl font-bold text-foreground mb-8">
              {formatCurrency(currentPrice)}
            </div>
          </div>

          <hr className="border-border mb-8" />

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
            <div className="flex items-center border border-border rounded-lg h-12 w-32 bg-card shrink-0 overflow-hidden">
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isOutOfStock}
                aria-label="Decrease quantity"
                className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-0 bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantity}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '');
                  if (raw === '') {
                    setQuantity(1);
                    return;
                  }
                  const val = parseInt(raw, 10);
                  handleQuantityChange(val);
                }}
                onBlur={() => {
                  if (quantity < 1) handleQuantityChange(1);
                }}
                aria-label="Quantity"
                className="min-w-0 flex-1 h-full border-0 text-center text-sm font-semibold text-foreground bg-transparent p-0 focus:outline-none focus:ring-0"
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= currentStock || isOutOfStock}
                aria-label="Increase quantity"
                className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-0 bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex-1 flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || ((product.variants?.length || 0) > 0 && !activeVariant)}
                className="flex-1 h-12 bg-[#FDD79A] hover:bg-[#FDD79A]/90 text-[#012169] font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || ((product.variants?.length || 0) > 0 && !activeVariant)}
                className="flex-1 h-12 bg-[#012169] hover:bg-[#012169]/90 text-white font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Accordions */}
          <div className="border-t border-border">
            {/* Specifications */}
            <div className="border-b border-border">
              <button
                onClick={() => toggleAccordion('specifications')}
                className="w-full py-4 flex items-center justify-between font-bold text-foreground hover:text-foreground/80 transition-colors cursor-pointer"
              >
                Specifications
                {openAccordion === 'specifications' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openAccordion === 'specifications' && (
                <div className="pb-6 text-sm text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                  {product.description || 'Premium material and finish for high-durability and corporate use.'}
                </div>
              )}
            </div>

            {/* Shipping Info */}
            <div className="border-b border-border">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full py-4 flex items-center justify-between font-bold text-foreground hover:text-foreground/80 transition-colors cursor-pointer"
              >
                Shipping Info
                {openAccordion === 'shipping' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="pb-6 text-sm text-muted-foreground leading-relaxed">
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
