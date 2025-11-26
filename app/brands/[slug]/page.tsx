'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Instagram, Facebook, Globe } from 'lucide-react'
import Link from 'next/link'
import { BrandHero } from '@/components/brand/BrandHero'
import { LookbookViewer } from '@/components/brand/LookbookViewer'
import { VisualStory } from '@/components/brand/VisualStory'
import { SustainabilityTags } from '@/components/brand/SustainabilityTags'
import { CollectionGrid } from '@/components/brand/CollectionGrid'

interface BrandData {
  id: string
  name: string
  slug: string
  description: string
  story: string
  videoUrl: string
  coverImage: string
  logoUrl: string
  founded: string
  location: string
  collections: any[]
  features: any[]
}

export default function BrandPage() {
  const params = useParams()
  const slug = params.slug as string
  const [brand, setBrand] = useState<BrandData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch(`/api/brands/${slug}`)
        const data = await response.json()
        setBrand(data)
      } catch (error) {
        console.error('Error fetching brand:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBrand()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-2xl text-gray-600">Brand not found</p>
      </div>
    )
  }

  // Get featured collection for lookbook
  const featuredCollection = brand.collections.find((c: any) => c.featured) || brand.collections[0]
  const lookbookImages = featuredCollection ? JSON.parse(featuredCollection.lookbookImages || '[]') : []

  // Mock data for new components (will be replaced with real data)
  const storyMedia = [
    { type: 'image' as const, src: brand.coverImage, alt: 'Atelier Process' },
    { type: 'image' as const, src: brand.coverImage, alt: 'Campaign Film' },
    { type: 'image' as const, src: brand.coverImage, alt: 'Fabric Detail' },
    { type: 'image' as const, src: brand.coverImage, alt: 'Backstage' },
  ]

  const sustainabilityTags = [
    { name: 'Ethical Sourcing', icon: 'heart' as const },
    { name: 'Recycled Materials', icon: 'recycle' as const },
    { name: 'Water Conscious', icon: 'water' as const },
    { name: 'Organic Cotton', icon: 'leaf' as const },
  ]

  const otherCollections = brand.collections.slice(0, 3).map((c: any) => ({
    id: c.id,
    name: c.name,
    season: c.season,
    thumbnail: c.coverImage
  }))

  return (
    <main className="bg-white min-h-screen">

      {/* Go Back Button - Fixed */}
      <div className="fixed top-6 left-6 z-50 mix-blend-difference text-white">
        <Link href="/discover" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4">
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
      </div>

      {/* 1. Brand Hero (Video + Info) */}
      <BrandHero
        brandName={brand.name}
        location={brand.location}
        intro={brand.description}
        videoSrc={brand.videoUrl || 'https://videos.pexels.com/video-files/7653336/7653336-hd_1920_1080_25fps.mp4'}
        logoSrc={brand.logoUrl}
        featuredIn={brand.features.map((f: any) => f.publication).slice(0, 4)}
      />

      {/* Brand Video Section */}
      <section className="py-32 bg-white flex justify-center" style={{ marginBottom: '120px' }}>
        <div className="w-[90%] max-w-5xl aspect-video relative overflow-hidden bg-gray-100 shadow-sm mx-auto">
          <video
            controls
            className="w-full h-full object-cover"
            poster={brand.coverImage}
          >
            <source src={brand.videoUrl || 'https://videos.pexels.com/video-files/3753648/3753648-hd_1920_1080_25fps.mp4'} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 2. Featured Lookbook (Horizontal Scroll) */}
      {lookbookImages.length > 0 && (
        <LookbookViewer
          images={lookbookImages}
          collectionName={featuredCollection.name + ' - ' + featuredCollection.season}
        />
      )}

      {/* 3. Visual Story (Process + Mixed Media) */}
      <VisualStory
        mediaItems={storyMedia}
        processText={brand.story || "Our design process begins with a single thread. We source the finest materials, ensuring that every garment not only looks exquisite but feels transformative."}
      />

      {/* 4. Sustainability Tags */}
      <SustainabilityTags tags={sustainabilityTags} />

      {/* 5. More Collections */}
      {otherCollections.length > 0 && (
        <CollectionGrid collections={otherCollections} />
      )}

      {/* 6. Footer / Social CTA */}
      <section className="py-24 bg-black text-white text-center">
        <h3 className="text-2xl font-serif mb-8">Follow {brand.name}</h3>
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
