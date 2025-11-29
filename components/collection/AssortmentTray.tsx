'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import { useAssortment } from './AssortmentContext'

type Props = {
    onReview: () => void
}

export default function AssortmentTray({ onReview }: Props) {
    const { items, removeItem, isTrayOpen, setTrayOpen } = useAssortment()
    const [isHovered, setIsHovered] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Auto-hide logic
    useEffect(() => {
        if (isTrayOpen && !isHovered) {
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => {
                setTrayOpen(false)
            }, 5000)
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [isTrayOpen, isHovered, setTrayOpen])

    const handleMouseEnter = () => {
        setIsHovered(true)
        setTrayOpen(true)
        if (timerRef.current) clearTimeout(timerRef.current)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        // Timer will be set by the useEffect
    }

    if (items.length === 0) return null

    return (
        <div
            className="fixed bottom-0 left-0 w-full z-[80] flex flex-col items-center justify-end pointer-events-none"
            style={{ height: '20vh' }} // Hit area for hover
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Minimal Handle (Visible when closed) */}
            <AnimatePresence>
                {!isTrayOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="pointer-events-auto mb-2 w-32 h-1.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
                        onClick={() => setTrayOpen(true)}
                    />
                )}
            </AnimatePresence>

            {/* Container for Dock + Floating Button */}
            <div className="relative flex items-end gap-8 mb-6">
                {/* The Dock */}
                <AnimatePresence>
                    {isTrayOpen && (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl px-8 py-4 flex items-center gap-3"
                        >
                            {/* Items List */}
                            <div className="flex items-center gap-3">
                                <AnimatePresence mode='popLayout'>
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            className="relative w-16 h-24 bg-gray-100 rounded-md overflow-hidden group cursor-pointer border border-gray-200"
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />

                                            {/* Number Badge */}
                                            <div className="absolute top-1 left-1 w-4 h-4 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-medium text-white">{index + 1}</span>
                                            </div>

                                            {/* Remove Button on Hover */}
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeItem(item.id)
                                                }}
                                                className="absolute top-1 right-1 w-4 h-4 bg-black/50 hover:bg-red-500 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-10"
                                            >
                                                <X size={10} className="text-white" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Review Button */}
                <AnimatePresence>
                    {isTrayOpen && (
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0, x: 20 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            exit={{ scale: 0.9, opacity: 0, x: 20 }}
                            onClick={onReview}
                            className="pointer-events-auto h-14 px-12 bg-white/90 backdrop-blur-xl border border-gray-200 text-black text-xs uppercase tracking-[0.2em] font-medium rounded-full shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-3 whitespace-nowrap z-[90]"
                        >
                            <span>Review Assortment</span>
                            <ArrowRight size={14} className="opacity-60" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
