/**
 * DISCOVER PAGE - BRAND SUGGESTIONS BASED ON FILTERS
 * 
 * BUSINESS PURPOSE:
 * This page displays up to 5 brand suggestions based on the filters selected
 * on the homepage. It's the second step in the Qala buying flow:
 * 1. Brand Discovery (homepage) → 2. Brand Suggestions (this page)
 * 
 * USER FLOW:
 * 1. Buyer arrives from homepage with category/season filters in URL
 * 2. Page fetches brands matching those filters from API
 * 3. Buyer sees up to 5 brands displayed in a carousel/slider
 * 4. Buyer can click on a brand to view its store page
 * 5. Buyer can switch between brands using bottom navigation
 * 
 * FILTERING LOGIC:
 * - Category filter: Matches brands that have products in that category
 * - Season filter: Matches brands that have collections for that season
 * - If no filters: Shows all featured brands (up to 5)
 * 
 * DESIGN APPROACH:
 * - Black background for dramatic, luxury feel
 * - Large brand name in center with images on sides
 * - Grayscale images that become color on hover
 * - Minimal navigation at bottom
 * 
 * TECHNICAL DETAILS:
 * - Uses Suspense for streaming SSR
 * - Client-side state for active brand index
 * - Fetches brands from /api/brands with query parameters
 * - Limits results to 5 brands as per business requirement
 */

'use client'

import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

/**
 * Brand Interface
 * Matches the Brand model from Prisma schema
 */
interface Brand {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  aesthetic: string
  location: string
  collections: Collection[]
}

/**
 * Collection Interface
 * Simplified collection data for display
 */
interface Collection {
  id: string
  name: string
  season: string
  coverImage: string
}

/**
 * Discover Content Component
 * 
 * STATE MANAGEMENT:
 * - brands: Array of brand data fetched from API
 * - loading: Loading state for async data fetch
 * - activeBrandIndex: Currently displayed brand (0-4)
 * 
 * URL PARAMETERS:
 * - category: Product category filter from homepage
 * - season: Season filter from homepage
 * 
 * DATA FETCHING:
 * - Fetches on mount and when filters change
 * - Calls /api/brands with query parameters
 * - Limits to 5 brands as per business requirement
 */
function DiscoverContent() {
  const searchParams = useSearchParams()
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [activeBrandIndex, setActiveBrandIndex] = useState(0)
  
  /**
   * Extract filter parameters from URL
   * Defaults to "Everything" and "Everyone" if not provided
   * These defaults mean "no filter" - show all brands
   */
  const category = searchParams.get('category') || 'Everything'
  const season = searchParams.get('season') || 'Everyone'

  /**
   * Fetch Brands from API
   * 
   * BUSINESS LOGIC:
   * - Builds query parameters from URL filters
   * - Only includes params if they're not default values
   * - API endpoint handles filtering logic
   * - Limits results to 5 brands (business requirement)
   * 
   * ERROR HANDLING:
   * - Catches and logs errors
   * - Sets loading to false even on error
   * - UI shows empty state if fetch fails
   */
  const fetchBrands = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      // Only add category param if user selected a specific category
      if (category !== 'Everything') params.append('category', category)
      // Only add season param if user selected a specific season
      if (season !== 'Everyone') params.append('season', season)
      
      const response = await fetch(`/api/brands?${params.toString()}`)
      const data = await response.json()
      
      /**
       * BUSINESS REQUIREMENT: Limit to 5 brands
       * The discover page should show exactly 5 brand suggestions
       * This creates a focused, curated experience rather than overwhelming
       * the buyer with too many options
       */
      setBrands(data.slice(0, 5))
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Effect Hook: Fetch brands on mount and when filters change
   * 
   * DEPENDENCIES:
   * - category: Re-fetches when category filter changes
   * - season: Re-fetches when season filter changes
   * 
   * NOTE: eslint-disable for exhaustive-deps is intentional
   * We only want to re-fetch when category/season change, not when
   * fetchBrands function reference changes
   */
  useEffect(() => {
    fetchBrands()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, season])

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border border-[#8B7355] border-t-transparent rounded-full"
        />
      </main>
    )
  }

  if (brands.length === 0) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-[#8B7355] mb-8 font-light">No brands found</p>
          <Link
            href="/"
            className="px-8 py-3 bg-[#8B7355] text-black hover:bg-[#A08968] transition-all font-light"
          >
            Start Over
          </Link>
        </div>
      </main>
    )
  }

  /**
   * Get Active Brand and Images
   * 
   * IMAGE SELECTION LOGIC:
   * - Prefers collection cover images (more dynamic, shows variety)
   * - Falls back to brand cover image if not enough collections
   * - Always ensures exactly 2 images for the two-column layout
   * - Images displayed in grayscale with color on hover
   */
  const activeBrand = brands[activeBrandIndex]
  
  // Get two images from the brand's collections or use cover image
  const brandImages = activeBrand.collections.slice(0, 2).map(c => c.coverImage)
  // Fallback to brand cover image if not enough collection images
  if (brandImages.length < 2) {
    brandImages.push(activeBrand.coverImage)
  }
  // Ensure we always have 2 images (duplicate if necessary)
  if (brandImages.length < 2) {
    brandImages.push(activeBrand.coverImage)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header - QALA */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 py-8 text-center"
      >
        <Link href="/" className="text-2xl font-cormorant text-[#8B7355] font-light tracking-[0.3em]">
          QALA
        </Link>
      </motion.header>

      {/* Main Content Area - Brand Display */}
      <section className="flex-1 flex items-center justify-center px-6 pt-24">
        <motion.div
          key={activeBrandIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-7xl"
        >
          {/* Two Images with Brand Name in Center */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16 items-center mb-12">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto"
            >
              <Image
                src={brandImages[0]}
                alt={`${activeBrand.name} image 1`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>

            {/* Center - Brand Name and Year */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center px-8 min-w-[200px]"
            >
              <h1 className="text-6xl md:text-8xl font-light text-white mb-4 font-cormorant">
                {activeBrand.name}
              </h1>
              <p className="text-[#8B7355] text-sm font-light tracking-wider mb-8">
                {activeBrand.location}
              </p>
              <Link
                href={`/brands/${activeBrand.slug}`}
                className="text-sm text-white hover:text-[#8B7355] transition-colors underline underline-offset-4 tracking-wider font-light"
              >
                DISCOVER MORE
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto"
            >
              <Image
                src={brandImages[1]}
                alt={`${activeBrand.name} image 2`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 
        BOTTOM BRAND NAVIGATION
        
        UX PATTERN:
        - Horizontal list of all 5 brand names
        - Active brand highlighted in white
        - Inactive brands in gray with hover effect
        - Clicking a brand name switches the displayed brand
        - Simple, minimal navigation that doesn't distract from content
        
        DESIGN DETAILS:
        - Uppercase text with wide letter spacing (tracking-[0.2em])
        - Border-top separates navigation from main content
        - Smooth fade-in animation on page load
      */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="border-t border-[#333] py-12 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* 
            BRAND NAME BUTTONS
            - Each brand name is clickable
            - Active brand has white text
            - Inactive brands have gray text that becomes white on hover
            - Clicking updates activeBrandIndex to switch displayed brand
          */}
          <div className="flex justify-center items-center gap-12">
            {brands.map((brand, index) => (
              <button
                key={brand.id}
                onClick={() => setActiveBrandIndex(index)}
                className="group"
              >
                <span className={`text-lg font-light tracking-[0.2em] transition-colors whitespace-nowrap uppercase ${
                  index === activeBrandIndex
                    ? 'text-white'
                    : 'text-[#666] group-hover:text-white'
                }`}>
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  )
}

/**
 * Loading Fallback Component
 * 
 * PURPOSE:
 * Shown while Suspense is waiting for searchParams to be available
 * Uses Next.js 13+ Suspense boundaries for streaming SSR
 * 
 * DESIGN:
 * - Black background matches page theme
 * - Spinning loader with brand color (#8B7355)
 * - Centered for visual balance
 */
function LoadingFallback() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border border-[#8B7355] border-t-transparent rounded-full"
      />
    </main>
  )
}

/**
 * Discover Page Component (Default Export)
 * 
 * SUSPENSE WRAPPER:
 * - Wraps DiscoverContent in Suspense boundary
 * - useSearchParams() requires Suspense in Next.js App Router
 * - LoadingFallback shown while searchParams are being resolved
 * 
 * TECHNICAL NOTE:
 * This pattern is required by Next.js 13+ App Router when using
 * useSearchParams() hook. The Suspense boundary allows the page
 * to stream in the search parameters without blocking the entire page.
 */
export default function DiscoverPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DiscoverContent />
    </Suspense>
  )
}
