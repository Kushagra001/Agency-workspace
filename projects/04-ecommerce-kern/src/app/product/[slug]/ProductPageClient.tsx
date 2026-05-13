"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { products, formatPrice } from "@/lib/products";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { AddToCart } from "@/components/ui/AddToCart";
import { ProductAccordion } from "@/components/ui/ProductAccordion";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

interface ProductPageClientProps {
  slug: string;
}

export function ProductPageClient({ slug }: ProductPageClientProps) {
  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <main className="bg-kern-black min-h-screen flex items-center justify-center">
        <Nav />
        <p className="font-sans text-kern-cream-faint text-sm">Product not found.</p>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-kern-black min-h-screen">
      <Nav />

      <div className="pt-20">
        {/* Back link */}
        <div className="px-8 md:px-16 pt-8 pb-4">
          <Link
            href="/shop"
            className="font-sans text-[11px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream-dim transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to shop</span>
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-[55fr_45fr] min-h-[90vh]">
          {/* Left: image gallery */}
          <div className="px-8 md:px-0 md:pl-16 flex flex-col gap-4 pb-16">
            {/* Main image */}
            <div className="relative overflow-hidden bg-kern-black-2" style={{ aspectRatio: "4/5" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={`${product.name} | view ${selectedImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-top will-change-opacity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  loading={selectedImage === 0 ? "eager" : "lazy"}
                  fetchPriority={selectedImage === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="relative overflow-hidden shrink-0 transition-all duration-200"
                    style={{
                      width: 72,
                      height: 90,
                      border: i === selectedImage
                        ? "1px solid rgba(245,240,232,0.4)"
                        : "1px solid rgba(245,240,232,0.08)",
                    }}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === selectedImage}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: sticky product info */}
          <div className="px-8 md:px-12 pb-16">
            <div className="md:sticky md:top-24">
              {/* Breadcrumb */}
              <p className="font-sans text-[10px] tracking-widest uppercase text-kern-cream-faint mb-2">
                {product.collection} · {product.category}
              </p>

              {/* Product name */}
              <h1 className="font-display text-4xl md:text-5xl font-light text-kern-cream leading-tight mb-2">
                {product.name}
              </h1>

              {/* Price */}
              <p className="font-display text-2xl text-kern-cream-dim mb-8">
                {formatPrice(product.price)}
              </p>

              {/* Size selector */}
              <div className="mb-2">
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                />
              </div>

              <p className="font-sans text-xs text-kern-cream-faint mt-2 mb-8">
                Unsure of your size?{" "}
                <button
                  type="button"
                  onClick={() => setShowSizeGuide((current) => !current)}
                  className="underline underline-offset-2 hover:text-kern-cream-dim transition-colors cursor-pointer"
                  aria-expanded={showSizeGuide}
                >
                  Size guide
                </button>
              </p>

              {showSizeGuide && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-kern-black/85 px-6">
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

              {/* Add to cart: the only filled button */}
              <AddToCart
                productId={product.id}
                productName={product.name}
                productPrice={product.price}
                size={selectedSize}
                disabled={!product.available}
              />

              {!product.available && (
                <p className="font-sans text-[11px] text-kern-cream-faint mt-2">
                  Currently out of stock.
                </p>
              )}

              {/* Description + accordion */}
              <div className="mt-8 border-t border-kern-border pt-8">
                <p className="font-sans text-sm text-kern-cream-dim leading-relaxed mb-8">
                  {product.description}
                </p>
                <ProductAccordion details={product.details} care={product.care} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
