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
      className={`group relative block overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-lg transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl sm:rounded-2xl ${
        isTall ? 'h-125 min-h-120 sm:h-140 lg:h-full' : 'h-62.5 sm:h-67.5'
      }`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover object-center brightness-100 transition-transform duration-700 ease-out group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#020b1e]/75 via-[#020b1e]/35 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-[#020b1e]/35 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-md space-y-1.5">
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-[#FDD79A] uppercase drop-shadow-xs sm:text-[11px]">
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
            className="size-11 shrink-0 rounded-full bg-white text-[#012169] shadow-lg pointer-events-none hover:bg-white sm:size-12 group-hover:scale-110 group-hover:bg-[#FDD79A] group-hover:text-[#012169] group-hover:shadow-xl"
            tabIndex={-1}
            aria-hidden
          >
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
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
            Collections 2025
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#002167] sm:text-3xl lg:text-4xl dark:text-foreground">
            CURATED WARDROBE DEPARTMENTS
          </h2>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-right">
          Select a specialized category tailored to modern workplace rigor and leisure aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-7">
          <DepartmentCard
            tag="SARTORIAL SUITE"
            title="FORMAL WOMAN"
            description="Executive suiting, silk blouses & tailored skirts"
            image="/images/landing/dept-formal-woman.jpg"
            href="/categories"
          />
          <DepartmentCard
            tag="TAILORED CRAFT"
            title="FORMAL MEN"
            description="Peak lapel blazers, dress trousers & oxford footwear"
            image="/images/landing/dept-formal-men.jpg"
            href="/categories"
          />
        </div>

        <div className="lg:col-span-5">
          <DepartmentCard
            tag="EVERYDAY EASE"
            title="CASUAL STYLE"
            description="Refined knits, breathable poplin shirts, and elevated minimalist lounge essentials."
            image="/images/landing/dept-casual-style.jpg"
            href="/categories"
            isTall
          />
        </div>
      </div>
    </section>
  );
};
