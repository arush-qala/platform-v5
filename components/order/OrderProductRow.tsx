'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useAssortment } from '@/components/collection/AssortmentContext'
import { ChevronDown, ChevronUp, Edit3 } from 'lucide-react'

type Props = {
    product: any
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export default function OrderProductRow({ product }: Props) {
    const { orderQuantities, updateOrderQuantity, customizationNotes, updateCustomizationNote } = useAssortment()
    const [showNotes, setShowNotes] = useState(false)

    // Calculate total quantity for this product
    const productQty = orderQuantities[product.id] || {}
    const totalQty = Object.values(productQty).reduce((a, b) => a + b, 0)

    // Parse base price
    const basePrice = parseFloat(product.price.replace('$', '')) || 0
    const landedPrice = basePrice * (totalQty || 0)

    return (
        <div className="border-b border-gray-100 py-10 first:pt-0">
            <div className="flex gap-8 items-start">

                {/* Product Image */}
                <div className="relative w-32 aspect-[3/4] bg-gray-50 rounded-sm overflow-hidden flex-shrink-0">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Info */}
                    <div className="md:col-span-3 space-y-3">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">QALA BRAND</p>
                            <h3 className="font-serif text-base leading-tight text-black">{product.name}</h3>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500">Color: <span className="text-black">Black</span></p>
                            <p className="text-[10px] text-gray-500">Style: <span className="uppercase">{product.id.slice(0, 8)}</span></p>
                        </div>

                        <div className="pt-2 flex flex-col gap-2 items-start">
                            <button
                                onClick={() => setShowNotes(!showNotes)}
                                className="text-[10px] text-gray-400 hover:text-black flex items-center gap-1 transition-colors uppercase tracking-wider"
                            >
                                <Edit3 size={10} />
                                {customizationNotes[product.id] ? 'Edit Notes' : 'Add Notes'}
                            </button>
                        </div>
                    </div>

                    {/* Size Grid */}
                    <div className="md:col-span-6 flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-2 w-full max-w-md">
                            {SIZES.map((size) => (
                                <div key={size} className="flex flex-col items-center gap-1">
                                    <label className="text-[10px] text-gray-400 uppercase">{size}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={productQty[size] || ''}
                                        onChange={(e) => updateOrderQuantity(product.id, size, parseInt(e.target.value) || 0)}
                                        className="w-full text-center border border-gray-200 rounded-sm py-2 text-sm focus:border-black focus:ring-0 transition-colors placeholder:text-gray-200"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-3 text-right">
                        <p className="text-xs text-gray-400 mb-1">Landed Price</p>
                        <p className="font-serif text-xl">${landedPrice.toFixed(2)}</p>
                        {totalQty > 0 && (
                            <p className="text-[10px] text-green-600 mt-1">
                                {totalQty} pcs selected
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Customisation Notes Area */}
            <AnimatePresence>
                {(showNotes || customizationNotes[product.id]) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-6 pl-40 pr-0 md:pr-12">
                            <label className="text-xs text-gray-500 mb-2 block">Customisation Requirements / Notes</label>
                            <textarea
                                value={customizationNotes[product.id] || ''}
                                onChange={(e) => updateCustomizationNote(product.id, e.target.value)}
                                placeholder="Describe any sizing splits, specific design changes, or silhouette modifications here..."
                                className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-black focus:ring-0 transition-all min-h-[80px]"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
