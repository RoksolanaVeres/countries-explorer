import * as React from "react";

import { cn } from "@/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-oxford-oxford-blue/15 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-oxford-oxford-blue/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxford-oxford-blue focus-visible:ring-offset-0 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
