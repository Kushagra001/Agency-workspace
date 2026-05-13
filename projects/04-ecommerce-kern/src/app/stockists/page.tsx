import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";

export default function PlaceholderPage() {
  return (
    <main className="bg-kern-black min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-8 text-center">
        <h1 className="font-display font-light text-kern-cream text-4xl md:text-6xl mb-6">
          Stockists
        </h1>
        <p className="font-sans text-sm text-kern-cream-faint max-w-md mx-auto mb-10 leading-relaxed">
          Our global retail partners are currently being updated for the AW25 season.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center border border-kern-border px-8 py-4 text-xs font-normal tracking-widest uppercase font-sans text-kern-cream hover:border-kern-cream/40 transition-colors"
        >
          View Collection
        </Link>
      </div>
      <Footer />
    </main>
  );
}
