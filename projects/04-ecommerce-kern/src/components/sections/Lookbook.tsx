"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lookbookImages = [
  {
    src: "/Lookbook1.jpg",
    alt: "Kern AW 2025: lookbook 1",
  },
  {
    src: "/Lookbook2.jpg",
    alt: "Kern AW 2025: lookbook 2",
  },
  {
    src: "/Lookbook3.jpg",
    alt: "Kern AW 2025: lookbook 3",
  },
  {
    src: "/Lookbook4.jpg",
    alt: "Kern AW 2025: lookbook 4",
  },
  {
    src: "/Lookbook5.jpg",
    alt: "Kern AW 2025: lookbook 5",
  },
  {
    src: "/Lookbook6.jpg",
    alt: "Kern AW 2025: lookbook 6",
  },
];

export function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const imageUrls = lookbookImages.map((image) => image.src);
    imageUrls.forEach((src) => {
      const preloadedImage = new Image();
      preloadedImage.src = src;
    });

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(".lookbook-heading", {
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : 20,
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".lookbook-img", {
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : 30,
        stagger: prefersReducedMotion ? 0 : 0.08,
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".lookbook-grid",
          start: "top 80%",
        },
      });

      // Refresh ScrollTrigger after images load
      const images = sectionRef.current?.querySelectorAll(".lookbook-img img");
      if (images && images.length > 0) {
        let loadedCount = 0;
        images.forEach((img) => {
          const htmlImg = img as HTMLImageElement;
          if (htmlImg.complete) {
            loadedCount++;
          } else {
            htmlImg.addEventListener("load", () => {
              loadedCount++;
              if (loadedCount === images.length) {
                ScrollTrigger.refresh();
              }
            });
          }
        });
        if (loadedCount === images.length) {
          ScrollTrigger.refresh();
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-8 md:px-16 bg-kern-black">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="lookbook-heading mb-12">
          <h2
            className="font-display font-light text-kern-cream"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            AW 2025 Lookbook
          </h2>
          <p className="font-sans text-[11px] tracking-wider text-kern-cream-faint italic mt-2">
            Shot in New Delhi. October 2025.
          </p>
        </div>

        {/* Image grid */}
        <div
          className="lookbook-grid grid grid-cols-2 md:grid-cols-3 gap-2"
        >
          {lookbookImages.map((img, i) => (
            <div
              key={i}
              className="lookbook-img overflow-hidden aspect-[3/4] will-change-transform bg-kern-black-2"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
