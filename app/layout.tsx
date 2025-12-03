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
import "./globals.css";
import { Providers } from "./providers";

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
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
