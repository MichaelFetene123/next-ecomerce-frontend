"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Product, CreateProductInput, UpdateProductInput } from '@/types/catalog';
import { useCategories } from '@/hooks/use-categories';
import {
  useCreateProduct,
  useUpdateProduct,
  useAdminAttributes,
} from '@/hooks/admin/products';
import { ImageManager } from './image-manager';
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  Globe,
  Save,
  X,
  AlertCircle,
  Tag,
  Check,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSuccess?: () => void;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductFormDialogProps) {
  const mode = product ? 'edit' : 'create';
  const { data: categories = [] } = useCategories();
  const { data: attributes = [] } = useAdminAttributes();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct(product?.id ?? 0);

  const defaultVariant = product?.variants?.find((v) => v.is_default) || product?.variants?.[0];

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'attributes' | 'images' | 'seo'>('general');

  // Basic Info
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  // Variant fields
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [compareAtPrice, setCompareAtPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('0');
  const [weight, setWeight] = useState('');

  // Attributes selection (array of attribute_value IDs)
  const [selectedAttributeValueIds, setSelectedAttributeValueIds] = useState<number[]>([]);

  // SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Staged files for create mode
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or pre-populate form on open / product change
  useEffect(() => {
    if (open) {
      setActiveTab('general');
      setErrors({});
      setStagedFiles([]);

      if (product) {
        // Edit mode pre-population
        setTitle(product.title ?? '');
        setSlug(product.slug ?? '');
        setCategoryId(product.category_id ?? (categories[0]?.id || ''));
        setDescription(product.description ?? '');
        setIsActive(Boolean(product.is_active));
        setIsFeatured(Boolean(product.is_featured));

        const v = product.variants?.find((item) => item.is_default) || product.variants?.[0];
        setSku(v?.sku ?? '');
        setPrice(v?.price != null ? String(v.price) : '');
        setCompareAtPrice(v?.compare_at_price != null ? String(v.compare_at_price) : '');
        setStockQuantity(v?.stock_quantity != null ? String(v.stock_quantity) : '0');
        setWeight(v?.weight != null ? String(v.weight) : '');

        // Prepopulate attribute values
        const attrValIds: number[] = [];
        v?.attribute_values?.forEach((av) => {
          if (av.id) attrValIds.push(av.id);
        });
        setSelectedAttributeValueIds(attrValIds);

        setMetaTitle(product.meta_title ?? '');
        setMetaDescription(product.meta_description ?? '');
      } else {
        // Create mode clean defaults
        setTitle('');
        setSlug('');
        setCategoryId(categories[0]?.id || '');
        setDescription('');
        setIsActive(true);
        setIsFeatured(false);
        setSku('');
        setPrice('');
        setCompareAtPrice('');
        setStockQuantity('0');
        setWeight('');
        setSelectedAttributeValueIds([]);
        setMetaTitle('');
        setMetaDescription('');
      }
    }
  }, [open, product, categories]);

  // Title auto-slug & auto-SKU in create mode
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

  const toggleAttributeValue = (valId: number) => {
    setSelectedAttributeValueIds((prev) =>
      prev.includes(valId) ? prev.filter((id) => id !== valId) : [...prev, valId]
    );
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
      toast.error('Please resolve form validation errors.');
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
        attribute_value_ids: selectedAttributeValueIds.length > 0 ? selectedAttributeValueIds : undefined,
      };

      try {
        await createMutation.mutateAsync(payload);
        onOpenChange(false);
        onSuccess?.();
      } catch {
        // Handled in mutation onError
      }
    } else if (product) {
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
        attribute_value_ids: selectedAttributeValueIds,
      };

      try {
        await updateMutation.mutateAsync(payload);
        onOpenChange(false);
        onSuccess?.();
      } catch {
        // Handled in mutation onError
      }
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] max-h-[92vh] flex flex-col p-0 overflow-hidden rounded-2xl border-border bg-card">
        {/* Sticky Header */}
        <div className="px-6 py-4 border-b border-border bg-card shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <span>{mode === 'create' ? 'Create New Product' : `Edit: ${product?.title}`}</span>
                <Badge
                  variant={isActive ? 'secondary' : 'outline'}
                  className="text-[10px] font-bold"
                >
                  {isActive ? 'Published' : 'Draft'}
                </Badge>
                {isFeatured && (
                  <Badge variant="outline" className="text-[10px] text-amber-500 border-amber-500/30 bg-amber-500/5">
                    ★ Featured
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                {mode === 'create'
                  ? 'Add a new product to your inventory catalog with pricing, stock, attributes, and photos.'
                  : `Updating inventory item SKU ${defaultVariant?.sku || 'N/A'}.`}
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="px-6 pt-3 pb-2 border-b border-border bg-muted/20 shrink-0 flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'general', label: 'Basic Info', icon: Package },
            { id: 'pricing', label: 'Pricing & Stock', icon: DollarSign },
            { id: 'attributes', label: 'Attributes & Options', icon: Tag },
            { id: 'images', label: 'Images & Media', icon: ImageIcon },
            { id: 'seo', label: 'Visibility & SEO', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
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

        {/* Scrollable Form Body */}
        <form id="admin-product-dialog-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: General Info */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="dialog_title" className="text-xs font-semibold">
                    Product Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dialog_title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. MacBook Pro 16 M3 Max"
                    className={`h-9 text-xs ${errors.title ? 'border-destructive' : ''}`}
                  />
                  {errors.title && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dialog_category" className="text-xs font-semibold">
                    Primary Category <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="dialog_category"
                    value={String(categoryId)}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full h-9 px-3 py-1 text-xs rounded-lg border border-input bg-background text-foreground shadow-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select Category...</option>
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
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dialog_slug" className="text-xs font-semibold">
                  URL Slug
                </Label>
                <Input
                  id="dialog_slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. macbook-pro-16-m3-max"
                  className="h-9 text-xs font-mono"
                />
                <p className="text-[11px] text-muted-foreground">
                  Storefront URL: /products/{slug || 'product-slug'}
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dialog_description" className="text-xs font-semibold">
                  Product Description
                </Label>
                <textarea
                  id="dialog_description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide technical specifications, dimensions, features, and materials..."
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Pricing & Stock */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="dialog_sku" className="text-xs font-semibold">
                    Stock Keeping Unit (SKU) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dialog_sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value.toUpperCase())}
                    placeholder="e.g. MBP-16-M3-SG"
                    className={`h-9 font-mono text-xs ${errors.sku ? 'border-destructive' : ''}`}
                  />
                  {errors.sku && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.sku}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dialog_stock" className="text-xs font-semibold">
                    Inventory Stock Units <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dialog_stock"
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder="e.g. 25"
                    className={`h-9 font-mono text-xs ${errors.stock_quantity ? 'border-destructive' : ''}`}
                  />
                  {errors.stock_quantity && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.stock_quantity}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="dialog_price" className="text-xs font-semibold">
                    Selling Price (ETB) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dialog_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 2499.00"
                    className={`h-9 font-mono text-xs ${errors.price ? 'border-destructive' : ''}`}
                  />
                  {errors.price && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.price}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dialog_compare_price" className="text-xs font-semibold">
                    Compare-at / Original Price (ETB)
                  </Label>
                  <Input
                    id="dialog_compare_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    placeholder="e.g. 2799.00 (optional discount baseline)"
                    className="h-9 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <Label htmlFor="dialog_weight" className="text-xs font-semibold">
                  Item Weight (kg)
                </Label>
                <Input
                  id="dialog_weight"
                  type="number"
                  step="0.01"
                  min="0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 2.15"
                  className="h-9 font-mono text-xs max-w-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Attributes & Options */}
          {activeTab === 'attributes' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-foreground">Product Variations & Attributes</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Select applicable attribute values (Color, Storage, Size, RAM) that describe this variant.
                </p>
              </div>

              {attributes.length === 0 ? (
                <div className="p-4 text-center border border-dashed rounded-xl text-xs text-muted-foreground">
                  No attributes configured in system.
                </div>
              ) : (
                attributes.map((attr) => (
                  <div key={attr.id} className="space-y-2 p-3.5 rounded-xl border border-border bg-muted/10">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      {attr.name}
                    </span>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {attr.values?.map((val) => {
                        const isSelected = selectedAttributeValueIds.includes(val.id);
                        return (
                          <button
                            key={val.id}
                            type="button"
                            onClick={() => toggleAttributeValue(val.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition-all ${
                              isSelected
                                ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-2xs'
                                : 'bg-background hover:bg-muted text-foreground border-input'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            <span>{val.value}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: Images & Media */}
          {activeTab === 'images' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-foreground">Media Assets</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Upload multiple product images. The first image serves as the main storefront thumbnail.
                </p>
              </div>

              <ImageManager
                productId={product?.id}
                existingImages={product?.images || []}
                stagedFiles={stagedFiles}
                onStagedFilesChange={setStagedFiles}
              />
            </div>
          )}

          {/* TAB 5: Visibility & SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-border bg-muted/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground block">Catalog Status</span>
                    <span className="text-[11px] text-muted-foreground block">
                      {isActive ? 'Published: Product is discoverable by customers' : 'Draft: Product is hidden from store catalog'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                  />
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground block">Featured Showcase</span>
                    <span className="text-[11px] text-muted-foreground block">
                      Spotlight on the homepage curated catalog section
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

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="dialog_meta_title" className="text-xs font-semibold">
                    SEO Meta Title
                  </Label>
                  <Input
                    id="dialog_meta_title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="e.g. MacBook Pro 16 M3 Max - High Performance Laptop"
                    maxLength={255}
                    className="h-9 text-xs"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {metaTitle.length}/255 characters.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dialog_meta_description" className="text-xs font-semibold">
                    SEO Meta Description
                  </Label>
                  <textarea
                    id="dialog_meta_description"
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Provide a compelling snippet summary for search engines..."
                    maxLength={500}
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {metaDescription.length}/500 characters.
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Sticky Footer */}
        <div className="px-6 py-3 border-t border-border bg-card shrink-0 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="text-xs h-9 rounded-lg"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="admin-product-dialog-form"
            disabled={isSubmitting}
            className="text-xs font-semibold h-9 rounded-lg bg-primary text-primary-foreground gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>
              {isSubmitting
                ? mode === 'create'
                  ? 'Creating Product...'
                  : 'Saving Changes...'
                : mode === 'create'
                ? 'Create Product'
                : 'Save Changes'}
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

