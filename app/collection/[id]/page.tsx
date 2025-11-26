// Collection Exploration Page - Luxury B2B Experience
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CollectionHero } from '@/components/collection/CollectionHero'
import { ProductCarousel } from '@/components/collection/ProductCarousel'

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
        price: 'Wholesale: $450'
    }))
}

export default function CollectionPage() {
    const params = useParams()

    return (
        <main className="bg-white min-h-screen">
            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50 mix-blend-difference text-white">
                <Link href="/brands/maison-solene" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4">
                    <ArrowLeft size={16} />
                    <span>Back to Brand</span>
                </Link>
            </div>

            {/* Hero Section - First Slide */}
            <CollectionHero
                collectionName={MOCK_COLLECTION.name}
                season={MOCK_COLLECTION.season}
                description={MOCK_COLLECTION.description}
                coverImage={MOCK_COLLECTION.coverImage}
            />

            {/* Product Rail - Horizontal Scroll */}
            <ProductCarousel products={MOCK_COLLECTION.products} />

        </main>
    )
}
