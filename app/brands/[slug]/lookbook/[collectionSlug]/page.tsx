'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface Collection {
  id: string
  name: string
  slug: string
  description: string
  season: string
  lookbookImages: string
  brand: {
    name: string
    slug: string
  }
}

export default function LookbookPage() {
  const params = useParams()
  const slug = params.slug as string
  const collectionSlug = params.collectionSlug as string
  
  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<string[]>([])
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(`/api/brands/${slug}`)
        const brandData = await response.json()
        const coll = brandData.collections.find(
          (c: Collection) => c.slug === collectionSlug
        )
        if (coll) {
          setCollection({
            ...coll,
            brand: { name: brandData.name, slug: brandData.slug },
          })
          const parsedImages = JSON.parse(coll.lookbookImages)
          setImages(parsedImages)
        }
      } catch (error) {
        console.error('Error fetching collection:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollection()
  }, [slug, collectionSlug])

  // Calculate horizontal scroll based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(images.length - 1) * 100}%`])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-2 border-gold-accent border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-2xl text-taupe">Collection not found</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="bg-deep-charcoal">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-deep-charcoal/90 backdrop-blur-md border-b border-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link
            href={`/brands/${collection.brand.slug}`}
            className="text-xl font-cormorant text-ivory hover:text-gold-accent transition-colors"
          >
            ← Back to {collection.brand.name}
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-cormorant text-ivory">{collection.name}</h1>
            <p className="text-sm text-warm-grey">{collection.season}</p>
          </div>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Scroll Indicator - Shows on first section */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollYProgress.get() > 0.1 ? 0 : 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none"
      >
        <p className="text-warm-grey text-sm mb-2 tracking-widest">SCROLL</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-warm-grey mx-auto" />
        </motion.div>
      </motion.div>

      {/* Horizontal Scrolling Container */}
      <div className="h-[500vh] relative"> {/* Height creates vertical scroll space */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="min-w-full h-full relative flex items-center justify-center px-12"
              >
                {/* Parallax Background Layer */}
                <motion.div
                  style={{
                    x: useTransform(
                      scrollYProgress,
                      [index / images.length, (index + 1) / images.length],
                      ['0%', '-20%']
                    ),
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${collection.name} - Look ${index + 1}`}
                      fill
                      className="object-cover opacity-30"
                      sizes="100vw"
                    />
                  </div>
                </motion.div>

                {/* Main Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="relative z-10 w-full max-w-4xl aspect-[3/4]"
                >
                  <Image
                    src={image}
                    alt={`${collection.name} - Look ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority={index === 0}
                  />
                </motion.div>

                {/* Look Number */}
                <div className="absolute bottom-12 right-12 z-20">
                  <p className="text-warm-grey text-sm tracking-widest">
                    LOOK {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Collection Info - Final Section */}
      <div className="min-h-screen flex items-center justify-center bg-deep-charcoal px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-center"
        >
          <h2 className="text-4xl md:text-6xl font-cormorant text-ivory mb-8">
            {collection.name}
          </h2>
          <p className="text-xl text-warm-grey leading-relaxed mb-12">
            {collection.description}
          </p>
          <Link
            href={`/brands/${collection.brand.slug}/collections/${collection.slug}`}
            className="inline-block px-10 py-4 bg-gold-accent text-deep-charcoal hover:bg-warm-grey transition-all duration-300 rounded-sm text-lg font-medium"
          >
            Shop This Collection
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

