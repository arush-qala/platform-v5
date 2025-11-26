'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export interface Slide {
    id: number
    image: string
    title: string
    description: string
    category: string
    season: string
}

interface HeroCarouselProps {
    slides: Slide[]
    currentIndex: number
    onChange: (index: number) => void
}

export function HeroCarousel({ slides, currentIndex, onChange }: HeroCarouselProps) {
    // Auto-advance timer
    useEffect(() => {
        const timer = setInterval(() => {
            onChange((currentIndex + 1) % slides.length)
        }, 4000)

        return () => clearInterval(timer)
    }, [currentIndex, slides.length, onChange])

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Slides */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={slides[currentIndex].image}
                        alt={slides[currentIndex].title}
                        fill
                        priority
                        className="object-cover w-full h-full"
                        quality={90}
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>
            </AnimatePresence>

            {/* Slide Info Overlay (Bottom Left) */}
            <div className="absolute bottom-6 left-6 z-10 text-white max-w-[60%] md:max-w-md pointer-events-none">
                <motion.h2
                    key={`title-${currentIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg font-semibold mb-1 drop-shadow-md"
                >
                    {slides[currentIndex].title}
                </motion.h2>
                <motion.p
                    key={`desc-${currentIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-sm font-normal opacity-90 drop-shadow-md leading-relaxed"
                >
                    {slides[currentIndex].description}
                </motion.p>
            </div>

            {/* Pagination Dots (Bottom Right) */}
            <div className="absolute bottom-6 right-6 z-10 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onChange(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-white scale-110'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
