'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Filter } from 'lucide-react'

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
  const [showFilterPanel, setShowFilterPanel] = useState(false)

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

  const handleFilterChange = (category: string, season: string) => {
    setSelectedCategory(category)
    setSelectedSeason(season)
    fetchBrands(category, season)
    setShowFilterPanel(false)
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
              <button 
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="flex items-center gap-2 hover:text-gold-accent transition-colors"
              >
                <Filter className="w-4 h-4" />
                Discover
              </button>
              <a href="#" className="hover:text-gold-accent transition-colors">About</a>
              <a href="#" className="hover:text-gold-accent transition-colors">For Brands</a>
              <a href="#" className="hover:text-gold-accent transition-colors">Contact</a>
            </nav>

            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="lg:hidden p-2 hover:bg-sand rounded-full transition-colors"
            >
              <Filter className="w-5 h-5 text-charcoal" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilterPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sticky top-[88px] z-30 bg-sand/95 backdrop-blur-md border-b border-warm-grey overflow-hidden"
          >
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-charcoal mb-4 uppercase tracking-wider">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleFilterChange(cat, selectedSeason)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedCategory === cat
                            ? 'bg-deep-charcoal text-ivory'
                            : 'bg-ivory text-charcoal hover:bg-warm-grey'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-charcoal mb-4 uppercase tracking-wider">Season</h3>
                  <div className="flex flex-wrap gap-2">
                    {seasons.map((season) => (
                      <button
                        key={season}
                        onClick={() => handleFilterChange(selectedCategory, season)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedSeason === season
                            ? 'bg-deep-charcoal text-ivory'
                            : 'bg-ivory text-charcoal hover:bg-warm-grey'
                        }`}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="max-w-[1920px] mx-auto px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-cormorant text-deep-charcoal mb-6 font-light leading-tight">
            We curate Luxury
          </h1>
          <p className="text-xl md:text-2xl text-taupe font-light max-w-3xl mx-auto leading-relaxed">
            for Boutiques
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
            onClick={() => handleFilterChange('Everything', 'Everyone')}
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
