import React, { useMemo, useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/types/catalog';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface VariantMatrixProps {
  product: Product;
  onVariantSelect: (variant: ProductVariant | null) => void;
}

export const VariantMatrix: React.FC<VariantMatrixProps> = ({
  product,
  onVariantSelect,
}) => {
  const variants = product.variants || [];

  // Group attributes by name (e.g., Color -> [Red, Blue], Size -> [S, M])
  const attributes = useMemo(() => {
    const attrMap = new Map<string, { id: number; values: Set<string>; slug: string }>();

    variants.forEach((variant) => {
      variant.attribute_values?.forEach((attrVal) => {
        const attrName = attrVal.attribute?.name;
        const attrSlug = attrVal.attribute?.slug;
        const attrId = attrVal.attribute_id;
        
        if (!attrName || !attrSlug) return;

        if (!attrMap.has(attrName)) {
          attrMap.set(attrName, { id: attrId, values: new Set(), slug: attrSlug });
        }
        attrMap.get(attrName)!.values.add(attrVal.value);
      });
    });

    return Array.from(attrMap.entries()).map(([name, data]) => ({
      name,
      slug: data.slug,
      id: data.id,
      values: Array.from(data.values),
    }));
  }, [variants]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Initialize with default variant if available
  useEffect(() => {
    const defaultVariant = variants.find((v) => v.is_default) || variants[0];
    if (defaultVariant) {
      const initialOptions: Record<string, string> = {};
      defaultVariant.attribute_values?.forEach((attrVal) => {
        if (attrVal.attribute?.name) {
          initialOptions[attrVal.attribute.name] = attrVal.value;
        }
      });
      setSelectedOptions(initialOptions);
      onVariantSelect(defaultVariant);
    }
  }, [product]);

  const handleOptionSelect = (attrName: string, value: string) => {
    const newOptions = { ...selectedOptions, [attrName]: value };
    setSelectedOptions(newOptions);

    // Find if a variant matches exactly these options
    const matchedVariant = variants.find((variant) => {
      const variantOptions = variant.attribute_values?.reduce((acc, val) => {
        if (val.attribute?.name) {
          acc[val.attribute.name] = val.value;
        }
        return acc;
      }, {} as Record<string, string>) || {};

      // Check if all selected options match the variant's options
      return Object.entries(newOptions).every(
        ([key, val]) => variantOptions[key] === val
      );
    });

    onVariantSelect(matchedVariant || null);
  };

  if (!attributes.length) {
    return null; // No attributes to display
  }

  return (
    <div className="flex flex-col gap-6">
      {attributes.map((attr) => (
        <div key={attr.id} className="space-y-3">
          <h4 className="text-sm font-semibold text-[#012169]">
            {attr.name}
            {selectedOptions[attr.name] && (
              <span className="text-[#434655] font-normal ml-2">
                {selectedOptions[attr.name]}
              </span>
            )}
          </h4>
          <ToggleGroup 
            value={selectedOptions[attr.name] ? [selectedOptions[attr.name]] : []}
            onValueChange={(val) => {
              const selectedVal = Array.isArray(val) ? val[0] : (val as string);
              if (selectedVal) handleOptionSelect(attr.name, selectedVal);
            }}
            className="flex flex-wrap gap-2 justify-start"
          >
            {attr.values.map((val) => {
              const isColor = attr.slug.includes('color') || attr.name.toLowerCase() === 'color';

              return (
                <ToggleGroupItem
                  key={val}
                  value={val}
                  aria-label={`Select ${val}`}
                  className={cn(
                    'border transition-all duration-200 cursor-pointer flex items-center justify-center data-[state=on]:bg-[#012169] data-[state=on]:text-white',
                    isColor
                      ? 'w-8 h-8 rounded-full shadow-sm data-[state=on]:ring-2 data-[state=on]:ring-offset-2 data-[state=on]:ring-[#012169] data-[state=on]:border-transparent'
                      : 'px-4 py-2 rounded-md text-sm font-medium',
                    !isColor && 'border-[#c4c5d8] text-[#434655] hover:border-[#747687] bg-white'
                  )}
                  style={isColor ? { backgroundColor: val } : {}}
                  title={isColor ? val : undefined}
                >
                  {isColor && selectedOptions[attr.name] === val && (
                    <Check className={cn('w-4 h-4', ['#ffffff', 'white'].includes(val.toLowerCase()) ? 'text-black' : 'text-white')} />
                  )}
                  {!isColor && val}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      ))}
    </div>
  );
};
