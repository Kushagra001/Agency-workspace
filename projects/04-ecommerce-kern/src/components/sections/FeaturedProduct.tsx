"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, formatPrice } from "@/lib/products";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { AddToCart } from "@/components/ui/AddToCart";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Overcoat 01: the featured product
  const product = products[2];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        imgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text elements stagger in from right
      gsap.from(".featured-text-anim", {
        opacity: 0,
        x: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-kern-black min-h-screen flex">
      <div className="grid md:grid-cols-[60fr_40fr] w-full">
        {/* Image side: full bleed */}
        <div className="relative overflow-hidden bg-kern-black-2" style={{ minHeight: "90vh" }}>
          <div ref={imgRef} className="absolute inset-0 scale-[1.15]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ objectPosition: "center top" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          {/* Right-side fade gradient: bleeds into text column */}
          <div
            className="absolute inset-y-0 right-0 w-24"
            style={{
              background:
                "linear-gradient(to right, transparent, #0f0d0a)",
            }}
          />
        </div>

        {/* Text side: sticky */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-20 bg-kern-black">
          {/* Editor's pick badge */}
          <div className="featured-text-anim mb-6">
            <span className="inline-block font-sans text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-kern-tobacco text-kern-cream">
              Editor's Pick
            </span>
          </div>

          <p className="featured-text-anim font-sans text-[10px] tracking-widest uppercase text-kern-cream-faint mb-2">
            {product.collection} · {product.category}
          </p>

          <h2 className="featured-text-anim font-display text-5xl md:text-6xl font-light text-kern-cream leading-tight mb-3">
            {product.name}
          </h2>

          <p className="featured-text-anim font-display text-2xl text-kern-cream-dim mb-8">
            {formatPrice(product.price)}
          </p>

          <p className="featured-text-anim font-sans text-sm text-kern-cream-dim leading-relaxed mb-8 max-w-xs">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="featured-text-anim mb-2">
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>

          <p className="featured-text-anim font-sans text-xs text-kern-cream-faint mb-6">
            Unsure of your size?{" "}
            <button
              type="button"
              onClick={() => setShowSizeGuide((current) => !current)}
              className="underline underline-offset-2 hover:text-kern-cream-dim transition-colors"
              aria-expanded={showSizeGuide}
            >
              Size guide
            </button>
          </p>

          {showSizeGuide && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-kern-black/85 px-6">
              <div className="w-full max-w-2xl border border-kern-border bg-kern-black-2 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-kern-cream-faint mb-2">
                      Size guide
                    </p>
                    <h2 className="font-display text-3xl font-light text-kern-cream">Measurement chart</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(false)}
                    className="font-sans text-[10px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border border-kern-border px-4 py-3">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-kern-cream-faint mb-2">Fit notes</p>
                    <p className="font-sans text-sm text-kern-cream-dim leading-relaxed">
                      Tops fit true to size with a relaxed cut. Bottoms size up if between sizes. Outerwear is cut to layer.
                    </p>
                  </div>
                  <div className="border border-kern-border px-4 py-3">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-kern-cream-faint mb-2">Measurements</p>
                    <div className="space-y-2 font-sans text-sm text-kern-cream-dim">
                      <p>Chest: measure flat under arm</p>
                      <p>Waist: natural waist line</p>
                      <p>Length: shoulder to hem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add to cart: the ONLY filled button */}
          <div className="featured-text-anim">
            <AddToCart
              productId={product.id}
              productName={product.name}
              productPrice={product.price}
              size={selectedSize}
              disabled={!product.available}
            />
          </div>

          {!product.available && (
            <p className="featured-text-anim font-sans text-[11px] text-kern-cream-faint mt-2">
              Currently out of stock.
            </p>
          )}

          {/* Care instructions */}
          <p className="featured-text-anim font-sans text-[11px] text-kern-cream-faint mt-8 leading-relaxed">
            {product.care}
          </p>
        </div>
      </div>
    </section>
  );
}
