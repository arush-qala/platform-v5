'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Package } from 'lucide-react'

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
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    product.sizes.reduce((acc, size) => ({ ...acc, [size.size]: 0 }), {})
  )
  const [showBrandKit, setShowBrandKit] = useState(false)
  const [customizationRequest, setCustomizationRequest] = useState('')

  const colors = JSON.parse(product.colors)

  const handleQuantityChange = (size: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, Math.min(99, prev[size] + delta)),
    }))
  }

  const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
  const totalPrice = totalQuantity * product.price

  return (
    <div className="bg-ivory p-8 md:p-12 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        {/* Product Header */}
        <div className="mb-8">
          <p className="text-sm text-taupe uppercase tracking-wider mb-2">{product.category}</p>
          <h2 className="text-4xl md:text-5xl font-cormorant text-deep-charcoal mb-4">
            {product.name}
          </h2>
          <p className="text-3xl text-gold-accent font-light">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mb-8">
            <p className="text-taupe leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Available Colors */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-deep-charcoal mb-3 uppercase tracking-wider">
            Available Colors
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-sand text-charcoal text-sm rounded-sm"
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        {/* Size & Quantity Matrix */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-deep-charcoal mb-4 uppercase tracking-wider">
            Select Sizes & Quantities
          </h3>
          <div className="space-y-3">
            {product.sizes.map((size) => (
              <div
                key={size.id}
                className={`flex items-center justify-between p-4 border-2 rounded-sm transition-all ${
                  size.inStock
                    ? 'border-warm-grey hover:border-gold-accent bg-surface'
                    : 'border-warm-grey bg-sand opacity-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium text-deep-charcoal w-12">
                    {size.size}
                  </span>
                  <span className="text-sm text-taupe">
                    {size.inStock ? `${size.quantity} available` : 'Out of Stock'}
                  </span>
                </div>
                {size.inStock && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(size.size, -1)}
                      disabled={quantities[size.size] === 0}
                      className="w-8 h-8 flex items-center justify-center bg-sand hover:bg-warm-grey disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm"
                    >
                      <Minus className="w-4 h-4 text-charcoal" />
                    </button>
                    <span className="w-12 text-center text-lg font-medium text-deep-charcoal">
                      {quantities[size.size]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(size.size, 1)}
                      disabled={quantities[size.size] >= size.quantity}
                      className="w-8 h-8 flex items-center justify-center bg-sand hover:bg-warm-grey disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm"
                    >
                      <Plus className="w-4 h-4 text-charcoal" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Brand Kit Option */}
        <div className="mb-8">
          <button
            onClick={() => setShowBrandKit(!showBrandKit)}
            className="flex items-center gap-3 w-full p-4 border-2 border-warm-grey hover:border-gold-accent bg-surface rounded-sm transition-all"
          >
            <Package className="w-5 h-5 text-gold-accent" />
            <div className="flex-1 text-left">
              <p className="text-lg font-medium text-deep-charcoal">Add Brand Kit</p>
              <p className="text-sm text-taupe">
                Includes catalog, hand block & up to 3 samples
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl text-gold-accent">$75</p>
            </div>
          </button>
          {showBrandKit && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-sand/50 rounded-sm"
            >
              <p className="text-sm text-taupe">
                The brand kit will help you better understand the quality and aesthetic of the collection.
              </p>
            </motion.div>
          )}
        </div>

        {/* Customization Request */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-deep-charcoal mb-3 uppercase tracking-wider">
            Customization Request (Optional)
          </h3>
          <textarea
            value={customizationRequest}
            onChange={(e) => setCustomizationRequest(e.target.value)}
            placeholder="Describe any customizations you'd like to request..."
            rows={4}
            className="w-full px-4 py-3 border-2 border-warm-grey focus:border-gold-accent bg-surface rounded-sm resize-none focus:outline-none transition-colors"
          />
        </div>

        {/* Fabric Details */}
        {product.fabricDetails && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-deep-charcoal mb-2 uppercase tracking-wider">
              Fabric Details
            </h3>
            <p className="text-taupe text-sm leading-relaxed">{product.fabricDetails}</p>
          </div>
        )}

        {/* Care Instructions */}
        {product.careInstructions && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-deep-charcoal mb-2 uppercase tracking-wider">
              Care Instructions
            </h3>
            <p className="text-taupe text-sm leading-relaxed">{product.careInstructions}</p>
          </div>
        )}

        {/* Order Summary */}
        {totalQuantity > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky bottom-0 left-0 right-0 bg-deep-charcoal text-ivory p-6 rounded-sm mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-warm-grey mb-1">Total Quantity</p>
                <p className="text-2xl font-cormorant">{totalQuantity} pieces</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-warm-grey mb-1">Estimated Total</p>
                <p className="text-3xl font-cormorant text-gold-accent">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button className="w-full py-4 bg-gold-accent hover:bg-warm-grey text-deep-charcoal font-medium rounded-sm transition-all">
              Send Enquiry
            </button>
          </motion.div>
        )}

        {/* Empty State CTA */}
        {totalQuantity === 0 && (
          <div className="text-center py-8">
            <p className="text-taupe mb-4">
              Select sizes and quantities to send an enquiry
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

