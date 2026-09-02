'use client';

import React, { useState, useEffect } from 'react';
import { ProductImage } from '@/types/catalog';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ImageGalleryProps {
  images: ProductImage[];
  title: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#f3f2ff] rounded-xl flex items-center justify-center text-[#747687]">
        No Image Available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-[#f3f2ff] border border-[#c4c5d8]">
        <img
          src={activeImage.path}
          alt={`${title} - view ${activeIndex + 1}`}
          className="object-cover w-full h-full"
          loading="eager"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <ToggleGroup
          value={[activeIndex.toString()]}
          onValueChange={(val) => {
            const selectedVal = Array.isArray(val) ? val[0] : (val as string);
            if (selectedVal) setActiveIndex(parseInt(selectedVal, 10));
          }}
          className="flex flex-wrap gap-3 justify-start"
        >
          {images.map((img, idx) => (
            <ToggleGroupItem
              key={img.id}
              value={idx.toString()}
              aria-label={`View image ${idx + 1}`}
              className={cn(
                'w-16 h-16 sm:w-20 sm:h-20 p-0 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-[#f3f2ff] cursor-pointer data-[state=on]:border-[#012169] data-[state=on]:ring-2 data-[state=on]:ring-[#012169]/20',
                activeIndex !== idx && 'border-transparent hover:border-[#c4c5d8]'
              )}
            >
              <img
                src={img.path}
                alt={`${title} - thumbnail ${idx + 1}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </div>
  );
};
