'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Plus, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCartStore } from '@/hooks/use-cart';
import { useProducts } from '@/hooks/use-products';
import {
  mapProductToShowcase,
  SHOWCASE_PRODUCTS,
  type ShowcaseProductItem,
} from '@/lib/landing-showcase';
import { cn, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export const CuratedCatalogSection: React.FC = () => {
  const router = useRouter();
  const { addItem, setIsOpen } = useCartStore();
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});
  const { data: apiResponse } = useProducts({ per_page: 8 });

  const items = useMemo(() => {
    const liveProducts = apiResponse?.data || [];
    if (liveProducts.length >= 4) {
      return liveProducts.slice(0, 4).map(mapProductToShowcase);
    }
    return SHOWCASE_PRODUCTS;
  }, [apiResponse?.data]);

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

  return (
    <section id="curated-catalog" className="w-full scroll-mt-24 space-y-6 sm:space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Curated Catalog
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#002167] sm:text-3xl lg:text-4xl dark:text-foreground">
            BEST OUTFIT FOR YOUR HAPPINESS
          </h2>
        </div>

        <Link
          href="/categories/fashion"
          className={cn(
            buttonVariants({ size: 'sm' }),
            'h-auto self-start rounded-lg bg-[#FDD79A] px-5 py-2.5 text-xs font-bold tracking-wider text-[#012169] uppercase shadow-xs hover:bg-[#FCD082] hover:text-[#012169] hover:shadow-md sm:self-auto'
          )}
        >
          See More
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const isWishlisted = !!wishlist[item.id];

          return (
            <Card
              key={item.id}
              onClick={() => router.push(`/products/${item.slug}`)}
              className="h-full cursor-pointer gap-0 overflow-hidden rounded-xl border-border/80 py-0 shadow-xs transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-106"
                />

                {item.badge && (
                  <Badge
                    className={cn(
                      'absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase shadow-xs',
                      item.badge === 'LIMITED'
                        ? 'bg-slate-900 text-white'
                        : 'bg-[#FDD79A] text-[#012169]'
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}

                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Save to wishlist"
                  onClick={(e) => handleToggleWishlist(item.id, item.title, e)}
                  className={cn(
                    'absolute top-3 right-3 size-8 rounded-full shadow-xs',
                    isWishlisted
                      ? 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500'
                      : 'bg-white/90 text-foreground/70 hover:scale-110 hover:text-red-500 dark:bg-card/90'
                  )}
                >
                  <Heart className={cn('size-4', isWishlisted && 'scale-110 fill-red-500')} />
                </Button>
              </div>

              <CardContent className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {item.categoryName}
                  </span>
                  <h3 className="line-clamp-1 text-sm font-bold text-[#012169] transition-colors group-hover/card:text-primary sm:text-[15px] dark:text-foreground">
                    {item.title}
                  </h3>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="items-end justify-between gap-2 border-t border-border/40 bg-transparent p-4 pt-2 sm:p-5 sm:pt-2">
                <div className="space-y-0.5">
                  {item.compareAtPrice ? (
                    <span className="block text-[11px] font-medium text-muted-foreground line-through">
                      {formatCurrency(item.compareAtPrice)}
                    </span>
                  ) : null}
                  <div className="font-geist text-sm font-bold text-[#012169] sm:text-base dark:text-foreground">
                    {formatCurrency(item.price)}
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={(e) => handleQuickAdd(item, e)}
                  className="h-8 shrink-0 cursor-pointer rounded-lg bg-[#FDD79A] px-3.5 py-1.5 text-xs font-bold text-[#012169] shadow-none hover:bg-[#FCD082] hover:text-[#012169] active:scale-95"
                >
                  <Plus className="size-3.5 stroke-3" />
                  Add
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
