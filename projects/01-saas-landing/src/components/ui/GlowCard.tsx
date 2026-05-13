"use client";

import { HTMLAttributes, ReactNode } from "react";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glowOnHover?: boolean;
}

export function GlowCard({ children, glowOnHover = true, className = "", style, ...props }: GlowCardProps) {
  return (
    <div
      className={`
        relative p-2 md:p-6
        transition-all duration-300 ease-out
        ${glowOnHover
          ? "hover:bg-brand-primary/[0.02]"
          : ""
        }
        ${className}
      `}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
