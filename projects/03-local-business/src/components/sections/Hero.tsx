"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight, CheckCircle, Building2, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

const trustSignals = [
  { icon: Building2, label: "NABH Accredited" },
  { icon: Users, label: "24 Specialists" },
  { icon: Star, label: "4.9 Rating" },
];

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const badgeRef = React.useRef<HTMLDivElement>(null);
  const h1Ref = React.useRef<HTMLHeadingElement>(null);
  const subRef = React.useRef<HTMLParagraphElement>(null);
  const ctasRef = React.useRef<HTMLDivElement>(null);
  const trustRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Badge animation
    if (badgeRef.current) {
      tl.fromTo(badgeRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 });
    }

    // H1 split text animation (words)
    if (h1Ref.current) {
      const words = h1Ref.current.querySelectorAll(".word");
      tl.fromTo(
        words,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.7 },
        "-=0.2"
      );
    }

    // Subtext
    if (subRef.current) {
      tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
    }

    // CTAs
    if (ctasRef.current) {
      tl.fromTo(ctasRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }

    // Trust row
    if (trustRef.current) {
      tl.fromTo(trustRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
    }

    // Image
    if (imageRef.current) {
      tl.fromTo(imageRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9 }, "-=0.8");
    }

    // Floating card
    if (cardRef.current) {
      tl.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[88vh] bg-clinical-offwhite py-12 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center h-full">
          {/* Left column - Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div ref={badgeRef} className="hero-badge mb-6 will-change-transform">
              <div className="inline-flex items-center gap-2 bg-clinical-blue-light text-clinical-blue text-xs font-medium px-3 py-1.5 rounded-full border border-clinical-blue/20">
                <span className="relative flex h-2 w-2 mt-[1px]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clinical-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-clinical-blue"></span>
                </span>
                <span className="leading-none pt-[1px]">Now accepting new patients</span>
              </div>
            </div>

            {/* H1 */}
            <h1
              ref={h1Ref}
              className="text-[clamp(40px,5vw,64px)] font-semibold leading-[1.1] tracking-tight mb-6 will-change-transform"
            >
              <span className="word inline-block text-ink">Compassionate</span>{" "}
              <span className="word inline-block text-ink">care,</span>
              <br />
              <span className="word inline-block text-clinical-blue">
                close
              </span>{" "}
              <span className="word inline-block text-clinical-blue">to</span>{" "}
              <span className="word inline-block text-clinical-blue">home.</span>
            </h1>

            {/* Subtext */}
            <p
              ref={subRef}
              className="text-base text-ink-muted max-w-md leading-[1.7] mb-8"
            >
              Medica brings together experienced specialists and modern
              diagnostics for complete family healthcare. Same-day appointments
              available.
            </p>

            {/* CTA Row */}
            <div ref={ctasRef} className="hero-ctas flex flex-wrap gap-4 mb-6">
              <Button size="lg" className="gap-2" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                Book an appointment
                <ArrowRight size={16} />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' })}>
                View our doctors →
              </Button>
            </div>

            {/* Meta info below CTAs */}
            <p className="text-xs text-ink-soft mb-8">
              ⏱ Average wait: 12 minutes · ✓ No referral needed
            </p>

            {/* Trust row */}
            <div
              ref={trustRef}
              className="hero-trust flex flex-wrap items-center gap-6 text-xs text-ink-muted mt-6 will-change-transform"
            >
              {trustSignals.map(({ icon: Icon, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div className="w-px h-4 bg-ink-faint" />}
                  <div className="flex items-center gap-1.5">
                    <Icon size={13} className="text-clinical-blue" />
                    <span>{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right column - Image */}
          <div ref={imageRef} className="hero-image relative will-change-transform">
            <div className="relative rounded-2xl overflow-hidden bg-clinical-blue-light aspect-[4/5]">
              <Image
                src="/Doctor-patient2.jpg"
                alt="Dr. Sharma - Senior Consultant at Medica Health Centre"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-clinical-blue/15 to-transparent" />

              {/* Floating confirmation card */}
              <div
                ref={cardRef}
                className="hero-card absolute bottom-4 left-4 bg-clinical-white rounded-xl p-3 shadow-lg flex items-center gap-3 border border-clinical-border"
              >
                <div className="w-8 h-8 rounded-full bg-clinical-blue-light flex items-center justify-center">
                  <CheckCircle size={16} className="text-clinical-blue" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink">
                    Appointment confirmed
                  </div>
                  <div className="text-[10px] text-ink-soft">
                    Today, 3:30 PM · Dr. Sharma
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
