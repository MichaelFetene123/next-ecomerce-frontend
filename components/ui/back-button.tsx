"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface BackButtonProps {
  /**
   * Safe fallback URL to navigate to when there is no browser history or when arriving directly
   * @default '/'
   */
  fallbackHref?: string;
  /**
   * Optional text label displayed next to the arrow
   * @default 'Back'
   */
  label?: string;
  /**
   * Additional className for custom spacing or layout
   */
  className?: string;
}

export function BackButton({
  fallbackHref = '/',
  label = 'Back',
  className,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      // Check if user has navigation history in this tab session
      const hasHistory =
        (window.history.state && window.history.state.idx > 0) ||
        (document.referrer && document.referrer.includes(window.location.host));

      if (hasHistory) {
        router.back();
        return;
      }
    }
    router.push(fallbackHref);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={cn(
        'group inline-flex items-center gap-1.5 px-2.5 h-8 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-all cursor-pointer -ml-2.5',
        className
      )}
      aria-label={label ? `Go back: ${label}` : 'Go back'}
      title="Go back to previous page"
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      {label && <span>{label}</span>}
    </Button>
  );
}

