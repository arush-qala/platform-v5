'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import { brands } from '@/data/brands';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CollectionPage({ 
  params 
}: { 
  params: Promise<{ id: string; collectionId: string }> 
}) {
  const resolvedParams = use(params);
  const brand = brands.find(b => b.id === resolvedParams.id);
  const collection = brand?.collections.find(c => c.id === resolvedParams.collectionId);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [quantities, setQuantities] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!collection) return;
      if (e.key === 'ArrowLeft' && activeProductIndex > 0) {
        setActiveProductIndex(activeProductIndex - 1);
      } else if (e.key === 'ArrowRight' && activeProductIndex < collection.products.length - 1) {
        setActiveProductIndex(activeProductIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeProductIndex, collection]);

  if (!brand || !collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Collection not found</h1>
      </div>
    );
  }

  const activeProduct = collection.products[activeProductIndex];
  const productQuantities = quantities[activeProduct.id] || {};

  const updateQuantity = (size: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [activeProduct.id]: {
        ...prev[activeProduct.id],
        [size]: Math.max(0, (prev[activeProduct.id]?.[size] || 0) + delta),
      },
    }));
  };

  const getTotalQuantity = () => {
    return Object.values(productQuantities).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top 50% - Centered Carousel */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="relative h-full flex items-center">
          {/* Navigation Arrows */}
          {activeProductIndex > 0 && (
            <button
              onClick={() => setActiveProductIndex(activeProductIndex - 1)}
              className="absolute left-8 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {activeProductIndex < collection.products.length - 1 && (
            <button
              onClick={() => setActiveProductIndex(activeProductIndex + 1)}
              className="absolute right-8 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Products Carousel */}
          <div className="flex items-center justify-center w-full h-full">
            {collection.products.map((product, index) => {
              const distance = Math.abs(index - activeProductIndex);
              const isActive = index === activeProductIndex;
              const scale = isActive ? 1 : 0.85;
              const opacity = isActive ? 1 : 0.4;

              return (
                <motion.div
                  key={product.id}
                  onClick={() => setActiveProductIndex(index)}
                  className="absolute cursor-pointer"
                  style={{
                    width: '40%',
                    height: '80%',
                  }}
                  animate={{
                    x: `${(index - activeProductIndex) * 50}%`,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom 50% - Product Details */}
      <div className="h-[50vh] overflow-y-auto bg-white text-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-light mb-4">{activeProduct.name}</h1>
            <p className="text-2xl font-light mb-6 text-gray-600">${activeProduct.price}</p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Size and Quantity Matrix */}
            <div className="mb-8">
              <h2 className="text-xl font-light mb-4">Select Size & Quantity</h2>
              <div className="space-y-3">
                {activeProduct.availableSizes.map((size) => (
                  <div
                    key={size}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <span className="text-lg">{size}</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(size, -1)}
                        disabled={!productQuantities[size]}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-lg">
                        {productQuantities[size] || 0}
                      </span>
                      <button
                        onClick={() => updateQuantity(size, 1)}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customization Request */}
            {activeProduct.customizationOptions && (
              <div className="mb-8">
                <h2 className="text-xl font-light mb-4">Customization Options</h2>
                <div className="space-y-2">
                  {activeProduct.customizationOptions.map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Kit */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-light mb-4">Order Brand Kit (Optional)</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">Keepsakes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">Catalog</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">Hand Block</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">Up to 3 Samples</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Scroll to virtual try-on section
                  document.getElementById('virtual-tryon')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Virtual Try-On
              </button>
              <button
                disabled={getTotalQuantity() === 0}
                onClick={() => {
                  if (getTotalQuantity() > 0) {
                    window.location.href = '/checkout';
                  }
                }}
                className="flex-1 px-8 py-4 bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add to Enquiry ({getTotalQuantity()})
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Virtual Try-On Section */}
      <div id="virtual-tryon" className="min-h-screen bg-white text-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-light mb-12 text-center">Virtual Try-On</h2>
          
          {/* Body Shape Templates */}
          <VirtualTryOn product={activeProduct} />
        </div>
      </div>
    </div>
  );
}

function VirtualTryOn({ product }: { product: typeof brands[0]['collections'][0]['products'][0] }) {
  const [bodyShape, setBodyShape] = useState({
    bust: 36,
    waist: 28,
    hips: 38,
    height: 64,
  });

  return (
    <div className="space-y-12">
      {/* Body Shape Controls */}
      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-light mb-6">Customize Body Measurements</h3>
        <div className="space-y-6">
          {Object.entries(bodyShape).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between mb-2">
                <label className="text-lg capitalize">{key}</label>
                <span className="text-gray-600">{value}"</span>
              </div>
              <input
                type="range"
                min={key === 'height' ? 58 : 30}
                max={key === 'height' ? 72 : 48}
                value={value}
                onChange={(e) =>
                  setBodyShape(prev => ({
                    ...prev,
                    [key]: Number(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Runway */}
      <div className="bg-black rounded-lg overflow-hidden">
        <div className="relative w-full h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-xl mb-4">Virtual Runway</p>
              <p className="text-gray-400">
                {product.name} on your customized model
              </p>
              <div className="mt-8 p-4 bg-white/10 rounded-lg inline-block">
                <p className="text-sm text-gray-300">
                  3D render will display here
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  High definition 3D real-life render coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

