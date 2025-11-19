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
    <div className="bg-white px-6 py-8 md:px-10 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* SECTION 1: PRODUCT HEADER */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          {/* Brand Name (Clickable) */}
          {brandName && brandSlug && (
            <Link 
              href={`/brands/${brandSlug}`}
              className="block text-[10px] text-gray-600 hover:text-black uppercase tracking-[0.25em] mb-3 transition-colors"
            >
              {brandName}
            </Link>
          )}

          {/* Product Name */}
          <h1 className="text-2xl font-light text-black mb-2 leading-snug">
            {product.name}
          </h1>

          {/* Product Category */}
          <p className="text-xs text-gray-500 mb-4">{product.category}</p>

          {/* Price */}
          <p className="text-xl text-gray-700 font-light mb-4">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>
          )}

          {/* Available Colors */}
          <div className="mb-3">
            <p className="text-xs text-gray-600">
              {colors.map((color: string, index: number) => (
                <span key={index}>
                  {color}
                  {index < colors.length - 1 && '  '}
                </span>
              ))}
            </p>
          </div>

          {/* Size Guide Link */}
          <a href="#" className="inline-block text-[10px] text-black underline hover:text-gray-600 transition-colors uppercase tracking-[0.2em]">
            SIZE GUIDE
          </a>
        </div>

        {/* SECTION 2: SIZE & QUANTITY SELECTION */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-sm font-normal text-black mb-4 uppercase tracking-[0.15em]">
            Select Sizes & Quantities
          </h2>
          <div className="space-y-1">
            {product.sizes.map((size) => (
              <div
                key={size.id}
                className={`flex items-center justify-between px-4 py-3 border transition-all ${
                  size.inStock
                    ? 'border-gray-200 hover:border-gray-400 bg-white'
                    : 'border-gray-100 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-center gap-6 flex-1">
                  <span className="text-sm font-normal text-black w-12 uppercase">
                    {size.size}
                  </span>
                  <span className="text-xs text-gray-500">
                    {size.inStock ? `${size.quantity} available` : 'Out of Stock'}
                  </span>
                </div>
                {size.inStock && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(size.size, -1)}
                      disabled={quantities[size.size] === 0}
                      className="w-9 h-9 flex items-center justify-center border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="w-3 h-3 text-black" />
                    </button>
                    <span className="w-10 text-center text-sm font-normal text-black">
                      {quantities[size.size]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(size.size, 1)}
                      disabled={quantities[size.size] >= size.quantity}
                      className="w-9 h-9 flex items-center justify-center border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Plus className="w-3 h-3 text-black" />
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
            className="bg-gray-50 border border-gray-200 p-5 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-[0.15em]">Total Quantity</p>
                <p className="text-base font-light text-black">{totalQuantity} pieces</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-[0.15em]">Estimated Total</p>
                <p className="text-xl font-light text-black">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button className="w-full py-3 bg-black hover:bg-gray-800 text-white font-light transition-all uppercase tracking-[0.15em] text-[11px]">
              Send Enquiry
            </button>
          </motion.div>
        )}

        {/* SECTION 4: DETAILED INFORMATION TABS */}
        <div className="mb-6 pt-2">
          {/* Tab Headers */}
          <div className="flex gap-6 border-b border-gray-200 mb-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-[11px] transition-colors uppercase tracking-[0.12em] font-normal ${
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
          <div className="text-gray-700 leading-relaxed min-h-[160px]">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-xs font-normal text-black mb-3 uppercase tracking-[0.12em]">
                  Product details
                </h3>
                {product.description ? (
                  <p className="mb-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
                ) : (
                  <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                    Sculptural dress with asymmetric draping and architectural details
                  </p>
                )}
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Relaxed fit, full length sleeves</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>The model is wearing size M</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>No. of components - 1</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'material' && (
              <div>
                <h3 className="text-xs font-normal text-black mb-3 uppercase tracking-[0.12em]">
                  Material
                </h3>
                {product.fabricDetails ? (
                  <p className="text-sm text-gray-600 leading-relaxed">{product.fabricDetails}</p>
                ) : (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    100% premium quality fabric with sustainable production methods.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <h3 className="text-xs font-normal text-black mb-3 uppercase tracking-[0.12em]">
                  Wash & Care
                </h3>
                {product.careInstructions ? (
                  <p className="text-sm text-gray-600 leading-relaxed">{product.careInstructions}</p>
                ) : (
                  <>
                    <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                      Wash care - Dry clean only
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
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
                <h3 className="text-xs font-normal text-black mb-3 uppercase tracking-[0.12em]">
                  Bulk Price
                </h3>
                <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                  Special pricing available for bulk orders:
                </p>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>10-50 pieces: 10% discount</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>51-100 pieces: 15% discount</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>100+ pieces: Custom pricing - contact us</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-xs font-normal text-black mb-3 uppercase tracking-[0.12em]">
                  Shipping
                </h3>
                <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                  We ship worldwide with the following options:
                </p>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Standard Shipping: 7-14 business days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Express Shipping: 3-5 business days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Free shipping on orders over $500</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* EMPTY STATE */}
        {totalQuantity === 0 && (
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.15em]">
              Select sizes and quantities to send an enquiry
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

