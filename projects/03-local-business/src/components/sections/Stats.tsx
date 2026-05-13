"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 24000, suffix: "+", label: "Patients treated", sub: "Since 2018" },
  { value: 24, suffix: "", label: "Medical specialists", sub: "Across 8 departments" },
  { value: 4.9, suffix: "", label: "Average Google rating", sub: "From 1,200+ reviews" },
  { value: 98, suffix: "%", label: "Patient satisfaction", sub: "Based on exit surveys" },
];

export function Stats() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const hasAnimated = React.useRef(false);

  useGSAP(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const statCards = sectionRef.current.querySelectorAll(".stat-card");

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;

        statCards.forEach((card, index) => {
          const valueEl = card.querySelector(".stat-value");
          const stat = stats[index];

          if (valueEl) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 2.0,
              ease: "power2.out",
              delay: index * 0.15,
              onUpdate: () => {
                const v = obj.val;
                const display =
                  stat.value % 1 !== 0
                    ? v.toFixed(1)
                    : Math.round(v).toLocaleString("en-IN");
                valueEl.textContent = display + stat.suffix;
              },
            });
          }

          // Fade in the card
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
          });
        });
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-clinical-blue will-change-transform"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`stat-card flex flex-col justify-center text-center px-4 py-8 lg:py-12 ${
                index % 2 === 0 ? 'border-r border-white/15' : ''
              } ${
                index < 2 ? 'border-b border-white/15' : ''
              } lg:border-b-0 lg:border-r ${
                index === stats.length - 1 ? 'lg:border-r-0' : 'lg:border-white/15'
              }`}
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="stat-value text-[clamp(40px,5vw,64px)] font-bold text-white leading-none">
                  0{stat.suffix}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/80">{stat.label}</p>
              <p className="mt-1 text-xs text-white/50">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
