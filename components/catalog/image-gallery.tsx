'use client';

import React, { useState } from 'react';
import { ProductImage } from '@/types/catalog';
import { cn } from '@/lib/utils';
import { Heart, PlayCircle } from 'lucide-react';

interface ImageGalleryProps {
  images: ProductImage[];
  title: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Default to placeholder if no images
  const galleryImages = images?.length ? images : [{ id: '1', path: '/placeholder-product.jpg', title }];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-[#f3f2ff] border border-[#c4c5d8] group">
        <img
          src={galleryImages[activeIndex]?.path}
          alt={`${title} - view ${activeIndex + 1}`}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="eager"
        />
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Save to Wishlist"
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#c4c5d8] hover:bg-[#f3f2ff] transition-colors shadow-xs cursor-pointer z-10"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'text-red-600 fill-red-600' : 'text-[#1a1b24]'
            }`}
          />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {galleryImages.slice(0, 3).map((img, idx) => (
          <button
            key={img.id || idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'aspect-square bg-[#ededfa] rounded-lg overflow-hidden border transition-all cursor-pointer p-0',
              activeIndex === idx
                ? 'border-2 border-[#012169] shadow-xs'
                : 'border-[#c4c5d8] hover:border-[#747687]'
            )}
          >
            <img
              src={img.path}
              alt={`${title} - thumbnail ${idx + 1}`}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </button>
        ))}

        {/* Mock Video Thumbnail */}
        <button
          type="button"
          onClick={() => setActiveIndex(0)}
          className="aspect-square bg-[#f3f2ff] rounded-lg border border-[#c4c5d8] hover:border-[#747687] transition-colors overflow-hidden flex items-center justify-center cursor-pointer group p-0"
        >
          <PlayCircle className="w-8 h-8 text-[#434655] group-hover:text-[#012169] transition-colors" />
        </button>
      </div>
    </div>
  );
};
