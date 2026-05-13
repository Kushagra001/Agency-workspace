"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-blue/30",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          // Variants
          variant === "primary" && [
            "bg-clinical-blue text-white",
            "hover:bg-clinical-blue-dark",
            "rounded-md",
          ],
          variant === "ghost" && [
            "bg-transparent text-ink",
            "border border-clinical-border",
            "hover:bg-clinical-offwhite hover:border-clinical-blue",
            "rounded-md",
          ],
          variant === "outline" && [
            "bg-transparent text-clinical-blue",
            "border border-clinical-blue",
            "hover:bg-clinical-blue hover:text-white",
            "rounded-lg",
          ],
          // Sizes
          size === "default" && "px-4 py-2 text-sm",
          size === "sm" && "px-3 py-1.5 text-xs",
          size === "lg" && "px-6 py-3 text-sm h-12",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
