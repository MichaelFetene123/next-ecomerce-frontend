'use client';

import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
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
    <section className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#051838] shadow-2xl transition-all duration-300 sm:rounded-[36px]">
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/images/landing/hero-model.jpg"
          alt="Discover The Art Of Dressing Up - Storefront Runway"
          className="h-full w-full object-cover object-[70%_25%] brightness-100 sm:object-[75%_30%] lg:object-right"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#03132e]/75 via-[#051838]/50 via-50% to-transparent md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03132e]/80 via-[#051838]/55 to-[#051838]/20 md:hidden" />
        <div className="pointer-events-none absolute inset-0 bg-radial-at-c from-transparent via-black/5 to-black/20" />
      </div>

      <div className="relative z-10 flex min-h-[620px] w-full flex-col justify-between px-6 py-12 sm:min-h-[680px] sm:px-10 sm:py-16 md:px-14 lg:min-h-[740px] lg:px-16 lg:py-20">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-[#FDD79A]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#FDD79A] uppercase sm:text-xs">
            Tailored in Ethiopia • Crafted for the World
          </span>
        </div>

        <div className="my-auto max-w-2xl space-y-6 pt-6 pb-8">
          <h1 className="font-heading text-3xl leading-[1.08] font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
            DISCOVER THE ART OF
            <br />
            DRESSING UP
          </h1>

          <p className="max-w-xl text-sm leading-relaxed font-medium text-white/90 drop-shadow-xs sm:text-base lg:text-lg">
            Curated corporate and artisanal silhouettes designed for high impact,
            supreme comfort, and architectural precision.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Button
              size="lg"
              onClick={handleExplore}
              className="h-auto cursor-pointer rounded-lg bg-[#FDD79A] px-7 py-6 text-xs font-bold tracking-wider text-[#012169] uppercase shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[#FCD082] hover:text-[#012169] hover:shadow-xl sm:text-sm"
            >
              Explore Collection
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover/button:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleLookbook}
              className="h-auto cursor-pointer rounded-lg border-white/25 bg-white/10 px-7 py-6 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:text-white sm:text-sm"
            >
              A/W Lookbook
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <Button
            variant="ghost"
            onClick={handleExplore}
            className="h-auto cursor-pointer gap-1.5 px-0 text-[11px] font-bold tracking-widest text-white/70 uppercase hover:bg-transparent hover:text-white"
          >
            Scroll Down
            <ChevronDown className="size-3.5 animate-bounce transition-transform group-hover/button:translate-y-0.5" />
          </Button>

          <div className="hidden items-center gap-2 text-[11px] font-medium tracking-wider text-white/50 uppercase sm:flex">
            <span>Autumn / Winter 2025</span>
            <span className="size-1 rounded-full bg-white/30" />
            <span>Storefront Atelier</span>
          </div>
        </div>
      </div>
    </section>
  );
};
