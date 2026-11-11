"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Category, CreateProductInput, UpdateProductInput } from '@/types/catalog';
import { useCategories } from '@/hooks/use-categories';
import { useCreateProduct, useUpdateProduct } from '@/hooks/admin/products';
import { ImageManager } from './image-manager';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  Globe,
  Save,
  ArrowLeft,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductFormProps {
  initialProduct?: Product;
  mode?: 'create' | 'edit';
}

export function ProductForm({ initialProduct, mode = 'create' }: ProductFormProps) {
  const router = useRouter();
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct(initialProduct?.id ?? 0);

  const defaultVariant = initialProduct?.variants?.find((v) => v.is_default) || initialProduct?.variants?.[0];

  // Active section tab
  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'images' | 'seo'>('general');

  // Form states
  const [title, setTitle] = useState(initialProduct?.title ?? '');
  const [slug, setSlug] = useState(initialProduct?.slug ?? '');
  const [categoryId, setCategoryId] = useState<number | string>(
    initialProduct?.category_id ?? (categories[0]?.id || '')
  );
  const [description, setDescription] = useState(initialProduct?.description ?? '');
  const [isActive, setIsActive] = useState<boolean>(initialProduct?.is_active ?? true);
  const [isFeatured, setIsFeatured] = useState<boolean>(initialProduct?.is_featured ?? false);

  // Variant fields
  const [sku, setSku] = useState(defaultVariant?.sku ?? '');
  const [price, setPrice] = useState<string>(
    defaultVariant?.price != null ? String(defaultVariant.price) : ''
  );
  const [compareAtPrice, setCompareAtPrice] = useState<string>(
    defaultVariant?.compare_at_price != null ? String(defaultVariant.compare_at_price) : ''
  );
  const [stockQuantity, setStockQuantity] = useState<string>(
    defaultVariant?.stock_quantity != null ? String(defaultVariant.stock_quantity) : '0'
  );
  const [weight, setWeight] = useState<string>(
    defaultVariant?.weight != null ? String(defaultVariant.weight) : ''
  );

  // SEO fields
  const [metaTitle, setMetaTitle] = useState(initialProduct?.meta_title ?? '');
  const [metaDescription, setMetaDescription] = useState(initialProduct?.meta_description ?? '');

  // Staged files for new product creation
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync category default when loaded
  useEffect(() => {
    if (!categoryId && categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  // Auto-generate slug and SKU from title if empty
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === 'create') {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);

      if (!sku) {
        const generatedSku = val
          .toUpperCase()
          .replace(/[^A-Z0-9]+/g, '-')
          .slice(0, 12);
        setSku(generatedSku ? `SKU-${generatedSku}` : '');
      }
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Product title is required.';
    if (!categoryId) errs.category_id = 'Category selection is required.';
    if (!sku.trim()) errs.sku = 'SKU is required.';
    if (!price || isNaN(Number(price)) || Number(price) < 0) {
      errs.price = 'Valid product price is required.';
    }
    if (compareAtPrice && (isNaN(Number(compareAtPrice)) || Number(compareAtPrice) < 0)) {
      errs.compare_at_price = 'Compare at price must be a valid positive number.';
    }
    if (stockQuantity === '' || isNaN(Number(stockQuantity)) || Number(stockQuantity) < 0) {
      errs.stock_quantity = 'Stock quantity must be a non-negative integer.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please check form fields for errors.');
      return;
    }

    if (mode === 'create') {
      const payload: CreateProductInput = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        category_id: Number(categoryId),
        description: description.trim() || undefined,
        is_active: isActive,
        is_featured: isFeatured,
        meta_title: metaTitle.trim() || undefined,
        meta_description: metaDescription.trim() || undefined,
        sku: sku.trim().toUpperCase(),
        price: Number(price),
        compare_at_price: compareAtPrice ? Number(compareAtPrice) : null,
        stock_quantity: Math.max(0, parseInt(stockQuantity) || 0),
        weight: weight ? Number(weight) : null,
        image_files: stagedFiles.length > 0 ? stagedFiles : undefined,
      };

      try {
        const created = await createMutation.mutateAsync(payload);
        router.push('/admin/products');
      } catch {
        // Handled by mutation onError
      }
    } else {
      const payload: UpdateProductInput = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        category_id: Number(categoryId),
        description: description.trim() || undefined,
        is_active: isActive,
        is_featured: isFeatured,
        meta_title: metaTitle.trim() || undefined,
        meta_description: metaDescription.trim() || undefined,
        sku: sku.trim().toUpperCase(),
        price: Number(price),
        compare_at_price: compareAtPrice ? Number(compareAtPrice) : null,
        stock_quantity: Math.max(0, parseInt(stockQuantity) || 0),
        weight: weight ? Number(weight) : null,
      };

      try {
        await updateMutation.mutateAsync(payload);
        router.push('/admin/products');
      } catch {
        // Handled by mutation onError
      }
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.push('/admin/products')}
            className="rounded-xl h-9 w-9 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <span>{mode === 'create' ? 'Add New Product' : `Edit: ${initialProduct?.title}`}</span>
              {initialProduct && (
                <Badge
                  variant={isActive ? 'secondary' : 'outline'}
                  className="text-[10px] font-bold"
                >
                  {isActive ? 'Active' : 'Draft'}
                </Badge>
              )}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {mode === 'create'
                ? 'Fill out specifications, pricing, inventory, and upload photos.'
                : `Updating catalog SKU ${defaultVariant?.sku || 'N/A'}.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/products')}
            className="text-xs rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="text-xs font-semibold rounded-xl bg-primary text-primary-foreground gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Saving Product...' : mode === 'create' ? 'Create Product' : 'Save Changes'}</span>
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: 'general', label: 'Basic Info', icon: Package },
          { id: 'pricing', label: 'Pricing & Inventory', icon: DollarSign },
          { id: 'images', label: 'Images & Media', icon: ImageIcon },
          { id: 'seo', label: 'Visibility & SEO', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActiveTab = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                isActiveTab
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: General Info */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5 border-border shadow-none space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-xs font-semibold">
                  Product Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. MacBook Pro 16 M3 Max"
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.title}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="slug" className="text-xs font-semibold">
                  URL Slug
                </Label>
                <div className="relative">
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. macbook-pro-16-m3-max"
                    className="font-mono text-xs"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  The URL identifier for the product: /products/{slug || 'product-slug'}
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs font-semibold">
                  Description
                </Label>
                <textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe key features, technical specifications, and materials..."
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-5 border-border shadow-none space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs font-semibold">
                  Primary Category <span className="text-destructive">*</span>
                </Label>
                <select
                  id="category"
                  value={String(categoryId)}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full h-9 px-3 py-1 text-xs rounded-md border border-input bg-background text-foreground shadow-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
                >
                  <option value="">Select a category...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.category_id}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold block text-foreground">Catalog Status</span>
                    <span className="text-[11px] text-muted-foreground block">
                      {isActive ? 'Visible to public shoppers' : 'Hidden from storefront'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold block text-foreground">Featured Showcase</span>
                    <span className="text-[11px] text-muted-foreground block">
                      Highlight on home landing page
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Tab: Pricing & Inventory */}
      {activeTab === 'pricing' && (
        <Card className="p-5 border-border shadow-none max-w-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="sku" className="text-xs font-semibold">
                Stock Keeping Unit (SKU) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value.toUpperCase())}
                placeholder="e.g. MBP-16-M3-SG"
                className={`font-mono text-xs ${errors.sku ? 'border-destructive' : ''}`}
              />
              {errors.sku && (
                <p className="text-[11px] text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.sku}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="stock" className="text-xs font-semibold">
                Stock Units in Inventory <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="e.g. 25"
                className={`font-mono text-xs ${errors.stock_quantity ? 'border-destructive' : ''}`}
              />
              {errors.stock_quantity && (
                <p className="text-[11px] text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.stock_quantity}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-xs font-semibold">
                Selling Price (ETB) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 2499.00"
                className={`font-mono text-xs ${errors.price ? 'border-destructive' : ''}`}
              />
              {errors.price && (
                <p className="text-[11px] text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.price}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="compare_price" className="text-xs font-semibold">
                Compare-at / Original Price (ETB)
              </Label>
              <Input
                id="compare_price"
                type="number"
                step="0.01"
                min="0"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="e.g. 2799.00 (optional strikethrough)"
                className="font-mono text-xs"
              />
              <p className="text-[11px] text-muted-foreground">
                Leave empty if item is not on sale.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <Label htmlFor="weight" className="text-xs font-semibold">
              Item Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 1.85 (used for shipping calculation)"
              className="font-mono text-xs max-w-xs"
            />
          </div>
        </Card>
      )}

      {/* Tab: Images & Media */}
      {activeTab === 'images' && (
        <Card className="p-5 border-border shadow-none space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Product Gallery</h3>
            <p className="text-xs text-muted-foreground">
              Add product photos. The first image will be used as the store thumbnail.
            </p>
          </div>

          <ImageManager
            productId={initialProduct?.id}
            existingImages={initialProduct?.images || []}
            stagedFiles={stagedFiles}
            onStagedFilesChange={setStagedFiles}
          />
        </Card>
      )}

      {/* Tab: Visibility & SEO */}
      {activeTab === 'seo' && (
        <Card className="p-5 border-border shadow-none max-w-2xl space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="meta_title" className="text-xs font-semibold">
              Search Engine Meta Title
            </Label>
            <Input
              id="meta_title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="e.g. Premium MacBook Pro 16 M3 Max - Ethiopian Store"
              maxLength={255}
            />
            <p className="text-[11px] text-muted-foreground">
              Recommended length: 50-60 characters ({metaTitle.length}/255).
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="meta_description" className="text-xs font-semibold">
              Search Engine Meta Description
            </Label>
            <textarea
              id="meta_description"
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Concise overview snippet shown in Google search results..."
              maxLength={500}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
            />
            <p className="text-[11px] text-muted-foreground">
              Recommended length: 150-160 characters ({metaDescription.length}/500).
            </p>
          </div>
        </Card>
      )}
    </form>
  );
}

