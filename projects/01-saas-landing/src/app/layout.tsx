import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Flōw: Think less. Build more.",
  description:
    "Flōw captures everything you throw at it, including voice notes, links, docs, and screenshots, then turns chaos into a clean, prioritized task list. Automatically.",
  keywords: ["productivity", "AI", "task management", "voice notes", "founders", "indie hackers"],
  openGraph: {
    title: "Flōw: Think less. Build more.",
    description: "Turn messy voice notes, docs, and browser tabs into structured, actionable tasks automatically.",
    type: "website",
  },
};

import { SmoothScroll } from "@/components/providers/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-surface-base)] text-[var(--color-foreground)] selection:bg-[var(--color-brand-primary)]/20 selection:text-[var(--color-foreground)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
