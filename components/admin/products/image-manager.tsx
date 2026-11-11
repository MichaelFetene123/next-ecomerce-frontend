"use client";

import React, { useRef, useState } from 'react';
import { ProductImage } from '@/types/catalog';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  useUploadProductImages,
  useDeleteProductImage,
  useReorderProductImages,
} from '@/hooks/admin/products';
import {
  UploadCloud,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Loader2,
  Check,
} from 'lucide-react';

interface ImageManagerProps {
  productId?: number;
  existingImages?: ProductImage[];
  // For new product creation (staging files)
  stagedFiles?: File[];
  onStagedFilesChange?: (files: File[]) => void;
}

export function ImageManager({
  productId,
  existingImages = [],
  stagedFiles = [],
  onStagedFilesChange,
}: ImageManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // API mutations (active if editing an existing product)
  const uploadMutation = useUploadProductImages(productId ?? 0);
  const deleteMutation = useDeleteProductImage(productId ?? 0);
  const reorderMutation = useReorderProductImages(productId ?? 0);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );

    if (validFiles.length === 0) return;

    if (productId) {
      // Direct upload to server
      await uploadMutation.mutateAsync(validFiles);
    } else if (onStagedFilesChange) {
      // Stage files locally for create form
      onStagedFilesChange([...stagedFiles, ...validFiles]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveStaged = (index: number) => {
    if (!onStagedFilesChange) return;
    const updated = stagedFiles.filter((_, i) => i !== index);
    onStagedFilesChange(updated);
  };

  const handleDeleteExisting = async (imageId: number) => {
    if (!productId) return;
    await deleteMutation.mutateAsync(imageId);
  };

  const handleMoveExisting = async (index: number, direction: 'left' | 'right') => {
    if (!productId || existingImages.length < 2) return;
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= existingImages.length) return;

    const reordered = [...existingImages];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    const ids = reordered.map((img) => img.id);
    await reorderMutation.mutateAsync(ids);
  };

  const isUploading = uploadMutation.isPending;

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <UploadCloud className="w-5 h-5" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground">
              {isUploading ? 'Uploading images to server...' : 'Click or drag & drop product images'}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Supports PNG, JPG, WEBP, SVG up to 5MB each.
            </p>
          </div>
        </div>
      </div>

      {/* Existing Images Gallery */}
      {existingImages.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Product Gallery ({existingImages.length})
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {existingImages.map((img, idx) => (
              <div
                key={img.id}
                className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-card shadow-2xs"
              >
                <img
                  src={getImageUrl(img.path)}
                  alt={`Product view ${idx + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Primary Tag on First Image */}
                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-bold shadow-xs">
                    Cover
                  </span>
                )}

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-2">
                  {idx > 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 rounded-md"
                      onClick={() => handleMoveExisting(idx, 'left')}
                      disabled={reorderMutation.isPending}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-7 w-7 rounded-md"
                    onClick={() => handleDeleteExisting(img.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>

                  {idx < existingImages.length - 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 rounded-md"
                      onClick={() => handleMoveExisting(idx, 'right')}
                      disabled={reorderMutation.isPending}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staged New Images for Creation Flow */}
      {stagedFiles.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Staged Uploads ({stagedFiles.length})
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {stagedFiles.map((file, idx) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-card shadow-2xs"
                >
                  <img
                    src={previewUrl}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-muted/80 backdrop-blur-xs text-foreground text-[10px] font-mono truncate max-w-28">
                    {file.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveStaged(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-md bg-destructive text-destructive-foreground flex items-center justify-center opacity-90 hover:opacity-100 shadow-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

