'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { brands } from '@/data/brands';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function BrandPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const brand = brands.find(b => b.id === resolvedParams.id);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Brand not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video/Image */}
      <div className="relative w-full h-screen">
        {brand.video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={brand.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-20 left-20 right-20">
          <h1 className="text-6xl md:text-8xl font-light text-white mb-4">
            {brand.name}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {brand.description}
          </p>
        </div>
      </div>

      {/* Features/Publications */}
      {brand.publications && brand.publications.length > 0 && (
        <section className="py-20 px-8 bg-[#faf8f3]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-gray-800">Featured In</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brand.publications.map((pub, index) => (
                <div key={index} className="text-center">
                  <p className="text-lg text-gray-600">{pub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Lookbook Banner */}
      {brand.featuredLookbook && brand.featuredLookbook.length > 0 && (
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <Link href={`/brand/${brand.id}/lookbook`}>
              <div className="relative w-full h-[600px] rounded-lg overflow-hidden cursor-pointer group">
                <Image
                  src={brand.featuredLookbook[0].image}
                  alt="Featured Lookbook"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-4xl font-light mb-4">Featured Lookbook</h2>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">Explore Collection</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Collections Grid */}
      <section className="py-20 px-8 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light mb-12 text-gray-800">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brand.collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/brand/${brand.id}/collection/${collection.id}`}
                className="group"
              >
                <div className="relative w-full h-96 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={collection.thumbnail}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-light text-gray-800 mb-2">{collection.name}</h3>
                <p className="text-gray-600">{collection.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gray-900 text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="hidden md:inline">Message Designer</span>
        </button>
      </div>
    </div>
  );
}

