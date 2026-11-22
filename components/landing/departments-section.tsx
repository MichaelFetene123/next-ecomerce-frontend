'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DepartmentCardProps {
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
  isTall?: boolean;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  tag,
  title,
  description,
  image,
  href,
  isTall = false,
}) => {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-lg transition-shadow duration-500 hover:shadow-2xl hover:border-white/20 sm:rounded-2xl ${
        isTall ? 'h-125 min-h-120 sm:h-140 lg:h-full' : 'h-62.5 sm:h-67.5'
      }`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.88] transition-transform duration-1000 ease-out group-hover:scale-[1.02] will-change-transform"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0e0416]/80 via-[#0e0416]/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-[#0e0416]/45 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-md space-y-1.5">
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-secondary uppercase drop-shadow-xs sm:text-[11px]">
              {tag}
            </span>
            <h3 className="text-xl leading-tight font-extrabold tracking-tight text-white drop-shadow-sm sm:text-2xl lg:text-3xl">
              {title}
            </h3>
            <p className="line-clamp-2 text-xs leading-relaxed font-normal text-white/90 drop-shadow-xs sm:text-sm">
              {description}
            </p>
          </div>

          <Button
            size="icon"
            className="size-11 shrink-0 rounded-full bg-white text-primary shadow-lg pointer-events-none hover:bg-white sm:size-12 transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:shadow-xl"
            tabIndex={-1}
            aria-hidden
          >
            <ArrowRight className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export const DepartmentsSection: React.FC = () => {
  return (
    <section id="curated-departments" className="w-full scroll-mt-24 space-y-6 sm:space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Curated Beauty & Care
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            WOMEN&apos;S ESSENTIAL DEPARTMENTS
          </h2>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-right">
          Discover meticulously crafted botanical formulas, alluring signature fragrances, second-skin intimate wear, and whipped body crèmes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-7">
          <DepartmentCard
            tag="CELLULAR RADIANCE"
            title="SKINCARE & COSMETICS"
            description="Active botanical serums, dewy hydration crèmes, antioxidant cleansers, and luminous makeup tints."
            image="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1000&auto=format&fit=crop&q=85"
            href="/products?category=skincare-cosmetics"
          />
          <DepartmentCard
            tag="ARTISANAL SILLAGE"
            title="PERFUMES & FRAGRANCES"
            description="Enchanting eau de parfum, rare oud extraits, velvety rose notes, and long-lasting personal mists."
            image="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&auto=format&fit=crop&q=85"
            href="/products?category=perfumes-fragrances"
          />
        </div>

        <div className="lg:col-span-5">
          <DepartmentCard
            tag="SECOND-SKIN COMFORT"
            title="BRAS & INTIMATES"
            description="Wirefree cloud comfort bras, French lace plunge bralettes, and seamless everyday undergarments crafted for natural shape and support."
            image="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1000&auto=format&fit=crop&q=85"
            href="/products?category=bras-intimates"
            isTall
          />
        </div>
      </div>
    </section>
  );
};
