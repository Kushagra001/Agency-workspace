"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, formatPrice } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

export function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeDotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const displayProducts = products.slice(0, 4);

  useEffect(() => {
    const imageUrls = displayProducts.flatMap((product) => product.images.slice(0, 1));
    imageUrls.forEach((src) => {
      const preloadedImage = new Image();
      preloadedImage.src = src;
    });

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const totalSections = panels.length;
      let lastIndex = -1;

      // Pin the section for 4× viewport height of scrolling
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (totalSections - 1)}`,
        pin: trackRef.current,
        pinSpacing: true,
        scrub: false,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = progress * totalSections;
          const activeIndex = Math.min(
            Math.floor(rawIndex),
            totalSections - 1
          );

          if (activeIndex !== lastIndex) {
            panels.forEach((panel, i) => {
              if (i === activeIndex) {
                gsap.to(panel, {
                  opacity: 1,
                  duration: prefersReducedMotion ? 0 : 0.5,
                  ease: "power2.out",
                  pointerEvents: "auto",
                });

                // Animate text elements into view
                const textEls = panel.querySelectorAll(".panel-text-anim");
                gsap.fromTo(
                  textEls,
                  { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
                  {
                    opacity: 1,
                    y: 0,
                    stagger: prefersReducedMotion ? 0 : 0.08,
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: "power3.out",
                  }
                );
              } else {
                gsap.to(panel, {
                  opacity: 0,
                  duration: prefersReducedMotion ? 0 : 0.3,
                  pointerEvents: "none",
                });
              }

              // Dot indicators — animate with GSAP, not direct DOM manipulation
              const dotEl = activeDotRefs.current[i];
              if (dotEl) {
                gsap.to(dotEl, {
                  width: i === activeIndex ? "20px" : "4px",
                  background: i === activeIndex ? "#f5f0e8" : "rgba(245,240,232,0.2)",
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: false,
                });
              }
            });
            lastIndex = activeIndex;
          }
        },
      });

      // Image parallax within each panel (skip if reduced motion)
      if (!prefersReducedMotion) {
        panels.forEach((panel) => {
          const img = panel.querySelector("img");
          if (!img) return;
          gsap.to(img, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }

      // Refresh ScrollTrigger after images load
      const images = containerRef.current?.querySelectorAll("img");
      if (images && images.length > 0) {
        let loadedCount = 0;
        images.forEach((img) => {
          if (img.complete) {
            loadedCount++;
          } else {
            img.addEventListener("load", () => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Panel track: pinned */}
      <div ref={trackRef} className="sticky top-0 overflow-hidden" style={{ height: "100svh" }}>
        {displayProducts.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="absolute inset-0 flex items-center"
            style={{ 
              opacity: i === 0 ? 1 : 0,
              pointerEvents: i === 0 ? "auto" : "none",
              contain: "layout style paint",
              willChange: "opacity",
            }}
          >
            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full items-center">
              {/* Image half */}
              <div className="relative overflow-hidden bg-kern-black-2 aspect-[3/4] md:aspect-auto md:h-full">
                <img
                  src={product.images[0]}
                  alt={`${product.name} - ${product.category} from KERN ${product.collection}`}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center top" }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              {/* Text half */}
              <div className="flex flex-col justify-center px-8 md:px-16 bg-kern-black py-12">
                <p className="panel-text-anim font-sans text-[10px] tracking-[0.25em] uppercase text-kern-cream-faint mb-6">
                  {product.collection} · {product.category}
                </p>
                <h2
                  className="panel-text-anim font-display font-light text-kern-cream leading-tight mb-6"
                  style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                >
                  {product.name}
                </h2>
                <p className="panel-text-anim font-sans text-sm text-kern-cream-dim leading-relaxed max-w-sm mb-8">
                  {product.description}
                </p>
                <p className="panel-text-anim font-display text-2xl text-kern-cream mb-8">
                  {formatPrice(product.price)}
                </p>
                <a
                  href={`/product/${product.slug}`}
                  className="panel-text-anim inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-kern-cream group w-fit"
                >
                  <span className="border-b border-kern-border pb-0.5 group-hover:border-kern-cream transition-colors duration-300">
                    View product
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                {/* Panel indicator dots */}
                <div className="flex gap-2 mt-16 items-center">
                  {displayProducts.map((_, idx) => (
                    <div
                      key={idx}
                      ref={(el) => { if (i === 0) activeDotRefs.current[idx] = el; }}
                      className="h-px rounded-full transition-all duration-300"
                      style={{
                        background:
                          idx === i
                            ? "#f5f0e8"
                            : "rgba(245,240,232,0.2)",
                        width: idx === i ? 20 : 4,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
