"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pressQuotes = [
  {
    quote:
      "Kern is doing something quietly radical: making premium menswear that's actually worth the price.",
    source: "Monocle Magazine",
    issue: "Issue 172, Sept 2025",
  },
  {
    quote:
      "The Overshirt 01 is the best piece of Indian menswear I've encountered this year.",
    source: "The Hindu Style",
    date: "October 2025",
  },
  {
    quote:
      "Understated, impeccably made, and genuinely considered. Kern is what slow fashion should look like.",
    source: "Vogue Men India",
    date: "AW 2025 Issue",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + pressQuotes.length) % pressQuotes.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % pressQuotes.length);
  };

  const active = pressQuotes[activeIndex];

  return (
    <section className="py-32 px-8 bg-kern-black-2 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Quote area */}
        <div className="min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <blockquote
                className="font-display font-light italic text-kern-cream leading-relaxed"
                style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
              >
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              <footer className="mt-8">
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-kern-cream-faint">
                  {active.source}
                </p>
                <p className="font-sans text-[10px] text-kern-cream-faint mt-1">
                  {active.issue || active.date}
                </p>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-10 mt-12">
          <button
            onClick={handlePrev}
            className="font-sans text-xs tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors duration-200"
            aria-label="Previous quote"
          >
            ← Prev
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {pressQuotes.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className="w-1 h-1 rounded-full transition-all duration-300"
                style={{
                  background:
                    i === activeIndex
                      ? "#f5f0e8"
                      : "rgba(245,240,232,0.2)",
                  width: i === activeIndex ? 20 : 4,
                  height: 1,
                }}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="font-sans text-xs tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors duration-200"
            aria-label="Next quote"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
