"use client";
import { useState } from "react";
import { formatPrice } from "@/lib/products";

interface AddToCartProps {
  productId: string;
  productName: string;
  productPrice: number;
  size: string;
  disabled?: boolean;
}

export function AddToCart({ productName, productPrice, size, disabled = false }: AddToCartProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    if (!size || disabled || loading) {
      return;
    }
    setLoading(true);
    // Simulate async cart operation (replace with real Shopify cart mutation)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setAdded(true);
    
    // Dispatch event for Nav to update cart count
    window.dispatchEvent(new Event("cart-add"));
    
    window.setTimeout(() => setAdded(false), 2000);
  };

  const label = added
    ? `Added — ${formatPrice(productPrice)}`
    : loading
    ? "Adding..."
    : !size
    ? "Select a size"
    : "Add to cart";

  return (
    <div className="space-y-2">
      <button
        onClick={handleClick}
        disabled={disabled || loading || !size}
        aria-label={`Add ${productName} to cart`}
        className="w-full py-4 text-xs font-normal tracking-widest uppercase font-sans transition-colors duration-150 relative overflow-hidden bg-kern-cream text-kern-black hover:bg-kern-cream-hover disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span
          className="transition-opacity duration-200"
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {label}
        </span>
      </button>
      {!size && (
        <p className="font-sans text-[11px] text-kern-cream-faint" aria-live="polite">
          Select size to continue.
        </p>
      )}
    </div>
  );
}
