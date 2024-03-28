import { cn } from "@/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-oxford-hookers-green/25", className)} {...props} />;
}

export { Skeleton };
