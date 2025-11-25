/**
 * HOMEPAGE COMPONENT - BRAND DISCOVERY ENTRY POINT
 * 
 * BUSINESS PURPOSE:
 * This is the landing page where B2B buyers begin their sourcing journey.
 * Buyers select product categories and seasons to filter brands that match
 * their boutique's needs. The page uses a minimalist, Pentagram-inspired
 * design with inline dropdowns for an elegant, luxury feel.
 * 
 * USER FLOW:
 * 1. Buyer arrives at homepage
 * 2. Buyer selects product category (e.g., "Dresses", "Co-ord Sets")
 * 3. Buyer selects season/occasion (e.g., "Summer/Spring", "Resortwear")
 * 4. Buyer clicks "Find" button
 * 5. Buyer is redirected to /discover page with filtered brand results
 * 
 * TECHNICAL DETAILS:
 * - Client-side component using React hooks for state management
 * - Framer Motion for smooth animations and transitions
 * - Next.js App Router for navigation
 * - URL parameters passed to discover page for server-side filtering
 * 
 * DESIGN PHILOSOPHY:
 * - Minimalist, luxury aesthetic inspired by Pentagram design agency
 * - Large, readable typography with Cormorant Garamond font
 * - Subtle animations that don't distract from content
 * - Liquid glass effect on buttons for premium feel
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BackgroundMedia, MediaItem } from '@/components/ui/BackgroundMedia'

/**
 * PRODUCT CATEGORIES
 * These categories match the Product.category field in the database.
 * "Everything" is a special value that means "no filter" - show all categories.
 * Used for filtering brands that have products in specific categories.
 */
const categories = ['Everything', 'Dresses', 'Co-ord Sets', 'Evening Wear', 'Tops', 'Shirts', 'Pants']

/**
 * SEASON FILTERS
 * These match the Collection.season field in the database.
 * "Everyone" is a special value that means "no filter" - show all seasons.
 * Used for filtering brands that have collections for specific seasons.
 */
const seasons = ['Everyone', 'Summer/Spring', 'Fall/Winter', 'Resortwear']

/**
 * BACKGROUND MEDIA ITEMS
 * Curated list of high-quality fashion imagery to cycle through.
 * Inspired by Pentagram's homepage slideshow.
 */
const backgroundItems: MediaItem[] = [
  { type: 'image', src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076&auto=format&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop' },
]

/**
 * Home Component - Main Landing Page
 * 
 * STATE MANAGEMENT:
 * - selectedCategory: Currently selected product category filter
 * - selectedSeason: Currently selected season filter
 * - showCategoryDropdown: Controls visibility of category selection modal
 * - showSeasonDropdown: Controls visibility of season selection modal
 * 
 * NAVIGATION:
 * When "Find" is clicked, navigates to /discover with query parameters:
 * - ?category=Dresses&season=Summer/Spring (if filters selected)
 * - ? (empty if "Everything" and "Everyone" selected)
 */
export default function Home() {
  const router = useRouter()

  // State for selected filters - defaults to "no filter" values
  const [selectedCategory, setSelectedCategory] = useState('Everything')
  const [selectedSeason, setSelectedSeason] = useState('Everyone')

  // State for modal visibility - only one modal open at a time
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false)

  /**
   * Navigate to Discover Page with Filters
   * 
   * BUSINESS LOGIC:
   * - Only adds query parameters if user selected specific filters
   * - "Everything" and "Everyone" are treated as "no filter" and omitted
   * - Discover page will fetch all brands if no parameters provided
   * 
   * EXAMPLE URLS:
   * - /discover (no filters)
   * - /discover?category=Dresses
   * - /discover?season=Summer/Spring
   * - /discover?category=Co-ord%20Sets&season=Resortwear
   */
  const navigateToDiscover = () => {
    const params = new URLSearchParams()
    // Only add category param if not "Everything" (which means "all categories")
    if (selectedCategory !== 'Everything') params.append('category', selectedCategory)
    // Only add season param if not "Everyone" (which means "all seasons")
    if (selectedSeason !== 'Everyone') params.append('season', selectedSeason)

    router.push(`/discover?${params.toString()}`)
  }

  /**
   * Handle Category Selection
   * Closes the dropdown modal after selection and updates state
   */
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setShowCategoryDropdown(false)
  }

  /**
   * Handle Season Selection
   * Closes the dropdown modal after selection and updates state
   */
  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season)
    setShowSeasonDropdown(false)
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      {/* 
        BACKGROUND MEDIA
        - Uses a high-quality fashion image/video
        - Adds a cream overlay to maintain readability and "Old Money" aesthetic
      */}
      <BackgroundMedia
        items={backgroundItems}
        overlayOpacity={0.7}
        cycleInterval={5000}
      />

      {/* 
        HERO SECTION
        
        DESIGN APPROACH:
        - Full viewport height for maximum impact
        - Centered content with generous spacing
        - Fade-in animation on page load for smooth entry
        - Responsive typography scaling (3xl → 4xl → 5xl)
        
        UX PATTERN:
        - Natural language sentence: "I want to source for [category] & my boutique is [season]"
        - Inline dropdowns feel integrated, not like separate UI elements
        - Modal overlays for selection provide focus and prevent distraction
      */}
      <section className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* 
            NATURAL LANGUAGE SENTENCE WITH INLINE DROPDOWNS
            The sentence reads naturally: "I want to source for [dropdown] & my boutique is [dropdown]"
            This creates an intuitive, conversational interface rather than traditional form fields
          */}
          <div className="flex flex-col items-center gap-8">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed font-cormorant">
              <span className="text-black">I want to source for</span>

              {/* 
                CATEGORY DROPDOWN BUTTON
                - Inline button that opens full-screen modal
                - Shows currently selected category
                - Chevron icon rotates when dropdown is open
                - Clicking closes other dropdown if open (mutual exclusivity)
              */}
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown)
                    setShowSeasonDropdown(false)
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 rounded-sm border-b border-black/20"
                >
                  <span className="font-normal text-black">
                    {selectedCategory}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-black transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* 
                  CATEGORY SELECTION MODAL
                  
                  UX PATTERN:
                  - Full-screen overlay with backdrop blur for focus
                  - Click outside to close (backdrop click)
                  - Smooth fade-in/fade-out animations
                  - Selected category highlighted with inverted colors
                  - All categories displayed as large, tappable buttons
                  
                  ANIMATION DETAILS:
                  - Overlay fades in/out (opacity transition)
                  - Content slides up slightly on enter (y: 20 → 0)
                  - AnimatePresence handles exit animations smoothly
                */}
                <AnimatePresence>
                  {showCategoryDropdown && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md"
                      onClick={() => setShowCategoryDropdown(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="relative max-w-4xl w-full px-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* 
                          CATEGORY BUTTONS GRID
                          - Responsive flex-wrap layout
                          - Selected category has dark background (bg-deep-charcoal)
                          - Unselected categories have light background with hover effect
                          - Large touch targets (px-8 py-4) for mobile usability
                        */}
                        <div className="flex flex-wrap justify-center gap-3">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => handleCategorySelect(cat)}
                              className={`px-8 py-4 text-xl font-light transition-all duration-300 rounded-sm font-cormorant ${selectedCategory === cat
                                  ? 'bg-black text-white'
                                  : 'bg-white text-black hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <span className="text-black">&</span>
              <span className="text-black">my boutique is</span>

              {/* Season Dropdown - Inline */}
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setShowSeasonDropdown(!showSeasonDropdown)
                    setShowCategoryDropdown(false)
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 rounded-sm border-b border-black/20"
                >
                  <span className="font-normal text-black">
                    {selectedSeason}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-black transition-transform ${showSeasonDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Season Modal Overlay */}
                <AnimatePresence>
                  {showSeasonDropdown && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md"
                      onClick={() => setShowSeasonDropdown(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="relative max-w-4xl w-full px-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-wrap justify-center gap-3">
                          {seasons.map((season) => (
                            <button
                              key={season}
                              onClick={() => handleSeasonSelect(season)}
                              className={`px-8 py-4 text-xl font-light transition-all duration-300 rounded-sm font-cormorant ${selectedSeason === season
                                  ? 'bg-black text-white'
                                  : 'bg-white text-black hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                              {season}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 
            FIND BUTTON - LIQUID GLASS EFFECT
            
            DESIGN INSPIRATION:
            - "Liquid glass" aesthetic with frosted glass effect
            - Backdrop blur creates depth and premium feel
            - Animated silver shimmer gradient for luxury touch
            - Subtle scale-up on hover for interactivity feedback
            
            TECHNICAL IMPLEMENTATION:
            - Multiple layers: blur background, glass container, animated gradient
            - backdrop-blur-md creates the frosted glass effect
            - Radial gradient animation creates moving shimmer
            - hover:scale-105 provides tactile feedback
            
            BUSINESS PURPOSE:
            - Primary CTA that navigates to filtered brand discovery
            - "Find" is concise and action-oriented
            - Luxury aesthetic matches platform positioning
          */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <div className="relative group inline-block">
              {/* Blurred background layer for depth */}
              <div className="absolute inset-0 bg-white/20 rounded-sm blur-xl group-hover:bg-white/30 transition-colors duration-500"></div>

              {/* Main glass button container */}
              <button
                onClick={navigateToDiscover}
                className="relative px-20 py-5 bg-white/40 backdrop-blur-md text-black rounded-sm overflow-hidden hover:scale-105 transition-transform duration-300 shadow-xl border border-white/50"
              >
                {/* 
                  ANIMATED SHIMMER
                  - Radial gradient moves in a cycle
                  - Creates subtle luxury shimmer effect
                */}
                <motion.div
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none"
                />

                {/* Button text with wide letter spacing for luxury typography */}
                <span className="relative text-xl font-light tracking-[0.3em] uppercase font-cormorant text-black">
                  Find Brands
                </span>
              </button>
            </div>
          </motion.div>

        </motion.div>
      </section>



      {/* 
        FLOATING QALA LOGO - BOTTOM RIGHT CORNER
        
        DESIGN PURPOSE:
        - Brand identity always visible
        - Clickable link back to homepage
        - Floating animation creates subtle movement
        - Liquid glass effect matches main button aesthetic
        
        ANIMATION DETAILS:
        - Fades in after page load (delay: 0.8s)
        - Continuous gentle float animation (y: 0 → -8px → 0)
        - Shimmer sweep animation across logo
        - All animations loop infinitely for continuous motion
        
        POSITIONING:
        - Fixed position keeps it visible during scroll
        - Bottom-right corner is standard logo placement
        - z-50 ensures it's above all other content
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0], // Gentle floating animation
        }}
        transition={{
          opacity: { duration: 1, delay: 0.8 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="relative group">
          {/* Blurred background for glass effect */}
          <div className="absolute inset-0 bg-white/40 rounded-2xl blur-xl"></div>

          {/* Glass container with logo */}
          <div className="relative px-6 py-3 bg-white/30 backdrop-blur-md rounded-2xl border border-white/50 shadow-2xl overflow-hidden">
            {/* Animated gradient overlay */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* QALA Logo - clickable link to homepage */}
            <Link href="/" className="relative block">
              <div className="text-2xl font-light tracking-[0.3em] text-black font-cormorant">
                QALA
              </div>
            </Link>

            {/* 
              SHIMMER SWEEP ANIMATION
              - Diagonal gradient sweeps across logo
              - Creates subtle luxury shimmer effect
              - Repeats every 5 seconds (3s animation + 2s delay)
            */}
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          </div>
        </div>
      </motion.div>
    </main>
  )
}
