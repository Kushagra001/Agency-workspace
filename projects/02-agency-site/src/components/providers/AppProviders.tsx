"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticCursor, SmoothScroll } from "@agency/shared";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <MagneticCursor
      color="#1f2937"
      blendMode="normal"
      dotSize={10}
      ringSize={44}
      dotSpeed={0.1}
      ringSpeed={0.55}
    >
      <SmoothScroll>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </SmoothScroll>
    </MagneticCursor>
  );
}
