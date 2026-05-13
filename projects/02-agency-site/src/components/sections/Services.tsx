"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import { useReveal } from "@agency/shared";

const SERVICES = [
  {
    number: "01",
    title: "Web Development",
    description:
      "We build fast, accessible, conversion-optimised websites in Next.js. Every project is bespoke — no templates, no shortcuts.",
    tags: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
  },
  {
    number: "02",
    title: "Automation & Integrations",
    description:
      "We connect your website to the systems that run your business — CRMs, email tools, payment providers, and custom APIs.",
    tags: ["Make.com", "Zapier", "Airtable", "Webhooks"],
  },
  {
    number: "03",
    title: "Conversion Optimisation",
    description:
      "We design and build with one goal: turning visitors into customers. Every layout decision is grounded in behaviour and data.",
    tags: ["A/B Testing", "Heatmaps", "Form Design", "Analytics"],
  },
  {
    number: "04",
    title: "CMS & Content Systems",
    description:
      "We set up headless CMS systems your team can actually use — so you own your content without touching code.",
    tags: ["Sanity", "Contentlayer", "Notion API"],
  },
];

export function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useReveal<HTMLElement>({ stagger: 0, y: 40, duration: 0.9 });

  return (
    <section id="services" ref={sectionRef} className="py-32 px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header: Two-column layout */}
        <div className="flex justify-between items-start mb-16 gap-8">
          <h2 className="font-display text-5xl md:text-6xl text-ink leading-tight max-w-xs">
            What we do
          </h2>
          <p className="text-sm text-dim max-w-xs mt-4">
            Each engagement is built around a single question: what does this
            need to actually work?
          </p>
        </div>

        {/* Accordion list */}
        <div className="border-t border-stone">
          {SERVICES.map((service, index) => {
            const isOpen = open === index;
            return (
              <div key={service.number} className="border-b border-stone">
                <button
                  onClick={() => setOpen(open === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 px-2 -mx-2 hover:bg-mist transition-colors duration-200 group"
                  data-magnetic
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[11px] text-dust">
                      {service.number}
                    </span>
                    <span className="font-display text-2xl text-ink">
                      {service.title}
                    </span>
                  </div>
                  {/* Arrow rotates 45° when open */}
                  <span
                    className="text-dim transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    ↗
                  </span>
                </button>

                {/* Expanded content — Framer Motion height animation */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-12 pr-2">
                        <p className="text-sm text-dim leading-relaxed mb-4 max-w-lg">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
