'use client';

import React from 'react';
import Link from 'next/link';
import { Play, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const LookbookBanner: React.FC = () => {
  return (
    <Dialog>
      <section
        id="film-lookbook"
        className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#12071d] text-white shadow-2xl sm:rounded-2xl"
      >
        <div className="absolute inset-0 h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1512290900672-1f41b3734a66?w=1400&auto=format&fit=crop&q=85"
            alt="Artisanal Skincare & Fragrance Alchemy Laboratory"
            className="h-full w-full object-cover object-center brightness-[0.78] transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-[#0d0315]/50" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/55" />
        </div>

        <div className="relative z-10 flex min-h-95 w-full flex-col items-center justify-between px-6 py-12 text-center sm:min-h-110 sm:px-12 sm:py-16">
          <div className="pointer-events-auto absolute bottom-8 left-8 hidden flex-col items-start text-left text-white/60 lg:flex">
            <span className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">
              Beauty Rituals
            </span>
            <span className="text-sm font-bold text-white/90">Skin & Sillage Edition</span>
            <Link
              href="/products?category=perfumes-fragrances"
              className="mt-1 text-[11px] font-bold text-secondary hover:underline"
            >
              Explore Scents →
            </Link>
          </div>

          <div className="h-4" />

          <div className="mx-auto my-auto max-w-2xl space-y-5">
            <div className="flex justify-center">
              <DialogTrigger
                render={
                  <Button
                    type="button"
                    size="icon"
                    aria-label="Play beauty film"
                    className="relative size-16 cursor-pointer rounded-full bg-secondary text-secondary-foreground shadow-2xl transition-all duration-300 ease-out hover:scale-105 hover:bg-secondary/90 sm:size-20"
                  />
                }
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-secondary/30 opacity-75 animate-ping animation-duration-[2.5s]" />
                <Play className="ml-1 size-6 fill-current sm:size-7" />
              </DialogTrigger>
            </div>

            <div className="space-y-2">
              <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-secondary uppercase drop-shadow-xs sm:text-[11px]">
                Beauty Film • The Alchemy of Glow
              </span>
              <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl">
                THE ANATOMY OF RADIANCE & BOTANICAL CARE
              </h2>
            </div>

            <p className="mx-auto max-w-lg text-xs leading-relaxed font-normal text-white/95 drop-shadow-xs sm:text-sm">
              Discover how our cosmetic chemists and artisanal perfumers harmonise rare African botanicals,
              pure essential oils, and featherlight sculpting fabrics for your everyday rituals.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 text-[10px] font-semibold tracking-wider text-white/70 uppercase drop-shadow-xs sm:text-[11px]">
            <span>Clean Formulations</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>4K Cinema Audio</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>Botanical Beauty Atelier</span>
          </div>
        </div>
      </section>

      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-xl bg-slate-950 p-0 text-white ring-white/10 sm:max-w-4xl sm:rounded-2xl"
      >
        <DialogHeader className="flex-row items-center justify-between border-b border-white/10 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            <DialogTitle className="text-sm font-bold tracking-tight text-white sm:text-base flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-secondary" />
              The Alchemy of Glow (Botanical Formulation Story)
            </DialogTitle>
          </div>
          <DialogClose
            render={
              <Button
                size="icon-sm"
                variant="ghost"
                className="rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
              />
            }
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-black">
          <img
            src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1200&auto=format&fit=crop&q=85"
            alt="Botanical Ingredients and Essential Oils preview"
            className="h-full w-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 p-6 text-center">
            <div className="max-w-md space-y-2">
              <span className="text-[11px] font-bold tracking-widest text-secondary uppercase">
                Now Screening
              </span>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                Pure Botanicals, Delicate Silks & Eternal Sillage
              </h3>
              <p className="text-xs text-white/80">
                Ethically harvested cold-pressed oils, gentle wirefree support structures, and artisanal perfume concentrates.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
