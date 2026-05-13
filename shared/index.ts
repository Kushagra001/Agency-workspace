// ─── Hooks ───────────────────────────────────────────────────
export { useLenis } from "./hooks/useLenis";
export { useScrollProgress } from "./hooks/useScrollProgress";
export { useMousePosition } from "./hooks/useMousePosition";

// ─── GSAP Animation Hooks ────────────────────────────────────
export { useReveal } from "./animations/gsap/useReveal";
export { useSplitText } from "./animations/gsap/useSplitText";

// ─── Framer Motion Variants ──────────────────────────────────
export {
  fadeUp,
  fadeIn,
  staggerContainer,
  slideLeft,
  slideRight,
  pageTransition,
  clipReveal,
  scalePop,
} from "./animations/framer/variants";

// ─── Components ──────────────────────────────────────────────
export { SmoothScroll } from "./components/SmoothScroll";
export { MagneticCursor } from "./components/MagneticCursor";
export { Reveal } from "./components/Reveal";
export { SplitHeading } from "./components/SplitHeading";

// ─── Lib ─────────────────────────────────────────────────────
export { cn, clamp, lerp, mapRange, formatDate } from "./lib/utils";
