import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kern | Crafted for the Considered",
  description:
    "Premium menswear. Limited runs. Ethically made. Built to last decades. Shop Kern's Autumn Winter 2025 collection.",
  keywords: ["premium menswear", "luxury clothing", "ethical fashion", "made in India", "kern"],
  openGraph: {
    title: "Kern | Crafted for the Considered",
    description: "Premium menswear. Limited runs. Ethically made. Built to last decades.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
