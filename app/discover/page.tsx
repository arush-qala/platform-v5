'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BrandTimeline } from '@/components/home/BrandTimeline'
import { useSearchParams } from 'next/navigation'

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

export default function DiscoverPage() {
  const searchParams = useSearchParams()
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  
  const category = searchParams.get('category') || 'Everything'
  const season = searchParams.get('season') || 'Everyone'

  useEffect(() => {
    fetchBrands()
  }, [category, season])

  const fetchBrands = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category !== 'Everything') params.append('category', category)
      if (season !== 'Everyone') params.append('season', season)
      
      const response = await fetch(`/api/brands?${params.toString()}`)
      const data = await response.json()
      
      // Limit to 5 brands as requested
      setBrands(data.slice(0, 5))
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      {/* Minimal Header with Back Button */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 py-8 px-8 bg-[#f5f5f5]/95 backdrop-blur-sm border-b border-[#e0e0e0]"
      >
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 text-deep-charcoal hover:text-charcoal transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-light">Back to Selection</span>
          </Link>
          
          <Link href="/" className="text-2xl font-cormorant text-deep-charcoal font-light tracking-tight">
            Qala
          </Link>
          
          <div className="w-24" /> {/* Spacer for balance */}
        </div>
      </motion.header>

      {/* Page Title Section */}
      <section className="pt-32 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[1920px] mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-cormorant text-deep-charcoal mb-6 font-light">
            Your Curation
          </h1>
          <div className="flex items-center justify-center gap-6 text-lg text-taupe font-light">
            <span className="px-4 py-2 bg-[#e8e8e8] rounded-sm">
              {category}
            </span>
            <span className="text-charcoal">×</span>
            <span className="px-4 py-2 bg-[#e8e8e8] rounded-sm">
              {season}
            </span>
          </div>
          {!loading && (
            <p className="mt-8 text-sm text-taupe font-light">
              {brands.length} {brands.length === 1 ? 'brand' : 'brands'} discovered
            </p>
          )}
        </motion.div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border border-charcoal border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Brand Timeline - Bulgari Inspired */}
      {!loading && brands.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="pb-20"
        >
          <BrandTimeline brands={brands} />
        </motion.section>
      )}

      {/* No Results */}
      {!loading && brands.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-2xl text-taupe mb-4 font-light">No brands found</p>
          <p className="text-sm text-taupe mb-8 font-light">Try different selections to discover more brands</p>
          <Link
            href="/"
            className="px-8 py-3 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all rounded-sm font-light"
          >
            Start Over
          </Link>
        </div>
      )}

      {/* Minimal Footer */}
      {!loading && brands.length > 0 && (
        <footer className="bg-[#f5f5f5] border-t border-[#e0e0e0] mt-20">
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

