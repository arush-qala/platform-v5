'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Check, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAssortment } from '@/components/collection/AssortmentContext'
import SizeSelectionModal from '@/components/experience/SizeSelectionModal'

export const dynamic = 'force-dynamic'

export default function SampleSelectionPage() {
    const router = useRouter()
    // Use 'items' (Assortment) as the source list. 'sampleItems' tracks selection.
    const { items, addToSampleCart, removeFromSampleCart, isInSampleCart, sampleItems } = useAssortment()
    const [selectedProductForSize, setSelectedProductForSize] = useState<any | null>(null)
    const [showLimitToast, setShowLimitToast] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleProductClick = (product: any) => {
        if (isInSampleCart(product.id)) {
            // If already selected, remove it (toggle behavior)
            removeFromSampleCart(product.id)
        } else {
            // Check limit before adding
            if (sampleItems.length >= 5) {
                setShowLimitToast(true)
                setTimeout(() => setShowLimitToast(false), 3000)
                return
            }
            // Open size modal to select size and add
            setSelectedProductForSize(product)
        }
    }

    const handleSizeConfirm = (size: string) => {
        if (selectedProductForSize) {
            addToSampleCart(selectedProductForSize, size)
            setSelectedProductForSize(null)
        }
    }

    if (!mounted) return <div className="p-12 text-center">Loading...</div>

    return (
        <div className="min-h-screen bg-[#F9F8F6] flex flex-col font-sans text-[#1a1a1a]">
            {/* Header */}
            <div className="px-8 md:px-16 py-12 flex flex-col md:flex-row justify-between items-end border-b border-[#e5e2dd]">
                <div className="max-w-xl">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#666] mb-3 block">Curated Selection</span>
                    <h1 className="font-serif text-4xl md:text-5xl mb-4 font-light text-[#1a1a1a]">Select Samples</h1>
                    <p className="text-[#666] font-light leading-relaxed max-w-md">
                        Curate a selection of up to 5 distinctive pieces for your boutique.
                        Experience the craftsmanship firsthand.
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 md:mt-0 text-right">
                    <p className="font-serif text-3xl mb-1 text-[#1a1a1a]">
                        {sampleItems.length}<span className="text-[#999] text-xl">/5</span>
                    </p>
                    <p className="text-xs uppercase tracking-widest text-[#666]">Selected</p>
                    {sampleItems.length === 5 && <p className="text-xs text-[#8B4513] mt-2 font-medium">Limit Reached</p>}
                </div>
            </div>

            {/* Main Content - Horizontal Scroll */}
            <div className="flex-1 flex items-center overflow-x-auto px-8 md:px-16 py-12 gap-12 scrollbar-hide">
                {/* Iterate over 'items' (the Assortment Tray selection) instead of 'sampleItems' */}
                {items.length === 0 ? (
                    <div className="w-full text-center text-[#999] font-light italic">
                        <p className="text-xl">Your assortment is empty.</p>
                        <button onClick={() => router.push('/collection/all')} className="mt-4 underline underline-offset-4 hover:text-black transition-colors">
                            Browse Collections
                        </button>
                    </div>
                ) : (
                    items.map((item) => {
                        const isSelected = isInSampleCart(item.id)
                        // Find the size if it is selected (optional, for display)
                        const selectedSample = sampleItems.find(s => s.product.id === item.id)

                        return (
                            <motion.div
                                key={item.id}
                                layoutId={item.id}
                                onClick={() => handleProductClick(item)}
                                className={`relative flex-shrink-0 w-[280px] group cursor-pointer transition-all duration-500`}
                            >
                                {/* Image Card - "Framed" Look */}
                                <div className={`relative aspect-[3/4] overflow-hidden transition-all duration-500 bg-white p-3 shadow-sm ${isSelected ? 'border-2 border-[#1a1a1a]' : 'border border-[#e5e2dd] hover:border-[#999]'}`}>
                                    <div className="relative w-full h-full overflow-hidden bg-[#f0f0f0]">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name || 'Product'}
                                                fill
                                                className={`object-cover transition-transform duration-700 ${isSelected ? 'scale-105' : 'group-hover:scale-105 grayscale group-hover:grayscale-0'}`}
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-[#999]">
                                                <span className="text-xs tracking-widest uppercase">No Image</span>
                                            </div>
                                        )}

                                        {/* Overlay for Selection */}
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-[#1a1a1a]/10 flex items-center justify-center">
                                                <div className="bg-[#1a1a1a] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform scale-100 transition-transform">
                                                    <Check size={18} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="mt-6 text-center">
                                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-1">{item.name || 'Unnamed Product'}</h3>
                                    <p className="text-xs uppercase tracking-widest text-[#666] mb-3">
                                        Sample: <span className="text-[#1a1a1a] border-b border-[#ccc] pb-0.5">$50.00</span>
                                    </p>

                                    {isSelected && (
                                        <div className="inline-block border border-[#e5e2dd] px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#666] bg-white">
                                            Size: {selectedSample?.size}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })
                )}

                {/* Spacer for right padding in scroll */}
                <div className="w-4 flex-shrink-0" />
            </div>

            {/* Floating Proceed Bar */}
            <div className="fixed bottom-0 left-0 w-full p-8 pointer-events-none flex justify-center">
                <AnimatePresence>
                    {sampleItems.length > 0 && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="pointer-events-auto"
                        >
                            <button
                                onClick={() => router.push('/checkout')}
                                className="bg-[#1a1a1a] text-white px-10 py-4 shadow-2xl flex items-center gap-4 hover:bg-[#333] transition-colors duration-300 group"
                            >
                                <span className="text-xs uppercase tracking-[0.2em]">Proceed to Checkout</span>
                                <ArrowRight size={16} className="text-[#e5e2dd] group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                        className="fixed top-8 right-8 bg-[#1a1a1a] text-white px-6 py-4 shadow-xl z-50 flex items-center gap-4 max-w-xs"
                    >
                        <ShoppingBag size={18} className="text-[#d4af37]" />
                        <span className="text-xs uppercase tracking-wider leading-relaxed">Limit Reached. Maximum 5 samples.</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
