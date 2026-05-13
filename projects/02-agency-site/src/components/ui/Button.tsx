"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      data-magnetic
      className={`inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[13px] tracking-[0.02em] text-ink transition-colors duration-200 hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
