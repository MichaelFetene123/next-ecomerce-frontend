'use client';

import React from 'react';
import { ShieldCheck, Headphones, Truck, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: '100% Satisfaction',
    description: 'Industrial-grade quality inspection on every single garment and seam.',
  },
  {
    icon: Headphones,
    title: '24/7 Online Service',
    description: 'Dedicated corporate concierges, personal stylists, and order desk.',
  },
  {
    icon: Truck,
    title: 'Express Delivery',
    description: 'Prompt 24-hour door dispatch across Addis Ababa and major regions.',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'Encrypted checkout supporting Telebirr, CBE Birr, Chapa, and Visa.',
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
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#002167]/10 text-[#002167] transition-all duration-300 group-hover/card:scale-105 group-hover/card:bg-[#002167] group-hover/card:text-white dark:bg-primary/20 dark:text-[#FDD79A]">
                  <Icon className="size-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="text-sm font-bold tracking-tight text-[#012169] dark:text-foreground">
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
