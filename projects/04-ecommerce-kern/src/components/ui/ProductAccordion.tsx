"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ProductAccordionProps {
  details: string[];
  care: string;
}

export function ProductAccordion({ details, care }: ProductAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    {
      label: "Details",
      content: (
        <ul className="flex flex-col gap-2">
          {details.map((d, i) => (
            <li key={i} className="font-sans text-sm text-kern-cream-dim flex items-start gap-2">
              <span className="text-kern-cream-faint mt-[2px]">-</span>
              {d}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Care",
      content: (
        <p className="font-sans text-sm text-kern-cream-dim leading-relaxed">{care}</p>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={item.label} className="border-b border-kern-border">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-kern-cream group-hover:text-kern-cream-dim transition-colors">
              {item.label}
            </span>
            <span
              className="text-kern-cream-faint transition-transform duration-300"
              style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="pb-5">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
