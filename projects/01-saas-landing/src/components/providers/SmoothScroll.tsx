"use client";

import { ReactNode } from "react";
import { useLenis } from "@agency/shared/hooks/useLenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Initialize Lenis. The hook handles GSAP ticker sync and cleanup.
  useLenis();

  return <>{children}</>;
}
