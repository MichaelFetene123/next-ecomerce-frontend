import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="border border-border bg-card text-card-foreground rounded-xl overflow-hidden h-full flex flex-col relative shadow-none">
      {/* Image placeholder with aspect-4/3 matching ProductCard */}
      <Skeleton className="aspect-4/3 w-full rounded-none" />

      <CardContent className="flex flex-col grow p-4 pb-0">
        <Skeleton className="h-4 w-3/4 mb-2 rounded" />
        <Skeleton className="h-4 w-20 rounded-full mb-3" />
        <div className="mt-auto pt-2">
          <Skeleton className="h-5 w-24 rounded" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-3 bg-transparent border-t-0">
        <Skeleton className="h-9 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
}
