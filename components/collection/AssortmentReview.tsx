'use client'

import { useRef, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import { useAssortment } from './AssortmentContext'

type Props = {
    onClose: () => void
    onNavigate: (product: any) => void
}

// Helper to extract category from product name
const getCategory = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('dress')) return 'Dress'
    if (lowerName.includes('gown')) return 'Gown'
    if (lowerName.includes('skirt')) return 'Skirt'
    if (lowerName.includes('top') || lowerName.includes('shirt') || lowerName.includes('blouse')) return 'Top'
    if (lowerName.includes('pant') || lowerName.includes('trouser')) return 'Pant'
    if (lowerName.includes('jacket') || lowerName.includes('coat') || lowerName.includes('blazer')) return 'Outerwear'
    if (lowerName.includes('suit') || lowerName.includes('coord')) return 'Co-ord Set'
    return 'Ready-to-Wear'
}

export default function AssortmentReview({ onClose, onNavigate }: Props) {
    const { items, removeItem, setItems } = useAssortment()
    const containerRef = useRef<HTMLDivElement>(null)

    // Horizontal scroll with mouse wheel - prevent scroll propagation
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                const scrollLeft = container.scrollLeft
                const maxScrollLeft = container.scrollWidth - container.clientWidth

                // Check if we can scroll in the intended direction
                const scrollingRight = e.deltaY > 0
                const scrollingLeft = e.deltaY < 0

                const canScrollRight = scrollLeft < maxScrollLeft
                const canScrollLeft = scrollLeft > 0

                // Only prevent default and scroll if we can actually scroll
                if ((scrollingRight && canScrollRight) || (scrollingLeft && canScrollLeft)) {
                    e.preventDefault()
                    container.scrollLeft += e.deltaY
                }
            }
        }

        container.addEventListener('wheel', handleWheel, { passive: false })
        return () => container.removeEventListener('wheel', handleWheel)
    }, [])

    return (
        <div className="fixed inset-0 z-[90] flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card - Anchored to Bottom */}
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="relative w-full max-w-6xl h-[80vh] bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-32 py-10 border-b border-gray-100">
                    <h2 className="text-4xl font-serif">Your Assortment ({items.length})</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={32} />
                    </button>
                </div>

                {/* Reorderable Content */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-50/30
                    [&::-webkit-scrollbar]:h-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:mx-32
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
                    [&::-webkit-scrollbar-thumb]:transition-colors"
                >
                    <div className="min-w-full w-fit flex justify-center px-32 py-12 h-full items-center">
                        <Reorder.Group
                            axis="x"
                            values={items}
                            onReorder={setItems}
                            className="flex gap-16"
                        >
                            {items.map((item, index) => (
                                <Reorder.Item
                                    key={item.id}
                                    value={item}
                                    className="relative w-[240px] flex flex-col gap-6 group cursor-grab active:cursor-grabbing"
                                    onClick={() => {
                                        // Optional: Navigate on click if not dragging
                                        // onNavigate(item)
                                    }}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[3/4] w-full bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover pointer-events-none"
                                        />

                                        {/* Number Badge */}
                                        <div className="absolute top-3 left-3 w-8 h-8 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center z-10 shadow-lg border border-white/20">
                                            <span className="text-sm font-serif text-white">{index + 1}</span>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                removeItem(item.id)
                                            }}
                                            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-500 hover:text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all z-10 shadow-lg opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col gap-2 px-6">
                                        <h3 className="font-serif text-xl text-black leading-tight">{item.name}</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">{getCategory(item.name)}</p>
                                        <p className="text-sm font-medium text-gray-900">{item.price}</p>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-32 py-8 border-t border-gray-100 flex justify-end items-center gap-8 bg-white">
                    <div className="text-sm text-gray-500 font-medium">
                        Drag to reorder • {items.length}/10 Styles Selected
                    </div>
                    <button
                        disabled
                        className="px-8 py-4 bg-black text-white uppercase tracking-widest text-sm flex items-center gap-2 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        Continue <ArrowRight size={16} />
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
