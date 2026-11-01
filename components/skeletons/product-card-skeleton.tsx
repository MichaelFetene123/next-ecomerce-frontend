import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="border border-border bg-card text-card-foreground rounded-xl overflow-hidden h-full flex flex-col relative shadow-none">
      {/* Image placeholder matching aspect-4/3 of ProductCard */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/40">
        <Skeleton className="w-full h-full rounded-none" />
        {/* Category tag pill matching top-3 right-3 of ProductCard */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
      </div>

      <CardContent className="flex flex-col grow p-4 pb-0">
        {/* Title matching text-[15px] mb-1.5 */}
        <Skeleton className="h-4 w-3/4 mb-1.5 rounded-md" />

        {/* Stock status badge matching text-[10px] px-2 py-0.5 rounded-full mb-2 */}
        <div className="flex items-center gap-1 mb-2">
          <Skeleton className="h-4.5 w-18 rounded-full" />
        </div>

        {/* Price matching text-sm font-semibold */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>
      </CardContent>

      {/* Button matching h-9 w-full rounded-md */}
      <CardFooter className="p-4 pt-3 bg-transparent border-t-0">
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
