import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@agency/shared";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axiom Strategy | High-Ticket Marketing Systems",
  description: "Grow faster. With a system, not a guess. Build scalable customer acquisition systems for D2C brands and SaaS startups.",
  icons: {
    icon: "/axiom-icon-v3.svg",
    shortcut: "/axiom-icon-v3.svg",
    apple: "/axiom-icon-v3.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-axiom-bg text-axiom-charcoal">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
