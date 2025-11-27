'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CollectionHero } from '@/components/collection/CollectionHero'
import { ProductCarousel } from '@/components/collection/ProductCarousel'
import ProductDetailView from '@/components/collection/ProductDetailView'

// Mock Data
const MOCK_COLLECTION = {
    id: 'c1',
    name: 'Architecte',
    season: 'Fall/Winter 2024',
    description: "A study in structure and fluidity. The Architecte collection explores the intersection of brutalist forms and organic materials, creating a silhouette that is both commanding and deeply personal.",
    coverImage: '/images/collection/product-3.jpg',
    products: Array.from({ length: 12 }).map((_, i) => ({
        id: `p${i + 1}`,
        name: `Look ${i + 1} - The ${['Structure', 'Fluid', 'Drape', 'Form', 'Line', 'Curve'][i % 6]} ${['Coat', 'Dress', 'Suit', 'Gown', 'Blazer'][i % 5]}`,
        image: `/images/collection/product-${(i % 8) + 1}.jpg`,
        price: 'Wholesale: $450',
        fabric: ['100% Organic Silk', 'Wool Blend', 'Technical Cotton', 'Recycled Polyester'][i % 4],
        feels_like: ['Lightweight, fluid', 'Structured, warm', 'Crisp, cool', 'Soft, draped'][i % 4]
    }))
}

export default function CollectionPage() {
    const params = useParams()
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

    const selectedProduct = MOCK_COLLECTION.products.find(p => p.id === selectedProductId)
    const selectedIndex = MOCK_COLLECTION.products.findIndex(p => p.id === selectedProductId)
    const prevProduct = selectedIndex > 0 ? MOCK_COLLECTION.products[selectedIndex - 1] : undefined
    const nextProduct = selectedIndex < MOCK_COLLECTION.products.length - 1 ? MOCK_COLLECTION.products[selectedIndex + 1] : undefined

    return (
        <main className="bg-white min-h-screen">
            {/* Back Button - Always visible or handled within views */}
            {!selectedProductId && (
                <div className="fixed top-6 left-6 z-50 mix-blend-difference text-white">
                    <Link href="/brands/maison-solene" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4">
                        <ArrowLeft size={16} />
                        <span>Back to Brand</span>
                    </Link>
                </div>
            )}

            <AnimatePresence mode="wait">
                {selectedProductId && selectedProduct ? (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-40"
                    >
                        <ProductDetailView
                            product={selectedProduct}
                            prevProduct={prevProduct}
                            nextProduct={nextProduct}
                            onClose={() => setSelectedProductId(null)}
                            onNavigate={(p) => setSelectedProductId(p.id)}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Hero Section - First Slide */}
                        <CollectionHero
                            collectionName={MOCK_COLLECTION.name}
                            season={MOCK_COLLECTION.season}
                            description={MOCK_COLLECTION.description}
                            coverImage={MOCK_COLLECTION.coverImage}
                        />

                        {/* Product Rail - Horizontal Scroll */}
                        <ProductCarousel
                            products={MOCK_COLLECTION.products}
                            onSelect={(p) => {
                                window.scrollTo({ top: 0, behavior: 'instant' })
                                setSelectedProductId(p.id)
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    )
}
