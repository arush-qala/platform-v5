'use client'

import { ArrowLeft, Instagram, Facebook, Globe } from 'lucide-react'
import Link from 'next/link'
import { BrandHero } from '@/components/brand/BrandHero'
import { LookbookViewer } from '@/components/brand/LookbookViewer'
import { VisualStory } from '@/components/brand/VisualStory'
import { SustainabilityTags } from '@/components/brand/SustainabilityTags'
import { CollectionGrid } from '@/components/brand/CollectionGrid'

// MOCK DATA
const BRAND_DATA = {
    id: '1',
    name: 'Aritzia',
    location: 'Vancouver, Canada',
    intro: 'Everyday luxury for the modern woman. We believe in high-quality fabrics, meticulous construction, and effortless style that transcends seasons.',
    videoSrc: 'https://videos.pexels.com/video-files/7653336/7653336-hd_1920_1080_25fps.mp4', // Placeholder fashion video
    logoSrc: '/images/brands/aritzia-logo.png',
    featuredIn: ['Vogue', 'Elle', 'Harpers Bazaar', 'BoF'],
    lookbookImages: [
        '/images/hero/slide1.jpg',
        '/images/hero/slide2.jpg',
        '/images/hero/slide3.jpg',
        '/images/hero/slide4.jpg',
        '/images/hero/slide1.jpg', // Repeating for scroll length
        '/images/hero/slide2.jpg',
    ],
    currentCollection: 'Fall/Winter 2025',
    storyMedia: [
        { type: 'image' as const, src: '/images/hero/slide3.jpg', alt: 'Atelier Process' },
        { type: 'video' as const, src: 'https://videos.pexels.com/video-files/3753648/3753648-hd_1920_1080_25fps.mp4', alt: 'Campaign Film' },
        { type: 'image' as const, src: '/images/hero/slide1.jpg', alt: 'Fabric Detail' },
        { type: 'image' as const, src: '/images/hero/slide4.jpg', alt: 'Backstage' },
    ],
    processText: "Our design process begins with a single thread. We source the finest wools from Italy and cottons from Peru, ensuring that every garment not only looks exquisite but feels transformative against the skin.",
    sustainabilityTags: [
        { name: 'Ethical Sourcing', icon: 'heart' as const },
        { name: 'Recycled Materials', icon: 'recycle' as const },
        { name: 'Water Conscious', icon: 'water' as const },
        { name: 'Organic Cotton', icon: 'leaf' as const },
    ],
    otherCollections: [
        { id: 'c1', name: 'Resort 2025', season: 'Resort', thumbnail: '/images/hero/slide2.jpg' },
        { id: 'c2', name: 'Summer Essentials', season: 'Summer/Spring', thumbnail: '/images/hero/slide3.jpg' },
        { id: 'c3', name: 'Evening Edit', season: 'Pre-Fall', thumbnail: '/images/hero/slide1.jpg' },
    ]
}

export default function BrandPage({ params }: { params: { id: string } }) {
    return (
        <main className="bg-white min-h-screen">

            {/* Go Back Button - Sticky/Fixed or Absolute */}
            <div className="fixed top-6 left-6 z-50 mix-blend-difference text-white">
                <Link href="/discover" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </Link>
            </div>

            {/* 1. Brand Hero (Video + Info) */}
            <BrandHero
                brandName={BRAND_DATA.name}
                location={BRAND_DATA.location}
                intro={BRAND_DATA.intro}
                videoSrc={BRAND_DATA.videoSrc}
                logoSrc={BRAND_DATA.logoSrc}
                featuredIn={BRAND_DATA.featuredIn}
            />

            {/* 2. Featured Lookbook (Horizontal Scroll) */}
            <LookbookViewer
                images={BRAND_DATA.lookbookImages}
                collectionName={BRAND_DATA.currentCollection}
            />

            {/* 3. Visual Story (Process + Mixed Media) */}
            <VisualStory
                mediaItems={BRAND_DATA.storyMedia}
                processText={BRAND_DATA.processText}
            />

            {/* 4. Sustainability Tags */}
            <SustainabilityTags tags={BRAND_DATA.sustainabilityTags} />

            {/* 5. More Collections */}
            <CollectionGrid collections={BRAND_DATA.otherCollections} />

            {/* 6. Footer / Social CTA */}
            <section className="py-24 bg-black text-white text-center">
                <h3 className="text-2xl font-serif mb-8">Follow {BRAND_DATA.name}</h3>
                <div className="flex justify-center gap-8 mb-12">
                    <a href="#" className="hover:text-gray-300 transition-colors"><Instagram size={24} /></a>
                    <a href="#" className="hover:text-gray-300 transition-colors"><Facebook size={24} /></a>
                    <a href="#" className="hover:text-gray-300 transition-colors"><Globe size={24} /></a>
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500">
                    © 2025 Qala Platform
                </div>
            </section>

        </main>
    )
}
