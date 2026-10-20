import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ShieldCheck,
  Sparkles,
  Truck,
  HeartHandshake,
  ArrowRight,
  Store,
  CheckCircle2,
  Lock,
  Globe2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Storefront',
  description:
    'Discover the story behind Storefront. Modern commerce, verified quality, and seamless secure checkout powered by Chapa.',
};

const TelegramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

export default function AboutPage() {
  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || 'StorefrontOfficial';
  const telegramUrl =
    process.env.NEXT_PUBLIC_TELEGRAM_URL ||
    `https://t.me/${telegramUsername.replace(/^@/, '')}`;

  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#FDD79A]" />,
      title: 'Curated Excellence',
      description:
        'Every item in our catalog undergoes rigorous inspection for material integrity, craftsmanship, and enduring aesthetic appeal.',
    },
    {
      icon: <Lock className="w-5 h-5 text-[#FDD79A]" />,
      title: 'Fintech-Grade Security',
      description:
        'Seamless and safe transactions powered by Chapa, supporting instant payments via Telebirr, CBE Birr, and major debit/credit cards.',
    },
    {
      icon: <Truck className="w-5 h-5 text-[#FDD79A]" />,
      title: 'Reliable Fulfillment',
      description:
        'From our regional distribution centers straight to your doorstep, enjoy real-time tracking and dedicated dispatch care.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#FDD79A]" />,
      title: 'Customer-Centric Care',
      description:
        'Our support team is always available to assist with inquiries, sizing guidance, and guaranteed post-purchase satisfaction.',
    },
  ];

  const stats = [
    { label: 'Active Customers', value: '15,000+' },
    { label: 'Verified Products', value: '1,200+' },
    { label: 'On-Time Delivery Rate', value: '99.4%' },
    { label: 'Customer Satisfaction', value: '4.9 / 5' },
  ];

  return (
    <div className="w-full space-y-16 sm:space-y-20 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#012169] text-white shadow-2xl">
        <div className="absolute inset-0">
          <img
            src="/images/landing/lookbook-artisans.jpg"
            alt="Storefront craftsmanship"
            className="w-full h-full object-cover object-center opacity-25 filter brightness-75 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#012169] via-[#012169]/85 to-[#012169]/50" />
        </div>

        <div className="relative z-10 max-w-3xl px-6 py-16 sm:px-12 sm:py-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold tracking-wider uppercase text-[#FDD79A] border border-white/15">
            <Store className="w-3.5 h-3.5" />
            <span>Our Heritage & Purpose</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Crafted With Care. <br className="hidden sm:inline" />
            <span className="text-[#FDD79A]">Delivered With Integrity.</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
            Storefront bridges modern contemporary design with state-of-the-art e-commerce.
            We bring you authentic garments, precision electronics, and everyday home essentials
            backed by seamless payment technologies and genuine artisan care.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FDD79A] text-[#012169] font-bold text-xs sm:text-sm hover:bg-[#FCD082] transition-all shadow-md active:scale-95"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all group"
            >
              <TelegramIcon className="w-4 h-4 text-[#229ED9] group-hover:scale-110 transition-transform" />
              <span>Join Our Community</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Pillars / Why Choose Storefront */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#012169] dark:text-[#FDD79A]">
            Core Commitments
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Built On Transparency & Quality
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            We hold ourselves to elevated standards so you can shop with unwavering confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-card text-card-foreground border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4 hover:shadow-lg hover:border-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#012169] dark:bg-white/10 flex items-center justify-center shadow-xs">
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-foreground">{v.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Story & Mission Feature */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-card border border-border/60 rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#012169] dark:text-[#FDD79A]">
            <Globe2 className="w-4 h-4" />
            <span>The Vision</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Elevating Commerce in East Africa and Beyond
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Storefront began with a simple observation: modern consumers deserve an effortless,
              transparent shopping experience with verified catalog quality, reliable domestic deliveries,
              and frictionless checkout using local payment channels.
            </p>
            <p>
              By fusing modern digital infrastructure with trusted regional supply networks,
              we eliminate the guesswork from online purchases. Whether you are acquiring timeless
              cashmere apparel, precision technology for work, or thoughtfully designed home goods,
              each order is handled with the care it deserves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Direct partnerships with ethical creators',
              'Instant Chapa payment confirmation',
              'Real-time automated status updates',
              'Hassle-free guarantee on all items',
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                <CheckCircle2 className="w-4 h-4 text-[#012169] dark:text-[#FDD79A] shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/5">
            <img
              src="/images/landing/dept-formal-woman.jpg"
              alt="Storefront collection"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FDD79A]">
                Quality Guaranteed
              </span>
              <p className="text-sm font-semibold">
                Designed for those who appreciate refined craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Banner */}
      <section className="rounded-2xl sm:rounded-3xl bg-[#012169] text-white p-8 sm:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((s, idx) => (
            <div key={idx} className="pt-4 sm:pt-0 sm:px-4 space-y-1.5">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#FDD79A] tracking-tight">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-white/75">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="text-center bg-card border border-border/80 rounded-3xl p-8 sm:p-14 space-y-6 max-w-3xl mx-auto shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#012169] text-[#FDD79A] flex items-center justify-center mx-auto shadow-md">
          <Store className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Discover the Difference Today
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Browse our catalog or connect with our community on Telegram to stay informed
            on exclusive releases and new arrivals.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#012169] hover:bg-[#012169]/90 text-white font-bold text-xs sm:text-sm px-6 h-11 rounded-xl shadow-xs transition-colors"
          >
            <span>Browse All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border bg-card hover:bg-muted text-foreground font-semibold text-xs sm:text-sm px-5 h-11 rounded-xl transition-colors"
          >
            <TelegramIcon className="w-4 h-4 text-[#229ED9]" />
            <span>Join Telegram</span>
          </a>
        </div>
      </section>
    </div>
  );
}
