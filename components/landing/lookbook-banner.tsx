'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, X, Sparkles, Volume2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LookbookBanner: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <section className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#03132e] text-white shadow-2xl border border-white/10 group">
        {/* Background Image of Artisans Atelier in Courtyard */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/landing/lookbook-artisans.jpg"
            alt="The Anatomy of Motion & Elegance - Artisanal Tailoring in Addis Ababa"
            className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:scale-103 transition-transform duration-700 ease-out"
          />

          {/* Cinematic Blue Overlay - lightened for clear image visibility */}
          <div className="absolute inset-0 bg-[#051838]/35" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/15 to-black/45" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full min-h-[380px] sm:min-h-[440px] px-6 sm:px-12 py-12 sm:py-16 flex flex-col justify-between items-center text-center">
          {/* Left subtle watermark (desktop) */}
          <div className="absolute left-8 bottom-8 hidden lg:flex flex-col items-start text-left text-white/60 pointer-events-auto">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-white/70">
              Model Wardrobe
            </span>
            <span className="text-sm font-bold text-white/90">
              New Arrivals Edition
            </span>
            <Link
              href="/categories/fashion"
              className="text-[11px] font-bold text-[#FDD79A] hover:underline mt-1"
            >
              Shop Now →
            </Link>
          </div>

          {/* Spacer */}
          <div className="h-4" />

          {/* Center Play Button & Title */}
          <div className="max-w-2xl mx-auto space-y-5 my-auto">
            {/* Glowing Golden Play Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                aria-label="Play lookbook film"
                className="relative group/btn w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FDD79A] text-[#012169] flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                {/* Ripple ring animation */}
                <span className="absolute inset-0 rounded-full bg-[#FDD79A]/40 animate-ping opacity-75 pointer-events-none" />
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
              </button>
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#FDD79A] uppercase drop-shadow-xs">
                Film Lookbook • 2025 Motion Study
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                THE ANATOMY OF MOTION & ELEGANCE
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/95 max-w-lg mx-auto leading-relaxed font-normal drop-shadow-xs">
              Watch our artisans in Addis Ababa combine timeless tailoring traditions with
              high-performance modern textiles.
            </p>
          </div>

          {/* Bottom Bar Info */}
          <div className="pt-4 flex items-center gap-3 text-[10px] sm:text-[11px] text-white/70 tracking-wider uppercase font-semibold drop-shadow-xs">
            <span>Directorial Cut</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>4K Cinema Sound</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Addis Ababa Studios</span>
          </div>
        </div>
      </section>

      {/* Interactive Lookbook Cinema Dialog Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-950 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-sm sm:text-base font-bold tracking-tight">
                  The Anatomy of Motion & Elegance (Motion Story)
                </h3>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Viewport / Canvas Showcase */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src="/images/landing/lookbook-artisans.jpg"
                alt="Cinema preview"
                className="w-full h-full object-cover filter brightness-90 scale-102"
              />

              {/* Animated Cinematic Overlay */}
              <div className="absolute inset-0 bg-radial-at-c from-transparent to-black/60 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FDD79A]/90 text-[#012169] flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
                <div className="space-y-1 max-w-md">
                  <p className="text-sm font-bold text-white">
                    Autumn/Winter Capsule Documentary
                  </p>
                  <p className="text-xs text-white/70">
                    Filmed in the historic quarters of Addis Ababa, capturing master tailors shaping pure Ethiopian linen and Mulberry silk.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80">
              <div className="text-xs text-white/70">
                Run time: 02:45 • Directed by Storefront Atelier
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/categories/fashion"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="bg-[#FDD79A] hover:bg-[#FCD082] text-[#012169] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors inline-block"
                >
                  Shop Featured Looks
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="text-white hover:bg-white/10 text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
