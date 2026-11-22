import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
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
  title: 'About Us | Storefront Beauty & Essentials',
  description:
    'Discover the story behind Storefront. Clean botanical skincare, signature perfumes, cloud-comfort bras, and nourishing body care powered by seamless checkout.',
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
      icon: <Sparkles className="w-5 h-5 text-secondary" />,
      title: 'Botanical Purity',
      description:
        'Every skincare and body formula is dermatologist-tested, utilizing ethically sourced cold-pressed botanicals and clean ingredients.',
    },
    {
      icon: <Lock className="w-5 h-5 text-secondary" />,
      title: 'Fintech-Grade Security',
      description:
        'Seamless and safe transactions powered by Chapa, supporting instant payments via Telebirr, CBE Birr, and major debit/credit cards.',
    },
    {
      icon: <Truck className="w-5 h-5 text-secondary" />,
      title: 'Climate-Protected Dispatch',
      description:
        'From our temperature-regulated beauty facilities straight to your doorstep, enjoy real-time tracking and delicate package care.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-secondary" />,
      title: 'Women-Centric Care',
      description:
        'Our beauty concierges are always available to assist with skincare analysis, fragrance pairing, and discreet bra fit consultations.',
    },
  ];

  const stats = [
    { label: 'Happy Women Served', value: '25,000+' },
    { label: 'Clean Beauty Formulations', value: '250+' },
    { label: 'Same-Day Dispatch Rate', value: '99.2%' },
    { label: 'Customer Love Rating', value: '4.9 / 5' },
  ];

  return (
    <div className="w-full space-y-16 sm:space-y-20 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#12071d] text-white shadow-2xl">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=85"
            alt="Storefront beauty atelier"
            className="w-full h-full object-cover object-center opacity-30 filter brightness-75 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#12071d] via-[#12071d]/85 to-[#12071d]/50" />
        </div>

        <div className="relative z-10 max-w-3xl px-6 py-16 sm:px-12 sm:py-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold tracking-wider uppercase text-secondary border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage & Purpose</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Formulated With Love. <br className="hidden sm:inline" />
            <span className="text-secondary">Dedicated To Every Woman.</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
            Storefront was founded on the belief that everyday beauty and intimate essentials should celebrate
            natural radiance and effortless comfort. We formulate clean skincare, bottle evocative personal
            perfumes, sculpt second-skin wirefree bras, and handcraft whipped body lotions for your daily rituals.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95'
              )}
            >
              Explore Beauty Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all group"
            >
              <TelegramIcon className="w-4 h-4 text-[#229ED9] group-hover:scale-110 transition-transform" />
              <span>Join The Beauty Circle</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Pillars / Why Choose Storefront */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Our Core Promises
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Clean Formulations & Uncompromised Quality
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            We hold every skincare cream, eau de parfum, and intimate bra to the highest standard of craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-card text-card-foreground border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4 hover:shadow-lg hover:border-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
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
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Globe2 className="w-4 h-4" />
            <span>The Vision</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Elevating Personal Care & Women&apos;s Essentials
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Finding truly clean skincare, enduring fragrances, and genuinely supportive, wireless bras
              often felt overwhelming. Storefront was conceived to curate an elevated sanctuary of beauty
              and self-care essentials for modern women.
            </p>
            <p>
              By combining dermatological science, artisanal perfume blending, and ergonomic intimate tailoring,
              we ensure that each product nurtures your body, skin, and spirit. From your morning glow routine to
              evening rest, we are honored to be part of your personal care journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              '100% cruelty-free & clean botanical ingredients',
              'Second-skin wirefree bra fit guarantee',
              'Artisanal long-lasting fragrance concentrates',
              'Frictionless checkout with Telebirr & Chapa',
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img
              src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1000&auto=format&fit=crop&q=85"
              alt="Botanical skincare and beauty essentials"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Statistics */}
      <section className="bg-muted/40 border border-border/60 rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1 sm:space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
