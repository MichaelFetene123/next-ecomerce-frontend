import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      suppressHydrationWarning
      className={cn("animate-pulse rounded-md bg-muted-foreground/20 dark:bg-muted-foreground/25", className)}
      {...props}
    />
  )
}

export { Skeleton }
