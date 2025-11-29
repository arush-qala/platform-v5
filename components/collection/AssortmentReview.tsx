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

export default function AssortmentReview({ onClose, onNavigate }: Props) {
    const { items, removeItem, setItems } = useAssortment()
    const containerRef = useRef<HTMLDivElement>(null)

    // Horizontal scroll with mouse wheel
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                e.preventDefault()
                container.scrollLeft += e.deltaY
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
                <div className="flex items-center justify-between px-12 py-8 border-b border-gray-100">
                    <h2 className="text-3xl font-serif">Your Assortment ({items.length})</h2>
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
                    className="flex-1 overflow-x-auto overflow-y-hidden flex items-center p-12 bg-gray-50/50 
                    [&::-webkit-scrollbar]:h-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:mx-12
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
                    [&::-webkit-scrollbar-thumb]:transition-colors"
                >
                    <Reorder.Group
                        axis="x"
                        values={items}
                        onReorder={setItems}
                        className="flex gap-8 mx-auto min-w-max"
                    >
                        {items.map((item, index) => (
                            <Reorder.Item
                                key={item.id}
                                value={item}
                                className="relative aspect-[3/4] w-[280px] bg-white shadow-xl rounded-xl overflow-hidden group cursor-grab active:cursor-grabbing border border-gray-100"
                                onClick={() => {
                                    // Optional: Navigate on click if not dragging
                                    // onNavigate(item)
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover pointer-events-none"
                                />

                                {/* Number Badge */}
                                <div className="absolute top-4 left-4 w-10 h-10 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center z-10 shadow-lg border border-white/20">
                                    <span className="text-lg font-serif text-white">{index + 1}</span>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeItem(item.id)
                                    }}
                                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-red-500 hover:text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all z-10 shadow-lg opacity-0 group-hover:opacity-100"
                                >
                                    <X size={16} />
                                </button>

                                {/* Overlay Info */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 pointer-events-none">
                                    <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <p className="font-serif text-xl mb-1">{item.name}</p>
                                        <p className="text-sm opacity-90">{item.price}</p>
                                    </div>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>

                {/* Footer Actions */}
                <div className="px-12 py-8 border-t border-gray-100 flex justify-end items-center gap-8 bg-white">
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
