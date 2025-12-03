'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Check, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAssortment } from '@/components/collection/AssortmentContext'
import SizeSelectionModal from '@/components/experience/SizeSelectionModal'

export default function SampleSelectionPage() {
    const router = useRouter()
    const { items, addToSampleCart, removeFromSampleCart, isInSampleCart, sampleItems } = useAssortment()
    const [selectedProductForSize, setSelectedProductForSize] = useState<any | null>(null)
    const [showLimitToast, setShowLimitToast] = useState(false)

    const handleProductClick = (product: any) => {
        if (isInSampleCart(product.id)) {
            // If already selected, remove it (toggle behavior)
            removeFromSampleCart(product.id)
        } else {
            // Check limit
            if (sampleItems.length >= 5) {
                setShowLimitToast(true)
                setTimeout(() => setShowLimitToast(false), 3000)
                return
            }
            // Open size modal
            setSelectedProductForSize(product)
        }
    }

    const handleSizeConfirm = (size: string) => {
        if (selectedProductForSize) {
            addToSampleCart(selectedProductForSize, size)
            setSelectedProductForSize(null)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="px-12 py-8 flex justify-between items-center border-b border-gray-100">
                <div>
                    <h1 className="font-serif text-3xl mb-2">Select Samples</h1>
                    <p className="text-gray-500 text-sm">Choose up to 5 pieces from your assortment to order samples.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-medium">{sampleItems.length}/5 Selected</p>
                        {sampleItems.length === 5 && <p className="text-xs text-amber-600">Limit Reached</p>}
                    </div>
                    <button
                        disabled={sampleItems.length === 0}
                        onClick={() => router.push('/checkout')}
                        className={`px-8 py-3 rounded-full flex items-center gap-2 text-sm uppercase tracking-widest transition-all ${sampleItems.length > 0
                                ? 'bg-black text-white hover:bg-gray-800 shadow-lg'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Proceed to Checkout <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Main Content - Horizontal Scroll */}
            <div className="flex-1 flex items-center overflow-x-auto p-12 gap-12 bg-gray-50/30">
                {items.length === 0 ? (
                    <div className="w-full text-center text-gray-400">
                        <p>Your assortment is empty. Go back to collections to add items.</p>
                    </div>
                ) : (
                    items.map((item) => {
                        const isSelected = isInSampleCart(item.id)
                        return (
                            <motion.div
                                key={item.id}
                                layoutId={item.id}
                                onClick={() => handleProductClick(item)}
                                className={`relative flex-shrink-0 w-[300px] group cursor-pointer transition-all duration-300 ${isSelected ? 'scale-105' : 'hover:scale-105'
                                    }`}
                            >
                                {/* Image Card */}
                                <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${isSelected ? 'ring-4 ring-black ring-offset-4' : 'border border-gray-200'
                                    }`}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Selected Indicator Overlay */}
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                            <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl">
                                                <Check size={24} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Hover Overlay (if not selected) */}
                                    {!isSelected && (
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="mt-6 text-center">
                                    <h3 className="font-serif text-xl mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">Sample Cost: <span className="text-black font-medium">$50</span></p>
                                    {isSelected && (
                                        <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                                            Size: {sampleItems.find(i => i.product.id === item.id)?.size}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })
                )}
            </div>

            {/* Size Selection Modal */}
            <AnimatePresence>
                {selectedProductForSize && (
                    <SizeSelectionModal
                        productName={selectedProductForSize.name}
                        onClose={() => setSelectedProductForSize(null)}
                        onConfirm={handleSizeConfirm}
                    />
                )}
            </AnimatePresence>

            {/* Limit Toast */}
            <AnimatePresence>
                {showLimitToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3"
                    >
                        <ShoppingBag size={18} />
                        <span className="text-sm font-medium">You can order only up to 5 pieces in a sample crate</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
