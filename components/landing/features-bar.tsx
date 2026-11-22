'use client';

import React from 'react';
import { Sparkles, HeartHandshake, Truck, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Clean & Dermatologist Tested',
    description: 'Cruelty-free botanical formulas, non-comedogenic ingredients, and hypoallergenic fabrics.',
  },
  {
    icon: HeartHandshake,
    title: '24/7 Beauty Concierge',
    description: 'Complimentary skincare consultations, bespoke fragrance discovery, and bra fit guidance.',
  },
  {
    icon: Truck,
    title: 'Express Door Dispatch',
    description: 'Prompt 24-hour climate-protected delivery across Addis Ababa and major regions.',
  },
  {
    icon: Lock,
    title: 'Fintech-Secured Checkout',
    description: 'Encrypted payment flow supporting Telebirr, CBE Birr, Chapa, and international Visa cards.',
  },
];

export const FeaturesBar: React.FC = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="rounded-xl border-border/80 py-0 shadow-xs transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="flex items-start gap-4 p-5 sm:p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover/card:scale-105 group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                  <Icon className="size-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="text-sm font-bold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
