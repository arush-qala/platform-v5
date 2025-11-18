'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Brand } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandTimelineProps {
  brands: Brand[];
}

export default function BrandTimeline({ brands }: BrandTimelineProps) {
  const [activeBrand, setActiveBrand] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && activeBrand > 0) {
        setActiveBrand(activeBrand - 1);
      } else if (e.key === 'ArrowRight' && activeBrand < brands.length - 1) {
        setActiveBrand(activeBrand + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeBrand, brands.length]);

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Fixed Timeline Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-white/95 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-gray-200/50">
          <div className="flex items-center gap-4">
            {brands.map((brand, index) => (
              <div key={brand.id} className="flex items-center">
                <button
                  onClick={() => setActiveBrand(index)}
                  className={`relative px-4 py-2 transition-all ${
                    activeBrand === index
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {brand.name}
                  {activeBrand === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                {index < brands.length - 1 && (
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Content Transition */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
          >
            <div className="max-w-4xl w-full text-center">
              <h1 className="text-6xl md:text-8xl font-light mb-8 text-gray-900">
                {brands[activeBrand].name}
              </h1>
              
              <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={brands[activeBrand].image}
                  alt={brands[activeBrand].name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {brands[activeBrand].description}
              </p>

              <Link
                href={`/brand/${brands[activeBrand].id}`}
                className="inline-block px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Explore Brand
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

