"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarDays, MessageSquare, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Choose a time",
    body: "Pick your specialty, preferred doctor, and a convenient time slot — online or by calling us.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Get confirmed",
    body: "Receive an instant WhatsApp confirmation with your appointment details and doctor's profile.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Walk in",
    body: "Arrive at your scheduled time. No long queues — we respect your time as much as your health.",
  },
];

export function HowItWorks() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stepsRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // Header
    tl.fromTo(".hiw-header", 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Steps stagger
    if (stepsRef.current) {
      const stepCards = stepsRef.current.querySelectorAll(".step-card");
      tl.fromTo(
        stepCards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }

    // Dashed lines draw
    const stepLines = stepsRef.current?.querySelectorAll(".step-line");
    if (stepLines && stepLines.length > 0) {
      tl.fromTo(
        stepLines,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-clinical-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="hiw-header text-center mb-16">
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold text-ink">
            Book in 3 simple steps
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="step-card flex-1 text-center max-w-xs mx-auto md:mx-0">
                  <span className="inline-block text-clinical-blue font-bold text-[13px] tracking-widest mb-4">
                    {step.number}
                  </span>
                  <div className="w-16 h-16 rounded-full bg-clinical-blue-light flex items-center justify-center mx-auto mb-5">
                    <step.icon size={28} className="text-clinical-blue" />
                  </div>
                  <h3 className="font-semibold text-ink text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>

                {/* Dashed connector (hidden on mobile, hidden for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex flex-1 items-center justify-center pt-7 px-4">
                    <div
                      className="step-line w-full border-t-2 border-dashed border-ink-faint"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
