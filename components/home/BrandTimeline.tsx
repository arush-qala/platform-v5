'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Brand {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  aesthetic: string
}

interface BrandTimelineProps {
  brands: Brand[]
}

export function BrandTimeline({ brands }: BrandTimelineProps) {
  const [activeBrand, setActiveBrand] = useState(0)

  useEffect(() => {
    if (brands.length > 0) {
      setActiveBrand(0)
    }
  }, [brands])

  if (brands.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-ivory/95 backdrop-blur-sm border-t border-warm-grey">
      {/* Timeline Navigation */}
      <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center px-12">
          <div className="relative w-full max-w-4xl">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-warm-grey -translate-y-1/2" />
            
            {/* Active Indicator Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gold-accent -translate-y-1/2"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(activeBrand / (brands.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            
            {/* Brand Markers */}
            <div className="relative flex justify-between items-center">
              {brands.map((brand, index) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrand(index)}
                  className="group relative flex flex-col items-center"
                >
                  {/* Dot Marker */}
                  <motion.div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      activeBrand === index
                        ? 'bg-gold-accent border-gold-accent scale-125'
                        : 'bg-ivory border-taupe group-hover:border-gold-accent group-hover:scale-110'
                    }`}
                  />
                  
                  {/* Brand Label */}
                  <span
                    className={`absolute top-8 whitespace-nowrap text-sm font-cormorant transition-all duration-300 ${
                      activeBrand === index
                        ? 'text-gold-accent font-medium'
                        : 'text-taupe group-hover:text-charcoal'
                    }`}
                  >
                    {brand.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Content Display */}
      <div className="relative h-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-6xl w-full px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Brand Image */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative h-80 rounded-sm overflow-hidden"
              >
                <Image
                  src={brands[activeBrand].coverImage}
                  alt={brands[activeBrand].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Brand Info */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-5xl font-cormorant text-deep-charcoal font-light">
                  {brands[activeBrand].name}
                </h2>
                <p className="text-lg text-taupe leading-relaxed">
                  {brands[activeBrand].description}
                </p>
                <Link
                  href={`/brands/${brands[activeBrand].slug}`}
                  className="inline-block px-8 py-3 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all duration-300 rounded-sm"
                >
                  Explore Brand
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

