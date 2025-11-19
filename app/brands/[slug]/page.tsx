'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ExternalLink } from 'lucide-react'
import { ChatPanel } from '@/components/chat/ChatPanel'

interface BrandData {
  id: string
  name: string
  slug: string
  description: string
  story: string
  videoUrl: string
  coverImage: string
  founded: string
  location: string
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
  const [loading, setLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)

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

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-warm-grey">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-cormorant text-deep-charcoal hover:text-gold-accent transition-colors">
            ← Back to Discovery
          </Link>
          <button
            onClick={() => setShowChat(!showChat)}
            className="flex items-center gap-2 px-6 py-3 bg-deep-charcoal text-ivory hover:bg-charcoal transition-all rounded-sm"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contact Brand</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src={brand.coverImage}
          alt={brand.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-cormorant text-deep-charcoal mb-4">
              {brand.name}
            </h1>
            <p className="text-xl md:text-2xl text-taupe max-w-2xl">
              {brand.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-cormorant text-deep-charcoal mb-8">
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-taupe text-lg leading-relaxed mb-6">
                  {brand.story}
                </p>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-gold-accent pl-6">
                  <p className="text-sm text-taupe mb-1">Founded</p>
                  <p className="text-xl text-deep-charcoal">{brand.founded}</p>
                </div>
                <div className="border-l-2 border-gold-accent pl-6">
                  <p className="text-sm text-taupe mb-1">Location</p>
                  <p className="text-xl text-deep-charcoal">{brand.location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Video */}
      {brand.videoUrl && (
        <section className="py-20 px-6 md:px-12 bg-sand/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-video bg-charcoal rounded-sm overflow-hidden"
            >
              {/* Video placeholder - replace with actual video embed */}
              <div className="w-full h-full flex items-center justify-center text-ivory">
                <p>Brand Video Placeholder</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features & Press */}
      {brand.features.length > 0 && (
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-cormorant text-deep-charcoal mb-12 text-center">
                Featured In
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {brand.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-sm"
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={feature.imageUrl || brand.coverImage}
                        alt={feature.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-gold-accent text-sm mb-2">{feature.publication}</p>
                        <h3 className="text-ivory text-xl font-cormorant">{feature.title}</h3>
                        {feature.date && (
                          <p className="text-warm-grey text-sm mt-1">{feature.date}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Collections Grid */}
      <section className="py-20 px-6 md:px-12 bg-sand/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-cormorant text-deep-charcoal mb-12 text-center">
              Collections
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brand.collections.map((collection, index) => (
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
                    <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-4">
                      <Image
                        src={collection.coverImage}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-2xl font-cormorant text-deep-charcoal group-hover:text-gold-accent transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-taupe text-sm mt-1">{collection.season} • {collection.products.length} pieces</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Lookbook Preview */}
      {featuredCollection && (
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-cormorant text-deep-charcoal mb-4">
                  {featuredCollection.name} Lookbook
                </h2>
                <p className="text-taupe text-lg">{featuredCollection.description}</p>
              </div>
              <Link
                href={`/brands/${brand.slug}/lookbook/${featuredCollection.slug}`}
                className="group relative block aspect-[21/9] overflow-hidden rounded-sm"
              >
                <Image
                  src={featuredCollection.coverImage}
                  alt={featuredCollection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-deep-charcoal/20 group-hover:bg-deep-charcoal/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ExternalLink className="w-12 h-12 text-ivory mb-4 mx-auto group-hover:scale-110 transition-transform" />
                    <p className="text-ivory text-xl font-cormorant">View Full Lookbook</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Chat Panel */}
      <ChatPanel
        brandName={brand.name}
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </main>
  )
}

