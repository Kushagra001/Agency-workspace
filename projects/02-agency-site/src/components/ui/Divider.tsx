"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Divider({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const path = ref.current.querySelector("path");
    if (!path) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "power2.out",
      duration: 0.9,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <svg ref={ref} className={`w-full h-[1px] ${className}`} viewBox="0 0 100 1" preserveAspectRatio="none">
      <path d="M0 0.5 L100 0.5" stroke="#e5e5e5" strokeWidth="1" />
    </svg>
  );
}
