import { describe, expect, it } from 'bun:test';
import { cn, formatCurrency, formatDate, getImageUrl } from '@/lib/utils';

describe('Utility Functions (lib/utils.ts)', () => {
  describe('cn (className merging)', () => {
    it('merges class names and handles conditional classes', () => {
      expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
      expect(cn('p-4', false && 'hidden', 'text-sm')).toBe('p-4 text-sm');
    });

    it('resolves conflicting tailwind classes cleanly', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });
  });

  describe('formatCurrency', () => {
    it('formats numeric amounts to ETB by default', () => {
      const formatted = formatCurrency(1250.5);
      expect(formatted).toContain('1,250.50');
      expect(formatted).toContain('ETB');
    });

    it('handles string input amounts gracefully', () => {
      const formatted = formatCurrency('3500');
      expect(formatted).toContain('3,500.00');
    });

    it('handles invalid numeric strings gracefully with 0 fallback', () => {
      const formatted = formatCurrency('invalid-amount');
      expect(formatted).toContain('0.00');
    });

    it('supports custom currency codes', () => {
      const formattedUSD = formatCurrency(100, 'USD');
      expect(formattedUSD).toContain('100.00');
      expect(formattedUSD).toContain('$');
    });
  });

  describe('formatDate', () => {
    it('formats ISO date strings consistently', () => {
      const formatted = formatDate('2026-08-15T10:00:00Z');
      expect(formatted).toBe('Aug 15, 2026');
    });

    it('returns empty string for null, undefined, or invalid dates', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
      expect(formatDate('not-a-date')).toBe('');
    });
  });

  describe('getImageUrl', () => {
    it('returns placeholder image for undefined or empty paths', () => {
      expect(getImageUrl(undefined)).toBe('/placeholder-product.jpg');
      expect(getImageUrl('')).toBe('/placeholder-product.jpg');
    });

    it('returns full remote URLs unchanged', () => {
      const remoteUrl = 'https://example.com/photo.png';
      expect(getImageUrl(remoteUrl)).toBe(remoteUrl);
    });

    it('prefixes backend storage path to relative paths', () => {
      const url = getImageUrl('products/item.jpg');
      expect(url).toContain('/storage/products/item.jpg');
    });
  });
});
