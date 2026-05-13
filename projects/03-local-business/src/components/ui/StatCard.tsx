"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  sub?: string;
  className?: string;
  dark?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix = "",
  label,
  sub,
  className,
  dark = false,
}) => {
  const valueRef = React.useRef<HTMLSpanElement>(null);
  const hasAnimated = React.useRef(false);

  useGSAP(() => {
    if (!valueRef.current || hasAnimated.current) return;

    const el = valueRef.current;
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(obj, {
          val: value,
          duration: 2.0,
          ease: "power2.out",
          onUpdate: () => {
            const v = obj.val;
            el.textContent =
              value % 1 !== 0 ? v.toFixed(1) : Math.round(v).toLocaleString("en-IN");
          },
          onComplete: () => {
            el.textContent += suffix;
          },
        });
      },
    });
  }, []);

  return (
    <div className={cn("text-center", className)}>
      <div className="flex items-baseline justify-center gap-1">
        <span
          ref={valueRef}
          className={cn(
            "text-[clamp(40px,5vw,64px)] font-bold leading-none",
            dark ? "text-white" : "text-ink"
          )}
        >
          0
        </span>
      </div>
      <p
        className={cn(
          "mt-2 text-sm",
          dark ? "text-white/80" : "text-ink-muted"
        )}
      >
        {label}
      </p>
      {sub && (
        <p
          className={cn(
            "mt-1 text-xs",
            dark ? "text-white/50" : "text-ink-soft"
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
};

export { StatCard };
