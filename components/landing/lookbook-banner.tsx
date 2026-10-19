'use client';

import React from 'react';
import Link from 'next/link';
import { Play, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export const LookbookBanner: React.FC = () => {
  return (
    <Dialog>
      <section
        id="film-lookbook"
        className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#03132e] text-white shadow-2xl sm:rounded-2xl"
      >
        <div className="absolute inset-0 h-full w-full">
          <img
            src="/images/landing/lookbook-artisans.jpg"
            alt="The Anatomy of Motion & Elegance - Artisanal Tailoring in Addis Ababa"
            className="h-full w-full object-cover object-center brightness-[0.92] transition-transform duration-700 ease-out group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-[#051838]/35" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/15 to-black/45" />
        </div>

        <div className="relative z-10 flex min-h-95 w-full flex-col items-center justify-between px-6 py-12 text-center sm:min-h-110 sm:px-12 sm:py-16">
          <div className="pointer-events-auto absolute bottom-8 left-8 hidden flex-col items-start text-left text-white/60 lg:flex">
            <span className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">
              Model Wardrobe
            </span>
            <span className="text-sm font-bold text-white/90">New Arrivals Edition</span>
            <Link
              href="/categories/fashion"
              className="mt-1 text-[11px] font-bold text-[#FDD79A] hover:underline"
            >
              Shop Now →
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
                    aria-label="Play lookbook film"
                    className="relative size-16 cursor-pointer rounded-full bg-[#FDD79A] text-[#012169] shadow-2xl hover:scale-110 hover:bg-[#FDD79A] hover:text-[#012169] sm:size-20"
                  />
                }
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[#FDD79A]/40 opacity-75 animate-ping" />
                <Play className="ml-1 size-6 fill-current sm:size-7" />
              </DialogTrigger>
            </div>

            <div className="space-y-2">
              <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-[#FDD79A] uppercase drop-shadow-xs sm:text-[11px]">
                Film Lookbook • 2025 Motion Study
              </span>
              <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl">
                THE ANATOMY OF MOTION & ELEGANCE
              </h2>
            </div>

            <p className="mx-auto max-w-lg text-xs leading-relaxed font-normal text-white/95 drop-shadow-xs sm:text-sm">
              Watch our artisans in Addis Ababa combine timeless tailoring traditions with
              high-performance modern textiles.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 text-[10px] font-semibold tracking-wider text-white/70 uppercase drop-shadow-xs sm:text-[11px]">
            <span>Directorial Cut</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>4K Cinema Sound</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>Addis Ababa Studios</span>
          </div>
        </div>
      </section>

      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-xl bg-slate-950 p-0 text-white ring-white/10 sm:max-w-4xl sm:rounded-2xl"
      >
        <DialogHeader className="flex-row items-center justify-between border-b border-white/10 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500 animate-pulse" />
            <DialogTitle className="text-sm font-bold tracking-tight text-white sm:text-base">
              The Anatomy of Motion & Elegance (Motion Story)
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
            src="/images/landing/lookbook-artisans.jpg"
            alt="Cinema preview"
            className="h-full w-full scale-102 object-cover brightness-90"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-radial-at-c from-transparent to-black/60 p-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#FDD79A]/90 text-[#012169] shadow-xl">
              <Play className="ml-0.5 size-6 fill-current" />
            </div>
            <DialogDescription className="max-w-md space-y-1 text-center">
              <span className="block text-sm font-bold text-white">
                Autumn/Winter Capsule Documentary
              </span>
              <span className="block text-xs text-white/70">
                Filmed in the historic quarters of Addis Ababa, capturing master tailors shaping
                pure Ethiopian linen and Mulberry silk.
              </span>
            </DialogDescription>
          </div>
        </div>

        <DialogFooter className="flex-col items-center justify-between gap-4 bg-slate-900/80 p-4 sm:flex-row sm:p-6">
          <p className="text-xs text-white/70">
            Run time: 02:45 • Directed by Storefront Atelier
          </p>
          <div className="flex items-center gap-3">
            <DialogClose
              nativeButton={false}
              render={
                <Link
                  href="/categories/fashion"
                  className={cn(
                    buttonVariants(),
                    'h-auto rounded-lg bg-[#FDD79A] px-5 py-2.5 text-xs font-bold tracking-wider text-[#012169] uppercase hover:bg-[#FCD082] hover:text-[#012169]'
                  )}
                />
              }
            >
              Shop Featured Looks
            </DialogClose>
            <DialogClose
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-white hover:bg-white/10 hover:text-white"
                />
              }
            >
              Close
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
