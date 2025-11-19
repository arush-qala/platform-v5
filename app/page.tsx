'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

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


      {/* Hero Section with Dual Selector */}
      <section className="max-w-[1920px] mx-auto px-6 md:px-12 py-20 min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center w-full"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant text-deep-charcoal mb-12 font-light">
            I want to find
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-xl md:text-2xl lg:text-3xl mb-8">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown)
                  setShowSeasonDropdown(false)
                }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-ivory border-2 border-warm-grey hover:border-gold-accent transition-all duration-300 rounded-sm min-w-[200px]"
              >
                <span className="font-cormorant text-charcoal group-hover:text-gold-accent transition-colors">
                  {selectedCategory}
                </span>
                <ChevronDown className={`w-6 h-6 text-taupe group-hover:text-gold-accent transition-all ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Dropdown Menu */}
              <AnimatePresence>
                {showCategoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-ivory border-2 border-warm-grey rounded-sm shadow-lg z-50 max-h-80 overflow-y-auto"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full px-6 py-3 text-left text-base font-cormorant hover:bg-sand transition-colors ${
                          selectedCategory === cat ? 'bg-sand text-gold-accent' : 'text-charcoal'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <span className="text-taupe font-light">for</span>
            
            {/* Season Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSeasonDropdown(!showSeasonDropdown)
                  setShowCategoryDropdown(false)
                }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-ivory border-2 border-warm-grey hover:border-gold-accent transition-all duration-300 rounded-sm min-w-[200px]"
              >
                <span className="font-cormorant text-charcoal group-hover:text-gold-accent transition-colors">
                  {selectedSeason}
                </span>
                <ChevronDown className={`w-6 h-6 text-taupe group-hover:text-gold-accent transition-all ${showSeasonDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Season Dropdown Menu */}
              <AnimatePresence>
                {showSeasonDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-ivory border-2 border-warm-grey rounded-sm shadow-lg z-50"
                  >
                    {seasons.map((season) => (
                      <button
                        key={season}
                        onClick={() => handleSeasonSelect(season)}
                        className={`w-full px-6 py-3 text-left text-base font-cormorant hover:bg-sand transition-colors ${
                          selectedSeason === season ? 'bg-sand text-gold-accent' : 'text-charcoal'
                        }`}
                      >
                        {season}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-sm text-taupe">
            {brands.length} {brands.length === 1 ? 'brand' : 'brands'} discovered
          </p>
        </motion.div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-2 border-gold-accent border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Magazine Grid Layout */}
      {!loading && brands.length > 0 && (
        <section className="max-w-[1920px] mx-auto px-6 md:px-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={`/brands/${brand.slug}`} className="group block">
                  {/* Brand Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-sand">
                    <Image
                      src={brand.coverImage}
                      alt={brand.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-ivory text-sm">Explore Brand →</p>
                    </div>
                  </div>

                  {/* Brand Info */}
                  <h3 className="text-2xl font-cormorant text-deep-charcoal group-hover:text-gold-accent transition-colors mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-taupe mb-2">{brand.location}</p>
                  <p className="text-sm text-charcoal leading-relaxed line-clamp-2">
                    {brand.description}
                  </p>

                  {/* Collection Tags */}
                  {brand.collections.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {brand.collections.slice(0, 2).map((collection) => (
                        <span
                          key={collection.id}
                          className="text-xs px-3 py-1 bg-sand text-taupe rounded-full"
                        >
                          {collection.season}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Load More Indication */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-sm text-taupe mb-4">
              Showing {brands.length} {brands.length === 1 ? 'brand' : 'brands'}
            </p>
            <button
              onClick={() => fetchBrands(selectedCategory, selectedSeason)}
              className="text-sm text-charcoal hover:text-gold-accent transition-colors underline"
            >
              Refresh Results
            </button>
          </motion.div>
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
