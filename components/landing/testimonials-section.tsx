'use client';

import React from 'react';
import { Star } from 'lucide-react';

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
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
          Client Voices
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002167] dark:text-foreground tracking-tight">
          TRUSTED BY COMMERCE LEADERS
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Over 15,000 verified Ethiopian and pan-African professionals depend on Storefront for reliable daily dressing.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {TESTIMONIALS.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-5 group"
          >
            {/* Top row: Stars & Date */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#F5A623]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {item.date}
                </span>
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-[13px] text-foreground/80 dark:text-foreground/90 leading-relaxed font-normal italic">
                {item.quote}
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-3 border-t border-border/50">
              {/* Circular Avatar with Initials */}
              <div className="w-9 h-9 rounded-full bg-[#002167] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {item.initials}
              </div>

              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#012169] dark:text-foreground truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};