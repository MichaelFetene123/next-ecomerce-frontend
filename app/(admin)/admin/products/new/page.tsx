"use client";

import React from 'react';
import { ProductForm } from '@/components/admin/products';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <ProductForm mode="create" />
    </div>
  );
}

