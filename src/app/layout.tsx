import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import Preloader from "@/components/motion/Preloader";
import { site } from "@/lib/site";

/* Display face with actual character — ink traps, variable width.
   Deliberately not Inter. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — PCD Pharma Franchise Company in India`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "PCD pharma franchise",
    "pharma franchise company",
    "WHO-GMP pharma company",
    "monopoly pharma franchise",
    "third party manufacturing",
    "ATIN Healthcare",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.legalName,
    title: `${site.legalName} — PCD Pharma Franchise Company`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f1efe9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
