import React from 'react';
import { CartItem } from '@/hooks/use-cart';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const image = getImageUrl(item.product.images?.[0]?.path);
  
  // Try to find the exact variant they added if they selected options,
  // or default to the first one to get price.
  const price = item.product.variants?.[0]?.price || 0;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0">
      <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
        <img
          src={image}
          alt={item.product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate">
          {item.product.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          {item.selectedColor && `Color: ${item.selectedColor}`}
          {item.selectedColor && item.selectedSize && ' • '}
          {item.selectedSize && `Size: ${item.selectedSize}`}
        </p>
        <div className="font-geist text-xs font-semibold text-foreground mt-1">
          {formatCurrency(price)}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id)}
          className="text-muted-foreground hover:text-destructive hover:bg-transparent h-8 w-8"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <div className="flex items-center border border-border rounded-md h-7 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-full rounded-none hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 text-center text-xs font-medium text-foreground">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-full rounded-none hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
