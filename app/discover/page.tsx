'use client'

import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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

function DiscoverContent() {
  const searchParams = useSearchParams()
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [activeBrandIndex, setActiveBrandIndex] = useState(0)
  
  const category = searchParams.get('category') || 'Everything'
  const season = searchParams.get('season') || 'Everyone'

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

  const activeBrand = brands[activeBrandIndex]
  // Get two images from the brand's collections or use cover image
  const brandImages = activeBrand.collections.slice(0, 2).map(c => c.coverImage)
  if (brandImages.length < 2) {
    brandImages.push(activeBrand.coverImage)
  }
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

      {/* Bottom Timeline Slider */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="border-t border-[#333] py-8 px-6"
      >
        {/* Timeline Bar */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#333] -translate-y-1/2" />
            
            {/* Progress Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-[#8B7355] -translate-y-1/2 z-10"
              initial={{ width: 0 }}
              animate={{ 
                width: brands.length > 1 ? `${(activeBrandIndex / (brands.length - 1)) * 100}%` : '100%',
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            
            {/* Brand Names */}
            <div className="relative flex justify-between items-center">
              {brands.map((brand, index) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrandIndex(index)}
                  className="flex flex-col items-center gap-4 group"
                >
                  {/* Dot */}
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 z-20 ${
                    index === activeBrandIndex
                      ? 'bg-[#8B7355] border-[#8B7355] scale-125'
                      : 'bg-black border-[#333] group-hover:border-[#8B7355]'
                  }`} />
                  
                  {/* Brand Name */}
                  <span className={`text-sm font-light tracking-wider transition-colors whitespace-nowrap ${
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
        </div>
      </motion.div>
    </main>
  )
}

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

export default function DiscoverPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DiscoverContent />
    </Suspense>
  )
}
