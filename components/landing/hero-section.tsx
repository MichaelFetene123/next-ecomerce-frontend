'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onLookbookClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onLookbookClick,
}) => {
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

        {/* Center Main Stage (Typography + CTAs) */}
        <div className="my-auto pt-6 pb-8 max-w-2xl space-y-6">
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
