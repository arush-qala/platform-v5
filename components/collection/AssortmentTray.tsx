'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type Product = {
    id: string
    name: string
    price: string
    image: string
    fabric: string
    feels_like: string
}

type Props = {
    products: Product[]
    onRemove: (productId: string) => void
    onProductClick: (productId: string) => void
    onReviewClick: () => void
}

export default function AssortmentTray({
    products,
    onRemove,
    onProductClick,
    onReviewClick,
}: Props) {
    const [isHovered, setIsHovered] = useState(false)
    const hideTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current)
        }
    }

    const handleMouseLeave = () => {
        hideTimerRef.current = setTimeout(() => {
            setIsHovered(false)
        }, 3000)
    }

    useEffect(() => {
        return () => {
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current)
            }
        }
    }, [])

    if (products.length === 0) return null

    return (
        <>
            {/* Hover detection zone */}
            <div
                onMouseEnter={handleMouseEnter}
                className="fixed bottom-0 left-0 right-0 h-32 pointer-events-auto z-[70]"
                style={{ pointerEvents: 'auto' }}
            />

            {/* The Dock */}
            <motion.div
                onMouseLeave={handleMouseLeave}
                animate={{
                    y: isHovered ? 0 : '90%',
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                }}
                className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[80] w-[95vw] max-w-6xl"
            >
                <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-t-2xl shadow-2xl px-6 py-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                            <span className="text-xs uppercase tracking-widest text-gray-600">
                                Assortment ({products.length})
                            </span>
                        </div>
                        <button
                            onClick={onReviewClick}
                            className="px-6 py-2 bg-black text-white text-xs uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Review & Save
                        </button>
                    </div>

                    {/* Product Tiles */}
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        <AnimatePresence mode="popLayout">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="relative flex-shrink-0 group"
                                >
                                    {/* Remove button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onRemove(product.id)
                                        }}
                                        className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    >
                                        <X size={14} />
                                    </button>

                                    {/* Product thumbnail */}
                                    <div
                                        onClick={() => onProductClick(product.id)}
                                        className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden cursor-pointer transform transition-transform group-hover:scale-105"
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={80}
                                            height={112}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </AnimatePresence>

                        {/* Add More Indicator */}
                        {products.length < 10 && (
                            <div className="flex-shrink-0 w-20 h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                +
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    )
}
