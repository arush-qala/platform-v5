'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { BrandTimeline } from '@/components/home/BrandTimeline'

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

interface Collection {
  id: string
  name: string
  season: string
  coverImage: string
}

const categories = ['Everything', 'Dresses', 'Co-ord Sets', 'Evening Wear', 'Tops', 'Shirts', 'Pants']
const seasons = ['Everyone', 'Summer/Spring', 'Fall/Winter', 'Resortwear']

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Everything')
  const [selectedSeason, setSelectedSeason] = useState('Everyone')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    fetchBrands('Everything', 'Everyone')
  }, [])

  const fetchBrands = async (category: string, season: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category !== 'Everything') params.append('category', category)
      if (season !== 'Everyone') params.append('season', season)
      
      const response = await fetch(`/api/brands?${params.toString()}`)
      const data = await response.json()
      setBrands(data)
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    fetchBrands(category, selectedSeason)
    setShowCategoryDropdown(false)
    setShowResults(true)
  }

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season)
    fetchBrands(selectedCategory, season)
    setShowSeasonDropdown(false)
    setShowResults(true)
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

          {/* Subtle Results Counter - Only shows after selection */}
          {showResults && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <p className="text-sm text-taupe font-light">
                {brands.length} {brands.length === 1 ? 'brand' : 'brands'} found
              </p>
              <button
                onClick={() => {
                  const resultsSection = document.getElementById('results')
                  resultsSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-4 text-sm text-charcoal hover:text-deep-charcoal transition-colors underline underline-offset-4"
              >
                View results
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Loading State */}
      {loading && showResults && (
        <div className="flex items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border border-charcoal border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Results Section - Only shows after selection */}
      {showResults && !loading && brands.length > 0 && (
        <section id="results" className="min-h-screen bg-[#fafafa] py-20">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-deep-charcoal mb-4 font-light">
                Curated For You
              </h2>
              <p className="text-taupe text-lg font-light">Discover {brands.length} brands that match your boutique</p>
            </motion.div>
          </div>
          <BrandTimeline brands={brands} />
        </section>
      )}

      {/* No Results */}
      {showResults && !loading && brands.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 bg-[#fafafa]">
          <p className="text-2xl text-taupe mb-4 font-light">No brands found</p>
          <p className="text-sm text-taupe mb-8 font-light">Try adjusting your selections</p>
          <button
            onClick={() => {
              setSelectedCategory('Everything')
              setSelectedSeason('Everyone')
              setShowResults(false)
              fetchBrands('Everything', 'Everyone')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="px-8 py-3 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all rounded-sm font-light"
          >
            Start Over
          </button>
        </div>
      )}

      {/* Minimal Footer - Only shows on results page */}
      {showResults && (
        <footer className="bg-[#f5f5f5] border-t border-[#e0e0e0]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-taupe font-light">© 2024 Qala. All rights reserved.</p>
              <div className="flex gap-8 text-sm text-taupe font-light">
                <a href="#" className="hover:text-deep-charcoal transition-colors">About</a>
                <a href="#" className="hover:text-deep-charcoal transition-colors">For Brands</a>
                <a href="#" className="hover:text-deep-charcoal transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </main>
  )
}
