'use client';

import React from 'react';
import { ShieldCheck, Headphones, Truck, Lock } from 'lucide-react';

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
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex items-start gap-4 group"
            >
              {/* Circular Icon Container */}
              <div className="w-11 h-11 rounded-xl bg-[#002167]/10 dark:bg-primary/20 text-[#002167] dark:text-[#FDD79A] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#002167] group-hover:text-white transition-all duration-300">
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Text */}
              <div className="space-y-1 min-w-0">
                <h3 className="text-sm font-bold text-[#012169] dark:text-foreground tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
