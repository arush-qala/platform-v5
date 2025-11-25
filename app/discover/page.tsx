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
 * - Cream/Ivory background for "Old Money" luxury feel
 * - Editorial layout with large images
 * - Elegant typography
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
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

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
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border border-gold-accent border-t-transparent rounded-full"
        />
      </main>
    )
  }

  if (brands.length === 0) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-deep-charcoal mb-8 font-light font-cormorant">No brands found matching your criteria</p>
          <Link
            href="/"
            className="px-8 py-3 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all font-light tracking-widest uppercase text-sm"
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
   * - Images displayed in full color (removed grayscale for richer feel)
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
    <main className="min-h-screen bg-white text-deep-charcoal flex flex-col relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Header - QALA */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 py-8 text-center"
      >
        <Link href="/" className="text-2xl font-cormorant text-deep-charcoal font-light tracking-[0.3em] hover:text-gold-accent transition-colors">
          QALA
        </Link>
      </motion.header>

      {/* Main Content Area - Brand Display */}
      <section className="flex-1 flex items-center justify-center px-6 pt-24 pb-32 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrandIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-7xl"
          >
            {/* Editorial Layout: Image - Text - Image */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1.2fr] gap-8 lg:gap-16 items-center">

              {/* Left Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[3/4] w-full shadow-2xl group"
              >
                <Image
                  src={brandImages[0]}
                  alt={`${activeBrand.name} collection`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Center - Brand Info */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center px-4 py-8"
              >
                <p className="text-gold-accent text-sm font-medium tracking-[0.2em] mb-6 uppercase">
                  Featured Brand
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-deep-charcoal mb-6 font-cormorant leading-tight">
                  {activeBrand.name}
                </h1>
                <p className="text-taupe text-sm font-light tracking-wider mb-8 uppercase">
                  {activeBrand.location}
                </p>
                <p className="text-charcoal/80 font-light leading-relaxed mb-10 max-w-md mx-auto line-clamp-4">
                  {activeBrand.description}
                </p>

                <Link
                  href={`/brands/${activeBrand.slug}`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black border border-black hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="text-sm tracking-[0.2em] uppercase">Explore Brand</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative aspect-[3/4] w-full shadow-2xl lg:mt-24 group"
              >
                <Image
                  src={brandImages[1]}
                  alt={`${activeBrand.name} detail`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 
        BOTTOM BRAND NAVIGATION
        
        UX PATTERN:
        - Horizontal list of all 5 brand names
        - Active brand highlighted in dark charcoal
        - Inactive brands in taupe with hover effect
        - Clicking a brand name switches the displayed brand
        - Simple, minimal navigation that doesn't distract from content
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-warm-grey/30 py-6 z-40"
      >
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex justify-center items-center gap-8 md:gap-16 min-w-max">
            {brands.map((brand, index) => (
              <button
                key={brand.id}
                onClick={() => setActiveBrandIndex(index)}
                className="group relative py-2"
              >
                <span className={`text-sm md:text-base font-light tracking-[0.2em] transition-colors whitespace-nowrap uppercase ${index === activeBrandIndex
                  ? 'text-deep-charcoal font-medium'
                  : 'text-taupe group-hover:text-deep-charcoal'
                  }`}>
                  {brand.name}
                </span>
                {index === activeBrandIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}
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
 * - Cream background matches page theme
 * - Spinning loader with brand color
 * - Centered for visual balance
 */
function LoadingFallback() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border border-gold-accent border-t-transparent rounded-full"
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
 */
export default function DiscoverPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DiscoverContent />
    </Suspense>
  )
}
