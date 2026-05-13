"use client";

import { useLenis } from "../hooks/useLenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Client wrapper that boots Lenis + GSAP ticker sync.
 * Place in every project's root layout.tsx.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useLenis();
  return <>{children}</>;
}
