'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onLookbookClick?: () => void;
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onLookbookClick,
}) => {
  const handleScrollDown = () => {
    scrollToId('curated-departments');
    if (!document.getElementById('curated-departments')) {
      scrollToId('curated-catalog');
    }
  };

  const handleLookbook = () => {
    if (onLookbookClick) {
      onLookbookClick();
      return;
    }
    scrollToId('film-lookbook');
  };

  return (
    <section className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0714] shadow-2xl transition-all duration-300 sm:rounded-2xl">
      <div className="absolute inset-0 h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=85"
          alt="Luminous Botanical Skincare & Luxury Beauty Atelier"
          className="h-full w-full object-cover object-[65%_25%] brightness-[0.88] sm:object-[70%_30%] lg:object-right"
        />
        <div className="absolute inset-0 hidden bg-linear-to-r from-[#0c0414]/85 via-[#180a26]/55 via-50% to-transparent md:block" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0c0414]/90 via-[#180a26]/60 to-[#180a26]/20 md:hidden" />
        <div className="pointer-events-none absolute inset-0 bg-radial-at-c from-transparent via-black/10 to-black/35" />
      </div>

      <div className="relative z-10 flex min-h-155 w-full flex-col justify-between px-6 py-12 sm:min-h-170 sm:px-10 sm:py-16 md:px-14 lg:min-h-185 lg:px-16 lg:py-20">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-secondary" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-secondary uppercase sm:text-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary inline" />
            Pure Botanical Science • Crafted For Every Woman
          </span>
        </div>

        <div className="my-auto max-w-2xl space-y-6 pt-6 pb-8">
          <h1 className="font-heading text-3xl leading-[1.08] font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
            EMBRACE THE ART OF
            <br />
            TIMELESS BEAUTY
          </h1>

          <p className="max-w-xl text-sm leading-relaxed font-medium text-white/90 drop-shadow-xs sm:text-base lg:text-lg">
            Luminous botanical skincare, signature personal fragrances, sculpting second-skin
            bras, and restorative body care formulated for your daily self-care rituals.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/products"
              onClick={onExploreClick}
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'h-auto cursor-pointer rounded-lg px-7 py-6 text-xs font-bold tracking-wider uppercase shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl sm:text-sm'
              )}
            >
              Explore Beauty Collection
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover/button:translate-x-1" />
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={handleLookbook}
              className="h-auto cursor-pointer rounded-lg border-white/25 bg-white/10 px-7 py-6 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:text-white sm:text-sm"
            >
              Beauty Lookbook
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <Button
            variant="ghost"
            onClick={handleScrollDown}
            className="h-auto cursor-pointer gap-1.5 px-0 text-[11px] font-bold tracking-widest text-white/70 uppercase hover:bg-transparent hover:text-white"
          >
            Scroll Down
            <ChevronDown className="size-3.5 animate-bounce transition-transform group-hover/button:translate-y-0.5" />
          </Button>

          <div className="hidden items-center gap-2 text-[11px] font-medium tracking-wider text-white/50 uppercase sm:flex">
            <span>Dermatologist Approved</span>
            <span className="size-1 rounded-full bg-white/30" />
            <span>Clean Beauty Atelier</span>
          </div>
        </div>
      </div>
    </section>
  );
};
