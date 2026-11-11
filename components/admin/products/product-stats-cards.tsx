"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { AdminProductStats } from '@/types/catalog';
import { Package, CheckCircle2, FileEdit, Star, AlertTriangle } from 'lucide-react';

interface ProductStatsCardsProps {
  stats?: AdminProductStats;
  currentFilter?: {
    status?: string;
    featured?: string;
    stock?: string;
  };
  onSelectQuickFilter?: (filter: { status?: 'all' | 'active' | 'inactive'; featured?: 'all' | 'featured' | 'standard'; stock?: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock' }) => void;
}

export function ProductStatsCards({
  stats,
  currentFilter,
  onSelectQuickFilter,
}: ProductStatsCardsProps) {
  const cards = [
    {
      title: 'Total Products',
      value: stats?.total ?? 0,
      icon: Package,
      color: 'text-primary bg-primary/10',
      active: !currentFilter?.status || currentFilter.status === 'all' && (!currentFilter.featured || currentFilter.featured === 'all') && (!currentFilter.stock || currentFilter.stock === 'all'),
      onClick: () => onSelectQuickFilter?.({ status: 'all', featured: 'all', stock: 'all' }),
    },
    {
      title: 'Active on Store',
      value: stats?.active ?? 0,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400',
      active: currentFilter?.status === 'active',
      onClick: () => onSelectQuickFilter?.({ status: 'active', featured: 'all', stock: 'all' }),
    },
    {
      title: 'Draft / Hidden',
      value: stats?.draft ?? 0,
      icon: FileEdit,
      color: 'text-amber-600 bg-amber-500/10 dark:text-amber-400',
      active: currentFilter?.status === 'inactive',
      onClick: () => onSelectQuickFilter?.({ status: 'inactive', featured: 'all', stock: 'all' }),
    },
    {
      title: 'Featured Items',
      value: stats?.featured ?? 0,
      icon: Star,
      color: 'text-amber-500 bg-amber-500/10',
      active: currentFilter?.featured === 'featured',
      onClick: () => onSelectQuickFilter?.({ status: 'all', featured: 'featured', stock: 'all' }),
    },
    {
      title: 'Low / Out of Stock',
      value: stats?.low_stock ?? 0,
      icon: AlertTriangle,
      color: 'text-destructive bg-destructive/10',
      active: currentFilter?.stock === 'low_stock' || currentFilter?.stock === 'out_of_stock',
      onClick: () => onSelectQuickFilter?.({ status: 'all', featured: 'all', stock: 'low_stock' }),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <button
            key={card.title}
            type="button"
            onClick={card.onClick}
            className={`text-left p-3.5 rounded-xl border transition-all ${
              card.active
                ? 'bg-card border-primary/40 ring-1 ring-primary/20 shadow-xs'
                : 'bg-card/60 hover:bg-card border-border hover:border-border/80'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground truncate">
                {card.title}
              </span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${card.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold tracking-tight text-foreground font-mono">
              {card.value.toLocaleString()}
            </div>
          </button>
        );
      })}
    </div>
  );
}

