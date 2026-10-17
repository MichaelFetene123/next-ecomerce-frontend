'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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
      className={`group relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-slate-900 border border-white/10 shadow-lg block transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] ${
        isTall ? 'h-[500px] sm:h-[560px] lg:h-full min-h-[480px]' : 'h-[250px] sm:h-[270px]'
      }`}
    >
      {/* Background Image with Zoom Effect */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-100 group-hover:scale-108 transition-transform duration-700 ease-out"
      />

      {/* Gradients for rich readability matching the design - lightened overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/75 via-[#020b1e]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020b1e]/35 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-end">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-md">
            <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#FDD79A] uppercase drop-shadow-xs">
              {tag}
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal line-clamp-2 drop-shadow-xs">
              {description}
            </p>
          </div>

          {/* White Circular Action Button */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#012169] flex items-center justify-center shrink-0 shadow-lg group-hover:bg-[#FDD79A] group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const DepartmentsSection: React.FC = () => {
  return (
    <section id="curated-departments" className="w-full space-y-6 sm:space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Collections 2025
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002167] dark:text-foreground tracking-tight">
            CURATED WARDROBE DEPARTMENTS
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed md:text-right">
          Select a specialized category tailored to modern workplace rigor and leisure aesthetics.
        </p>
      </div>

      {/* Grid Layout: Left stacked 2, Right tall 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column (2 Stacked) */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          <DepartmentCard
            tag="SARTORIAL SUITE"
            title="FORMAL WOMAN"
            description="Executive suiting, silk blouses & tailored skirts"
            image="/images/landing/dept-formal-woman.jpg"
            href="/categories/fashion"
          />

          <DepartmentCard
            tag="TAILORED CRAFT"
            title="FORMAL MEN"
            description="Peak lapel blazers, dress trousers & oxford footwear"
            image="/images/landing/dept-formal-men.jpg"
            href="/categories/fashion"
          />
        </div>

        {/* Right Column (Tall) */}
        <div className="lg:col-span-5">
          <DepartmentCard
            tag="EVERYDAY EASE"
            title="CASUAL STYLE"
            description="Refined knits, breathable poplin shirts, and elevated minimalist lounge essentials."
            image="/images/landing/dept-casual-style.jpg"
            href="/categories/fashion"
            isTall
          />
        </div>
      </div>
    </section>
  );
};
