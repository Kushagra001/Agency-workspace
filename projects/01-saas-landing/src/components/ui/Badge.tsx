"use client";

import { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  dot?: boolean;
}

export function Badge({ children, dot = false, className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-brand-primary/40 bg-brand-primary/8 text-brand-primary ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"
            style={{ animation: "ping-slow 1.8s cubic-bezier(0,0,0.2,1) infinite" }}
          />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-hover" />
        </span>
      )}
      {children}
    </span>
  );
}
