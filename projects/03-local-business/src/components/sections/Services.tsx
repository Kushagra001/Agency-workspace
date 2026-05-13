"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  Bone,
  Brain,
  Baby,
  Eye,
  Stethoscope,
  FlaskConical,
  Leaf,
  ArrowRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  { icon: Heart, name: "Cardiology", tagline: "Heart & vascular health", wait: "~15 min" },
  { icon: Bone, name: "Orthopaedics", tagline: "Joints, spine & sports", wait: "~20 min" },
  { icon: Brain, name: "Neurology", tagline: "Brain & nervous system", wait: "~25 min" },
  { icon: Baby, name: "Paediatrics", tagline: "Care for children 0-18", wait: "~10 min" },
  { icon: Eye, name: "Ophthalmology", tagline: "Vision & eye health", wait: "~12 min" },
  { icon: Stethoscope, name: "General Medicine", tagline: "Your first point of care", wait: "~8 min" },
  { icon: FlaskConical, name: "Diagnostics", tagline: "Lab tests & imaging", wait: "Same day" },
  { icon: Leaf, name: "Preventive Health", tagline: "Annual checkup packages", wait: "Flexible" },
];

export function Services() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Cards animation - animate from below
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");
        gsap.fromTo(cards, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-clinical-offwhite"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-widest text-clinical-blue font-medium uppercase mb-4">
            Our Departments
          </span>
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold text-ink mb-4">
            Comprehensive care under one roof
          </h2>
          <p className="text-base text-ink-muted max-w-xl mx-auto">
            From routine checkups to specialist consultations — everything your
            family needs, in one place.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {specialties.map((specialty) => {
            const Icon = specialty.icon;
            return (
              <div
                key={specialty.name}
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="service-card flex flex-col bg-clinical-white border border-clinical-border rounded-xl p-7 hover:border-clinical-blue hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group will-change-transform"
              >
                <div className="w-10 h-10 rounded-full bg-clinical-blue-light flex items-center justify-center mb-5 group-hover:bg-clinical-blue transition-colors duration-200">
                  <Icon
                    size={20}
                    className="text-clinical-blue group-hover:text-white transition-colors duration-200"
                  />
                </div>
                <h3 className="font-semibold text-ink text-base mb-1">
                  {specialty.name}
                </h3>
                <p className="text-[14px] text-ink-muted mb-4 flex-grow">
                  {specialty.tagline}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-[12px] text-ink-soft flex items-center gap-1.5 font-medium">
                    <span className="text-clinical-blue opacity-80">⏱</span> {specialty.wait}
                  </p>
                  <div className="flex items-center text-[13px] font-medium text-clinical-blue opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300 ease-out">
                    Learn more <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
