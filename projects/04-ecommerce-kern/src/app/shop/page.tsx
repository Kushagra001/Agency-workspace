"use client";
import { useState } from "react";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";

const CATEGORIES = ["All", "Overshirts", "Shirts", "Trousers", "Outerwear"] as const;
type Category = (typeof CATEGORIES)[number];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filterFromUrl = searchParams.get("category") as Category | null;
  const [activeFilter, setActiveFilter] = useState<Category>(
    CATEGORIES.includes(filterFromUrl as Category) ? (filterFromUrl as Category) : "All"
  );

  useEffect(() => {
    const nextFilter = CATEGORIES.includes(filterFromUrl as Category)
      ? (filterFromUrl as Category)
      : "All";

    setActiveFilter(nextFilter);
  }, [filterFromUrl]);

  const updateFilter = (nextFilter: Category) => {
    setActiveFilter(nextFilter);

    const params = new URLSearchParams(searchParams.toString());
    if (nextFilter === "All") {
      params.delete("category");
    } else {
      params.set("category", nextFilter);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <main className="bg-kern-black min-h-screen">
      <Nav />

      {/* Page header */}
      <div className="pt-40 pb-10 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Back to home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream-dim transition-colors duration-200 mb-8"
          >
            <span>←</span>
            <span>Home</span>
          </Link>

          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-kern-cream-faint mb-4">
            Autumn Winter 2025
          </p>
          <h1
            className="font-display font-light text-kern-cream"
            style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
          >
            {activeFilter === "All" ? "All products" : activeFilter}
          </h1>
          <p className="font-sans text-sm text-kern-cream-faint mt-2">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </div>

      {/* Product grid */}
      <div className="px-8 md:px-16 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Filter row */}
          <div className="flex gap-6 mb-12 border-b border-kern-border pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilter(cat)}
                className={`font-sans font-normal text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 relative pb-0.5 ${
                  activeFilter === cat
                    ? "text-kern-cream"
                    : "text-kern-cream-faint hover:text-kern-cream-dim"
                }`}
              >
                {cat}
                {/* Active underline indicator */}
                {activeFilter === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-kern-cream" />
                )}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="font-sans text-sm text-kern-cream-faint py-24 text-center">
              No pieces in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
