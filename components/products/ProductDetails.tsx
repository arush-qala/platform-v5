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
    <div className="bg-white px-8 pt-16 pb-10 md:px-12 md:pt-20 md:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1300px] mx-auto"
      >
        {/* SECTION 1: PRODUCT HEADER */}
        <div className="mb-8 pb-8 border-b border-gray-100">
          {/* Brand Name (Clickable) */}
          {brandName && brandSlug && (
            <Link 
              href={`/brands/${brandSlug}`}
              className="block text-[10px] text-gray-600 hover:text-black uppercase tracking-[0.25em] mb-4 transition-colors"
            >
              {brandName}
            </Link>
          )}

          {/* Product Name */}
          <h1 className="text-2xl font-light text-[#1a1a1a] mb-3 leading-[1.35]">
            {product.name}
          </h1>

          {/* Product Category */}
          <p className="text-[11px] text-gray-500 opacity-60 font-light mb-4 lowercase">{product.category}</p>

          {/* Price */}
          <p className="text-[26px] text-[#1a1a1a] font-light tracking-[0.5px] mt-4 mb-5">
            ${product.price.toFixed(2)}
          </p>

        {/* Description */}
        {product.description && (
            <p className="text-[15px] text-[#666] leading-[1.6] mb-4">
              {product.description}
            </p>
        )}

        {/* Available Colors */}
          <div className="mb-4">
            <p className="text-xs text-[#666] mb-2 uppercase tracking-wide font-light">Available Colors</p>
            <div className="flex gap-3">
            {colors.map((color: string, index: number) => (
                <span key={index} className="text-xs text-[#666]">
                {color}
              </span>
            ))}
          </div>
        </div>

          {/* Size Guide Link */}
          <a href="#" className="inline-block text-[10px] text-black underline hover:text-gray-600 transition-colors uppercase tracking-[0.2em] mt-2">
            Size Guide
          </a>
        </div>

        {/* SECTION 2: SIZE & QUANTITY SELECTION */}
        <div className="mb-8 pb-8 border-b border-gray-100 mt-12">
          <h2 className="text-[17px] font-medium text-[#1a1a1a] mb-6 tracking-[0.08em]">
            Select Sizes & Quantities
          </h2>
          <div className="space-y-0">
            {product.sizes.map((size, index) => (
              <div
                key={size.id}
                className={`flex items-center justify-between px-0 py-4 transition-all ${
                  index !== product.sizes.length - 1 ? 'border-b border-[#f0f0f0]' : ''
                } ${
                  size.inStock
                    ? 'hover:bg-gray-50'
                    : 'opacity-50'
                }`}
              >
                <div className="flex items-center gap-8 flex-1">
                  <span className="text-[14px] font-normal text-[#1a1a1a] w-12 uppercase tracking-wide">
                    {size.size}
                  </span>
                  <span className="text-[13px] text-[#999]">
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
                    <span className="w-10 text-center text-sm font-normal text-[#1a1a1a]">
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
            className="bg-[#f8f7f5] border border-[#e5e5e5] p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] text-[#999] mb-1 uppercase tracking-[0.15em]">Total Quantity</p>
                <p className="text-base font-light text-[#1a1a1a]">{totalQuantity} pieces</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#999] mb-1 uppercase tracking-[0.15em]">Estimated Total</p>
                <p className="text-xl font-light text-[#1a1a1a] tracking-[0.5px]">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button className="w-full py-4 bg-black hover:bg-gray-800 text-white font-light transition-all tracking-[0.15em] text-[12px]">
              Send Enquiry
            </button>
          </motion.div>
        )}

        {/* SECTION 4: DETAILED INFORMATION TABS */}
        <div className="mb-8 pt-16">
          {/* Tab Headers */}
          <div className="flex gap-2 border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-[11px] transition-all tracking-[0.08em] relative ${
                  activeTab === tab.id
                    ? 'text-[#1a1a1a] font-medium'
                    : 'text-[#888] font-normal hover:text-[#1a1a1a]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-6 text-gray-700 leading-relaxed min-h-[180px]">
            {activeTab === 'details' && (
              <div>
                {product.description ? (
                  <p className="mb-5 text-[14px] text-[#666] leading-[1.7]">{product.description}</p>
                ) : (
                  <p className="mb-5 text-[14px] text-[#666] leading-[1.7]">
                    Sculptural dress with asymmetric draping and architectural details
                  </p>
                )}
                <ul className="space-y-[10px] text-[14px] text-[#666]">
                  <li className="flex items-start leading-[1.7]">
                    <span className="mr-3 text-[#999]">•</span>
                    <span>Relaxed fit, full length sleeves</span>
                  </li>
                  <li className="flex items-start leading-[1.7]">
                    <span className="mr-3 text-[#999]">•</span>
                    <span>The model is wearing size M</span>
                  </li>
                  <li className="flex items-start leading-[1.7]">
                    <span className="mr-3 text-[#999]">•</span>
                    <span>No. of components - 1</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'material' && (
              <div>
                {product.fabricDetails ? (
                  <p className="text-[14px] text-[#666] leading-[1.7]">{product.fabricDetails}</p>
                ) : (
                  <p className="text-[14px] text-[#666] leading-[1.7]">
                    100% premium quality fabric with sustainable production methods.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                {product.careInstructions ? (
                  <p className="text-[14px] text-[#666] leading-[1.7]">{product.careInstructions}</p>
                ) : (
                  <>
                    <p className="mb-5 text-[14px] text-[#666] leading-[1.7]">
                      Wash care - Dry clean only
                    </p>
                    <p className="text-[13px] text-[#999] leading-[1.6]">
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
                <p className="mb-5 text-[14px] text-[#666] leading-[1.7]">
                  Special pricing available for bulk orders:
                </p>
                <ul className="space-y-[10px] text-[14px] text-[#666]">
                  <li className="flex items-start leading-[1.7]">
                    <span className="mr-3 text-[#999]">•</span>
                    <span>10-50 pieces: 10% discount</span>
                  </li>
                  <li className="flex items-start leading-[1.7]">
                    <span className="mr-3 text-[#999]">•</span>
                    <span>51-100 pieces: 15% discount</span>
                  </li>
                  <li className="flex items-start leading-[1.7]">
                    <span className="mr-3 text-[#999]">•</span>
                    <span>100+ pieces: Custom pricing - contact us</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <p className="mb-5 text-[15px] text-[#666] leading-[1.6]">
                  We ship worldwide with the following options:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start leading-[1.7] mb-2">
                    <span className="mr-3 text-[#999]">•</span>
                    <span className="text-[14px] text-[#666]">Standard Shipping: 7-14 business days</span>
                  </li>
                  <li className="flex items-start leading-[1.7] mb-2">
                    <span className="mr-3 text-[#999]">•</span>
                    <span className="text-[14px] text-[#666]">Express Shipping: 3-5 business days</span>
                  </li>
                  <li className="flex items-start leading-[1.7] mb-2">
                    <span className="mr-3 text-[#999]">•</span>
                    <span className="text-[14px] text-[#666]">Free shipping on orders over $500</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* EMPTY STATE */}
        {totalQuantity === 0 && (
          <div className="text-center py-10 border-t border-gray-100 mt-8">
            <p className="text-[#999] text-[13px] tracking-[0.08em]">
              Select sizes and quantities to send an enquiry
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

