import React from 'react';
import { Product } from '@/types/catalog';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onSelectProduct,
}) => {
  const defaultVariant =
    product.variants?.find((v) => v.is_default) || product.variants?.[0];
  const price = defaultVariant?.price || 0;
  const stock = defaultVariant?.stock_quantity || 0;

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;
  const stockStatus = isOutOfStock
    ? 'OUT OF STOCK'
    : isLowStock
    ? 'LOW STOCK'
    : 'IN STOCK';

  const image = getImageUrl(product.images?.[0]?.path);

  const handleSelect = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <Card
      onClick={handleSelect}
      className="group cursor-pointer border border-[#c4c5d8] hover:border-[#747687] rounded-xl overflow-hidden transition-all duration-200 h-full flex flex-col relative shadow-none"
    >
      {/* Image container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f3f2ff]">
        <img
          src={image}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {product.category && (
          <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-md font-medium text-[11px] text-[#1a1b24] shadow-xs">
            {product.category.name}
          </div>
        )}
      </div>

      <CardContent className="flex flex-col grow p-4 pb-0">
        <h3 className="text-[15px] text-[#012169] font-medium line-clamp-1 mb-1.5">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
              isOutOfStock
                ? "bg-gray-200 text-gray-600"
                : isLowStock
                ? "bg-[#ffdad6] text-[#ba1a1a]"
                : "bg-[#00875A]/10 text-[#00875A]"
            }`}>
            {stockStatus}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <span className="font-geist text-sm text-[#1a1b24] font-semibold">
            {formatCurrency(price)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-3 bg-transparent border-t-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product, e);
          }}
          disabled={isOutOfStock}
          className="w-full bg-[#FDD79A] hover:bg-[#FDD79A]/90 text-[#012169] font-bold shadow-none"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Quick Add
        </Button>
      </CardFooter>
    </Card>
  );
};
