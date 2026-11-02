import React, { useMemo, useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/types/catalog';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const COLOR_MAP: Record<string, { bg: string; isLight: boolean }> = {
  'black': { bg: '#121316', isLight: false },
  'matte black': { bg: '#18191c', isLight: false },
  'matte obsidian': { bg: '#1e2229', isLight: false },
  'navy blue': { bg: '#1a365d', isLight: false },
  'navy': { bg: '#1a365d', isLight: false },
  'slate gray': { bg: '#64748b', isLight: false },
  'slate grey': { bg: '#64748b', isLight: false },
  'charcoal gray': { bg: '#334155', isLight: false },
  'charcoal grey': { bg: '#334155', isLight: false },
  'charcoal': { bg: '#334155', isLight: false },
  'silver white': { bg: '#f1f5f9', isLight: true },
  'space silver': { bg: '#cbd5e1', isLight: true },
  'space gray': { bg: '#475569', isLight: false },
  'space grey': { bg: '#475569', isLight: false },
  'chalk white': { bg: '#f8fafc', isLight: true },
  'white': { bg: '#ffffff', isLight: true },
  'oatmeal beige': { bg: '#d6c7b2', isLight: true },
  'beige': { bg: '#e5dccb', isLight: true },
  'silver / black': { bg: 'linear-gradient(135deg, #cbd5e1 50%, #1e293b 50%)', isLight: false },
  'gold / brown': { bg: 'linear-gradient(135deg, #f59e0b 50%, #78350f 50%)', isLight: false },
  'gold': { bg: '#f59e0b', isLight: false },
  'brown': { bg: '#78350f', isLight: false },
  'red': { bg: '#ef4444', isLight: false },
  'blue': { bg: '#3b82f6', isLight: false },
  'green': { bg: '#22c55e', isLight: false },
};

function resolveColor(value: string): { bg: string; isLight: boolean } {
  const normalized = value.trim().toLowerCase();
  if (COLOR_MAP[normalized]) {
    return COLOR_MAP[normalized];
  }
  for (const [key, mapping] of Object.entries(COLOR_MAP)) {
    if (normalized.includes(key)) {
      return mapping;
    }
  }
  return { bg: normalized, isLight: false };
}

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
          <h4 className="text-sm font-semibold text-foreground">
            <span>{attr.name}</span>
            {selectedOptions[attr.name] && (
              <span className="font-semibold text-foreground dark:text-secondary ml-2">
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
            className="flex flex-wrap gap-2.5 justify-start"
          >
            {attr.values.map((val) => {
              const isColor = attr.slug.includes('color') || attr.name.toLowerCase() === 'color';
              const isSelected = selectedOptions[attr.name] === val;
              const colorInfo = isColor ? resolveColor(val) : null;

              if (isColor && colorInfo) {
                const bgStyle = colorInfo.bg.startsWith('linear-gradient')
                  ? { background: colorInfo.bg }
                  : { backgroundColor: colorInfo.bg };

                return (
                  <ToggleGroupItem
                    key={val}
                    value={val}
                    aria-label={`Select ${val}`}
                    className={cn(
                      'w-9 h-9 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center p-0 border-2 shadow-xs',
                      isSelected
                        ? 'ring-2 ring-offset-2 ring-primary dark:ring-secondary ring-offset-background scale-105 border-transparent'
                        : 'border-border/80 dark:border-white/20 hover:scale-105 hover:border-foreground/40'
                    )}
                    style={bgStyle}
                    title={val}
                  >
                    {isSelected && (
                      <Check
                        className={cn(
                          'w-4 h-4 drop-shadow-xs stroke-[2.5]',
                          colorInfo.isLight ? 'text-slate-900' : 'text-white'
                        )}
                      />
                    )}
                  </ToggleGroupItem>
                );
              }

              return (
                <ToggleGroupItem
                  key={val}
                  value={val}
                  aria-label={`Select ${val}`}
                  className={cn(
                    'px-4 py-2.5 rounded-xl font-geist text-xs sm:text-sm h-auto min-h-0 cursor-pointer transition-all border shadow-xs',
                    isSelected
                      ? 'border-2 border-primary !bg-primary !text-primary-foreground hover:!bg-primary/90 hover:!text-primary-foreground aria-pressed:!bg-primary aria-pressed:!text-primary-foreground data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground dark:border-secondary dark:!bg-secondary dark:!text-secondary-foreground dark:hover:!bg-secondary/90 dark:hover:!text-secondary-foreground dark:aria-pressed:!bg-secondary dark:aria-pressed:!text-secondary-foreground dark:data-[state=on]:!bg-secondary dark:data-[state=on]:!text-secondary-foreground font-bold shadow-sm'
                      : 'border-border bg-card text-foreground hover:border-foreground/40 hover:bg-muted/40 font-medium'
                  )}
                >
                  {val}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      ))}
    </div>
  );
};
