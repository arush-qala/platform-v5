'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DualSelector } from '@/components/home/DualSelector'
import { BrandTimeline } from '@/components/home/BrandTimeline'

interface Brand {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  aesthetic: string
}

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Everything')
  const [selectedSeason, setSelectedSeason] = useState('Everyone')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Initial load
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
      setShowResults(true)
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectionChange = (category: string, season: string) => {
    setSelectedCategory(category)
    setSelectedSeason(season)
    fetchBrands(category, season)
  }

  return (
    <main className="relative min-h-screen bg-cream overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-sand/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-muted-rose/20 to-transparent" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-8 px-6 md:px-12"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-5xl font-cormorant text-deep-charcoal font-light tracking-tight">
            Qala
          </h1>
          <nav className="hidden md:flex items-center gap-8 text-sm text-taupe">
            <a href="#" className="hover:text-gold-accent transition-colors">About</a>
            <a href="#" className="hover:text-gold-accent transition-colors">For Brands</a>
            <a href="#" className="hover:text-gold-accent transition-colors">Contact</a>
          </nav>
        </div>
      </motion.header>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute top-32 left-0 right-0 text-center z-10"
      >
        <p className="text-lg md:text-xl text-taupe font-light tracking-wide">
          Discover exceptional designer fashion for your boutique
        </p>
      </motion.div>

      {/* Dual Selector */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <DualSelector onSelectionChange={handleSelectionChange} />
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-2 border-gold-accent border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Results Count */}
      {showResults && brands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-48 right-8 z-20 text-right"
        >
          <p className="text-sm text-taupe">
            {brands.length} {brands.length === 1 ? 'brand' : 'brands'} found
          </p>
        </motion.div>
      )}

      {/* Brand Timeline */}
      {showResults && brands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <BrandTimeline brands={brands} />
        </motion.div>
      )}

      {/* No Results */}
      {showResults && brands.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-2/3 left-1/2 -translate-x-1/2 text-center z-20"
        >
          <p className="text-xl text-taupe">
            No brands found matching your criteria.
          </p>
          <p className="text-sm text-taupe mt-2">
            Try adjusting your filters
          </p>
        </motion.div>
      )}
    </main>
  )
}
