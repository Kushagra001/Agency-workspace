"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DoctorCard } from "@/components/ui/DoctorCard";
import type { Doctor } from "@/components/ui/DoctorCard";

gsap.registerPlugin(ScrollTrigger);

const doctors: Doctor[] = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    experience: "18 years",
    education: "AIIMS Delhi · DM Cardiology",
    available: "Mon, Wed, Fri",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=90",
  },
  {
    name: "Dr. Arjun Mehta",
    specialty: "Orthopaedic Surgeon",
    experience: "14 years",
    education: "Maulana Azad · MS Ortho",
    available: "Tue, Thu, Sat",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=90",
  },
  {
    name: "Dr. Sunita Rao",
    specialty: "Paediatrician",
    experience: "12 years",
    education: "JIPMER · MD Paediatrics",
    available: "Mon–Sat",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=90",
  },
  {
    name: "Dr. Vikram Patel",
    specialty: "General Physician",
    experience: "20 years",
    education: "KEM Mumbai · MD Medicine",
    available: "Mon–Sat",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=90",
  },
];

export function Doctors() {
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

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".doctor-card-wrapper");
        gsap.fromTo(cards, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
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
      id="doctors"
      className="py-24 bg-clinical-offwhite"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold text-ink mb-4">
            Meet our specialists
          </h2>
          <p className="text-base text-ink-muted max-w-xl mx-auto">
            Experienced doctors committed to providing personalized, compassionate care for you and your family.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {doctors.map((doctor) => (
            <div key={doctor.name} className="doctor-card-wrapper will-change-transform">
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
