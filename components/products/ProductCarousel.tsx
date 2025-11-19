'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductImage {
  id: string
  url: string
  alt: string | null
}

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  category: string
  price: number
  images: ProductImage[]
}

interface ProductCarouselProps {
  products: Product[]
  activeIndex: number
  onIndexChange: (index: number) => void
}

export function ProductCarousel({ products, activeIndex, onIndexChange }: ProductCarouselProps) {
  const handlePrevious = () => {
    onIndexChange(activeIndex === 0 ? products.length - 1 : activeIndex - 1)
  }

  const handleNext = () => {
    onIndexChange(activeIndex === products.length - 1 ? 0 : activeIndex + 1)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }

  return (
    <div
      className="relative h-full flex items-center justify-center bg-deep-charcoal"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Previous Items Preview */}
      <div className="absolute left-0 top-0 bottom-0 w-[15%] flex items-center justify-start overflow-hidden pointer-events-none">
        {activeIndex > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative w-full h-[60%] ml-[-20%]"
            style={{ transform: 'scale(0.85)' }}
          >
            <Image
              src={products[activeIndex - 1].images[0]?.url || '/placeholder.jpg'}
              alt={products[activeIndex - 1].name}
              fill
              className="object-cover rounded-sm"
              sizes="15vw"
            />
          </motion.div>
        )}
      </div>

      {/* Next Items Preview */}
      <div className="absolute right-0 top-0 bottom-0 w-[15%] flex items-center justify-end overflow-hidden pointer-events-none">
        {activeIndex < products.length - 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.4, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative w-full h-[60%] mr-[-20%]"
            style={{ transform: 'scale(0.85)' }}
          >
            <Image
              src={products[activeIndex + 1].images[0]?.url || '/placeholder.jpg'}
              alt={products[activeIndex + 1].name}
              fill
              className="object-cover rounded-sm"
              sizes="15vw"
            />
          </motion.div>
        )}
      </div>

      {/* Main Carousel - Center Item */}
      <div className="relative w-[50%] h-[85%] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={products[activeIndex].images[0]?.url || '/placeholder.jpg'}
              alt={products[activeIndex].name}
              fill
              className="object-contain"
              sizes="50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-ivory/10 hover:bg-ivory/20 backdrop-blur-sm rounded-full transition-all"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-6 h-6 text-ivory" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-ivory/10 hover:bg-ivory/20 backdrop-blur-sm rounded-full transition-all"
        aria-label="Next product"
      >
        <ChevronRight className="w-6 h-6 text-ivory" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-gold-accent' : 'w-1 bg-warm-grey'
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>

      {/* Product Number */}
      <div className="absolute bottom-8 right-8 text-warm-grey text-sm">
        {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
      </div>
    </div>
  )
}

