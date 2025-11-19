'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const categories = ['Everything', 'Dresses', 'Co-ord Sets', 'Evening Wear', 'Tops', 'Shirts', 'Pants']
const seasons = ['Everyone', 'Summer/Spring', 'Fall/Winter', 'Resortwear']

export default function Home() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('Everything')
  const [selectedSeason, setSelectedSeason] = useState('Everyone')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false)

  const navigateToDiscover = () => {
    const params = new URLSearchParams()
    if (selectedCategory !== 'Everything') params.append('category', selectedCategory)
    if (selectedSeason !== 'Everyone') params.append('season', selectedSeason)
    
    router.push(`/discover?${params.toString()}`)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setShowCategoryDropdown(false)
    
    // Auto-navigate if both selections are made
    if (selectedSeason !== 'Everyone' || category !== 'Everything') {
      setTimeout(() => {
        navigateToDiscover()
      }, 300)
    }
  }

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season)
    setShowSeasonDropdown(false)
    
    // Auto-navigate if both selections are made
    if (selectedCategory !== 'Everything' || season !== 'Everyone') {
      setTimeout(() => {
        navigateToDiscover()
      }, 300)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      {/* Ultra Minimal Header - Only Logo */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 py-8 px-8"
      >
        <Link href="/" className="text-2xl font-cormorant text-deep-charcoal font-light tracking-tight">
          Qala
        </Link>
      </motion.header>

      {/* Hero Section - Pentagram Style Minimalism */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* The Sentence with Inline Dropdowns */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed">
            <span className="text-deep-charcoal">I want to source for</span>
            
            {/* Category Dropdown - Inline */}
            <div className="relative inline-block">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown)
                  setShowSeasonDropdown(false)
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#e8e8e8] hover:bg-[#d8d8d8] transition-all duration-300 rounded-sm"
              >
                <span className="font-normal text-deep-charcoal">
                  {selectedCategory}
                </span>
                <ChevronDown className={`w-5 h-5 text-charcoal transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Modal Overlay */}
              <AnimatePresence>
                {showCategoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f5]/95"
                    onClick={() => setShowCategoryDropdown(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="relative max-w-4xl w-full px-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className={`px-8 py-4 text-xl font-light transition-all duration-300 rounded-sm ${
                              selectedCategory === cat
                                ? 'bg-deep-charcoal text-ivory'
                                : 'bg-[#e8e8e8] text-deep-charcoal hover:bg-[#d8d8d8]'
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
            
            <span className="text-deep-charcoal">&</span>
            <span className="text-deep-charcoal">my boutique is</span>
            
            {/* Season Dropdown - Inline */}
            <div className="relative inline-block">
              <button
                onClick={() => {
                  setShowSeasonDropdown(!showSeasonDropdown)
                  setShowCategoryDropdown(false)
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#e8e8e8] hover:bg-[#d8d8d8] transition-all duration-300 rounded-sm"
              >
                <span className="font-normal text-deep-charcoal">
                  {selectedSeason}
                </span>
                <ChevronDown className={`w-5 h-5 text-charcoal transition-transform ${showSeasonDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Season Modal Overlay */}
              <AnimatePresence>
                {showSeasonDropdown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f5]/95"
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
                            className={`px-8 py-4 text-xl font-light transition-all duration-300 rounded-sm ${
                              selectedSeason === season
                                ? 'bg-deep-charcoal text-ivory'
                                : 'bg-[#e8e8e8] text-deep-charcoal hover:bg-[#d8d8d8]'
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

        </motion.div>
      </section>
    </main>
  )
}
