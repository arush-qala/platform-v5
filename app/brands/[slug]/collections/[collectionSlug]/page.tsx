'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProductCarousel } from '@/components/products/ProductCarousel'
import { ProductDetails } from '@/components/products/ProductDetails'
import { VirtualTryOn } from '@/components/products/VirtualTryOn'

interface ProductImage {
  id: string
  url: string
  alt: string | null
  order: number
  isPrimary: boolean
}

interface ProductSize {
  id: string
  size: string
  inStock: boolean
  quantity: number
}

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  category: string
  price: number
  fabricDetails: string | null
  careInstructions: string | null
  colors: string
  images: ProductImage[]
  sizes: ProductSize[]
}

interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  season: string
  brand: {
    name: string
    slug: string
  }
  products: Product[]
}

export default function CollectionPage() {
  const params = useParams()
  const brandSlug = params.slug as string
  const collectionSlug = params.collectionSlug as string
  
  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeProductIndex, setActiveProductIndex] = useState(0)

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        // Fetch brand first to get collection ID
        const brandResponse = await fetch(`/api/brands/${brandSlug}`)
        const brandData = await brandResponse.json()
        
        const coll = brandData.collections.find(
          (c: any) => c.slug === collectionSlug
        )
        
        if (coll) {
          // Fetch full collection details
          const collectionResponse = await fetch(`/api/collections/${coll.id}`)
          const collectionData = await collectionResponse.json()
          setCollection(collectionData)
        }
      } catch (error) {
        console.error('Error fetching collection:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollection()
  }, [brandSlug, collectionSlug])

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

  if (!collection || collection.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <p className="text-2xl text-taupe mb-4">Collection not found or has no products</p>
          <Link
            href={`/brands/${brandSlug}`}
            className="text-gold-accent hover:text-charcoal transition-colors"
          >
            ← Back to Brand
          </Link>
        </div>
      </div>
    )
  }

  const activeProduct = collection.products[activeProductIndex]

  return (
    <>
      <main className="h-screen flex flex-col">
        {/* Header */}
        <header className="bg-ivory border-b border-warm-grey px-6 md:px-12 py-6 flex items-center justify-between z-10">
          <Link
            href={`/brands/${collection.brand.slug}`}
            className="text-lg font-cormorant text-deep-charcoal hover:text-gold-accent transition-colors"
          >
            ← {collection.brand.name}
          </Link>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-cormorant text-deep-charcoal">
              {collection.name}
            </h1>
            <p className="text-sm text-taupe">{collection.season} • {collection.products.length} Pieces</p>
          </div>
          <div className="w-32" /> {/* Spacer for centering */}
        </header>

        {/* Split Layout: Carousel (top 50%) and Details (bottom 50%) */}
        <div className="flex-1 grid grid-rows-2">
          {/* Product Carousel - Top Half */}
          <div className="relative overflow-hidden">
            <ProductCarousel
              products={collection.products}
              activeIndex={activeProductIndex}
              onIndexChange={setActiveProductIndex}
            />
          </div>

          {/* Product Details - Bottom Half */}
          <div className="relative overflow-hidden">
            <motion.div
              key={activeProductIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <ProductDetails product={activeProduct} />
            </motion.div>
          </div>
        </div>

        {/* Virtual Try-On Section Indicator */}
        <div className="bg-sand/50 border-t border-warm-grey px-6 py-3 text-center">
          <p className="text-sm text-taupe">
            Scroll down for Virtual Try-On Experience →
          </p>
        </div>
      </main>

      {/* Virtual Try-On Section */}
      <VirtualTryOn
        productName={activeProduct.name}
        productImage={activeProduct.images[0]?.url || ''}
      />
    </>
  )
}

