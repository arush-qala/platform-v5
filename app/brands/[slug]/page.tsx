'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ["start start", "end end"]
  })

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
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-2 border-gold-accent border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-2xl text-taupe">Brand not found</p>
      </div>
    )
  }

  const featuredCollection = brand.collections.find(c => c.featured) || brand.collections[0]
  const lookbookImages = featuredCollection ? JSON.parse(featuredCollection.lookbookImages || '[]') : []

  return (
    <main className="min-h-screen bg-cream">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-warm-grey">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-cormorant text-deep-charcoal hover:text-gold-accent transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl md:text-3xl font-cormorant text-deep-charcoal font-light">{brand.name}</h1>
          <button
            onClick={() => setShowChat(!showChat)}
            className="flex items-center gap-2 px-4 md:px-6 py-3 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all rounded-sm"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden md:inline">Contact</span>
          </button>
        </div>
      </header>

      {/* SECTION 1: Brand Campaign Video */}
      <section className="relative w-full h-screen bg-deep-charcoal">
        <div className="absolute inset-0">
          <Image
            src={brand.coverImage}
            alt={`${brand.name} campaign`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-deep-charcoal/30" />
        </div>
        
        {/* Video Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center group hover:bg-ivory transition-all"
          >
            <Play className="w-10 h-10 text-deep-charcoal ml-1" fill="currentColor" />
          </motion.button>
        </div>

        {/* Brand Logo Overlay */}
        {brand.logoUrl && (
          <div className="absolute top-12 left-6 md:left-12">
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-ivory/10 backdrop-blur-sm rounded-sm p-4">
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

      {/* SECTION 2: Write-up + Featured Tags */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* Left: Brand Info */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-deep-charcoal font-light leading-tight">
                {brand.name}
              </h2>
              
              <div className="flex items-center gap-3 text-gold-accent">
                <MapPin className="w-5 h-5" />
                <p className="text-lg">{brand.location}</p>
              </div>

              <div className="prose prose-lg">
                <p className="text-xl text-charcoal leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>

            {/* Right: Featured In Tags */}
            <div className="space-y-6">
              <h3 className="text-sm text-taupe uppercase tracking-wider mb-6">Featured In</h3>
              <div className="grid grid-cols-2 gap-4">
                {brand.features.length > 0 ? (
                  brand.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-sand/50 rounded-sm border border-warm-grey"
                    >
                      <Award className="w-6 h-6 text-gold-accent flex-shrink-0" />
                      <div>
                        <p className="font-medium text-deep-charcoal text-sm">{feature.publication}</p>
                        {feature.date && (
                          <p className="text-xs text-taupe mt-1">{feature.date}</p>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-4 bg-sand/50 rounded-sm border border-warm-grey">
                      <Award className="w-6 h-6 text-gold-accent" />
                      <p className="font-medium text-deep-charcoal text-sm">Vogue</p>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-sand/50 rounded-sm border border-warm-grey">
                      <Award className="w-6 h-6 text-gold-accent" />
                      <p className="font-medium text-deep-charcoal text-sm">Elle</p>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-sand/50 rounded-sm border border-warm-grey">
                      <Award className="w-6 h-6 text-gold-accent" />
                      <p className="font-medium text-deep-charcoal text-sm">Harper's Bazaar</p>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-sand/50 rounded-sm border border-warm-grey">
                      <Award className="w-6 h-6 text-gold-accent" />
                      <p className="font-medium text-deep-charcoal text-sm">WWD</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Lookbook - Horizontal Scroll (Scroll Hijacking) */}
      {lookbookImages.length > 0 && (
        <section ref={horizontalScrollRef} className="relative h-[300vh] bg-deep-charcoal">
          <div className="sticky top-0 h-screen overflow-hidden">
            <HorizontalScrollGallery 
              images={lookbookImages}
              collectionName={featuredCollection.name}
              collectionSlug={featuredCollection.slug}
              brandSlug={brand.slug}
              scrollProgress={scrollYProgress}
            />
          </div>
        </section>
      )}

      {/* SECTION 4: Three-Column Layout - Image | Process Write-up | Image */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[3/4] rounded-sm overflow-hidden"
            >
              <Image
                src={brand.coverImage}
                alt="Atelier process"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Center: Process Write-up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 py-8"
            >
              <h2 className="text-3xl md:text-4xl font-cormorant text-deep-charcoal font-light">
                Our Process
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-charcoal leading-relaxed">
                  {brand.story}
                </p>
                <p className="text-base text-taupe leading-relaxed">
                  Each piece is crafted with meticulous attention to detail, honoring traditional techniques while embracing contemporary design sensibilities.
                </p>
              </div>

              {/* Founded Info */}
              <div className="pt-6 border-t border-warm-grey">
                <p className="text-sm text-taupe mb-2 uppercase tracking-wider">Established</p>
                <p className="text-2xl text-deep-charcoal font-cormorant">{brand.founded}</p>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative aspect-[3/4] rounded-sm overflow-hidden"
            >
              <Image
                src={brand.coverImage}
                alt="Studio process"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Socio-Environmental Tags (Horizontal Banner) */}
      <section className="py-16 px-6 md:px-12 bg-sage/10 border-y border-sage/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-center text-sm text-taupe uppercase tracking-wider mb-8">
              Our Commitments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-sage" />
                </div>
                <h4 className="text-lg font-medium text-deep-charcoal">Organic Materials</h4>
                <p className="text-sm text-taupe">100% organic and sustainably sourced fabrics</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
                  <Recycle className="w-8 h-8 text-sage" />
                </div>
                <h4 className="text-lg font-medium text-deep-charcoal">Zero Waste</h4>
                <p className="text-sm text-taupe">Circular production with minimal environmental impact</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-sage" />
                </div>
                <h4 className="text-lg font-medium text-deep-charcoal">Fair Trade</h4>
                <p className="text-sm text-taupe">Ethical production supporting artisan communities</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: Image/Video Gallery */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-cormorant text-deep-charcoal text-center mb-12 font-light">
              Behind The Scenes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large feature image/video */}
              <div className="md:col-span-2 relative aspect-[21/9] rounded-sm overflow-hidden">
                <Image
                  src={brand.coverImage}
                  alt="Studio atelier"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Smaller images */}
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image
                  src={brand.coverImage}
                  alt="Campaign shoot"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
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

      {/* SECTION 7: Other Collections */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-cormorant text-deep-charcoal text-center mb-4 font-light">
              Other Collections
            </h2>
            <p className="text-center text-taupe mb-12">Explore more from {brand.name}</p>
            
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
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4 bg-sand">
                      <Image
                        src={collection.coverImage}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-ivory text-sm">View Collection →</p>
                      </div>
                    </div>
                    <h3 className="text-2xl font-cormorant text-deep-charcoal group-hover:text-gold-accent transition-colors mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-taupe text-sm">{collection.season}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Check out more lookbooks CTA */}
            {brand.collections.length > 3 && (
              <div className="text-center mt-12">
                <button className="px-8 py-4 border-2 border-warm-grey text-charcoal hover:border-gold-accent hover:text-gold-accent transition-all rounded-sm">
                  Check Out More Lookbooks
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: See More Brands / Go Back */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-sand/30 border-t border-warm-grey">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-cormorant text-deep-charcoal text-center mb-4 font-light">
              Discover Similar Brands
            </h2>
            <p className="text-center text-taupe mb-12">
              Based on {brand.name}, you might also like these brands
            </p>
            
            {/* 3 Brand Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-sand">
                      <Image
                        src={recBrand.coverImage}
                        alt={recBrand.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-2xl font-cormorant text-deep-charcoal group-hover:text-gold-accent transition-colors mb-1">
                      {recBrand.name}
                    </h3>
                    <p className="text-sm text-taupe mb-2">{recBrand.location}</p>
                    <p className="text-sm text-charcoal line-clamp-2">{recBrand.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Go Back CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-10 py-4 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all duration-300 rounded-sm"
              >
                <span className="text-lg font-cormorant">Back to Discovery</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-10 py-4 border-2 border-warm-grey text-charcoal hover:border-gold-accent hover:text-gold-accent transition-all rounded-sm"
              >
                <span className="text-lg font-cormorant">Back to Top</span>
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

// Horizontal Scroll Gallery Component with Scroll Hijacking
function HorizontalScrollGallery({ 
  images, 
  collectionName, 
  collectionSlug,
  brandSlug,
  scrollProgress 
}: { 
  images: string[]
  collectionName: string
  collectionSlug: string
  brandSlug: string
  scrollProgress: any
}) {
  // Calculate horizontal translation based on scroll
  const x = useTransform(scrollProgress, [0, 1], ['0%', `-${(images.length) * 70}%`])

  return (
    <div className="h-full flex items-center bg-deep-charcoal relative overflow-hidden">
      <motion.div 
        style={{ x }}
        className="flex gap-8 px-12"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0"
            style={{ width: '70vw', height: '80vh' }}
          >
            <Image
              src={img}
              alt={`${collectionName} look ${idx + 1}`}
              fill
              className="object-cover rounded-sm"
              sizes="70vw"
            />
            
            {/* Look Number Overlay */}
            <div className="absolute top-8 left-8 text-ivory">
              <span className="text-6xl font-cormorant font-light">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-sm mt-2 text-warm-grey">
                {collectionName}
              </p>
            </div>
          </div>
        ))}
        
        {/* CTA 1: Start Selecting / Open Collection */}
        <div
          className="flex-shrink-0 flex items-center justify-center bg-ivory rounded-sm"
          style={{ width: '70vw', height: '80vh' }}
        >
          <div className="text-center px-12 max-w-2xl">
            <h3 className="text-5xl md:text-6xl font-cormorant text-deep-charcoal mb-8 font-light">
              Start Selecting
            </h3>
            <p className="text-xl text-taupe mb-12">
              Explore the full {collectionName} collection and place your order
            </p>
            <Link
              href={`/brands/${brandSlug}/collections/${collectionSlug}`}
              className="inline-flex items-center gap-3 px-12 py-5 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all duration-300 rounded-sm text-lg shadow-lg"
            >
              <span className="font-cormorant">Open Collection</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warm-grey text-sm flex items-center gap-2"
      >
        <span>Scroll to explore lookbook</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  )
}
