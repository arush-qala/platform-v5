'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
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

            {/* The Dock */}
            <AnimatePresence>
                {isTrayOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="pointer-events-auto mb-6 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl p-4 flex items-center gap-6"
                    >
                        {/* Items List */}
                        <div className="flex items-center gap-3">
                            <AnimatePresence mode='popLayout'>
                                {items.map((item) => (
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
                                        {/* Remove Button on Hover */}
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                removeItem(item.id)
                                            }}
                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                        >
                                            <X size={12} className="text-white" />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-10 bg-gray-300" />

                        {/* Review Button */}
                        <button
                            onClick={onReview}
                            style={{ backgroundColor: '#000000', color: '#FFFFFF', minWidth: '80px' }}
                            className="flex-shrink-0 px-6 py-2 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-full text-center"
                        >
                            Review & Save
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
