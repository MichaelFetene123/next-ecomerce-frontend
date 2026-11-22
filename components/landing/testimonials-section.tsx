'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const TESTIMONIALS = [
  {
    rating: 5,
    date: '15 Nov 2024',
    quote:
      '"The Radiance Vitamin C Serum transformed my skin barrier within two weeks. Lightweight, glowing, and never sticky. Paid in seconds with Telebirr and received it in Bole the same afternoon."',
    initials: 'SB',
    name: 'Selamawit Bekele',
    title: 'Skincare Enthusiast, Addis',
  },
  {
    rating: 5,
    date: '22 Nov 2024',
    quote:
      '"The Velvet Rose Eau de Parfum has the most captivating, lingering sillage. I get compliments everywhere I go. True niche luxury fragrance without needing to buy abroad."',
    initials: 'HA',
    name: 'Helen Assefa',
    title: 'Creative Director',
  },
  {
    rating: 5,
    date: '03 Dec 2024',
    quote:
      '"Finding wireless bras that provide both genuine lift and cloud-soft comfort was impossible until now. The Seamless Cloud Bra feels like second skin under silk blouses."',
    initials: 'MT',
    name: 'Meron Tadesse',
    title: 'Architect & Designer',
  },
  {
    rating: 5,
    date: '10 Jan 2025',
    quote:
      '"The Whipped Shea Body Butter is pure decadence. Keeps my skin deeply hydrated all day in dry weather. Packaging is immaculate and customer care is exceptionally polite."',
    initials: 'BH',
    name: 'Dr. Bethlehem Haile',
    title: 'Physician',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full space-y-8 sm:space-y-10">
      <div className="mx-auto max-w-2xl space-y-2 text-center">
        <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
          Client Voices
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          LOVED BY WOMEN EVERYWHERE
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Over 25,000 women depend on our clean botanical formulations, evocative perfumes, and cloud-soft intimate bras for their daily confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {TESTIMONIALS.map((item) => (
          <Card
            key={item.name}
            className="h-full justify-between gap-5 rounded-xl border-border/80 py-0 shadow-xs transition-all duration-300 hover:shadow-lg"
          >
            <CardContent className="space-y-3 p-6 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#F5A623]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">{item.date}</span>
              </div>
              <p className="text-xs leading-relaxed font-normal text-foreground/80 italic sm:text-[13px] dark:text-foreground/90">
                {item.quote}
              </p>
            </CardContent>

            <CardFooter className="gap-3 border-t border-border/50 bg-transparent p-6 pt-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-xs">
                {item.initials}
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-xs font-bold text-foreground">
                  {item.name}
                </h4>
                <p className="truncate text-[11px] text-muted-foreground">{item.title}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
