import React from 'react';
import { Metadata } from 'next';
import { NotFoundView } from '@/components/layout/not-found-view';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Storefront',
  description: 'The requested page could not be found. Return to Home or browse products.',
};

export default function ShopNotFound() {
  return <NotFoundView />;
}
