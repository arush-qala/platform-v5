/**
 * ROOT LAYOUT COMPONENT
 * 
 * BUSINESS PURPOSE:
 * This is the root layout for the entire Qala platform. It wraps all pages
 * and provides global configuration like fonts, metadata, and styling.
 * 
 * TECHNICAL DETAILS:
 * - Next.js App Router root layout (required file)
 * - Applies to all routes in the application
 * - Loads custom fonts and global CSS
 * - Sets SEO metadata for all pages
 * 
 * FONT STRATEGY:
 * - Cormorant Garamond: Luxury serif font for headings and brand text
 * - Inter: Clean sans-serif for body text and UI elements
 * - Fonts loaded with "swap" display for better performance
 * - CSS variables for easy font switching in components
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

/**
 * Cormorant Garamond Font Configuration
 * 
 * DESIGN PURPOSE:
 * Luxury serif font used for:
 * - Brand name "QALA"
 * - Headings and hero text
 * - Brand names and collection titles
 * 
 * WEIGHTS:
 * - 300: Light (for elegant, minimal headings)
 * - 400: Regular (default body weight)
 * - 500: Medium (for emphasis)
 * - 600: Semi-bold (for strong emphasis)
 * 
 * CSS VARIABLE:
 * --font-cormorant: Used in Tailwind config and components
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap", // Show fallback font while loading, then swap
});

/**
 * Inter Font Configuration
 * 
 * DESIGN PURPOSE:
 * Modern sans-serif font used for:
 * - Body text and descriptions
 * - UI elements and buttons
 * - Navigation and metadata
 * 
 * WEIGHTS:
 * - 300: Light (for subtle text)
 * - 400: Regular (default body weight)
 * - 500: Medium (for emphasis)
 * - 600: Semi-bold (for strong emphasis)
 * 
 * CSS VARIABLE:
 * --font-inter: Used in Tailwind config and components
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap", // Show fallback font while loading, then swap
});

/**
 * SEO Metadata
 * 
 * PURPOSE:
 * Sets default metadata for all pages. Individual pages can override
 * these values using Next.js metadata API.
 * 
 * KEYWORDS:
 * Optimized for B2B fashion buyers searching for:
 * - Luxury fashion sourcing
 * - Designer brands for boutiques
 * - B2B fashion platforms
 * - Independent designer discovery
 */
export const metadata: Metadata = {
  title: "Qala - Luxury Fashion Sourcing Platform",
  description: "Discover exceptional independent designer fashion labels for your boutique. The next generation luxury sourcing platform connecting discerning buyers with emerging designers.",
  keywords: "luxury fashion, designer brands, boutique sourcing, B2B fashion platform, independent designers",
};

/**
 * Root Layout Component
 * 
 * STRUCTURE:
 * - html: Root HTML element with smooth-scroll class
 * - body: Contains all page content with font variables
 * 
 * FONT APPLICATION:
 * Font variables are applied to body, making them available throughout
 * the app via Tailwind's font-cormorant and font-inter classes.
 * 
 * SMOOTH SCROLL:
 * smooth-scroll class enables smooth scrolling behavior (defined in globals.css)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
