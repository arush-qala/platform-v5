'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Link from 'next/link'

interface ProductSize {
  id: string
  size: string
  inStock: boolean
  quantity: number
}

interface Product {
  id: string
  name: string
  description: string | null
  category: string
  price: number
  fabricDetails: string | null
  careInstructions: string | null
  colors: string
  sizes: ProductSize[]
}

interface ProductDetailsProps {
  product: Product
  brandName?: string
  brandSlug?: string
}

export function ProductDetails({ product, brandName, brandSlug }: ProductDetailsProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    product.sizes.reduce((acc, size) => ({ ...acc, [size.size]: 0 }), {})
  )
  const [activeTab, setActiveTab] = useState('details')

  const colors = JSON.parse(product.colors)

  const handleQuantityChange = (size: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, Math.min(99, prev[size] + delta)),
    }))
  }

  const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
  const totalPrice = totalQuantity * product.price

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'material', label: 'Material' },
    { id: 'care', label: 'Wash & Care' },
    { id: 'bulk', label: 'Bulk Price' },
    { id: 'shipping', label: 'Shipping' },
  ]

  return (
    <div className="bg-white p-8 md:p-12 overflow-y-auto h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* SECTION 1: PRODUCT HEADER */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          {/* Brand Name (Clickable) */}
          {brandName && brandSlug && (
            <Link 
              href={`/brands/${brandSlug}`}
              className="block text-xs text-black hover:text-gray-600 uppercase tracking-[0.2em] mb-4 transition-colors font-medium"
            >
              {brandName}
            </Link>
          )}

          {/* Product Name */}
          <h1 className="text-5xl font-light text-black mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Product Category */}
          <p className="text-sm text-gray-500 lowercase mb-6 tracking-wide">{product.category}</p>

          {/* Price */}
          <p className="text-3xl text-gray-600 font-light mb-6">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          {product.description && (
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Available Colors */}
          <div className="mb-4">
            <p className="text-sm text-gray-700">
              {colors.map((color: string, index: number) => (
                <span key={index}>
                  {color}
                  {index < colors.length - 1 && '  '}
                </span>
              ))}
            </p>
          </div>

          {/* Size Guide Link */}
          <a href="#" className="inline-block text-xs text-black underline hover:text-gray-600 transition-colors uppercase tracking-[0.2em] font-medium">
            SIZE GUIDE
          </a>
        </div>

        {/* SECTION 2: SIZE & QUANTITY SELECTION */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-black mb-6 uppercase tracking-[0.15em]">
            Select Sizes & Quantities
          </h2>
          <div className="space-y-2">
            {product.sizes.map((size) => (
              <div
                key={size.id}
                className={`flex items-center justify-between px-6 py-5 border transition-all ${
                  size.inStock
                    ? 'border-gray-300 hover:border-black bg-white'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-center gap-8 flex-1">
                  <span className="text-lg font-light text-black w-16 uppercase tracking-wide">
                    {size.size}
                  </span>
                  <span className="text-sm text-gray-500 tracking-wide">
                    {size.inStock ? `${size.quantity} available` : 'Out of Stock'}
                  </span>
                </div>
                {size.inStock && (
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleQuantityChange(size.size, -1)}
                      disabled={quantities[size.size] === 0}
                      className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="w-5 h-5 text-black" />
                    </button>
                    <span className="w-16 text-center text-lg font-light text-black">
                      {quantities[size.size]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(size.size, 1)}
                      disabled={quantities[size.size] >= size.quantity}
                      className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Plus className="w-5 h-5 text-black" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: ORDER SUMMARY */}
        {totalQuantity > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 border border-gray-200 p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-[0.2em]">Total Quantity</p>
                <p className="text-2xl font-light text-black">{totalQuantity} pieces</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-[0.2em]">Estimated Total</p>
                <p className="text-3xl font-light text-black">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button className="w-full py-5 bg-black hover:bg-gray-800 text-white font-light transition-all uppercase tracking-[0.2em] text-sm">
              Send Enquiry
            </button>
          </motion.div>
        )}

        {/* SECTION 4: DETAILED INFORMATION TABS */}
        <div className="mb-8 pt-4">
          {/* Tab Headers */}
          <div className="flex gap-10 border-b border-gray-300 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm transition-colors uppercase tracking-[0.15em] font-light ${
                  activeTab === tab.id
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-gray-700 leading-relaxed min-h-[200px]">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-lg font-light text-black mb-4 uppercase tracking-[0.15em]">
                  Product details
                </h3>
                {product.description ? (
                  <p className="mb-6 text-base text-gray-700 leading-relaxed">{product.description}</p>
                ) : (
                  <p className="mb-6 text-base text-gray-700 leading-relaxed">
                    Sculptural dress with asymmetric draping and architectural details
                  </p>
                )}
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Relaxed fit, full length sleeves</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>The model is wearing size M</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>No. of components - 1</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'material' && (
              <div>
                <h3 className="text-lg font-light text-black mb-4 uppercase tracking-[0.15em]">
                  Material
                </h3>
                {product.fabricDetails ? (
                  <p className="text-base text-gray-700 leading-relaxed">{product.fabricDetails}</p>
                ) : (
                  <p className="text-base text-gray-700 leading-relaxed">
                    100% premium quality fabric with sustainable production methods.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <h3 className="text-lg font-light text-black mb-4 uppercase tracking-[0.15em]">
                  Wash & Care
                </h3>
                {product.careInstructions ? (
                  <p className="text-base text-gray-700 leading-relaxed">{product.careInstructions}</p>
                ) : (
                  <>
                    <p className="mb-6 text-base text-gray-700 leading-relaxed">
                      Wash care - Dry clean only
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Disclaimer: This product will be exclusively handcrafted for you, making the 
                      colour/texture/pattern slightly vary from the image shown, due to multiple 
                      artisan-led techniques and processes involved.
                    </p>
                  </>
                )}
              </div>
            )}

            {activeTab === 'bulk' && (
              <div>
                <h3 className="text-lg font-light text-black mb-4 uppercase tracking-[0.15em]">
                  Bulk Price
                </h3>
                <p className="mb-6 text-base text-gray-700 leading-relaxed">
                  Special pricing available for bulk orders:
                </p>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>10-50 pieces: 10% discount</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>51-100 pieces: 15% discount</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>100+ pieces: Custom pricing - contact us</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-lg font-light text-black mb-4 uppercase tracking-[0.15em]">
                  Shipping
                </h3>
                <p className="mb-6 text-base text-gray-700 leading-relaxed">
                  We ship worldwide with the following options:
                </p>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Standard Shipping: 7-14 business days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Express Shipping: 3-5 business days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Free shipping on orders over $500</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* EMPTY STATE */}
        {totalQuantity === 0 && (
          <div className="text-center py-12 border-t border-gray-200">
            <p className="text-gray-400 text-sm uppercase tracking-[0.15em]">
              Select sizes and quantities to send an enquiry
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

