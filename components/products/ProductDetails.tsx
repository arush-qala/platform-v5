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
        className="max-w-4xl mx-auto"
      >
        {/* Brand Name (Clickable) */}
        {brandName && brandSlug && (
          <Link 
            href={`/brands/${brandSlug}`}
            className="block text-sm text-gray-500 hover:text-black uppercase tracking-widest mb-2 transition-colors"
          >
            {brandName}
          </Link>
        )}

        {/* Product Name */}
        <h2 className="text-4xl font-light text-black mb-2">
          {product.name}
        </h2>

        {/* Product Category */}
        <p className="text-base text-black mb-3">{product.category}</p>

        {/* Price */}
        <p className="text-2xl text-gray-600 mb-6">
          ${product.price.toFixed(2)}
        </p>

        {/* Description */}
        {product.description && (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Available Colors */}
        <div className="mb-6">
          <p className="text-sm text-black mb-2">
            {colors.map((color: string, index: number) => (
              <span key={index}>
                {color}
                {index < colors.length - 1 && '  '}
              </span>
            ))}
          </p>
        </div>

        {/* Size Guide Link */}
        <div className="mb-6">
          <a href="#" className="text-sm text-black underline hover:text-gray-600 transition-colors uppercase tracking-wider">
            SIZE GUIDE
          </a>
        </div>

        {/* Size & Quantity Selection Matrix */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-wider">
            Select Sizes & Quantities
          </h3>
          <div className="space-y-3">
            {product.sizes.map((size) => (
              <div
                key={size.id}
                className={`flex items-center justify-between p-4 border transition-all ${
                  size.inStock
                    ? 'border-gray-300 hover:border-black bg-white'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-base font-normal text-black w-12">
                    {size.size}
                  </span>
                  <span className="text-sm text-gray-500">
                    {size.inStock ? `${size.quantity} available` : 'Out of Stock'}
                  </span>
                </div>
                {size.inStock && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(size.size, -1)}
                      disabled={quantities[size.size] === 0}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4 text-black" />
                    </button>
                    <span className="w-12 text-center text-base font-normal text-black">
                      {quantities[size.size]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(size.size, 1)}
                      disabled={quantities[size.size] >= size.quantity}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        {totalQuantity > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Quantity</p>
                <p className="text-xl font-light">{totalQuantity} pieces</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Estimated Total</p>
                <p className="text-2xl font-light text-black">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button className="w-full py-4 bg-black hover:bg-gray-800 text-white font-normal transition-all uppercase tracking-wider text-sm">
              Send Enquiry
            </button>
          </motion.div>
        )}

        {/* Tabs Section */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          {/* Tab Headers */}
          <div className="flex gap-8 border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm transition-colors uppercase tracking-wider ${
                  activeTab === tab.id
                    ? 'text-black border-b-2 border-black font-medium'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-gray-700 leading-relaxed">
            {activeTab === 'details' && (
              <div>
                <h4 className="text-sm font-medium text-black mb-3 uppercase tracking-wider">
                  Product details
                </h4>
                {product.description ? (
                  <p className="mb-4">{product.description}</p>
                ) : (
                  <p>Sculptural dress with asymmetric draping and architectural details</p>
                )}
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Relaxed fit, full length sleeves</li>
                  <li>The model is wearing size M</li>
                  <li>No. of components - 1</li>
                </ul>
              </div>
            )}

            {activeTab === 'material' && (
              <div>
                <h4 className="text-sm font-medium text-black mb-3 uppercase tracking-wider">
                  Material
                </h4>
                {product.fabricDetails ? (
                  <p>{product.fabricDetails}</p>
                ) : (
                  <p>100% premium quality fabric with sustainable production methods.</p>
                )}
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <h4 className="text-sm font-medium text-black mb-3 uppercase tracking-wider">
                  Wash & Care
                </h4>
                {product.careInstructions ? (
                  <p>{product.careInstructions}</p>
                ) : (
                  <>
                    <p className="mb-2">Wash care - Dry clean only</p>
                    <p className="text-sm">
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
                <h4 className="text-sm font-medium text-black mb-3 uppercase tracking-wider">
                  Bulk Price
                </h4>
                <p className="mb-4">Special pricing available for bulk orders:</p>
                <ul className="space-y-2 text-sm">
                  <li>10-50 pieces: 10% discount</li>
                  <li>51-100 pieces: 15% discount</li>
                  <li>100+ pieces: Custom pricing - contact us</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h4 className="text-sm font-medium text-black mb-3 uppercase tracking-wider">
                  Shipping
                </h4>
                <p className="mb-4">We ship worldwide with the following options:</p>
                <ul className="space-y-2 text-sm">
                  <li>Standard Shipping: 7-14 business days</li>
                  <li>Express Shipping: 3-5 business days</li>
                  <li>Free shipping on orders over $500</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Empty State CTA */}
        {totalQuantity === 0 && (
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Select sizes and quantities to send an enquiry
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

