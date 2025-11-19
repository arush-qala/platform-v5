'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ArrowRight, MapPin, Leaf, Recycle, Users, Award, Play } from 'lucide-react'
import { ChatPanel } from '@/components/chat/ChatPanel'

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
  aesthetic: string
  collections: Collection[]
  features: BrandFeature[]
}

interface Collection {
  id: string
  name: string
  slug: string
  description: string
  season: string
  coverImage: string
  lookbookImages: string
  featured: boolean
  products: Product[]
}

interface Product {
  id: string
  name: string
  category: string
  images: ProductImage[]
}

interface ProductImage {
  url: string
}

interface BrandFeature {
  title: string
  publication: string
  imageUrl: string
  date: string
}

export default function BrandPage() {
  const params = useParams()
  const slug = params.slug as string
  const [brand, setBrand] = useState<BrandData | null>(null)
  const [recommendedBrands, setRecommendedBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch(`/api/brands/${slug}`)
        const data = await response.json()
        setBrand(data)
        
        // Fetch 3 recommended brands based on current brand
        const brandsResponse = await fetch('/api/brands')
        const allBrands = await brandsResponse.json()
        // Filter out current brand and get 3 random recommendations
        const filtered = allBrands.filter((b: any) => b.slug !== slug)
        const recommendations = filtered.sort(() => 0.5 - Math.random()).slice(0, 3)
        setRecommendedBrands(recommendations)
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-2 border-black border-t-transparent rounded-full"
        />
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

  const featuredCollection = brand.collections.find(c => c.featured) || brand.collections[0]
  const lookbookImages = featuredCollection ? JSON.parse(featuredCollection.lookbookImages || '[]') : []

  return (
    <main className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-black hover:text-gray-600 transition-colors tracking-wider">
            ← BACK
          </Link>
          <h1 className="text-lg font-light tracking-[0.3em] text-black">{brand.name.toUpperCase()}</h1>
          <button
            onClick={() => setShowChat(!showChat)}
            className="flex items-center gap-2 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-all text-sm tracking-wider"
          >
            <MessageCircle className="w-4 h-4" />
            <span>CONTACT</span>
          </button>
        </div>
      </header>

      {/* Hero Section - Brand Campaign */}
      <section className="relative w-full h-screen mt-20 bg-black">
        <div className="absolute inset-0">
          <Image
            src={brand.coverImage}
            alt={`${brand.name} campaign`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Video Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
          >
            <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
          </motion.button>
        </div>

        {/* Brand Logo Overlay */}
        {brand.logoUrl && (
          <div className="absolute bottom-12 left-8 md:left-16">
            <div className="relative w-32 h-32 bg-white/10 backdrop-blur-sm p-6">
              <Image
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        )}
      </section>

      {/* Brand Introduction Section */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-12 gap-16"
          >
            {/* Left: Brand Name and Location */}
            <div className="md:col-span-5 space-y-6">
              <h2 className="text-5xl md:text-7xl font-light text-black leading-tight tracking-tight">
                {brand.name}
              </h2>
              
              <div className="flex items-center gap-3 text-gray-600 pt-4">
                <MapPin className="w-5 h-5" />
                <p className="text-base tracking-wider">{brand.location}</p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">ESTABLISHED</p>
                <p className="text-3xl text-black font-light">{brand.founded}</p>
              </div>
            </div>

            {/* Right: Description */}
            <div className="md:col-span-7 space-y-6">
              <div className="bg-gray-50 p-8 md:p-12">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-light">
                  {brand.description}
                </p>
              </div>

              {/* Featured In Tags */}
              <div className="pt-8">
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6">FEATURED IN</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {brand.features.length > 0 ? (
                    brand.features.slice(0, 4).map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center p-6 border border-gray-200 hover:border-black transition-colors"
                      >
                        <Award className="w-8 h-8 text-black mb-2" />
                        <p className="text-xs text-black tracking-wider text-center">{feature.publication}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center p-6 border border-gray-200">
                        <Award className="w-8 h-8 text-black mb-2" />
                        <p className="text-xs text-black tracking-wider">VOGUE</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 border border-gray-200">
                        <Award className="w-8 h-8 text-black mb-2" />
                        <p className="text-xs text-black tracking-wider">ELLE</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 border border-gray-200">
                        <Award className="w-8 h-8 text-black mb-2" />
                        <p className="text-xs text-black tracking-wider">BAZAAR</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 border border-gray-200">
                        <Award className="w-8 h-8 text-black mb-2" />
                        <p className="text-xs text-black tracking-wider">WWD</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lookbook Section - Contained Horizontal Scroll */}
      {lookbookImages.length > 0 && (
        <section className="py-16 px-8 md:px-16 bg-gray-50">
          <div className="max-w-[1920px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light text-black mb-2">{featuredCollection.name}</h2>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">{featuredCollection.season}</p>
                </div>
                <Link
                  href={`/brands/${brand.slug}/collections/${featuredCollection.slug}`}
                  className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all text-sm tracking-wider"
                >
                  VIEW COLLECTION
                </Link>
              </div>

              {/* Contained Lookbook Viewer */}
              <div className="relative bg-white border border-gray-200 p-4">
                <div 
                  className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                  style={{ 
                    height: '75vh',
                    scrollBehavior: 'smooth'
                  }}
                >
                  <div className="flex gap-6" style={{ width: 'max-content' }}>
                    {lookbookImages.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="relative flex-shrink-0 bg-gray-100"
                        style={{ width: '55vw', height: '70vh' }}
                      >
                        <Image
                          src={img}
                          alt={`${featuredCollection.name} look ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="55vw"
                        />
                        
                        {/* Look Number Overlay */}
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2">
                          <span className="text-3xl font-light text-black">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Scroll Hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 uppercase tracking-widest pointer-events-none">
                  Scroll to explore →
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Process Section - Three Columns */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start"
          >
            {/* Left Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={brand.coverImage}
                alt="Atelier process"
                fill
                className="object-cover"
              />
            </div>

            {/* Center: Process Write-up */}
            <div className="space-y-8 md:pt-12">
              <div>
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">OUR PROCESS</h3>
                <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
                  Craftsmanship & Heritage
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base font-light">
                  {brand.story}
                </p>
                <p className="text-sm text-gray-600 font-light">
                  Each piece is crafted with meticulous attention to detail, honoring traditional techniques while embracing contemporary design sensibilities.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={brand.coverImage}
                alt="Studio process"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Content - Behind The Scenes */}
      <section className="py-16 px-8 md:px-16 bg-gray-50">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-12 text-center">
              BEHIND THE SCENES
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large feature image/video */}
              <div className="md:col-span-2 relative aspect-[21/9] overflow-hidden bg-gray-100">
                <Image
                  src={brand.coverImage}
                  alt="Studio atelier"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Smaller images */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={brand.coverImage}
                  alt="Campaign shoot"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={brand.coverImage}
                  alt="Detail work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Socio-Environmental Commitments */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-16 text-center">
              OUR COMMITMENTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border border-gray-300 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-lg font-light text-black tracking-wide">Organic Materials</h4>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  100% organic and sustainably sourced fabrics
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border border-gray-300 flex items-center justify-center">
                  <Recycle className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-lg font-light text-black tracking-wide">Zero Waste</h4>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  Circular production with minimal environmental impact
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border border-gray-300 flex items-center justify-center">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-lg font-light text-black tracking-wide">Fair Trade</h4>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  Ethical production supporting artisan communities
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Collections */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-3 text-center">
              EXPLORE MORE
            </h2>
            <p className="text-3xl md:text-4xl font-light text-black text-center mb-16">Other Collections</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brand.collections.slice(0, 3).map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/brands/${brand.slug}/collections/${collection.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100">
                      <Image
                        src={collection.coverImage}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{collection.season}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discover Similar Brands */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-3 text-center">
              YOU MAY ALSO LIKE
            </h2>
            <p className="text-3xl md:text-4xl font-light text-black text-center mb-16">
              Discover Similar Brands
            </p>
            
            {/* 3 Brand Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {recommendedBrands.map((recBrand, index) => (
                <motion.div
                  key={recBrand.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/brands/${recBrand.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-100">
                      <Image
                        src={recBrand.coverImage}
                        alt={recBrand.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors mb-2">
                      {recBrand.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{recBrand.location}</p>
                    <p className="text-sm text-gray-700 line-clamp-2 font-light">{recBrand.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-12 py-4 bg-black text-white hover:bg-gray-800 transition-all text-sm tracking-wider"
              >
                <span>BACK TO DISCOVERY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-12 py-4 border border-gray-300 text-black hover:border-black transition-all text-sm tracking-wider"
              >
                BACK TO TOP
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Panel */}
      <ChatPanel
        brandName={brand.name}
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </main>
  )
}
