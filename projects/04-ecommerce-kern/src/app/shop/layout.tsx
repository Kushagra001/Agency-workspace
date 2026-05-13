import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Kern",
  description:
    "Browse Kern's Autumn Winter 2025 collection. Premium menswear. Limited runs. Ethically made.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
