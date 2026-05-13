import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-kern-black min-h-screen flex items-center justify-center px-8">
      <div className="max-w-xl text-center">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-kern-cream-faint mb-4">
          404
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-light text-kern-cream leading-tight mb-6">
          This page moved quietly.
        </h1>
        <p className="font-sans text-sm text-kern-cream-dim leading-relaxed mb-10">
          The piece you were looking for is not here. Return to the collection and keep browsing.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center border border-kern-border px-8 py-4 text-xs font-normal tracking-widest uppercase font-sans text-kern-cream hover:border-kern-cream/40 transition-colors"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}