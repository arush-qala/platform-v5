'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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

const slideshowImages = [
  '/images/homepage/slide-01.jpg',
  '/images/homepage/slide-02.jpg',
  '/images/homepage/slide-03.jpg',
]

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Everything')
  const [selectedSeason, setSelectedSeason] = useState('Everyone')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    fetchBrands('Everything', 'Everyone')
  }, [])

  // Slideshow auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
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
  }

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season)
    fetchBrands(selectedCategory, season)
    setShowSeasonDropdown(false)
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Fixed Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-warm-grey"
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl md:text-4xl font-cormorant text-deep-charcoal font-light tracking-tight">
              Qala
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8 text-sm text-charcoal font-medium">
              <a href="#" className="hover:text-gold-accent transition-colors">About</a>
              <a href="#" className="hover:text-gold-accent transition-colors">For Brands</a>
              <a href="#" className="hover:text-gold-accent transition-colors">Contact</a>
            </nav>

            <div className="w-8" />
          </div>
        </div>
      </motion.header>


      {/* Hero Section with Full Screen Slideshow and Dual Selector */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <Image
                src={slideshowImages[slideIndex]}
                alt={`Luxury Fashion Background ${slideIndex + 1}`}
                fill
                className="object-cover"
                priority={slideIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-cream/80 backdrop-blur-sm" />
        </div>

        {/* Centered Filter Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center w-full max-w-5xl px-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-deep-charcoal mb-16 font-light leading-tight">
            I want to source for
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-2xl md:text-3xl lg:text-4xl mb-12 flex-wrap">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown)
                  setShowSeasonDropdown(false)
                }}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-ivory/95 backdrop-blur-sm border border-warm-grey hover:border-gold-accent transition-all duration-300 rounded-sm min-w-[240px] shadow-sm"
              >
                <span className="font-cormorant text-charcoal group-hover:text-gold-accent transition-colors font-light">
                  {selectedCategory}
                </span>
                <ChevronDown className={`w-7 h-7 text-taupe group-hover:text-gold-accent transition-all ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Modal Overlay */}
              <AnimatePresence>
                {showCategoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={() => setShowCategoryDropdown(false)}
                  >
                    <div className="absolute inset-0 bg-cream/95 backdrop-blur-md" />
                    
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="relative z-50 max-w-4xl w-full px-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-center mb-12">
                        <h3 className="text-4xl md:text-5xl font-cormorant text-deep-charcoal mb-4 font-light">
                          Select Category
                        </h3>
                        <p className="text-taupe text-lg">What are you looking to source?</p>
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className={`px-10 py-5 text-xl md:text-2xl font-cormorant rounded-full transition-all duration-300 ${
                              selectedCategory === cat
                                ? 'bg-deep-charcoal text-ivory shadow-lg scale-105'
                                : 'bg-ivory text-charcoal hover:bg-sand border border-warm-grey hover:border-gold-accent hover:scale-105'
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
            
            <span className="text-charcoal font-cormorant font-light">&</span>
            <span className="text-charcoal font-cormorant font-light">my boutique is</span>
            
            {/* Season/Boutique Type Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSeasonDropdown(!showSeasonDropdown)
                  setShowCategoryDropdown(false)
                }}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-ivory/95 backdrop-blur-sm border border-warm-grey hover:border-gold-accent transition-all duration-300 rounded-sm min-w-[240px] shadow-sm"
              >
                <span className="font-cormorant text-charcoal group-hover:text-gold-accent transition-colors font-light">
                  {selectedSeason}
                </span>
                <ChevronDown className={`w-7 h-7 text-taupe group-hover:text-gold-accent transition-all ${showSeasonDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Season Modal Overlay */}
              <AnimatePresence>
                {showSeasonDropdown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={() => setShowSeasonDropdown(false)}
                  >
                    <div className="absolute inset-0 bg-cream/95 backdrop-blur-md" />
                    
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="relative z-50 max-w-4xl w-full px-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-center mb-12">
                        <h3 className="text-4xl md:text-5xl font-cormorant text-deep-charcoal mb-4 font-light">
                          Select Season
                        </h3>
                        <p className="text-taupe text-lg">Which season does your boutique cater to?</p>
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-4">
                        {seasons.map((season) => (
                          <button
                            key={season}
                            onClick={() => handleSeasonSelect(season)}
                            className={`px-10 py-5 text-xl md:text-2xl font-cormorant rounded-full transition-all duration-300 ${
                              selectedSeason === season
                                ? 'bg-deep-charcoal text-ivory shadow-lg scale-105'
                                : 'bg-ivory text-charcoal hover:bg-sand border border-warm-grey hover:border-gold-accent hover:scale-105'
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

          <motion.p 
            className="text-base text-taupe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {brands.length} {brands.length === 1 ? 'brand' : 'brands'} discovered
          </motion.p>
        </motion.div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-32 bg-cream">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-2 border-gold-accent border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Brand Timeline Navigation - Bulgari Inspired */}
      {!loading && brands.length > 0 && (
        <section className="min-h-screen bg-cream">
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
              <p className="text-taupe text-lg">Discover {brands.length} brands that match your boutique</p>
            </motion.div>
          </div>
          <BrandTimeline brands={brands} />
        </section>
      )}

      {/* No Results */}
      {!loading && brands.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-2xl text-taupe mb-4">No brands found</p>
          <p className="text-sm text-taupe mb-8">Try adjusting your filters</p>
          <button
            onClick={() => {
              setSelectedCategory('Everything')
              setSelectedSeason('Everyone')
              fetchBrands('Everything', 'Everyone')
            }}
            className="px-8 py-3 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all rounded-sm"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-warm-grey bg-ivory">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-cormorant text-deep-charcoal mb-4">Qala</h4>
              <p className="text-sm text-taupe leading-relaxed">
                The next generation luxury sourcing platform connecting discerning buyers with emerging designers.
              </p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-charcoal mb-4 uppercase tracking-wider">Explore</h5>
              <ul className="space-y-2 text-sm text-taupe">
                <li><a href="#" className="hover:text-gold-accent transition-colors">All Brands</a></li>
                <li><a href="#" className="hover:text-gold-accent transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-gold-accent transition-colors">Featured Collections</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium text-charcoal mb-4 uppercase tracking-wider">Connect</h5>
              <ul className="space-y-2 text-sm text-taupe">
                <li><a href="#" className="hover:text-gold-accent transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold-accent transition-colors">For Brands</a></li>
                <li><a href="#" className="hover:text-gold-accent transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-warm-grey text-center text-sm text-taupe">
            <p>© 2024 Qala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
