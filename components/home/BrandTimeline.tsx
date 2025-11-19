'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ArrowRight } from 'lucide-react'

interface Brand {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  aesthetic: string
  location: string
  collections: Array<{
    id: string
    name: string
    coverImage: string
  }>
}

interface BrandTimelineProps {
  brands: Brand[]
}

export function BrandTimeline({ brands }: BrandTimelineProps) {
  const [activeBrand, setActiveBrand] = useState(0)
  const [likedBrands, setLikedBrands] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (brands.length > 0) {
      setActiveBrand(0)
    }
  }, [brands])

  if (brands.length === 0) {
    return null
  }

  const currentBrand = brands[activeBrand]
  const displayImages = currentBrand.collections.slice(0, 5).map(c => c.coverImage)
  if (displayImages.length < 5 && currentBrand.coverImage) {
    displayImages.push(currentBrand.coverImage)
  }

  const handleLike = (brandId: string) => {
    setLikedBrands(prev => {
      const newSet = new Set(prev)
      if (newSet.has(brandId)) {
        newSet.delete(brandId)
      } else {
        newSet.add(brandId)
      }
      return newSet
    })
  }

  return (
    <div className="relative bg-ivory">
      {/* Fixed Timeline Navigation */}
      <div className="sticky top-24 z-30 bg-ivory/95 backdrop-blur-sm border-y border-warm-grey py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-warm-grey -translate-y-1/2" />
            
            {/* Active Progress Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gold-accent -translate-y-1/2 z-10"
              initial={{ width: 0 }}
              animate={{ 
                width: brands.length > 1 ? `${(activeBrand / (brands.length - 1)) * 100}%` : '100%',
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            
            {/* Brand Markers */}
            <div className="relative flex justify-between items-center">
              {brands.map((brand, index) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrand(index)}
                  className="group relative flex flex-col items-center z-20"
                >
                  {/* Circular Indicator */}
                  <motion.div
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      activeBrand === index
                        ? 'bg-gold-accent border-gold-accent scale-150 shadow-lg'
                        : 'bg-ivory border-taupe group-hover:border-gold-accent group-hover:scale-125'
                    }`}
                    whileHover={{ scale: activeBrand === index ? 1.5 : 1.3 }}
                  />
                  
                  {/* Label */}
                  <span
                    className={`absolute top-10 whitespace-nowrap text-sm font-cormorant transition-all duration-300 ${
                      activeBrand === index
                        ? 'text-deep-charcoal font-medium'
                        : 'text-taupe group-hover:text-charcoal'
                    }`}
                  >
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Content */}
      <div className="relative min-h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="py-20"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left: Brand Info */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-cormorant text-deep-charcoal font-light mb-4 leading-tight">
                      {currentBrand.name}
                    </h2>
                    <p className="text-gold-accent text-lg mb-6">{currentBrand.location}</p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-xl text-charcoal leading-relaxed">
                      {currentBrand.description}
                    </p>
                    
                    {/* USP Tags */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      {JSON.parse(currentBrand.aesthetic || '[]').slice(0, 3).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-sand text-charcoal text-sm font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTAs */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 pt-6"
                  >
                    <Link
                      href={`/brands/${currentBrand.slug}`}
                      className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all duration-300 rounded-sm"
                    >
                      <span className="text-lg font-cormorant">Visit Brand Store</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <button
                      onClick={() => handleLike(currentBrand.id)}
                      className={`inline-flex items-center justify-center gap-3 px-10 py-4 border-2 transition-all duration-300 rounded-sm ${
                        likedBrands.has(currentBrand.id)
                          ? 'bg-muted-rose border-muted-rose text-ivory'
                          : 'bg-ivory border-warm-grey text-charcoal hover:border-gold-accent hover:bg-sand'
                      }`}
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all ${
                          likedBrands.has(currentBrand.id) ? 'fill-ivory' : ''
                        }`} 
                      />
                      <span className="text-lg font-cormorant">
                        {likedBrands.has(currentBrand.id) ? 'Liked' : 'Like Brand'}
                      </span>
                    </button>
                  </motion.div>
                </div>

                {/* Right: Image Gallery */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {displayImages.slice(0, 5).map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className={`relative overflow-hidden rounded-sm ${
                        idx === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${currentBrand.name} collection ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes={idx === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveBrand(Math.max(0, activeBrand - 1))}
            disabled={activeBrand === 0}
            className="px-6 py-3 border border-warm-grey text-charcoal hover:border-gold-accent hover:text-gold-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
          >
            ← Previous
          </button>
          
          <span className="text-taupe font-cormorant text-lg">
            {activeBrand + 1} of {brands.length}
          </span>
          
          <button
            onClick={() => setActiveBrand(Math.min(brands.length - 1, activeBrand + 1))}
            disabled={activeBrand === brands.length - 1}
            className="px-6 py-3 border border-warm-grey text-charcoal hover:border-gold-accent hover:text-gold-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

