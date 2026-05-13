"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium cursor-pointer select-none " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
      "disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150";

    // border-radius: 6px — less bubbly, more confident
    const variants = {
      primary:
        "bg-[#ea580c] text-white rounded-[6px] hover:bg-[#f97316]",
      ghost:
        "bg-transparent text-[#1a1612] rounded-[6px] border border-[rgba(26,22,18,0.2)] " +
        "hover:border-[rgba(26,22,18,0.4)] hover:bg-[rgba(26,22,18,0.03)]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-[13px] tracking-[0.01em]",
      md: "px-4 py-2 text-[14px] tracking-[0.01em]",
      lg: "px-5 py-2.5 text-[14px] tracking-[0.01em]",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
