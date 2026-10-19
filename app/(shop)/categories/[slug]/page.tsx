'use client';

import React from 'react';
import { CatalogView } from '@/components/catalog/catalog-view';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  return <CatalogView slug={slug} />;
}
