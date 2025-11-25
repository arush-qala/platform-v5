'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export interface MediaItem {
    type: 'video' | 'image'
    src: string
}

interface BackgroundMediaProps {
    items: MediaItem[]
    overlayOpacity?: number
    className?: string
    cycleInterval?: number // Time in ms between slides
}

export function BackgroundMedia({
    items,
    overlayOpacity = 0.4,
    className = '',
    cycleInterval = 6000
}: BackgroundMediaProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (items.length <= 1) return

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length)
        }, cycleInterval)

        return () => clearInterval(timer)
    }, [items.length, cycleInterval])

    return (
        <div className={`absolute inset-0 z-0 overflow-hidden bg-white ${className}`}>
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    {items[currentIndex].type === 'video' ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="object-cover w-full h-full"
                        >
                            <source src={items[currentIndex].src} type="video/mp4" />
                        </video>
                    ) : (
                        <Image
                            src={items[currentIndex].src}
                            alt="Background"
                            fill
                            priority
                            className="object-cover w-full h-full"
                            quality={90}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Overlay Layer */}
            <div
                className="absolute inset-0 bg-white mix-blend-overlay"
                style={{ opacity: overlayOpacity }}
            />

            {/* Texture/Grain Layer (Optional Luxury Touch) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />
        </div>
    )
}
