import { cn } from "@/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-oxford-green/25 animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };
