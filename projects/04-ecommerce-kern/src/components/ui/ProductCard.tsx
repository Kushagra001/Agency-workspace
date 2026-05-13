"use client";
import { useState } from "react";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const previewImage = product.images[1] ?? product.images[0];

  return (
    <>
      <Link
        href={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-kern-black-2 aspect-[3/4]">
          {product.images[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-700"
              style={{
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          )}
          {previewImage && (
            <img
              src={previewImage}
              alt={`${product.name} | preview`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0 }}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[9px] tracking-[0.2em] uppercase text-kern-cream-faint font-sans">
              {product.collection}
            </span>
            {!product.available && (
              <span className="border border-kern-border bg-kern-black/70 px-2 py-1 text-[9px] tracking-[0.2em] uppercase text-kern-cream font-sans">
                Out of stock
              </span>
            )}
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-kern-cream-dim">
              Hover preview
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setQuickViewOpen(true);
              }}
              className="inline-flex items-center justify-center border border-kern-border bg-kern-black/60 px-3 py-2 font-sans text-[10px] tracking-[0.2em] uppercase text-kern-cream hover:border-kern-cream/40 transition-colors"
            >
              Quick view
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-kern-cream-faint font-sans mb-1">
              {product.category}
            </p>
            <h3 className="font-display text-lg font-light text-kern-cream leading-tight">
              {product.name}
            </h3>
          </div>
          <p className="font-display text-base text-kern-cream-dim whitespace-nowrap mt-auto">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>

      {quickViewOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-kern-black/85 px-6">
          <div className="w-full max-w-3xl border border-kern-border bg-kern-black-2">
            <div className="grid md:grid-cols-[42fr_58fr]">
              <div className="relative min-h-[320px] bg-kern-black">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt={`${product.name} quick view`}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-kern-cream-faint mb-2">
                      Quick view
                    </p>
                    <h3 className="font-display text-3xl font-light text-kern-cream leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuickViewOpen(false)}
                    className="font-sans text-[10px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors"
                  >
                    Close
                  </button>
                </div>

                <p className="font-display text-xl text-kern-cream-dim">{formatPrice(product.price)}</p>
                <p className="font-sans text-sm text-kern-cream-dim leading-relaxed">{product.description}</p>

                <div className="grid grid-cols-2 gap-3 border-t border-kern-border pt-4">
                  {product.details.slice(0, 4).map((detail) => (
                    <p key={detail} className="font-sans text-[11px] text-kern-cream-faint leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/product/${product.slug}`}
                    className="inline-flex items-center justify-center border border-kern-border px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-kern-cream hover:border-kern-cream/40 transition-colors"
                    onClick={() => setQuickViewOpen(false)}
                  >
                    View product
                  </Link>
                  <button
                    type="button"
                    onClick={() => setQuickViewOpen(false)}
                    className="inline-flex items-center justify-center border border-kern-border px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors"
                  >
                    Keep browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
