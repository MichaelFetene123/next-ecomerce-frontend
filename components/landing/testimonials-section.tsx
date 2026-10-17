'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const TESTIMONIALS = [
  {
    rating: 5,
    date: '15 Nov 2024',
    quote:
      '"The linen blazers are impeccably structured. Paid via Telebirr in two seconds and received the package in Bole within four hours."',
    initials: 'SB',
    name: 'Selamawit Bekele',
    title: 'Commercial Banker, Addis',
  },
  {
    rating: 5,
    date: '22 Nov 2024',
    quote:
      '"Finding well-cut formal wear for board meetings used to require trips abroad. Storefront\'s finishing and wool quality is world class."',
    initials: 'DW',
    name: 'Dawit Wolde',
    title: 'Managing Director, FinTech',
  },
  {
    rating: 5,
    date: '03 Dec 2024',
    quote:
      '"Chapa checkout was instant and transparent. The silk jumpsuit fits like bespoke couture. Can\'t wait for the upcoming summer drop."',
    initials: 'HA',
    name: 'Helen Assefa',
    title: 'Architect & Consultant',
  },
  {
    rating: 5,
    date: '10 Jan 2025',
    quote:
      '"Fastest corporate delivery in Hawassa. The sizing charts are genuinely accurate and customer support is exceptionally polite."',
    initials: 'MT',
    name: 'Michael Tesfaye',
    title: 'Operations Lead',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full space-y-8 sm:space-y-10">
      <div className="mx-auto max-w-2xl space-y-2 text-center">
        <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
          Client Voices
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-[#002167] sm:text-3xl lg:text-4xl dark:text-foreground">
          TRUSTED BY COMMERCE LEADERS
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Over 15,000 verified Ethiopian and pan-African professionals depend on Storefront for
          reliable daily dressing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {TESTIMONIALS.map((item) => (
          <Card
            key={item.name}
            className="h-full justify-between gap-5 rounded-2xl border-border/80 py-0 shadow-xs transition-all duration-300 hover:shadow-lg"
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
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#002167] text-xs font-bold text-white shadow-xs">
                {item.initials}
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-xs font-bold text-[#012169] dark:text-foreground">
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
