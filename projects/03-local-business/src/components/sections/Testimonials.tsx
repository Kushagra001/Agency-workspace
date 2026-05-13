"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Verma",
    initials: "RV",
    color: "#2980b9",
    rating: 5,
    specialty: "Cardiology",
    text: "Dr. Sharma diagnosed my condition quickly and explained everything clearly. The booking process was seamless — I got a WhatsApp confirmation within minutes.",
  },
  {
    name: "Meera Krishnan",
    initials: "MK",
    color: "#16a085",
    rating: 5,
    specialty: "Paediatrics",
    text: "Brought my daughter for her annual checkup. Dr. Rao was wonderful with her — patient, thorough, and reassuring. We are now regular patients.",
  },
  {
    name: "Sanjay Gupta",
    initials: "SG",
    color: "#8e44ad",
    rating: 5,
    specialty: "Orthopaedics",
    text: "After months of knee pain, Dr. Mehta had me sorted in two visits. The diagnostics lab results came back same-day. Impressive facility.",
  },
  {
    name: "Ananya Singh",
    initials: "AS",
    color: "#d35400",
    rating: 5,
    specialty: "General Medicine",
    text: "The emergency line is genuinely 24/7. Called at 11pm, got a doctor on the phone within 4 minutes. This is what healthcare should look like.",
  },
  {
    name: "Deepak Nair",
    initials: "DN",
    color: "#27ae60",
    rating: 5,
    specialty: "Diagnostics",
    text: "Had all my annual tests done here. Results were on the patient portal within 6 hours. No chasing, no paperwork. Just clarity.",
  },
  {
    name: "Pooja Iyer",
    initials: "PI",
    color: "#c0392b",
    rating: 5,
    specialty: "Ophthalmology",
    text: "Clean facility, no waiting, and the doctor spent a full 20 minutes explaining my prescription. Felt heard for the first time at a clinic.",
  },
];

const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-clinical-white border border-clinical-border rounded-xl p-6 w-80 flex-shrink-0">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.initials}
        </div>
        <div>
          <div className="font-medium text-ink text-sm tracking-tight">{testimonial.name}</div>
          <div className="text-[11px] font-medium text-clinical-blue uppercase tracking-wider mt-0.5">{testimonial.specialty}</div>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-[15px] text-ink-muted leading-[1.65]">{testimonial.text}</p>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const row1Ref = React.useRef<HTMLDivElement>(null);
  const row2Ref = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // Row 1: scroll left
    const row1Width = row1Ref.current.scrollWidth / 2;
    gsap.to(row1Ref.current, {
      x: -row1Width,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    // Row 2: scroll right
    const row2Width = row2Ref.current.scrollWidth / 2;
    gsap.set(row2Ref.current, { x: -row2Width });
    gsap.to(row2Ref.current, {
      x: 0,
      duration: 35,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-clinical-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-[clamp(32px,4vw,48px)] font-medium tracking-tight leading-tight text-ink text-center">
          What our patients say
        </h2>
      </div>

      {/* Row 1 - Left scroll */}
      <div className="mb-6">
        <div ref={row1Ref} className="flex gap-6 will-change-transform w-max">
          {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Row 2 - Right scroll */}
      <div>
        <div ref={row2Ref} className="flex gap-6 will-change-transform w-max">
          {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
