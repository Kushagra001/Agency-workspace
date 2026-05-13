"use client";

import { useEffect, useRef, useState } from "react";
import { lerp } from "../lib/utils";

interface MousePosition {
  x: number;
  y: number;
  lerpX: number;
  lerpY: number;
}

/**
 * Tracks mouse x/y with lerp smoothing.
 * Used by MagneticCursor and parallax hover effects.
 */
export function useMousePosition(lerpFactor = 0.1): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    lerpX: 0,
    lerpY: 0,
  });

  const rawRef = useRef({ x: 0, y: 0 });
  const lerpRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      rawRef.current = { x: e.clientX, y: e.clientY };
    }

    function tick() {
      lerpRef.current.x = lerp(lerpRef.current.x, rawRef.current.x, lerpFactor);
      lerpRef.current.y = lerp(lerpRef.current.y, rawRef.current.y, lerpFactor);

      setPosition({
        x: rawRef.current.x,
        y: rawRef.current.y,
        lerpX: lerpRef.current.x,
        lerpY: lerpRef.current.y,
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [lerpFactor]);

  return position;
}
