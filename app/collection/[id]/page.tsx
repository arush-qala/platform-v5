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

    return(
        <main className = "bg-white min-h-screen" >
            {/* Back Button */ }
            < div className = "fixed top-6 left-6 z-50 mix-blend-difference text-white" >
                <Link href="/brands/maison-solene" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4">
                    <ArrowLeft size={16} />
                    <span>Back to Brand</span>
                </Link>
            </div >

    {/* Hero Section - First Slide */ }
    < CollectionHero
collectionName = { MOCK_COLLECTION.name }
season = { MOCK_COLLECTION.season }
description = { MOCK_COLLECTION.description }
coverImage = { MOCK_COLLECTION.coverImage }
    />

    {/* Product Rail - Horizontal Scroll */ }
    < ProductCarousel products = { MOCK_COLLECTION.products } />

        </main >
    )
}
