import React from 'react';

type PillCategory = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Sports';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (category: PillCategory) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: PillCategory[] = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isSelected
                ? 'bg-[#FDD79A] text-[#012169] border border-[#FDD79A]'
                : 'bg-card text-muted-foreground border border-border hover:border-foreground/40 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
