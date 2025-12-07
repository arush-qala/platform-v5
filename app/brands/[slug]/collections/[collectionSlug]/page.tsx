'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProductCarousel } from '@/components/collection/ProductCarousel'
import ProductDetailView from '@/components/collection/ProductDetailView'
import { AssortmentProvider } from '@/components/collection/AssortmentContext'

export default function CollectionPage() {
  const params = useParams()
  const brandSlug = params.slug as string
  const collectionSlug = params.collectionSlug as string

  // State
  const [collection, setCollection] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [direction, setDirection] = useState(0)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  // Fetch Collection & Products
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        // 1. Get Brand Data to find Collection ID
        const brandRes = await fetch(`/api/brands/${brandSlug}`)
        const brandData = await brandRes.json()

        const targetCollection = brandData.collections.find((c: any) => c.slug === collectionSlug)

        if (targetCollection) {
          // 2. Get Full Collection Details (Products)
          const colRes = await fetch(`/api/collections/${targetCollection.id}`)
          const colData = await colRes.json()

          // Transform data to match component expectations
          const transformedProducts = colData.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            image: p.images[0]?.url || '',
            price: p.price ? `Wholesale: $${p.price}` : 'Wholesale: TBD',
            fabric: p.fabricDetails || 'N/A',
            feels_like: p.description?.slice(0, 50) + '...' || 'Luxury finish'
          }))

          setCollection({
            ...colData,
            products: transformedProducts,
            // Ensure defaults for Hero
            season: colData.season || 'Season n/a',
            description: colData.description || 'Collection description pending.',
            coverImage: colData.coverImage || '/images/hero/slide1.jpg'
          })
        }
      } catch (error) {
        console.error("Failed to load collection", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCollection()
  }, [brandSlug, collectionSlug])

  // Derived State
  const products = collection?.products || []
  const selectedProduct = products.find((p: any) => p.id === selectedProductId)
  const selectedIndex = products.findIndex((p: any) => p.id === selectedProductId)
  const prevProduct = selectedIndex > 0 ? products[selectedIndex - 1] : undefined
  const nextProduct = selectedIndex < products.length - 1 ? products[selectedIndex + 1] : undefined

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1
    })
  }

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  if (!collection) return <div className="min-h-screen bg-white flex items-center justify-center">Collection Not Found</div>

  return (
    <AssortmentProvider>
      <main className="bg-white min-h-screen">
        {/* Back Button - Always visible or handled within views */}
        {!selectedProductId && (
          <div className="fixed top-6 left-6 z-50 mix-blend-difference text-white">
            <Link href={`/brands/${brandSlug}`} className="flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4">
              <ArrowLeft size={16} />
              <span>Back to Brand</span>
            </Link>
          </div>
        )}

        <AnimatePresence mode="popLayout" custom={direction}>
          {selectedProductId && selectedProduct ? (
            <motion.div
              key={selectedProductId}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.2 }
              }}
              className="relative z-40 bg-white w-full min-h-screen"
            >
              <ProductDetailView
                product={selectedProduct}
                prevProduct={prevProduct}
                nextProduct={nextProduct}
                onClose={() => setSelectedProductId(null)}
                onNavigate={(p) => {
                  const newIndex = products.findIndex((prod: any) => prod.id === p.id)
                  setDirection(newIndex > selectedIndex ? 1 : -1)
                  setSelectedProductId(p.id)
                  window.scrollTo({ top: 0, behavior: 'instant' })
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {/* Combined Hero & Product Rail */}
              <ProductCarousel
                products={products}
                heroData={{
                  collectionName: collection.name,
                  season: collection.season,
                  description: collection.description,
                  coverImage: collection.coverImage
                }}
                onSelect={(p) => {
                  window.scrollTo({ top: 0, behavior: 'instant' })
                  setDirection(1)
                  setSelectedProductId(p.id)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </AssortmentProvider>
  )
}
