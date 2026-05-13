"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Award, Clock, CreditCard, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function TrustBar() {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".trust-item");

    gsap.from(items, {
      y: 10,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        once: true,
      },
    });
  }, []);

  const trustSignals = [
    { icon: Building2, label: "NABH Accredited" },
    { icon: Award, label: "ISO 9001:2015" },
    { icon: Clock, label: "24/7 Emergency" },
    { icon: CreditCard, label: "Insurance Accepted" },
    { icon: Star, label: "4.9 / 5 on Google" },
  ];

  return (
    <div
      ref={sectionRef}
      className="py-6 bg-clinical-white border-y border-clinical-border will-change-transform"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-0">
          {trustSignals.map((signal, index) => (
            <React.Fragment key={signal.label}>
              <div className="trust-item flex items-center gap-2 px-4 md:px-6 will-change-transform">
                <signal.icon size={16} className="text-clinical-blue shrink-0" />
                <span className="text-xs md:text-sm font-medium text-ink-muted">
                  {signal.label}
                </span>
              </div>
              {index < trustSignals.length - 1 && (
                <div className="hidden md:block w-px h-4 bg-clinical-border" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
